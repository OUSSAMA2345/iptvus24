import { describe, expect, it } from "vitest";
import {
  cleanFormText,
  codePointLength,
  isCodePointLengthBetween,
  isDatabaseValidationError,
  isValidWhatsAppNumber,
  normalizeWhatsAppNumber,
} from "../src/lib/form-validation";

describe("WhatsApp E.164 validation", () => {
  it("accepts and normalizes valid international numbers with 7 to 15 digits", () => {
    expect(normalizeWhatsAppNumber("+44 7473 970663")).toBe("+447473970663");
    expect(normalizeWhatsAppNumber("+1 (415) 555-2671")).toBe("+14155552671");
    expect(normalizeWhatsAppNumber("+212 612-345678")).toBe("+212612345678");
    expect(normalizeWhatsAppNumber("447473970663")).toBe("+447473970663");
    expect(normalizeWhatsAppNumber("+1234567")).toBe("+1234567");
    expect(normalizeWhatsAppNumber("+123456789012345")).toBe("+123456789012345");
  });

  it("rejects malformed punctuation-heavy inputs such as 1------ and +0......", () => {
    expect(isValidWhatsAppNumber("1------")).toBe(false);
    expect(isValidWhatsAppNumber("+0......")).toBe(false);
    expect(isValidWhatsAppNumber("+1......234567")).toBe(false);
    expect(isValidWhatsAppNumber("+44--7473970663")).toBe(false);
    expect(isValidWhatsAppNumber("+44 7473 970663-")).toBe(false);
    expect(isValidWhatsAppNumber("+44 () 7473970663")).toBe(false);
    expect(isValidWhatsAppNumber("+44 (7473 970663")).toBe(false);
  });

  it("rejects leading-zero country codes, fewer than 7 digits, and more than 15 digits", () => {
    expect(isValidWhatsAppNumber("+0123456789")).toBe(false);
    expect(isValidWhatsAppNumber("07473970663")).toBe(false);
    expect(isValidWhatsAppNumber("+123456")).toBe(false);
    expect(isValidWhatsAppNumber("+1234567890123456")).toBe(false);
    expect(isValidWhatsAppNumber("+44 abc 970663")).toBe(false);
    expect(isValidWhatsAppNumber("")).toBe(false);
    expect(isValidWhatsAppNumber(null)).toBe(false);
  });
});

describe("Unicode code-point alignment and DB error classification", () => {
  it("counts astral-plane emoji as single Unicode code points matching PostgreSQL char_length", () => {
    expect("👍".length).toBe(2);
    expect(codePointLength("👍")).toBe(1);
    expect(isCodePointLengthBetween("👍", 2, 60)).toBe(false);
    expect(isCodePointLengthBetween("👍👍", 2, 60)).toBe(true);
  });

  it("cleans control characters and slices by code points without splitting surrogate pairs", () => {
    const sliced = cleanFormText("  \u0000👍👍👍  ", 2);
    expect(sliced).toBe("👍👍");
    expect(codePointLength(sliced)).toBe(2);
  });

  it("identifies PostgreSQL validation SQLSTATE codes accurately", () => {
    expect(isDatabaseValidationError({ code: "23514" })).toBe(true);
    expect(isDatabaseValidationError({ code: "23502" })).toBe(true);
    expect(isDatabaseValidationError({ code: "22001" })).toBe(true);
    expect(isDatabaseValidationError({ code: "22P02" })).toBe(true);
    expect(isDatabaseValidationError({ code: "08006" })).toBe(false);
    expect(isDatabaseValidationError({ code: "42501" })).toBe(false);
    expect(isDatabaseValidationError(null)).toBe(false);
  });
});
