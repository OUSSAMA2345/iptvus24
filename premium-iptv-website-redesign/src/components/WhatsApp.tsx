import type { ReactNode } from "react";

export const WHATSAPP_URL = "https://wa.me/447473970663";
export const WHATSAPP_NUMBER = "+44 7473 970663";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .14 5.36.14 11.94c0 2.1.55 4.15 1.6 5.96L.04 24l6.26-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.5-8.41ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.88 9.88 0 0 1-1.52-5.25c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.9 7c-.01 5.45-4.45 9.89-9.91 9.89Zm5.43-7.4c-.3-.15-1.76-.87-2.04-.97-.28-.1-.47-.15-.67.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function WhatsAppContactSection() {
  const benefits = ["Instant activation", "24/7 support"];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20" aria-labelledby="whatsapp-contact-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#075e54] via-[#128c7e] to-[#25d366] p-7 text-white shadow-[0_24px_64px_rgba(18,140,126,0.24)] sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[36px] border-white/10"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] ring-1 ring-white/25">
                <WhatsAppIcon className="h-4 w-4" />
                We’re here to help
              </span>
              <h2 id="whatsapp-contact-title" className="font-display mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Talk to us on WhatsApp
              </h2>
              <p className="mt-3 text-lg font-bold text-white/95">{WHATSAPP_NUMBER}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/85">
                {benefits.map((benefit) => (
                  <span key={benefit} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-white px-7 py-4 text-base font-extrabold text-[#075e54] shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact us on WhatsApp at ${WHATSAPP_NUMBER}`}
      className="fixed bottom-24 right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 focus-visible:outline-white sm:right-6 lg:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function WhatsAppButton({ children }: { children: ReactNode }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(37,211,102,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-[0_12px_24px_rgba(37,211,102,0.3)] focus-visible:outline-[#075e54]"
    >
      <WhatsAppIcon className="h-4.5 w-4.5" />
      {children}
    </a>
  );
}
