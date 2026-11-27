"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import {
  getAnalyticsConfiguration,
  hasAnalyticsConsent,
  initializeConsentMode,
  isProductionAnalyticsEnvironment,
  resolveWhatsAppCtaLocation,
  subscribeToConsentChanges,
  trackAnalyticsEvent,
} from "../lib/analytics";

const getServerConsentSnapshot = () => false;

export default function GoogleTags() {
  const analyticsConsent = useSyncExternalStore(
    subscribeToConsentChanges,
    hasAnalyticsConsent,
    getServerConsentSnapshot,
  );
  const [hasBootstrappedTag, setHasBootstrappedTag] = useState(false);
  const bootstrappedRef = useRef(false);

  const config = getAnalyticsConfiguration();
  const allowedEnv = isProductionAnalyticsEnvironment();

  useEffect(() => {
    if (!allowedEnv || config.mode === "none") return;

    if (analyticsConsent && !bootstrappedRef.current) {
      initializeConsentMode(true);

      if (config.mode === "gtm") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          "gtm.start": Date.now(),
          event: "gtm.js",
        });
      } else {
        window.gtag?.("js", new Date());
        window.gtag?.("config", config.gaId, { send_page_view: true });
      }

      bootstrappedRef.current = true;
      setHasBootstrappedTag(true);
      return;
    }

    if (bootstrappedRef.current) {
      initializeConsentMode(analyticsConsent);
    }
  }, [allowedEnv, analyticsConsent, config.gaId, config.gtmId, config.mode]);

  useEffect(() => {
    if (!allowedEnv || !analyticsConsent || config.mode === "none") return;

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!link) return;

      trackAnalyticsEvent("whatsapp_click", {
        page_path: window.location.pathname,
        cta_location: resolveWhatsAppCtaLocation(link),
      });
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [allowedEnv, analyticsConsent, config.mode]);

  if (!allowedEnv || !hasBootstrappedTag || config.mode === "none") {
    return null;
  }

  if (config.mode === "gtm") {
    return (
      <Script
        id="iptvus24-gtm"
        src={`https://www.googletagmanager.com/gtm.js?id=${config.gtmId}`}
        strategy="afterInteractive"
      />
    );
  }

  return (
    <Script
      id="iptvus24-ga"
      src={`https://www.googletagmanager.com/gtag/js?id=${config.gaId}`}
      strategy="afterInteractive"
    />
  );
}
