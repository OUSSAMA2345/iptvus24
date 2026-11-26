"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...arguments_: unknown[]) => void;
  }
}

const CONSENT_STORAGE_KEY = "iptvus24-cookie-choice-v2";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID;
const validGaId = GA_MEASUREMENT_ID && /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)
  ? GA_MEASUREMENT_ID
  : null;
const validGtmId = GTM_CONTAINER_ID && /^GTM-[A-Z0-9]+$/i.test(GTM_CONTAINER_ID)
  ? GTM_CONTAINER_ID
  : null;

function hasAnalyticsConsent() {
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

const consentBootstrap = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){window.dataLayer.push(arguments);};
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  window.gtag('js', new Date());
`;

export default function GoogleTags() {
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [hasLoadedWithConsent, setHasLoadedWithConsent] = useState(false);

  useEffect(() => {
    const refreshConsent = () => {
      const accepted = hasAnalyticsConsent();
      setAnalyticsConsent(accepted);
      if (accepted) setHasLoadedWithConsent(true);
    };

    refreshConsent();
    window.addEventListener("storage", refreshConsent);
    window.addEventListener("iptvus24:consent-change", refreshConsent);
    return () => {
      window.removeEventListener("storage", refreshConsent);
      window.removeEventListener("iptvus24:consent-change", refreshConsent);
    };
  }, []);

  useEffect(() => {
    window.gtag?.("consent", "update", {
      analytics_storage: analyticsConsent ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }, [analyticsConsent]);

  if (!hasLoadedWithConsent || (!validGtmId && !validGaId)) return null;

  if (validGtmId) {
    return (
      <Script
        id="iptvus24-gtm-consent"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `${consentBootstrap}
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${validGtmId}');`,
        }}
      />
    );
  }

  return (
    <>
      <Script
        id="iptvus24-ga-consent"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `${consentBootstrap}window.gtag('config', '${validGaId}', { send_page_view: true });`,
        }}
      />
      <Script
        id="iptvus24-ga"
        src={`https://www.googletagmanager.com/gtag/js?id=${validGaId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
