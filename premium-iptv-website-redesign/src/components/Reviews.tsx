"use client";

import { useEffect, useState, type FormEvent } from "react";
import { SectionHead } from "./ui";

type Review = {
  id: string;
  display_name: string;
  rating: number;
  review_text: string;
  created_at: string;
};

type ReviewPayload = {
  reviews: Review[];
  averageRating: number | null;
  reviewCount: number;
};

async function readApiMessage(response: Response) {
  try {
    return await response.json() as { message?: string };
  } catch {
    return null;
  }
}

export default function Reviews() {
  const [data, setData] = useState<ReviewPayload | null>(null);
  const [loadError, setLoadError] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  async function loadReviews() {
    try {
      const response = await fetch("/api/reviews", { cache: "no-store" });
      if (!response.ok) {
        const result = await readApiMessage(response);
        throw new Error(result?.message || "Published reviews are unavailable.");
      }
      const payload = (await response.json()) as ReviewPayload;
      setData(payload);
      setLoadError("");
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Published reviews are unavailable.");
    }
  }

  useEffect(() => {
    void loadReviews();
  }, []);

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setMessage("");
    if (rating === 0) {
      setMessageType("error");
      setMessage("Please choose a rating from 1 to 5 stars.");
      return;
    }
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: formData.get("displayName"),
          rating,
          reviewText: formData.get("reviewText"),
          website: formData.get("website"),
          consent: formData.get("consent") === "on",
        }),
      });
      const result = await readApiMessage(response);
      if (!response.ok) {
        throw new Error(result?.message || "The review service is unavailable. Please try again later.");
      }
      if (!result) {
        throw new Error("The review service returned an unexpected response. Please try again later.");
      }

      form.reset();
      setRating(0);
      setMessageType("success");
      setMessage(result.message || "Thanks. Your review was received and is awaiting moderation.");
      await loadReviews();
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof TypeError
          ? "We couldn't connect to the review service. Check your connection and try again. If the problem continues, contact support."
          : error instanceof Error
            ? error.message
            : "Your review could not be submitted. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reviews" className="scroll-mt-28 bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Community reviews"
          title={<>Read experiences <span className="text-brand">shared by visitors.</span></>}
          sub="Published reviews are user-submitted and moderated. Purchases are not independently verified, and no sample testimonials are shown."
        />

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 text-center sm:flex-row sm:text-left">
            {data && data.reviewCount > 0 ? (
              <div>
                <p className="font-display text-3xl font-extrabold text-ink">
                  {data.averageRating?.toFixed(1)} <span className="text-amber-400" aria-hidden="true">★</span>
                  <span className="sr-only">out of 5 stars</span>
                </p>
                <p className="mt-1 text-sm text-slate-soft">
                  Based on {data.reviewCount} published {data.reviewCount === 1 ? "review" : "reviews"}
                </p>
              </div>
            ) : (
              <p role={loadError ? "status" : undefined} className="text-sm text-slate-soft">
                {loadError
                  ? "Published reviews are temporarily unavailable."
                  : data
                    ? "No published reviews yet. You can be the first to share your experience."
                    : "Loading published reviews…"}
              </p>
            )}
            <a href="#review-form" className="text-sm font-bold text-brand underline underline-offset-4">Write a review</a>
        </div>

        {data && data.reviews.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.reviews.map((review) => (
              <article key={review.id} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                <p className="text-base tracking-widest text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
                  <span aria-hidden="true">{"★".repeat(review.rating)}<span className="text-slate-200">{"★".repeat(5 - review.rating)}</span></span>
                </p>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/85">{review.review_text}</blockquote>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <p className="text-sm font-bold text-ink">{review.display_name}</p>
                  <time dateTime={review.created_at} className="text-xs text-slate-soft">
                    {new Date(review.created_at).toLocaleDateString("en", { year: "numeric", month: "short", timeZone: "UTC" })}
                  </time>
                </div>
              </article>
            ))}
          </div>
        )}

        <div id="review-form" className="mx-auto mt-8 max-w-2xl scroll-mt-28 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h3 className="font-display text-xl font-extrabold text-ink">Share your experience</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-soft">
            Your review will be checked by a moderator before it appears. Please do not include sensitive personal information.
          </p>
          <form onSubmit={submitReview} className="mt-6 space-y-5">
            <label className="block text-sm font-bold text-ink">
              Display name
              <input name="displayName" required minLength={2} maxLength={60} autoComplete="nickname" className="mt-2 w-full rounded-xl border border-line px-4 py-3 font-medium outline-none focus:border-brand" />
            </label>

            <fieldset>
              <legend className="text-sm font-bold text-ink">Your rating</legend>
              <div className="mt-2 flex gap-2" role="group" aria-label="Choose a rating from 1 to 5 stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`${value} star${value === 1 ? "" : "s"}`}
                    aria-pressed={rating === value}
                    onClick={() => setRating(value)}
                    className={`rounded-lg px-2 py-1 text-2xl focus-visible:outline ${rating >= value ? "text-amber-400" : "text-slate-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block text-sm font-bold text-ink">
              Your review
              <textarea name="reviewText" required minLength={20} maxLength={1500} rows={5} className="mt-2 w-full resize-y rounded-xl border border-line px-4 py-3 font-medium outline-none focus:border-brand" />
            </label>

            <label className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-soft">
              <input name="consent" type="checkbox" required className="mt-1 accent-[#0a84ff]" />
              I agree that my display name, rating, and review may be published if approved. I can request removal by contacting support.
            </label>

            <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
              Leave this field empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>

            {message && (
              <p
                role={messageType === "error" ? "alert" : "status"}
                aria-live={messageType === "error" ? "assertive" : "polite"}
                className={`rounded-xl border p-3 text-sm font-semibold ${
                  messageType === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-800"
                    : "border-emerald-200 bg-emerald-50 text-emerald-800"
                }`}
              >
                {message}
              </p>
            )}
            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? "Submitting…" : "Submit review"}
            </button>
            <p className="text-xs leading-relaxed text-slate-soft">
              Reviews are moderated for relevance, abusive content, and spam. Submission does not guarantee publication.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
