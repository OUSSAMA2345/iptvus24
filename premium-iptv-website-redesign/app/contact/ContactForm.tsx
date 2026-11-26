"use client";

import { useState, type FormEvent } from "react";
import { trackAnalyticsEvent } from "../lib/analytics";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          subject: values.get("subject"),
          message: values.get("message"),
          website: values.get("website"),
          consent: values.get("consent") === "on",
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Your message could not be sent.");
      if (response.status === 201) {
        trackAnalyticsEvent("generate_lead", { method: "contact_form" });
      }
      setStatus("success");
      setMessage(result.message || "Your message has been saved. For a direct response, please email or message us on WhatsApp.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block text-sm font-bold text-ink">
        Name
        <input name="name" required minLength={2} maxLength={100} autoComplete="name" className="mt-2 w-full rounded-xl border border-line px-4 py-3 font-medium outline-none focus:border-brand" />
      </label>
      <label className="block text-sm font-bold text-ink">
        Email
        <input name="email" type="email" required maxLength={254} autoComplete="email" className="mt-2 w-full rounded-xl border border-line px-4 py-3 font-medium outline-none focus:border-brand" />
      </label>
      <label className="block text-sm font-bold text-ink">
        Subject
        <select name="subject" required defaultValue="" className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 font-medium outline-none focus:border-brand">
          <option value="" disabled>Select a topic</option>
          <option>Plan and billing question</option>
          <option>Setup and device support</option>
          <option>Refund request</option>
          <option>Privacy request</option>
          <option>Other</option>
        </select>
      </label>
      <label className="block text-sm font-bold text-ink">
        Message
        <textarea name="message" required minLength={10} maxLength={5000} rows={6} className="mt-2 w-full resize-y rounded-xl border border-line px-4 py-3 font-medium outline-none focus:border-brand" />
      </label>
      <label className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-soft">
        <input name="consent" type="checkbox" required className="mt-1 accent-[#0a84ff]" />
        I understand that my information will be used to respond to this request as explained in the <a href="/privacy" className="font-bold text-brand underline">Privacy Policy</a>.
      </label>
      <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {message && (
        <p role={status === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-xl p-4 text-sm font-semibold ${status === "error" ? "bg-red-50 text-red-800" : "bg-[#edfff2] text-[#075e54]"}`}>
          {message}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
