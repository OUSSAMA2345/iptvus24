# Midnight cinema — design system and verification

## Visual language

- **Canvas:** obsidian `#070b12`; alternating navy sections `#0a0f19` / `#0b111c`.
- **Surfaces:** `#101723` with translucent highlights, 1px low-opacity borders, inset upper-edge light, and deep diffuse shadows.
- **Type:** existing Sora / Manrope local font families. Display weights move from uniformly extra-bold to 500–600 with tighter tracking and balanced wraps. Main headings scale from 31px mobile to about 54px desktop; hero from 46px to 82px. Body text remains distinct from metadata.
- **Accent:** ice blue `#8abaff`, cyan `#6ee7f5`, restrained violet ambient lighting. WhatsApp CTAs use emerald gradients with dark text for contrast. The navigation action uses a pearl surface.
- **Radii:** 14px actions; 18–24px cards; 28–32px cinematic frames. All values live in the presentation stylesheet, with shared card-radius/glow/elevation tokens.
- **Spacing:** 4/8px-based component rhythm; responsive section spacing of 72px mobile and 80–132px desktop. Content remains constrained to the existing 1280px container.
- **Pricing:** existing annual-plan designation retained. Aligned price baselines and CTAs, a luminous featured frame, subtle moving edge reflection, and overlapping cinematic imagery create hierarchy without inventing discounts or urgency.
- **Devices:** desktop editorial split layout; compact two-column mobile cards; original imagery retained.
- **FAQ:** native keyboard-operable details/summary controls; open state gains a brighter navy surface and border.

## Motion

Existing Framer Motion dependency is reused; no dependencies were added.

- One-time 650ms section reveals, 20px travel, luxury ease `[.2,.8,.2,1]`.
- Fine-pointer-only spring tilt capped at 2 degrees per axis; stiffness 180, damping 28.
- Mouse-follow light is a fixed radial texture translated via motion values, not a gradient repainted on each pointer update. No per-frame React state updates.
- Ambient orbs use transform-only 22/26-second loops and stop offscreen or when the document is hidden.
- Desktop artwork parallax is capped at 28px. Touch/tablet layouts disable it.
- The featured plan edge reflection animates opacity and scale, not blur or box shadow.
- `useMotionPreference` uses a conservative static server snapshot and subscribes to OS preference changes. Reduced motion disables tilt, pointer light, parallax, loops, edge animation, menu travel, and reveals.
- Server/no-JavaScript content stays visible. No scroll hijacking, autoplay video, canvas particle engine, or new animation library.

## Verification

Executed from `premium-iptv-website-redesign/`:

| Check | Result |
| --- | --- |
| `npm run lint` | Pass, no warnings |
| `npm run typecheck` | Pass |
| `npm run test` | 8 suites / 39 tests pass; tests unchanged |
| `npm run build` | Pass, 50 routes |
| Rendered homepage main-content copy comparison | Exact match before/after, desktop and mobile |
| Images | All five original assets load |
| Browser JavaScript errors | None in desktop/mobile captures |
| Horizontal overflow | None at 320, 390, 768, 1024, 1440, 1920px |
| axe automated WCAG A/AA scan | No reported violations in scanned desktop state |
| Mobile menu | Opens, Escape closes, focus returns to trigger |
| FAQ | Enter opens native accordion |
| Rating keyboard control | End selects 5 stars; no review submitted |
| Reduced motion | No spotlight, tilt, or edge animation; runtime preference change also stops ambient loops |
| Fine-pointer simulation | Tilt and pointer spotlight activate; headless Chromium advertises no physical pointer by default |

A 120-frame headless desktop sample observed roughly 16.7ms median and 16.8ms 95th-percentile frame intervals. This is a limited sandbox observation, **not** a guarantee of 60fps on all devices. Transform/opacity-only continuous motion, limited animated layers, and touch/reduced-motion fallbacks are the primary performance safeguards. Automated accessibility scans do not replace manual assistive-technology testing.

## Screenshot methodology

- Baseline is commit `6b7b5d2`, built independently from a temporary archive without switching the working branch.
- Same Chromium engine, viewports (1440 × 1000 desktop; 390 × 844 mobile), fonts, and reduced-motion preference before and after.
- Optional analytics rejected via the existing consent button; no analytics code changed.
- Full-page images are stitched viewport captures. Fixed controls are hidden only for these full-page images to avoid repeated controls. Section captures retain normal navigation and floating CTA.
- Supabase is not configured in the sandbox. Reviews display the real temporary-unavailability state. No reviews, ratings, or counts were inserted or mocked into screenshots.
- No backend, security, SEO, analytics, tests, CI configuration, pricing data, business copy, or package manifests changed.

## Before → after

| Area | Before | After |
| --- | --- | --- |
| Navigation | Flat full-width white strip | Floating midnight glass shell and bounded mobile menu |
| Hero | Small separate image card | Oversized editorial headline, cinematic frame, ambient lighting, layered depth |
| CTAs | Bright flat green with white text | Unified emerald, dark high-contrast text, reflection and elevation |
| Devices | Centered image and linear cards | Editorial split layout, luminous hardware stage, compact mobile grid |
| Features | Uniform light cards | Deep glass panels, icon lighting, pointer spotlight and spring tilt |
| Pricing | Separate banner and white cards | Integrated cinema deck, luminous annual plan, aligned hierarchy |
| Reviews | White cards on dark background | Cohesive dark surfaces, legible inputs, honest status state retained |
| FAQ | Thin divider rows | Rounded navy accordions with distinct open state |
| Footer | Light utility block | Cinematic contact panel and spacious dark link hierarchy |
