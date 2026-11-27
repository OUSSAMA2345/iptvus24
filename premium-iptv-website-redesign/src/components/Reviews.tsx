"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { SectionHead } from "./ui";
import { isReviewTextLengthValid } from "@/lib/review-validation";
import { cleanFormText, isCodePointLengthBetween } from "@/lib/form-validation";

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

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

async function readApiMessage(response: Response) {
  try {
    return await response.json() as { message?: string };
  } catch {
    return null;
  }
}

export default function Reviews({ embedded = false }: { embedded?: boolean }) {
  const [data, setData] = useState<ReviewPayload | null>(null);
  const [loadError, setLoadError] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const starRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/reviews", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          const result = await readApiMessage(response);
          throw new Error(result?.message || "Published reviews are unavailable.");
        }
        return (await response.json()) as ReviewPayload;
      })
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
        setLoadError("");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setLoadError(error instanceof Error ? error.message : "Published reviews are unavailable.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function focusAndSelectRating(nextValue: number) {
    setRating(nextValue);
    starRefs.current[nextValue - 1]?.focus();
  }

  function handleRatingKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentValue: number) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const nextValue = rating === 0 ? 1 : (currentValue % 5) + 1;
      focusAndSelectRating(rating === 0 && currentValue === 1 ? 2 : nextValue);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prevValue = currentValue === 1 ? 5 : currentValue - 1;
      focusAndSelectRating(prevValue);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusAndSelectRating(1);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      focusAndSelectRating(5);
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setRating(currentValue);
      return;
    }
    if (/^[1-5]$/.test(event.key)) {
      event.preventDefault();
      focusAndSelectRating(Number(event.key));
    }
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const displayName = cleanFormText(formData.get("displayName"));
    const reviewText = cleanFormText(formData.get("reviewText"));

    if (!isCodePointLengthBetween(displayName, 2, 60)) {
      setMessageType("error");
      setMessage("Please enter a display name between 2 and 60 characters.");
      return;
    }

    if (rating === 0) {
      setMessageType("error");
      setMessage("Please choose a rating from 1 to 5 stars.");
      starRefs.current[0]?.focus();
      return;
    }

    if (!isReviewTextLengthValid(reviewText)) {
      setMessageType("error");
      setMessage("Enter at least 5 characters. Short reviews like “Good” and “Nice” are also accepted.");
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          rating,
          reviewText,
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

  const content = (
    <>
      {!embedded && (
        <SectionHead
          eyebrow="Community reviews"
          title={<>Read experiences <span className="text-brand">shared by visitors.</span></>}
          sub="Published reviews are user-submitted and moderated. Purchases are not independently verified, and no sample testimonials are shown."
        />
      )}

      <div className={`${embedded ? "" : "mx-auto mt-8 max-w-2xl"} flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 text-center sm:flex-row sm:text-left`}>
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
        <a href="#review-form" className="rounded text-sm font-bold text-brand underline underline-offset-4">Write a review</a>
      </div>

      {data && data.reviews.length > 0 && (
        <div className={`mt-6 grid gap-4 md:grid-cols-2 ${embedded ? "" : "lg:grid-cols-3"}`}>
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

      <div id="review-form" className={`${embedded ? "mt-8" : "mx-auto mt-8 max-w-2xl"} scroll-mt-28 rounded-2xl border border-line bg-white p-6 sm:p-8`}>
        {embedded ? (
          <h2 className="font-display text-xl font-extrabold text-ink">Share your experience</h2>
        ) : (
          <h3 className="font-display text-xl font-extrabold text-ink">Share your experience</h3>
        )}
        <p className="mt-2 text-sm leading-relaxed text-slate-soft">
          Your review will be checked by a moderator before it appears. Please do not include sensitive personal information.
        </p>
        <form onSubmit={submitReview} className="mt-6 space-y-5">
          <label className="block text-sm font-bold text-ink">
            Display name
            <input
              name="displayName"
              required
              minLength={2}
              maxLength={60}
              autoComplete="nickname"
              className="mt-2 w-full rounded-xl border border-line px-4 py-3 font-medium text-ink focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand"
            />
          </label>

          <fieldset>
            <legend id="review-rating-legend" className="text-sm font-bold text-ink">
              Your rating
            </legend>
            <div
              className="mt-2 flex gap-2"
              role="radiogroup"
              aria-labelledby="review-rating-legend"
              aria-required="true"
            >
              {STAR_VALUES.map((value) => {
                const isChecked = rating === value;
                const tabIndex = rating === 0 ? (value === 1 ? 0 : -1) : isChecked ? 0 : -1;
                return (
                  <button
                    key={value}
                    ref={(element) => {
                      starRefs.current[value - 1] = element;
                    }}
                    type="button"
                    role="radio"
                    aria-label={`${value} star${value === 1 ? "" : "s"}`}
                    aria-checked={isChecked}
                    tabIndex={tabIndex}
                    onClick={() => setRating(value)}
                    onKeyDown={(event) => handleRatingKeyDown(event, value)}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 py-1 text-2xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                      rating >= value ? "text-amber-400" : "text-slate-300"
                    }`}
                  >
                    <span aria-hidden="true">★</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="block text-sm font-bold text-ink">
            Your review
            <textarea
              name="reviewText"
              required
              maxLength={1500}
              rows={5}
              aria-describedby="review-length-help"
              className="mt-2 w-full resize-y rounded-xl border border-line px-4 py-3 font-medium text-ink focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand"
            />
            <span id="review-length-help" className="mt-2 block text-xs font-medium text-slate-soft">
              At least 5 characters; “Good” and “Nice” are accepted as short reviews.
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-soft">
            <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#0a84ff]" />
            <span>
              I agree that my display name, rating, and review may be published if approved. I can request removal by contacting support.
            </span>
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
    </>
  );

  if (embedded) {
    return <section aria-label="Published reviews and submission form">{content}</section>;
  }

  return (
    <section id="reviews" className="scroll-mt-28 bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{content}</div>
    </section>
  );
}
