import localFont from "next/font/local";

// Reuse the installed, self-hosted Latin variable fonts. next/font preloads the
// actual heading/body faces and supplies adjusted fallbacks. Optional display
// keeps text readable without a late swap when a slow connection misses the font window.
export const bodyFont = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "optional",
  weight: "200 800",
  fallback: ["Arial"],
  adjustFontFallback: "Arial",
});

export const displayFont = localFont({
  src: "../node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2",
  variable: "--font-sora",
  display: "optional",
  weight: "100 800",
  fallback: ["Arial"],
  adjustFontFallback: "Arial",
});
