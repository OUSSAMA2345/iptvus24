"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { trackAnalyticsEvent } from "../lib/analytics";
import {
  CONTACT_SUBJECTS,
  cleanFormText,
  isAllowedContactSubject,
  isCodePointLengthBetween,
  normalizeWhatsAppNumber,
} from "@/lib/form-validation";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const values = new FormData(form);
    const name = cleanFormText(values.get("name"));
    const rawWhatsApp = values.get("whatsappNumber");
    const normalizedWhatsApp = normalizeWhatsAppNumber(rawWhatsApp);
    const subject = cleanFormText(values.get("subject"));
    const messageText = cleanFormText(values.get("message"));
    const consent = values.get("consent") === "on";

    if (!isCodePointLengthBetween(name, 2, 100)) {
      setStatus("error");
      setMessage("Please enter your name (2–100 characters).");
      return;
    }
    if (!normalizedWhatsApp) {
      setStatus("error");
      setMessage("Enter a valid international WhatsApp number with country code (7–15 digits, for example +44 7473 970663).");
      return;
    }
    if (!isAllowedContactSubject(subject)) {
      setStatus("error");
      setMessage("Please select a topic for your request.");
      return;
    }
    if (!isCodePointLengthBetween(messageText, 10, 5000)) {
      setStatus("error");
      setMessage("Please enter a message of at least 10 characters.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage("Please acknowledge how your contact request will be stored and used.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsappNumber: typeof rawWhatsApp === "string" ? rawWhatsApp : normalizedWhatsApp,
          subject,
          message: messageText,
          website: values.get("website"),
          consent,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Your message could not be sent.");
      if (response.status === 201) {
        trackAnalyticsEvent("generate_lead", { method: "contact_form" });
      }
      setStatus("success");
      setMessage(result.message || "Your request has been saved. We will respond via WhatsApp; response times may vary.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your request could not be saved. Please try again or contact us on WhatsApp.");
    }
  }

  const inputClassName =
    "mt-2 w-full rounded-xl border border-line px-4 py-3 font-medium text-ink focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand";

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block text-sm font-bold text-ink">
        Name
        <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={inputClassName} />
      </label>
      <label className="block text-sm font-bold text-ink">
        WhatsApp number
        <input
          name="whatsappNumber"
          type="tel"
          inputMode="tel"
          required
          minLength={7}
          maxLength={32}
          autoComplete="tel"
          placeholder="+44 7473 970663"
          aria-describedby="whatsapp-number-help"
          className={inputClassName}
        />
        <span id="whatsapp-number-help" className="mt-1.5 block text-xs font-medium text-slate-soft">
          Include your country code (7–15 digits, for example +44 7473 970663).
        </span>
      </label>
      <label className="block text-sm font-bold text-ink">
        Subject
        <select name="subject" required defaultValue="" className={`${inputClassName} bg-white`}>
          <option value="" disabled>Select a topic</option>
          {CONTACT_SUBJECTS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-bold text-ink">
        Message
        <textarea name="message" required minLength={10} maxLength={5000} rows={6} className={`${inputClassName} resize-y`} />
      </label>
      <label className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-soft">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#0a84ff]" />
        <span>
          I agree that my WhatsApp number and message may be stored in Supabase and used to respond to this request, as explained in the{" "}
          <Link href="/privacy" className="font-bold text-brand underline">Privacy Policy</Link>.
        </span>
      </label>
      <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {message && (
        <p
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
          className={`rounded-xl p-4 text-sm font-semibold ${status === "error" ? "bg-red-50 text-red-800" : "bg-[#edfff2] text-[#075e54]"}`}
        >
          {message}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? "Saving…" : "Send contact request"}
      </button>
    </form>
  );
}
