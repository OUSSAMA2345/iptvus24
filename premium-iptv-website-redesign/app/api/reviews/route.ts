import type { NextRequest } from "next/server";
import {
  getSupabaseAdmin,
  getSupabaseConfigurationStatus,
} from "../../lib/supabase-admin";
import {
  checkFormRateLimit,
  isJsonContentType,
  isSameOriginRequest,
  jsonError,
} from "../../lib/rate-limit";
import { isReviewTextLengthValid } from "@/lib/review-validation";
import {
  cleanFormText,
  isCodePointLengthBetween,
  isDatabaseValidationError,
} from "@/lib/form-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function configurationErrorMessage() {
  if (getSupabaseConfigurationStatus() === "missing") {
    return "Review submissions are not configured yet. Please contact support if you need help.";
  }

  return "The review service is temporarily unavailable due to a server configuration issue. Please try again later.";
}

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return jsonError(configurationErrorMessage(), 503);

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
  if (!isSameOriginRequest(request)) {
    return jsonError("Cross-origin review submissions are not allowed.", 403);
  }
  if (!isJsonContentType(request)) {
    return jsonError("Please submit the review using the provided form.", 415);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 5_000) return jsonError("The submitted review is too large.", 413);

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

  if (cleanFormText(body.website, 200)) {
    return Response.json({ message: "Thanks. Your review was received and is awaiting moderation." }, { status: 202 });
  }

  const displayName = cleanFormText(body.displayName);
  const reviewText = cleanFormText(body.reviewText);
  const rating = body.rating;
  if (
    !isCodePointLengthBetween(displayName, 2, 60) ||
    !isReviewTextLengthValid(reviewText) ||
    typeof rating !== "number" ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    body.consent !== true
  ) {
    return jsonError(
      "Enter a display name (2–60 characters), a review with at least 5 characters (or “Good” or “Nice”), a 1–5 star rating, and agree to publication if approved.",
      400,
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return jsonError(configurationErrorMessage(), 503);
  }

  const rateAllowed = await checkFormRateLimit(request, supabase, "review", 3);
  if (rateAllowed === null) return jsonError("We could not verify this submission. Please try again later.", 503);
  if (!rateAllowed) return jsonError("Too many reviews were submitted. Please try again in about an hour.", 429);

  const { error } = await supabase.from("reviews").insert({
    display_name: displayName,
    rating,
    review_text: reviewText,
    status: "pending",
  });
  if (error) {
    if (isDatabaseValidationError(error)) {
      return jsonError(
        "Enter a display name (2–60 characters), a review with at least 5 characters (or “Good” or “Nice”), and a 1–5 star rating.",
        400,
      );
    }
    console.error("Could not save review:", error.message);
    return jsonError("We could not save your review. Please try again later.", 503);
  }

  return Response.json({ message: "Thanks. Your review was received and is awaiting moderation." }, { status: 201 });
}
