"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const serverSnapshot = () => true;
const snapshot = () => typeof window.matchMedia !== "function" || window.matchMedia(query).matches;
const subscribe = (notify: () => void) => {
  if (typeof window.matchMedia !== "function") return () => {};
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

/** Conservative SSR fallback; also responds immediately if the OS preference changes. */
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
