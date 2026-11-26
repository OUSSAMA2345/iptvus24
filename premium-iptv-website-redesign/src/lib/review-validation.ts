const MIN_REVIEW_LENGTH = 5;
const MAX_REVIEW_LENGTH = 1500;
const ACCEPTED_SHORT_REVIEWS = new Set(["good", "nice"]);

export function isReviewTextLengthValid(value: string) {
  const review = value.trim();
  const length = Array.from(review).length;

  return (
    length <= MAX_REVIEW_LENGTH &&
    (length >= MIN_REVIEW_LENGTH || ACCEPTED_SHORT_REVIEWS.has(review.toLowerCase()))
  );
}
