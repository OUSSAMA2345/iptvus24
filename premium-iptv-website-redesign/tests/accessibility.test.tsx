import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

import Navbar from "../src/components/Navbar";
import Reviews from "../src/components/Reviews";

describe("Accessibility interactions", () => {
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

  it("renders review star rating as a WAI-ARIA radiogroup with full keyboard support", async () => {
    render(<Reviews embedded />);
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));

    const radiogroup = screen.getByRole("radiogroup", { name: "Your rating" });
    expect(radiogroup).toBeTruthy();

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(5);
    expect(radios[0]?.getAttribute("tabindex")).toBe("0");
    expect(radios[1]?.getAttribute("tabindex")).toBe("-1");

    // ArrowRight selects 2 stars and moves focus
    fireEvent.keyDown(radios[0]!, { key: "ArrowRight" });
    expect(radios[1]?.getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(radios[1]);

    // End selects 5 stars, Home selects 1 star
    fireEvent.keyDown(radios[1]!, { key: "End" });
    expect(radios[4]?.getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(radios[4]);

    fireEvent.keyDown(radios[4]!, { key: "Home" });
    expect(radios[0]?.getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(radios[0]);
  });

  it("closes the mobile navigation menu on Escape and returns focus to the toggle button", () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggleButton);
  });
});
