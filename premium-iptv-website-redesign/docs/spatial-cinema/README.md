# Spatial cinema — day and night

## What changed

- A three-plane hero: a luminous background/backplate, perspective-framed entertainment imagery, and independent foreground glass, content, and phone layers.
- Original artwork reused in a decorative floating content panel. Abstract phone/player artwork is drawn with CSS/SVG; it is not a screenshot or a promise of a supplied application.
- A compatibility stage with device satellites, elliptical light orbits, a reflective floor, bevel-like edges, and raised shadows.
- Layered pricing materials with pointer tilt; elevated features, reviews, and final contact panels.
- Two complete palettes: **night** (obsidian/navy, blue/violet bloom) and **day** (pearl glass, white/blue surfaces, soft realistic shadows). Forms, FAQ, comparison, footer, and shared document pages participate.
- An accessible night-mode switch in homepage and document navigation. Space activates it; its checked state reports whether night mode is enabled. Night is the server default; a saved preference is restored after hydration.
- Theme choice is an essential local UI preference, not tracking. Storage reads/writes are guarded, including the case where reads succeed but quota-blocked writes fail. Cross-tab storage changes are subscribed to. No external requests or cookies were added.

## Motion and rendering strategy

CSS perspective, layered original imagery, and bevel/shadow materials provide the spatial effect. This is a lightweight CSS/Framer Motion composition, not a WebGL application. No new production dependencies, 3D engines, or large models were added.

New foreground floats use bounded 9px transform-only motion on 9/11-second cycles, stop when offscreen or the document is hidden, and reset to static when reduced motion is enabled. The existing spring pointer light, tilt, parallax, aurora motion, and section reveals are retained. Static perspective is retained under reduced motion; decorative travel is not.

Only decorative surfaces are blurred; business copy and controls remain crisp and legible. Decorative layers are hidden from assistive technology and cannot intercept clicks or focus. The phone, playback panel, and content tile contain no third-party marks, fake metrics, ratings, or availability claims.

## Validation

- `npm run lint` — pass, no warnings
- `npm run typecheck` — pass
- `npm run test` — all 8 suites / 39 existing tests pass; tests unchanged
- `npm run build` — pass, 50 routes
- `git diff --check` — pass
- All original images and the additional small decorative image load in both themes, desktop and mobile; no captured browser JavaScript errors.
- No horizontal or navigation overflow at 320, 390, 768, 1024, 1280, 1440, 1920px in both themes.
- axe WCAG A/AA scans report no violations in the scanned homepage states and `/contact`, `/reviews`, `/terms`, `/blog` in both themes. Automated scans are not a substitute for manual assistive-technology testing.
- Theme changes persist across reloads in both directions. Keyboard switching, read/write-blocked storage fallbacks, and mobile menu Escape/focus return checked in Chromium.
- Normal-motion float transform changes observed over time; reduced-motion resets decorative travel and hides the pointer spotlight.
- Business copy, plan data/prices, review/contact logic, security, SEO, analytics, CI, and package manifests remain unchanged. The shared document shell changes are presentation only.

## Screenshot evidence

`index.html` presents night/day desktop and mobile comparisons plus full pages. Captures use the production build at 1440 × 1000 and 390 × 844, reduced motion enabled for reproducibility. Full-page images are stitched viewport captures with fixed controls hidden to prevent repetition; section captures retain normal controls. Optional analytics are rejected through the existing consent UI.

The sandbox has no configured review backend. Review screenshots show the real unavailable state; no reviews or ratings were seeded. Existing historical pre-spatial screenshots remain under `../premium-redesign/after/` for comparison.
