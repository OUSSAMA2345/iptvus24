import type { NextRequest } from "next/server";
import { getSupabaseAdmin, getSupabaseConfigurationStatus } from "../../lib/supabase-admin";
import {
  checkFormRateLimit,
  isJsonContentType,
  isSameOriginRequest,
  jsonError,
} from "../../lib/rate-limit";
import {
  cleanFormText,
  isAllowedContactSubject,
  isCodePointLengthBetween,
  isDatabaseValidationError,
  normalizeWhatsAppNumber,
} from "@/lib/form-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return jsonError("Cross-origin form submissions are not allowed.", 403);
  }
  if (!isJsonContentType(request)) {
    return jsonError("Please submit the contact request using the provided form.", 415);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) return jsonError("The submitted message is too large.", 413);

  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 12_000) {
      return jsonError("The submitted message is too large.", 413);
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return jsonError("Please submit a valid form.", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return jsonError("Please submit a valid form.", 400);
  }

  if (cleanFormText(body.website, 200)) {
    return Response.json({ message: "Thanks. Your message has been received." }, { status: 202 });
  }

  const name = cleanFormText(body.name);
  const whatsappNumber = normalizeWhatsAppNumber(body.whatsappNumber);
  const subject = cleanFormText(body.subject);
  const message = cleanFormText(body.message);

  if (
    !isCodePointLengthBetween(name, 2, 100) ||
    !whatsappNumber ||
    !isAllowedContactSubject(subject) ||
    !isCodePointLengthBetween(message, 10, 5000) ||
    body.consent !== true
  ) {
    return jsonError(
      "Check your name, international WhatsApp number (7–15 digits with country code), topic, message, and privacy acknowledgement, then try again.",
      400,
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    const unavailableMessage = getSupabaseConfigurationStatus() === "missing"
      ? "The contact form is temporarily unavailable. Please contact us on WhatsApp at +44 7473 970663."
      : "The contact form is temporarily unavailable due to a server configuration issue. Please contact us on WhatsApp at +44 7473 970663.";
    return jsonError(unavailableMessage, 503);
  }

  const rateAllowed = await checkFormRateLimit(request, supabase, "contact", 5);
  if (rateAllowed === null) {
    return jsonError("We could not verify this request. Please contact us on WhatsApp at +44 7473 970663.", 503);
  }
  if (!rateAllowed) {
    return jsonError("Too many messages were submitted. Please try again in about an hour.", 429);
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, whatsapp_number: whatsappNumber, subject, message });
  if (error) {
    if (isDatabaseValidationError(error)) {
      return jsonError(
        "Check your name, international WhatsApp number (7–15 digits with country code), topic, and message, then try again.",
        400,
      );
    }
    console.error("Could not save contact request:", error.message);
    return jsonError("We could not save your request. Please contact us on WhatsApp at +44 7473 970663 or try again later.", 503);
  }

  return Response.json(
    { message: "Your request has been saved. We will respond via WhatsApp; response times may vary." },
    { status: 201 },
  );
}
