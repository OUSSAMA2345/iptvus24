export const CONSENT_STORAGE_KEY = "iptvus24-cookie-choice-v2";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...arguments_: unknown[]) => void;
    __iptvus24ConsentInitialized?: boolean;
  }
}

export type AnalyticsEventName = "whatsapp_click" | "generate_lead";
export type AnalyticsEventParameters = Record<string, string | number | boolean>;

export type AnalyticsConfig =
  | { mode: "gtm"; gtmId: string; gaId: string | null }
  | { mode: "ga"; gtmId: null; gaId: string }
  | { mode: "none"; gtmId: null; gaId: null };

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/i;
const GA_ID_PATTERN = /^G-[A-Z0-9]+$/i;

export function getAnalyticsConfiguration(): AnalyticsConfig {
  const rawGtmId = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();
  const rawGaId = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();

  const validGtmId = rawGtmId && GTM_ID_PATTERN.test(rawGtmId) ? rawGtmId : null;
  const validGaId = rawGaId && GA_ID_PATTERN.test(rawGaId) ? rawGaId : null;

  if (validGtmId) {
    return { mode: "gtm", gtmId: validGtmId, gaId: validGaId };
  }
  if (validGaId) {
    return { mode: "ga", gtmId: null, gaId: validGaId };
  }
  return { mode: "none", gtmId: null, gaId: null };
}

export function isProductionAnalyticsEnvironment(): boolean {
  if (process.env.NODE_ENV !== "production") {
    return false;
  }

  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV?.trim().toLowerCase();
  if (vercelEnv && vercelEnv !== "production") {
    return false;
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname.toLowerCase();
    if (
      !hostname ||
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".vercel.app") ||
      hostname.endsWith(".e2b.app")
    ) {
      return false;
    }
  }

  return true;
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const preference: unknown = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null");
    return Boolean(
      preference &&
        typeof preference === "object" &&
        "analytics" in preference &&
        preference.analytics === true,
    );
  } catch {
    return false;
  }
}

export function subscribeToConsentChanges(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("iptvus24:consent-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("iptvus24:consent-change", callback);
  };
}

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }
}

export function initializeConsentMode(analyticsGranted: boolean) {
  if (typeof window === "undefined") return;
  ensureGtagStub();

  if (!window.__iptvus24ConsentInitialized) {
    window.gtag?.("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.__iptvus24ConsentInitialized = true;
  }

  window.gtag?.("consent", "update", {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function resetAnalyticsStateForTesting() {
  if (typeof window === "undefined") return;
  delete window.dataLayer;
  delete window.gtag;
  delete window.__iptvus24ConsentInitialized;
}

export function resolveWhatsAppCtaLocation(link: Element): string {
  const explicitContainer = link.closest<HTMLElement>("[data-cta-location]");
  const explicitLocation = explicitContainer?.dataset.ctaLocation?.trim();
  if (explicitLocation) {
    return explicitLocation;
  }

  if (link.closest("#plans")) return "pricing";
  if (link.closest("#setup")) return "setup";
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  return "content";
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  parameters: AnalyticsEventParameters,
) {
  if (typeof window === "undefined") return;
  if (!isProductionAnalyticsEnvironment()) return;
  if (!hasAnalyticsConsent()) return;

  const config = getAnalyticsConfiguration();
  if (config.mode === "none") return;

  if (!window.__iptvus24ConsentInitialized) {
    initializeConsentMode(true);
  }

  if (config.mode === "gtm") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
    return;
  }

  window.gtag?.("event", eventName, parameters);
}
