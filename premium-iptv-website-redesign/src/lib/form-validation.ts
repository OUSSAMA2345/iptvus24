import { codePointLength } from "./review-validation";

export { codePointLength } from "./review-validation";

export const CONTACT_SUBJECTS = [
  "Plan and billing question",
  "Setup and device support",
  "Refund request",
  "Privacy request",
  "Other",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

const ALLOWED_SUBJECT_SET = new Set<string>(CONTACT_SUBJECTS);
const LONE_SURROGATES = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
const DISALLOWED_CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function cleanFormText(value: unknown, maxCodePoints?: number): string {
  if (typeof value !== "string") return "";
  const cleaned = value
    .replace(/\r\n?/g, "\n")
    .replace(LONE_SURROGATES, "")
    .replace(DISALLOWED_CONTROL_CHARS, "")
    .trim();

  if (maxCodePoints === undefined) return cleaned;
  const codePoints = Array.from(cleaned);
  return codePoints.length > maxCodePoints ? codePoints.slice(0, maxCodePoints).join("") : cleaned;
}

export function isCodePointLengthBetween(value: string, min: number, max: number): boolean {
  const length = codePointLength(value);
  return length >= min && length <= max;
}

export function isAllowedContactSubject(value: string): value is ContactSubject {
  return ALLOWED_SUBJECT_SET.has(value);
}

function hasBalancedPhoneParentheses(value: string): boolean {
  let openIndex = -1;
  let digitsInside = 0;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (char === "(") {
      if (openIndex !== -1) return false;
      openIndex = index;
      digitsInside = 0;
    } else if (char === ")") {
      if (openIndex === -1 || digitsInside === 0) return false;
      openIndex = -1;
    } else if (openIndex !== -1 && char >= "0" && char <= "9") {
      digitsInside += 1;
    }
  }

  return openIndex === -1;
}

/**
 * Validates and normalizes a WhatsApp phone number using E.164 rules:
 * - Optional leading `+`, digits, and clean single separators (` `, `-`, `.`, `(`, `)`)
 * - Must end with a digit (rejects `1------`, `+0......`, trailing punctuation)
 * - No consecutive hyphens/dots or unbalanced/empty parentheses
 * - 7 to 15 actual digits, starting with a valid non-zero E.164 country-code digit (`1`–`9`)
 * Returns canonical `+<digits>` when valid, or `null` otherwise.
 */
export function normalizeWhatsAppNumber(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = cleanFormText(value);
  if (!trimmed || codePointLength(trimmed) > 32) return null;

  if (!/^\+?[0-9\s().-]+$/.test(trimmed)) return null;
  if (!/[0-9]$/.test(trimmed)) return null;
  if (/^\+[.-]/.test(trimmed) || /^[.-]/.test(trimmed)) return null;
  if (/[.-]{2,}/.test(trimmed)) return null;
  if (!hasBalancedPhoneParentheses(trimmed)) return null;

  const digits = trimmed.replace(/\D/g, "");
  if (!/^[1-9][0-9]{6,14}$/.test(digits)) return null;

  return `+${digits}`;
}

export function isValidWhatsAppNumber(value: unknown): boolean {
  return normalizeWhatsAppNumber(value) !== null;
}

const VALIDATION_SQLSTATE_CODES = new Set([
  "23514", // check_violation
  "23502", // not_null_violation
  "22001", // string_data_right_truncation
  "22P02", // invalid_text_representation
  "22021", // character_not_in_repertoire
]);

export function isDatabaseValidationError(
  error: { code?: string | null } | null | undefined,
): boolean {
  const code = error?.code?.trim().toUpperCase();
  if (!code) return false;
  return VALIDATION_SQLSTATE_CODES.has(code) || code.startsWith("22");
}
