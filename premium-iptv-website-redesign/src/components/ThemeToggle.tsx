"use client";

import { useEffect, useSyncExternalStore } from "react";

type VisualTheme = "day" | "night";
const storageKey = "iptvus24-visual-theme";
const changeEvent = "iptvus24:visual-theme";
let fallback: VisualTheme = "night";
let volatileTheme: VisualTheme | null = null;

function snapshot(): VisualTheme {
  if (volatileTheme) return volatileTheme;
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved === "day" || saved === "night" ? saved : fallback;
  } catch {
    return fallback;
  }
}

function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) { volatileTheme = null; notify(); }
  };
  window.addEventListener(changeEvent, notify);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, notify);
    window.removeEventListener("storage", onStorage);
  };
}

const serverSnapshot = (): VisualTheme => "night";

/** Essential UI preference only. Storage failure never prevents theme switching. */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  useEffect(() => {
    document.documentElement.dataset.visualTheme = theme;
  }, [theme]);

  function toggle() {
    fallback = theme === "night" ? "day" : "night";
    try { window.localStorage.setItem(storageKey, fallback); volatileTheme = null; }
    catch { volatileTheme = fallback; }
    window.dispatchEvent(new Event(changeEvent));
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-label="Night mode"
      aria-checked={theme === "night"}
      title={`Switch to ${theme === "night" ? "day" : "night"} mode`}
      onClick={toggle}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === "night" ? (
          <><path d="M20.8 13.3A8.7 8.7 0 0 1 10.7 3.2 8.8 8.8 0 1 0 20.8 13.3Z" /><path d="M17.5 3v4M15.5 5h4" /></>
        ) : (
          <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>
        )}
      </svg>
    </button>
  );
}
