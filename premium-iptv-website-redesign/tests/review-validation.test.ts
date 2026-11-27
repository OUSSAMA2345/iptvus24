import { describe, expect, it } from "vitest";
import { isReviewTextLengthValid } from "../src/lib/review-validation";

describe("isReviewTextLengthValid", () => {
  it("accepts 'Good' and 'Nice' case-insensitively with surrounding whitespace", () => {
    expect(isReviewTextLengthValid("Good")).toBe(true);
    expect(isReviewTextLengthValid("  good  ")).toBe(true);
    expect(isReviewTextLengthValid("NICE")).toBe(true);
    expect(isReviewTextLengthValid("\nNice\t")).toBe(true);
  });

  it("rejects other reviews shorter than 5 Unicode code points", () => {
    expect(isReviewTextLengthValid("")).toBe(false);
    expect(isReviewTextLengthValid("    ")).toBe(false);
    expect(isReviewTextLengthValid("Okay")).toBe(false);
    expect(isReviewTextLengthValid("Fine")).toBe(false);
    expect(isReviewTextLengthValid("👍👍👍👍")).toBe(false);
  });

  it("accepts reviews between 5 and 1500 Unicode code points", () => {
    expect(isReviewTextLengthValid("Great")).toBe(true);
    expect(isReviewTextLengthValid("👍👍👍👍👍")).toBe(true);
    expect(isReviewTextLengthValid("a".repeat(1500))).toBe(true);
    expect(isReviewTextLengthValid("👍".repeat(1500))).toBe(true);
  });

  it("rejects reviews longer than 1500 Unicode code points", () => {
    expect(isReviewTextLengthValid("a".repeat(1501))).toBe(false);
    expect(isReviewTextLengthValid("👍".repeat(1501))).toBe(false);
  });
});
