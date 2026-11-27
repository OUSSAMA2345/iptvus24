import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({
  default: ({ id, src }: { id?: string; src?: string }) => (
    <script data-testid={id ?? "next-script"} data-src={src ?? ""} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import CookieConsent from "../app/ui/CookieConsent";
import GoogleTags from "../app/ui/GoogleTags";
import {
  CONSENT_STORAGE_KEY,
  getAnalyticsConfiguration,
  resetAnalyticsStateForTesting,
  resolveWhatsAppCtaLocation,
  trackAnalyticsEvent,
} from "../app/lib/analytics";

function setWindowLocation(url: string) {
  const parsed = new URL(url);
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: {
      href: parsed.href,
      origin: parsed.origin,
      protocol: parsed.protocol,
      host: parsed.host,
      hostname: parsed.hostname,
      pathname: parsed.pathname,
    },
  });
}

describe("Analytics & Consent Mode behavior", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAnalyticsStateForTesting();
    setWindowLocation("https://www.iptvus24.com/");
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    localStorage.clear();
    resetAnalyticsStateForTesting();
  });

  it("has no hardcoded production GTM default when env variables are unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    expect(getAnalyticsConfiguration()).toEqual({
      mode: "none",
      gtmId: null,
      gaId: null,
    });
  });

  it("blocks scripts and event tracking in development and preview environments even after consent", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ essential: true, analytics: true, marketing: false }),
    );
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-PROD123");

    // Development NODE_ENV
    vi.stubEnv("NODE_ENV", "development");
    const devView = render(<GoogleTags />);
    expect(devView.queryByTestId("iptvus24-gtm")).toBeNull();
    trackAnalyticsEvent("whatsapp_click", { page_path: "/", cta_location: "hero" });
    expect(window.dataLayer).toBeUndefined();
    devView.unmount();

    // Vercel preview deployment (NODE_ENV=production, NEXT_PUBLIC_VERCEL_ENV=preview)
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_VERCEL_ENV", "preview");
    const previewView = render(<GoogleTags />);
    expect(previewView.queryByTestId("iptvus24-gtm")).toBeNull();
    trackAnalyticsEvent("whatsapp_click", { page_path: "/", cta_location: "hero" });
    expect(window.dataLayer).toBeUndefined();
    previewView.unmount();
  });

  it("initializes Consent Mode before GTM, pushes GTM dataLayer event objects, and updates Consent Mode on withdrawal", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-TEST999");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");

    render(
      <>
        <CookieConsent />
        <GoogleTags />
      </>,
    );

    // Before consent: no script loaded, events ignored
    expect(screen.queryByTestId("iptvus24-gtm")).toBeNull();
    trackAnalyticsEvent("whatsapp_click", { page_path: "/", cta_location: "pricing" });
    expect(window.dataLayer).toBeUndefined();

    // Accept optional analytics
    fireEvent.click(screen.getByRole("button", { name: "Accept optional" }));

    expect(screen.getByTestId("iptvus24-gtm").getAttribute("data-src")).toBe(
      "https://www.googletagmanager.com/gtm.js?id=GTM-TEST999",
    );
    expect(window.dataLayer).toBeDefined();

    // Entry 0 = consent default (denied), Entry 1 = consent update (analytics granted, ads denied), Entry 2 = gtm.js
    const entries = window.dataLayer ?? [];
    expect(Array.from(entries[0] as ArrayLike<unknown>)).toEqual([
      "consent",
      "default",
      {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
    expect(Array.from(entries[1] as ArrayLike<unknown>)).toEqual([
      "consent",
      "update",
      {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
    expect(entries[2]).toMatchObject({ event: "gtm.js" });

    // Custom events in GTM mode push plain { event, ...params } objects
    trackAnalyticsEvent("generate_lead", { method: "contact_form" });
    expect(entries[3]).toEqual({ event: "generate_lead", method: "contact_form" });

    // Reopen cookie settings and withdraw consent
    act(() => {
      window.dispatchEvent(new Event("iptvus24:open-cookie-settings"));
    });
    fireEvent.click(screen.getByRole("button", { name: "Reject optional" }));

    const withdrawalUpdate = Array.from(entries[4] as ArrayLike<unknown>);
    expect(withdrawalUpdate).toEqual([
      "consent",
      "update",
      {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);

    const lengthAfterWithdrawal = entries.length;
    trackAnalyticsEvent("whatsapp_click", { page_path: "/", cta_location: "footer" });
    expect(entries.length).toBe(lengthAfterWithdrawal);
  });

  it("supports GA-only configuration cleanly when NEXT_PUBLIC_GTM_ID is unset", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-ABC123XYZ");

    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ essential: true, analytics: true, marketing: false }),
    );

    render(<GoogleTags />);

    expect(screen.getByTestId("iptvus24-ga").getAttribute("data-src")).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ",
    );

    const entries = window.dataLayer ?? [];
    expect(Array.from(entries[0] as ArrayLike<unknown>)[0]).toBe("consent");
    expect(Array.from(entries[1] as ArrayLike<unknown>)[0]).toBe("consent");
    expect(Array.from(entries[2] as ArrayLike<unknown>)[0]).toBe("js");
    expect(Array.from(entries[3] as ArrayLike<unknown>)).toEqual([
      "config",
      "G-ABC123XYZ",
      { send_page_view: true },
    ]);

    trackAnalyticsEvent("whatsapp_click", { page_path: "/contact", cta_location: "content" });
    expect(Array.from(entries[4] as ArrayLike<unknown>)).toEqual([
      "event",
      "whatsapp_click",
      { page_path: "/contact", cta_location: "content" },
    ]);
  });

  it("attributes WhatsApp CTA locations accurately across floating, hero, pricing, setup, header, footer, and content", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <header><a id="hdr" href="https://wa.me/447473970663">Header</a></header>
      <section data-cta-location="hero"><a id="hero" href="https://wa.me/447473970663">Hero</a></section>
      <section id="plans"><a id="plan" href="https://wa.me/447473970663">Plan</a></section>
      <section id="setup"><a id="setup-cta" href="https://wa.me/447473970663">Setup</a></section>
      <main><a id="body-cta" href="https://wa.me/447473970663">Inline</a></main>
      <footer><a id="ftr" href="https://wa.me/447473970663">Footer</a></footer>
      <a id="flt" data-cta-location="floating" href="https://wa.me/447473970663">Floating</a>
    `;

    expect(resolveWhatsAppCtaLocation(container.querySelector("#hdr")!)).toBe("header");
    expect(resolveWhatsAppCtaLocation(container.querySelector("#hero")!)).toBe("hero");
    expect(resolveWhatsAppCtaLocation(container.querySelector("#plan")!)).toBe("pricing");
    expect(resolveWhatsAppCtaLocation(container.querySelector("#setup-cta")!)).toBe("setup");
    expect(resolveWhatsAppCtaLocation(container.querySelector("#body-cta")!)).toBe("content");
    expect(resolveWhatsAppCtaLocation(container.querySelector("#ftr")!)).toBe("footer");
    expect(resolveWhatsAppCtaLocation(container.querySelector("#flt")!)).toBe("floating");
  });
});
