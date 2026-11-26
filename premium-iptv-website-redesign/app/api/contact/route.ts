import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "../../lib/supabase-admin";
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
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const parsed: unknown = await request.json();
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
  const email = cleanText(body.email, 254).toLowerCase();
  const subject = cleanText(body.subject, 120);
  const message = cleanText(body.message, 5000);
  if (
    name.length < 2 ||
    !emailPattern.test(email) ||
    !allowedSubjects.has(subject) ||
    message.length < 10 ||
    body.consent !== true
  ) {
    return jsonError("Check the required fields and privacy acknowledgement, then try again.", 400);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return jsonError("The contact form is not configured yet. Please email support@iptvus24.com or contact us on WhatsApp.", 503);
  }

  const rateAllowed = await checkFormRateLimit(request, supabase, "contact", 5);
  if (rateAllowed === null) return jsonError("We could not verify this request. Please contact support directly.", 503);
  if (!rateAllowed) return jsonError("Too many messages were submitted. Please try again in about an hour.", 429);

  const { error: retentionError } = await supabase
    .from("contact_messages")
    .delete()
    .lt("created_at", new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString());
  if (retentionError) {
    console.error("Could not apply contact-message retention:", retentionError.message);
    return jsonError("We could not process your message right now. Please email support@iptvus24.com.", 503);
  }

  const { error } = await supabase.from("contact_messages").insert({ name, email, subject, message });
  if (error) {
    console.error("Could not save contact request:", error.message);
    return jsonError("We could not save your message. Please email support@iptvus24.com or try again later.", 503);
  }

  return Response.json({ message: "Your message has been saved. For a direct response, email support@iptvus24.com or contact us on WhatsApp." }, { status: 201 });
}
