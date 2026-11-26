import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "../../lib/supabase-admin";
import { checkFormRateLimit, jsonError } from "../../lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanText(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return jsonError("Published reviews are not configured yet.", 503);

  const [{ data: statsData, error: statsError }, { data: reviews, error: reviewsError }] = await Promise.all([
    supabase.rpc("get_public_review_stats"),
    supabase
      .from("reviews")
      .select("id, display_name, rating, review_text, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);
  if (statsError || reviewsError) {
    console.error("Could not load published reviews:", statsError?.message, reviewsError?.message);
    return jsonError("Published reviews are temporarily unavailable.", 503);
  }

  const stats = statsData?.[0];
  return Response.json(
    {
      reviews: reviews ?? [],
      averageRating: stats?.average_rating === null || stats?.average_rating === undefined
        ? null
        : Number(stats.average_rating),
      reviewCount: Number(stats?.review_count ?? 0),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 5_000) return jsonError("The submitted review is too large.", 413);
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return jsonError("Please submit the review using the provided form.", 415);
  }

  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 5_000) {
      return jsonError("The submitted review is too large.", 413);
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return jsonError("Please submit a valid review.", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return jsonError("Please submit a valid review.", 400);
  }

  if (cleanText(body.website)) {
    return Response.json({ message: "Thanks. Your review was received and is awaiting moderation." }, { status: 202 });
  }

  const displayName = cleanText(body.displayName);
  const reviewText = cleanText(body.reviewText);
  const rating = body.rating;
  if (
    displayName.length < 2 ||
    displayName.length > 60 ||
    reviewText.length < 20 ||
    reviewText.length > 1500 ||
    typeof rating !== "number" ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    body.consent !== true
  ) {
    return jsonError("Enter a display name, a review of at least 20 characters, a 1–5 star rating, and agree to publication if approved.", 400);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return jsonError("Review submissions are not configured yet. Please contact support if you need help.", 503);
  }

  const rateAllowed = await checkFormRateLimit(request, supabase, "review", 3);
  if (rateAllowed === null) return jsonError("We could not verify this submission. Please try again later.", 503);
  if (!rateAllowed) return jsonError("Too many reviews were submitted. Please try again in about an hour.", 429);

  const { error: retentionError } = await supabase
    .from("reviews")
    .delete()
    .eq("status", "pending")
    .lt("created_at", new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString());
  if (retentionError) {
    console.error("Could not apply pending-review retention:", retentionError.message);
    return jsonError("We could not process your review right now. Please try again later.", 503);
  }

  const { error } = await supabase.from("reviews").insert({
    display_name: displayName,
    rating,
    review_text: reviewText,
    status: "pending",
  });
  if (error) {
    console.error("Could not save review:", error.message);
    return jsonError("We could not save your review. Please try again later.", 503);
  }

  return Response.json({ message: "Thanks. Your review was received and is awaiting moderation." }, { status: 201 });
}
