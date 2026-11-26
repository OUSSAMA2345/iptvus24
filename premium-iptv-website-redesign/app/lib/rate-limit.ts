import "server-only";

import { createHmac } from "node:crypto";
import type { NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServiceRoleKey } from "./supabase-admin";

export async function checkFormRateLimit(
  request: NextRequest,
  supabase: SupabaseClient,
  action: "contact" | "review",
  limit: number,
) {
  const secret = getSupabaseServiceRoleKey();
  if (!secret) return null;

  const address =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ??
    "unknown";
  const fingerprint = createHmac("sha256", secret).update(address).digest("hex");
  const { data, error } = await supabase.rpc("consume_form_rate_limit", {
    p_fingerprint: fingerprint,
    p_action: action,
    p_limit: limit,
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
