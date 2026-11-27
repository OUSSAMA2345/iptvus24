import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockInsert = vi.fn();
const mockDelete = vi.fn();
const mockLimit = vi.fn();
const mockOrder = vi.fn(() => ({ limit: mockLimit }));
const mockEq = vi.fn(() => ({ order: mockOrder }));
const mockSelect = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn(() => ({
  select: mockSelect,
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

import { GET, POST } from "../app/api/reviews/route";
import { resetSupabaseAdminCache } from "../app/lib/supabase-admin";

const ORIGIN = "https://www.iptvus24.com";

function makeReviewPostRequest(
  body: unknown,
  options: {
    headers?: Record<string, string>;
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
  headers.set("x-vercel-forwarded-for", "203.0.113.88");
  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      headers.set(key, value);
    }
  }

  return new NextRequest(`${ORIGIN}/api/reviews`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

const validReview = {
  displayName: "Samira K.",
  rating: 5,
  reviewText: "Clear setup steps on my Apple TV.",
  consent: true,
};

describe("/api/reviews", () => {
  beforeEach(() => {
    resetSupabaseAdminCache();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SUPABASE_URL", "https://reviewstest.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "sb_secret_reviews_key_123456");
    mockInsert.mockResolvedValue({ error: null });
    mockRpc.mockImplementation((fnName: string) => {
      if (fnName === "get_public_review_stats") {
        return Promise.resolve({
          data: [{ average_rating: "4.8", review_count: 5 }],
          error: null,
        });
      }
      return Promise.resolve({ data: true, error: null });
    });
    mockLimit.mockResolvedValue({
      data: [
        {
          id: "rev-1",
          display_name: "Samira K.",
          rating: 5,
          review_text: "Clear setup steps on my Apple TV.",
          created_at: "2026-11-26T12:00:00Z",
        },
      ],
      error: null,
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetSupabaseAdminCache();
  });

  it("GET returns published reviews and aggregate stats with Cache-Control: no-store", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    const payload = await res.json();
    expect(payload).toEqual({
      reviews: [
        {
          id: "rev-1",
          display_name: "Samira K.",
          rating: 5,
          review_text: "Clear setup steps on my Apple TV.",
          created_at: "2026-11-26T12:00:00Z",
        },
      ],
      averageRating: 4.8,
      reviewCount: 5,
    });
  });

  it("does not leak internal env variable names on invalid Supabase configuration", async () => {
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "not-a-valid-key");
    resetSupabaseAdminCache();

    const res = await GET();
    expect(res.status).toBe(503);
    const body = (await res.json()) as { message: string };
    expect(body.message).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(body.message).not.toContain("SUPABASE_URL");
  });

  it("POST enforces same-origin Origin (403) and Content-Type: application/json (415)", async () => {
    const crossOrigin = await POST(
      makeReviewPostRequest(validReview, { headers: { origin: "https://evil.example" } }),
    );
    expect(crossOrigin.status).toBe(403);

    const wrongType = await POST(
      makeReviewPostRequest(validReview, { headers: { "content-type": "application/x-www-form-urlencoded" } }),
    );
    expect(wrongType.status).toBe(415);
  });

  it("POST validates Unicode code-point display name length, short review rules, and rating bounds", async () => {
    const emojiName = await POST(makeReviewPostRequest({ ...validReview, displayName: "👍" }));
    expect(emojiName.status).toBe(400);

    const shortAllowed = await POST(makeReviewPostRequest({ ...validReview, reviewText: "Good" }));
    expect(shortAllowed.status).toBe(201);

    const shortRejected = await POST(makeReviewPostRequest({ ...validReview, reviewText: "Okay" }));
    expect(shortRejected.status).toBe(400);

    const badRating = await POST(makeReviewPostRequest({ ...validReview, rating: 4.5 }));
    expect(badRating.status).toBe(400);
  });

  it("POST returns 429 when rate limited and 400 on database check violations", async () => {
    mockRpc.mockResolvedValueOnce({ data: false, error: null });
    const throttled = await POST(makeReviewPostRequest(validReview));
    expect(throttled.status).toBe(429);

    mockInsert.mockResolvedValueOnce({
      error: { code: "23514", message: "reviews_review_text_length_check" },
    });
    const dbInvalid = await POST(makeReviewPostRequest(validReview));
    expect(dbInvalid.status).toBe(400);
  });

  it("POST inserts pending review without running synchronous retention deletes", async () => {
    const res = await POST(makeReviewPostRequest(validReview));
    expect(res.status).toBe(201);
    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockInsert).toHaveBeenCalledWith({
      display_name: "Samira K.",
      rating: 5,
      review_text: "Clear setup steps on my Apple TV.",
      status: "pending",
    });
  });
});
