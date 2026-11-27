import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockInsert = vi.fn();
const mockDelete = vi.fn();
const mockFrom = vi.fn(() => ({
  insert: mockInsert,
  delete: mockDelete,
}));
const mockRpc = vi.fn();

const mockSupabaseClient = {
  from: mockFrom,
  rpc: mockRpc,
};

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

import { POST } from "../app/api/contact/route";
import { resetSupabaseAdminCache } from "../app/lib/supabase-admin";

const ORIGIN = "https://www.iptvus24.com";

function makeContactRequest(
  body: unknown,
  options: {
    headers?: Record<string, string>;
    rawBody?: string;
    omitContentType?: boolean;
    omitOrigin?: boolean;
  } = {},
) {
  const headers = new Headers();
  if (!options.omitOrigin) {
    headers.set("origin", ORIGIN);
  }
  if (!options.omitContentType) {
    headers.set("content-type", "application/json");
  }
  headers.set("x-vercel-forwarded-for", "203.0.113.25");
  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      headers.set(key, value);
    }
  }

  return new NextRequest(`${ORIGIN}/api/contact`, {
    method: "POST",
    headers,
    body: options.rawBody ?? JSON.stringify(body),
  });
}

const validPayload = {
  name: "Alex Morgan",
  whatsappNumber: "+44 7473 970663",
  subject: "Plan and billing question",
  message: "Could you confirm compatibility with my LG webOS TV?",
  consent: true,
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetSupabaseAdminCache();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SUPABASE_URL", "https://contacttest.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "sb_secret_contact_key_123456");
    mockInsert.mockResolvedValue({ error: null });
    mockRpc.mockResolvedValue({ data: true, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetSupabaseAdminCache();
  });

  it("rejects missing or cross-origin Origin headers with 403", async () => {
    const missingOrigin = await POST(makeContactRequest(validPayload, { omitOrigin: true }));
    expect(missingOrigin.status).toBe(403);

    const crossOrigin = await POST(
      makeContactRequest(validPayload, { headers: { origin: "https://attacker.example" } }),
    );
    expect(crossOrigin.status).toBe(403);

    const crossSiteFetch = await POST(
      makeContactRequest(validPayload, { headers: { "sec-fetch-site": "cross-site" } }),
    );
    expect(crossSiteFetch.status).toBe(403);
  });

  it("enforces Content-Type: application/json with 415", async () => {
    const textPlain = await POST(
      makeContactRequest(validPayload, { headers: { "content-type": "text/plain" } }),
    );
    expect(textPlain.status).toBe(415);

    const missingType = await POST(makeContactRequest(validPayload, { omitContentType: true }));
    expect(missingType.status).toBe(415);
  });

  it("rejects oversized payloads with 413", async () => {
    const huge = await POST(
      makeContactRequest({ ...validPayload, message: "x".repeat(13_000) }),
    );
    expect(huge.status).toBe(413);
  });

  it("short-circuits honeypot submissions with 202 and performs no DB calls", async () => {
    const res = await POST(makeContactRequest({ ...validPayload, website: "https://spam.invalid" }));
    expect(res.status).toBe(202);
    expect(mockRpc).not.toHaveBeenCalled();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("rejects invalid WhatsApp numbers (1------, +0......) and single-emoji names with 400", async () => {
    const dashRes = await POST(makeContactRequest({ ...validPayload, whatsappNumber: "1------" }));
    expect(dashRes.status).toBe(400);

    const zeroRes = await POST(makeContactRequest({ ...validPayload, whatsappNumber: "+0......" }));
    expect(zeroRes.status).toBe(400);

    const singleEmojiName = await POST(makeContactRequest({ ...validPayload, name: "👍" }));
    expect(singleEmojiName.status).toBe(400);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("ignores spoofed x-real-ip headers and avoids 'unknown' global throttling", async () => {
    await POST(
      makeContactRequest(validPayload, {
        headers: {
          "x-vercel-forwarded-for": "198.51.100.77",
          "x-real-ip": "1.1.1.1",
        },
      }),
    );
    await POST(
      makeContactRequest(validPayload, {
        headers: {
          "x-vercel-forwarded-for": "198.51.100.77",
          "x-real-ip": "2.2.2.2",
        },
      }),
    );

    expect(mockRpc).toHaveBeenCalledTimes(2);
    const firstFingerprint = mockRpc.mock.calls[0]?.[1]?.p_fingerprint;
    const secondFingerprint = mockRpc.mock.calls[1]?.[1]?.p_fingerprint;
    expect(firstFingerprint).toBe(secondFingerprint);

    // Distinct clients without IP headers should NOT collide on a static "unknown" bucket
    mockRpc.mockClear();
    const reqA = new NextRequest(`${ORIGIN}/api/contact`, {
      method: "POST",
      headers: {
        origin: ORIGIN,
        "content-type": "application/json",
        "x-forwarded-for": "unknown",
        "user-agent": "Mozilla/5.0 Safari/605.1.15",
        "accept-language": "en-GB",
      },
      body: JSON.stringify(validPayload),
    });
    const reqB = new NextRequest(`${ORIGIN}/api/contact`, {
      method: "POST",
      headers: {
        origin: ORIGIN,
        "content-type": "application/json",
        "x-forwarded-for": "unknown",
        "user-agent": "Mozilla/5.0 Firefox/132.0",
        "accept-language": "fr-FR",
      },
      body: JSON.stringify(validPayload),
    });

    await POST(reqA);
    await POST(reqB);
    expect(mockRpc.mock.calls[0]?.[1]?.p_fingerprint).not.toBe(
      mockRpc.mock.calls[1]?.[1]?.p_fingerprint,
    );
  });

  it("converts PostgreSQL check constraint violations (23514) into clean 400 responses", async () => {
    mockInsert.mockResolvedValueOnce({
      error: { code: "23514", message: "new row violates check constraint" },
    });
    const res = await POST(makeContactRequest(validPayload));
    expect(res.status).toBe(400);
  });

  it("saves normalized E.164 WhatsApp numbers with 201 and does not run synchronous retention deletes", async () => {
    const res = await POST(makeContactRequest(validPayload));
    expect(res.status).toBe(201);
    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockInsert).toHaveBeenCalledWith({
      name: "Alex Morgan",
      whatsapp_number: "+447473970663",
      subject: "Plan and billing question",
      message: "Could you confirm compatibility with my LG webOS TV?",
    });
  });
});
