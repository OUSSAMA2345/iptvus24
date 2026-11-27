const MIN_REVIEW_LENGTH = 5;
const MAX_REVIEW_LENGTH = 1500;
const ACCEPTED_SHORT_REVIEWS = new Set(["good", "nice"]);

export function codePointLength(value: string): number {
  return Array.from(value).length;
}

export function isReviewTextLengthValid(value: string): boolean {
  const review = value.trim();
  const length = codePointLength(review);

  return (
    length <= MAX_REVIEW_LENGTH &&
    (length >= MIN_REVIEW_LENGTH || ACCEPTED_SHORT_REVIEWS.has(review.toLowerCase()))
  );
}
