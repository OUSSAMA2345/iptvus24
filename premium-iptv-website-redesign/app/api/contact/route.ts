import type { NextRequest } from "next/server";
import { getSupabaseAdmin, getSupabaseConfigurationStatus } from "../../lib/supabase-admin";
import { checkFormRateLimit, jsonError } from "../../lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedSubjects = new Set([
  "Plan and billing question",
  "Setup and device support",
  "Refund request",
  "Privacy request",
  "Other",
]);
const whatsappPattern = /^\+?[0-9][0-9\s().-]{6,30}$/;

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: NextRequest) {
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

  if (cleanText(body.website, 200)) {
    return Response.json({ message: "Thanks. Your message has been received." }, { status: 202 });
  }

  const name = cleanText(body.name, 100);
  const whatsappNumber = cleanText(body.whatsappNumber, 32);
  const subject = cleanText(body.subject, 120);
  const message = cleanText(body.message, 5000);
  if (
    name.length < 2 ||
    !whatsappPattern.test(whatsappNumber) ||
    !allowedSubjects.has(subject) ||
    message.length < 10 ||
    body.consent !== true
  ) {
    return jsonError("Check the required fields and privacy acknowledgement, then try again.", 400);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    const message = getSupabaseConfigurationStatus() === "missing"
      ? "The contact form is temporarily unavailable. Please contact us on WhatsApp at +44 7473 970663."
      : "The contact form has an invalid Supabase configuration. Please contact us on WhatsApp at +44 7473 970663.";
    return jsonError(message, 503);
  }

  const rateAllowed = await checkFormRateLimit(request, supabase, "contact", 5);
  if (rateAllowed === null) return jsonError("We could not verify this request. Please contact us on WhatsApp at +44 7473 970663.", 503);
  if (!rateAllowed) return jsonError("Too many messages were submitted. Please try again in about an hour.", 429);

  const { error: retentionError } = await supabase
    .from("contact_messages")
    .delete()
    .lt("created_at", new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString());
  if (retentionError) {
    console.error("Could not apply contact-message retention:", retentionError.message);
    return jsonError("We could not process your request right now. Please contact us on WhatsApp at +44 7473 970663.", 503);
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, whatsapp_number: whatsappNumber, subject, message });
  if (error) {
    console.error("Could not save contact request:", error.message);
    return jsonError("We could not save your request. Please contact us on WhatsApp at +44 7473 970663 or try again later.", 503);
  }

  return Response.json({ message: "Your request has been saved. We will respond via WhatsApp; response times may vary." }, { status: 201 });
}
