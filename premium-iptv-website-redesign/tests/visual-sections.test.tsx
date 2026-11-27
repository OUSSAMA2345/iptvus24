import fs from "node:fs";
import path from "node:path";
import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string; "aria-hidden"?: boolean }) => (
    // Test double: image optimization is exercised by the production browser check.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} aria-hidden={props["aria-hidden"]} />
  ),
}));

vi.mock("../src/components/Reveal", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
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

import {
  devicesEcosystem,
  footerCtaCinema,
  heroCinemaLiving,
  pricingSportsLounge,
  reviewsStadiumAtmosphere,
} from "../src/assets";
import Devices from "../src/components/Devices";
import Hero from "../src/components/Hero";
import Plans from "../src/components/Plans";
import Reviews from "../src/components/Reviews";
import { WhatsAppContactSection } from "../src/components/WhatsApp";
import { plans } from "../src/data";

describe("Original visual assets integration", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ reviews: [], averageRating: null, reviewCount: 0 }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("stores all five generated visual files in public/images", () => {
    const assetPaths = [
      heroCinemaLiving,
      pricingSportsLounge,
      devicesEcosystem,
      reviewsStadiumAtmosphere,
      footerCtaCinema,
    ];

    for (const assetPath of assetPaths) {
      const diskPath = path.join(process.cwd(), "public", assetPath);
      expect(fs.existsSync(diskPath)).toBe(true);
      expect(fs.statSync(diskPath).size).toBeGreaterThan(10_000);
    }
  });

  it("renders Hero, Devices, Pricing, Reviews background, and Footer CTA visuals while preserving pricing", async () => {
    const { container } = render(
      <>
        <Hero />
        <Devices />
        <Plans />
        <Reviews />
        <WhatsAppContactSection />
      </>,
    );

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));

    const renderedSrcs = Array.from(container.querySelectorAll("img")).map((img) =>
      img.getAttribute("src"),
    );

    expect(renderedSrcs).toContain(heroCinemaLiving);
    expect(renderedSrcs).toContain(devicesEcosystem);
    expect(renderedSrcs).toContain(pricingSportsLounge);
    expect(renderedSrcs).toContain(reviewsStadiumAtmosphere);
    expect(renderedSrcs).toContain(footerCtaCinema);

    // Decorative background image in Reviews is hidden from assistive tech
    const reviewsBgImg = container.querySelector(`img[src="${reviewsStadiumAtmosphere}"]`);
    expect(reviewsBgImg?.getAttribute("aria-hidden")).toBe("true");
    expect(reviewsBgImg?.getAttribute("alt")).toBe("");

    // Existing plan names and prices remain unchanged
    for (const plan of plans) {
      expect(screen.getByText(plan.name)).toBeTruthy();
      expect(screen.getByText(plan.price)).toBeTruthy();
    }
  });
});
