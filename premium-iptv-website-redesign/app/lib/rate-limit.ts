import "server-only";

import { createHmac, randomUUID } from "node:crypto";
import { isIP } from "node:net";
import type { NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServiceRoleKey } from "./supabase-admin";

export function isJsonContentType(request: NextRequest): boolean {
  const contentType = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  return contentType === "application/json";
}

export function isSameOriginRequest(request: NextRequest): boolean {
  const secFetchSite = request.headers.get("sec-fetch-site")?.trim().toLowerCase();
  if (secFetchSite && secFetchSite !== "same-origin") {
    return false;
  }

  const originHeader = request.headers.get("origin")?.trim();
  if (!originHeader || originHeader.toLowerCase() === "null") {
    return false;
  }

  let originUrl: URL;
  try {
    originUrl = new URL(originHeader);
  } catch {
    return false;
  }

  if (originUrl.protocol !== "https:" && originUrl.protocol !== "http:") {
    return false;
  }

  const isLocalOrigin =
    originUrl.hostname === "localhost" ||
    originUrl.hostname === "127.0.0.1" ||
    originUrl.hostname === "[::1]";
  if (process.env.NODE_ENV === "production" && !isLocalOrigin && originUrl.protocol !== "https:") {
    return false;
  }

  const allowedOrigins = new Set<string>([request.nextUrl.origin.toLowerCase()]);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const hostHeader = forwardedHost || request.headers.get("host")?.trim();
  if (hostHeader) {
    const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
    const proto =
      forwardedProto === "https" || forwardedProto === "http"
        ? `${forwardedProto}:`
        : request.nextUrl.protocol;
    allowedOrigins.add(`${proto}//${hostHeader}`.toLowerCase());
  }

  return allowedOrigins.has(originUrl.origin.toLowerCase());
}

function expandIpv6Groups(address: string): string[] | null {
  const halves = address.toLowerCase().split("::");
  if (halves.length > 2) return null;

  const parsePart = (part: string): string[] | null => {
    if (!part) return [];
    const tokens = part.split(":");
    const groups: string[] = [];
    for (const token of tokens) {
      if (token.includes(".")) {
        if (isIP(token) !== 4) return null;
        const octets = token.split(".").map((n) => Number(n));
        groups.push(((octets[0] << 8) | octets[1]).toString(16).padStart(4, "0"));
        groups.push(((octets[2] << 8) | octets[3]).toString(16).padStart(4, "0"));
      } else {
        if (!/^[0-9a-f]{1,4}$/.test(token)) return null;
        groups.push(token.padStart(4, "0"));
      }
    }
    return groups;
  };

  const left = parsePart(halves[0]);
  if (!left) return null;

  if (halves.length === 1) {
    return left.length === 8 ? left : null;
  }

  const right = parsePart(halves[1]);
  if (!right) return null;
  const missing = 8 - (left.length + right.length);
  if (missing < 1) return null;
  return [...left, ...Array.from({ length: missing }, () => "0000"), ...right];
}

export function normalizeClientIp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let candidate = raw.trim();
  if (!candidate || candidate.toLowerCase() === "unknown") return null;

  const bracketedIpv6 = candidate.match(/^\[([^\]]+)\](?::\d+)?$/);
  if (bracketedIpv6) {
    candidate = bracketedIpv6[1];
  } else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(candidate)) {
    candidate = candidate.slice(0, candidate.lastIndexOf(":"));
  }

  const zoneIndex = candidate.indexOf("%");
  if (zoneIndex !== -1) {
    candidate = candidate.slice(0, zoneIndex);
  }

  const ipVersion = isIP(candidate);
  if (ipVersion === 4) {
    return candidate;
  }
  if (ipVersion === 6) {
    const mappedIpv4 = candidate.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
    if (mappedIpv4 && isIP(mappedIpv4[1]) === 4) {
      return mappedIpv4[1];
    }
    const groups = expandIpv6Groups(candidate);
    if (groups) {
      return `${groups.slice(0, 4).join(":")}::/64`;
    }
    return candidate.toLowerCase();
  }

  return null;
}

type RateLimitIdentity = {
  key: string;
  limitMultiplier: number;
};

/**
 * Resolves a rate-limit identity for a request:
 * - Prefers trusted proxy headers (`x-vercel-forwarded-for`, or rightmost valid IP in
 *   `x-forwarded-for` when proxy headers are trusted).
 * - Explicitly ignores `x-real-ip` so spoofed `X-Real-IP` headers can never bypass limits.
 * - Never falls back to a shared static `"unknown"` bucket (which would throttle all visitors
 *   globally when proxy headers are absent). Instead, falls back to a client-header profile
 *   or an ephemeral token when zero identifying headers are present.
 */
export function resolveRateLimitIdentity(request: NextRequest): RateLimitIdentity {
  const trustProxyHeaders = process.env.TRUST_PROXY !== "false";

  if (trustProxyHeaders) {
    const vercelIp = normalizeClientIp(
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0],
    );
    if (vercelIp) {
      return { key: `ip:${vercelIp}`, limitMultiplier: 1 };
    }

    if (process.env.TRUST_CF_CONNECTING_IP === "true") {
      const cfIp = normalizeClientIp(request.headers.get("cf-connecting-ip"));
      if (cfIp) {
        return { key: `ip:${cfIp}`, limitMultiplier: 1 };
      }
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
      const parts = forwardedFor.split(",");
      for (let index = parts.length - 1; index >= 0; index -= 1) {
        const candidate = normalizeClientIp(parts[index]);
        if (candidate) {
          return { key: `ip:${candidate}`, limitMultiplier: 1 };
        }
      }
    }
  }

  const userAgent = request.headers.get("user-agent")?.trim().slice(0, 256) ?? "";
  const acceptLanguage = request.headers.get("accept-language")?.trim().slice(0, 128) ?? "";
  const secChUa = request.headers.get("sec-ch-ua")?.trim().slice(0, 128) ?? "";
  const secChUaPlatform = request.headers.get("sec-ch-ua-platform")?.trim().slice(0, 64) ?? "";

  if (userAgent || acceptLanguage || secChUa || secChUaPlatform) {
    return {
      key: `client:${userAgent}|${acceptLanguage}|${secChUa}|${secChUaPlatform}`,
      limitMultiplier: 4,
    };
  }

  return {
    key: `ephemeral:${randomUUID()}`,
    limitMultiplier: 1,
  };
}

export async function checkFormRateLimit(
  request: NextRequest,
  supabase: SupabaseClient,
  action: "contact" | "review",
  limit: number,
) {
  const secret = getSupabaseServiceRoleKey();
  if (!secret) return null;

  const identity = resolveRateLimitIdentity(request);
  const fingerprint = createHmac("sha256", secret).update(identity.key).digest("hex");
  const effectiveLimit = Math.max(1, limit * identity.limitMultiplier);

  const { data, error } = await supabase.rpc("consume_form_rate_limit", {
    p_fingerprint: fingerprint,
    p_action: action,
    p_limit: effectiveLimit,
    p_window_seconds: 3600,
  });

  if (error) {
    console.error("Could not check form rate limit:", error.message);
    return null;
  }
  return data === true;
}

export function jsonError(message: string, status: number) {
  return Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}
