export const CONSENT_STORAGE_KEY = "iptvus24-cookie-choice-v2";

declare global {
  interface Window {
    gtag?: (...arguments_: unknown[]) => void;
  }
}

type AnalyticsEventName = "whatsapp_click" | "generate_lead";
type AnalyticsEventParameters = Record<string, string | number | boolean>;

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  parameters: AnalyticsEventParameters,
) {
  if (typeof window === "undefined") return;

  let preference: unknown;
  try {
    preference = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null");
  } catch {
    return;
  }

  if (
    !preference ||
    typeof preference !== "object" ||
    !("analytics" in preference) ||
    preference.analytics !== true
  ) {
    return;
  }

  window.gtag?.("event", eventName, parameters);
}
