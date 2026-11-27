"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CONSENT_STORAGE_KEY, subscribeToConsentChanges } from "../lib/analytics";

function hasSavedConsentChoice(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

const getServerChoiceSnapshot = () => true;

export default function CookieConsent() {
  const hasChoice = useSyncExternalStore(
    subscribeToConsentChanges,
    hasSavedConsentChoice,
    getServerChoiceSnapshot,
  );
  const [manuallyOpened, setManuallyOpened] = useState(false);

  useEffect(() => {
    const reopen = () => setManuallyOpened(true);
    window.addEventListener("iptvus24:open-cookie-settings", reopen);
    return () => window.removeEventListener("iptvus24:open-cookie-settings", reopen);
  }, []);

  const visible = !hasChoice || manuallyOpened;

  useEffect(() => {
    if (!manuallyOpened) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setManuallyOpened(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [manuallyOpened]);

  function choose(optional: boolean) {
    const preference = {
      essential: true,
      analytics: optional,
      marketing: false,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preference));
    } catch {
      // Storage may be blocked in strict privacy modes; still dispatch in-session event.
    }
    setManuallyOpened(false);
    window.dispatchEvent(new CustomEvent("iptvus24:consent-change", { detail: preference }));
  }

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
      className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-2xl border border-line bg-white p-4 shadow-[0_20px_70px_rgba(10,48,102,0.2)] sm:inset-x-6 sm:p-5"
    >
      <h2 id="cookie-title" className="font-display text-base font-extrabold text-ink">
        Your privacy choices
      </h2>
      <p id="cookie-description" className="mt-1 text-xs leading-relaxed text-slate-soft">
        Essential storage remembers your choice. Optional Google analytics through Tag Manager loads only after you accept. Advertising trackers remain disabled.
        <Link href="/cookies" className="ml-1 font-bold text-brand underline">
          Read the Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose(false)}
          className="min-h-11 rounded-xl border border-line px-4 py-2 text-sm font-bold text-ink hover:bg-haze"
        >
          Reject optional
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="min-h-11 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-deep"
        >
          Accept optional
        </button>
      </div>
    </aside>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("iptvus24:open-cookie-settings"))}
      className="rounded font-semibold hover:text-brand"
    >
      Cookie settings
    </button>
  );
}
