"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "iptvus24-cookie-choice-v2";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) === null);
    } catch {
      setVisible(true);
    }
    const reopen = () => setVisible(true);
    window.addEventListener("iptvus24:open-cookie-settings", reopen);
    return () => window.removeEventListener("iptvus24:open-cookie-settings", reopen);
  }, []);

  function choose(optional: boolean) {
    const preference = {
      essential: true,
      analytics: optional,
      marketing: false,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
      setVisible(false);
    } catch {
      setVisible(false);
    }
    window.dispatchEvent(new CustomEvent("iptvus24:consent-change", { detail: preference }));
  }

  if (!visible) return null;

  return (
    <aside role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-2xl border border-line bg-white p-4 shadow-[0_20px_70px_rgba(10,48,102,0.2)] sm:inset-x-6 sm:p-5">
      <h2 id="cookie-title" className="font-display text-base font-extrabold text-ink">Your privacy choices</h2>
      <p className="mt-1 text-xs leading-relaxed text-slate-soft">
        Essential storage remembers your choice. Optional Google analytics through Tag Manager loads only after you accept. Advertising trackers remain disabled.
        <a href="/cookies" className="ml-1 font-bold text-brand underline">Read the Cookie Policy</a>.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose(false)} className="rounded-xl border border-line px-4 py-2 text-sm font-bold text-ink hover:bg-haze">Reject optional</button>
        <button type="button" onClick={() => choose(true)} className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-deep">Accept optional</button>
      </div>
    </aside>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("iptvus24:open-cookie-settings"))}
      className="font-semibold hover:text-brand"
    >
      Cookie settings
    </button>
  );
}
