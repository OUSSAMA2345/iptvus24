# Photoreal cinema refinement

## Request

Make the imagery feel photographic and raise the visual quality of the spatial/3D presentation. This is a visual frontend revision, not a change to the service, business copy, pricing, or app functionality.

## Implementation

- Replace the five original abstract/CG-looking images with newly generated photorealistic architectural/product illustrations: coastal living room, studio device lineup, walnut media lounge, empty unbranded stadium, and private theater.
- Retain the existing asset URLs, keeping every integration intact. Update image alt descriptions to truthfully match the new scenes and identify them as illustrations.
- Correct image dimensions to the native 1264 × 848 or 1376 × 768 assets. No artificial upscale or 4K claims.
- Add explicit Next Image quality choices so the requested 90-quality hero/device variants and existing quality settings are actually honored, rather than all being mapped to the default 75. Security headers are unmodified.
- Add a 60 KiB landscape crop, reused in the decorative phone and miniature device screens. It comes from the new generated device illustration, not external content. Miniature hardware now has photographic screens and metallic edge lighting rather than flat cyan fills.
- Refine the spatial material treatment in `src/realism.css`: layered bezel thickness, metallic edges, specular glass, phone side buttons, glass-screen reflection, floor reflection, separate contact shadows, and deeper card bevels. Remove screen blend compositing that washed out the device photograph.
- Keep photographic content crisp; the only blur is on decorative shadows/glass controls. The floor reflection is omitted on narrow screens. No WebGL runtime, extra animation loops, production dependencies, or tracking added.
- Retain existing bounded Framer floats, fine-pointer tilt, and reduced-motion behavior. New visual layers are decorative, non-interactive, and hidden from assistive technology.

## Image provenance

These are **original AI-generated photorealistic illustrations**, not real photographs of the business/customer installations, supplied hardware, or a guaranteed app/content catalogue. See `ASSETS.md` for dimensions, weights, fingerprints, and usage boundaries. No third-party film/TV assets, broadcasts, logos, or application interfaces were used.

## Verification

- `npm run lint` — pass
- `npm run typecheck` — pass
- `npm run test` — all 39 existing tests in 8 suites pass, tests unchanged
- `npm run build` — pass, 50 routes
- `git diff --check` — pass
- Chromium production captures in night/day at 1440 × 1000 and 390 × 844, with reduced motion for deterministic screenshots.
- All image elements load after their lazy-loading region is visited. The mobile-hidden floor reflection is intentionally deferred until a desktop layout is visited. All main image variants and decorative SVG landscape images display in screenshots.
- No browser JavaScript errors captured in the four homepage runs.
- No horizontal overflow at 320, 390, 768, 1024, 1440, and 1920px, in both themes.
- axe WCAG A/AA scans: zero reported violations in the four checked homepage states. Automated scans are not a replacement for manual assistive-technology testing.
- Fine-pointer tilt produces a nonzero rotation matrix; foreground float transform changes over time. Headless Chromium's fine-pointer capability is emulated for this input check only; real application guards are unchanged.
- Runtime reduced motion returns artwork tilt and float travel to `none`; static CSS perspective/material geometry remains.
- Keyboard theme switch persists day/night across reload; mobile menu Escape returns focus; native FAQ summary toggles open.
- Business copy and pricing data, APIs/backend, form logic, SEO, analytics, consent, tests, CI and dependency manifests are unchanged. Only alt descriptions and visual frontend/image settings changed.

`qa-results.json` and `interaction-results.json` record browser observations. `index.html` is the screenshot gallery, including a comparison against the previous spatial hero. Mobile close-ups show the entire artwork separately from the first-screen capture.

The local review backend is not configured. Captures show its actual unavailable state; no review data, ratings, customer counts, or proof claims were fabricated.
