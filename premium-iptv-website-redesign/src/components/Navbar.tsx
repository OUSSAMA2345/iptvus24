"use client";

import { useState } from "react";
import Logo from "./Logo";
import { WHATSAPP_NUMBER, WHATSAPP_URL, WhatsAppIcon } from "./WhatsApp";

const links = [
  { label: "Devices", href: "#devices" },
  { label: "Plans", href: "#plans" },
  { label: "Setup", href: "#setup" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <nav aria-label="Main navigation" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-[72px] items-center justify-between gap-3">
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-soft transition-colors hover:bg-mist hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center gap-2 rounded-xl bg-[#e8f9ee] px-3 py-2 text-sm font-bold text-[#075e54] hover:bg-[#d5f4df] sm:inline-flex">
              <WhatsAppIcon className="h-4 w-4 text-[#25d366]" />
              <span className="xl:hidden">WhatsApp</span>
              <span className="hidden xl:inline">{WHATSAPP_NUMBER}</span>
            </a>
            <a href="#plans" className="btn-primary !min-h-11 !rounded-xl !px-4 !py-2 !text-sm">
              View plans
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-ink lg:hidden"
            >
              <span className="text-xl" aria-hidden="true">{open ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
        <div id="mobile-menu" hidden={!open} className="border-t border-line pb-4 pt-2 lg:hidden">
          <div className="grid gap-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-mist">
                {link.label}
              </a>
            ))}
            <a href="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-mist">
              Contact support
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-1 flex min-h-12 items-center gap-2 rounded-xl bg-[#e8f9ee] px-3 py-3 text-sm font-bold text-[#075e54]">
              <WhatsAppIcon className="h-5 w-5 text-[#25d366]" />
              WhatsApp {WHATSAPP_NUMBER}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
