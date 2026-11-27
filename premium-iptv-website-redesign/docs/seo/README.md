# Priority-article SEO audit — 27 November 2026

## Scope and outcome

Audited all **20 published priority guides**, with all **56 blog routes** (including 36 legacy posts) in the metadata, linking and title-overlap crawl. Baseline: main `f3e6e16dab951059993337aa94f0d0d8b78456cd`; after: the production build on this PR branch. This is a pre-deployment audit, not confirmation of Google indexing or a production rollout.

The rendered after crawl has **zero structural failures**, zero duplicate titles/descriptions/canonicals, all 20 targets linked from the hub and present exactly once in the sitemap, and no target without a contextual inbound article link. Content remains 20 complete guides, **53,676 prose words**, eight visible FAQs each. No articles were merged, redirected, unpublished or added.

## Checklist, findings and fixes

| Check | Baseline finding | Implemented action / after evidence |
| --- | --- | --- |
| Keyword cannibalization | Several adjacent intents; generic first-keyword tags; no search-query performance dataset | Explicit primary query and scope boundaries for every target in `content/blog/topics.json`; preserved distinct URLs; see intent review below. Keyword tags are editorial labels, not a claimed ranking lever. |
| Internal linking | Category rotation could recommend weakly related posts | Three curated related guides per target; eight legacy supporting-guide maps; contextual cross-links where they genuinely answer a next question. |
| Orphans | No true hub/sitemap orphans; five targets had no **body-context** inbound link | Added contextual inbound paths for MAG portal, LG availability, Fire TV black screen, player comparison and IPTV-on-Fire-TV explanation. All 20 now have body-context inbound links. |
| Missing schema | Article, FAQPage and BreadcrumbList already existed; Article images were missing | Added relevant Article images, WebPage node, connected identities, language, word count, section and publisher references. Missing a recommended image did not mean all original Article markup was syntactically invalid. |
| Duplicate metadata | None among the 56 routes | Preserved unique titles, descriptions and canonicals; added regression assertions rather than unnecessary title churn. |
| Thin sections | One automated flag: priority 1 Best practices, 79 words | Added substantive controlled-retest guidance, not filler. No remaining main-section flags below the heuristic 80-word threshold. Length alone is not proof of quality; short conclusions/individual FAQ answers are intentionally excluded. |
| Sitemap coverage | All targets already covered | Verified each canonical exactly once, response 200 and honest modification dates. No sitemap implementation change was needed. |
| Breadcrumb schema | Three-level sequence already present | Added stable `#breadcrumb` identity and WebPage relationship; last label matches visible H1/current breadcrumb, canonical item and ordered positions. |
| Article validity | Existing author, publisher and dates; missing recommended image | Centralized generation; checked type, canonical identity, visible headline, HTTPS image asset, dates/order, author/publisher, logo, language and connections. No fake Person, rating or credentials. |
| FAQ validity | Eight visible questions and answers already matched each guide's FAQPage | Preserved exact visible text and Question/Answer types, stable FAQ identity; checked all 160 FAQs. No invented FAQ content or rich-result promise. |
| Open Graph | Existing article card with generic brand image | Explicit canonical/title/description, article dates, original relevant 1200×630 diagram per target, accurate alt text and declared dimensions. |
| Twitter cards | Large-image card existed but image alt was absent | Explicit title/description/image/alt synchronized with Open Graph. |
| Core Web Vitals impact | Font-driven layout movement on some samples; speculative route prefetch | Self-hosted local font preloads and adjusted Arial fallbacks; optional font display avoids a late font swap on slow loads. Disabled speculative prefetch on article-card/body/related links while retaining real crawlable anchors and normal navigation. Lab results are mixed; see below. |

## Editorial intent / cannibalization review

This is a **structural risk review**, not a finding of observed search cannibalization. No GSC queries, impressions, clicks, position history, URL-switching data or CrUX/RUM dataset was available. Distinct wording or a `keywords` field cannot demonstrate resolution of ranking competition. There is insufficient evidence to consolidate or redirect useful published guides.

Reviewed the eight lexical title-overlap candidates in `after.json`: Fire TV vs Samsung failures have device-specific paths; channels vs MAG portal is media/list loading vs middleware entry; one Samsung IPTV app vs multiple unrelated Samsung apps has a separate diagnostic starting point; guide-data failures differ from app launch/playback failures; LG catalogue availability differs from installed-app failure; household bandwidth explains shared capacity, while cross-device buffering investigates failure despite a nominally fast connection. Shared terms such as “app” and “not working” are not sufficient grounds for merging.

Important boundaries retained and linked:

- **Fire TV explanation / setup / failure / buffering / Wi-Fi / black screen:** conceptual delivery and Fire OS/Vega compatibility; pre-install setup checklist; an installed app's failure stage; an active stream stalling; network discovery/authentication; and display failure before the app are different entry points. The generic buffering guide remains a basic layer-by-layer checklist, not a replacement for the specific Fire TV diagnostic guide.
- **EPG / XMLTV / TiviMate:** generic EPG definition; XMLTV format/IDs/time semantics; failed retrieval/refresh across players; and TiviMate-specific mapping/configuration. The EPG refresh guide now explicitly directs XMLTV-definition readers to the format guide rather than repeating it.
- **Samsung / LG / storage:** Samsung setup stays compatibility-first, one IPTV-app failure differs from multiple Samsung apps failing, LG unavailability concerns supported catalogue/region/model, and Android TV low persistent storage differs from generic device maintenance.
- **Player vs service / TiviMate vs Smarters:** division of responsibilities vs edition/device/feature comparison. A source-service problem is not diagnosed by changing player licensing; no invented prices, tests or scores.
- **Channels / playlist / portal / crash:** list ingestion, stream requests, operator middleware authorization and process termination are distinct failure stages.

All 36 legacy posts were considered in the crawl and scope review. Their retained editorial roles:

| Legacy group (slugs) | Boundary relative to priority guides |
| --- | --- |
| `choose-an-internet-tv-service`, `compare-streaming-plan-prices`, `streaming-subscription-cost-comparison`, `streaming-service-refund-and-cancellation-checks` | Service evaluation, commercial terms and cost arithmetic, not player comparison or technical repair. The two cost guides may warrant a separate legacy-only review; this audit does not claim to resolve overlap outside the priority set. |
| `check-device-compatibility`, `choose-a-streaming-device-for-your-tv` | Pre-purchase/support checks, not installed-app symptom diagnosis. |
| `what-affects-streaming-quality`, `troubleshoot-buffering-step-by-step`, `home-network-bandwidth-for-streaming`, `ethernet-or-wifi-for-tv-streaming`, `improve-wifi-signal-for-smart-tv` | Broad quality factors, beginner isolation order, shared capacity, transport choice and reception respectively; link to symptom/device-specific diagnostics rather than compete as identical “fast internet but buffering” guides. |
| `fire-tv-streaming-setup-checklist`, `samsung-smart-tv-streaming-setup`, `lg-webos-streaming-app-compatibility` | First-time compatibility/setup vs a precise failure stage. Added targeted related paths into relevant priority guides. |
| `android-tv-streaming-player-setup`, `google-tv-streaming-app-checklist` | Setup/installation compatibility, not app crashes or persistent-storage recovery. |
| `apple-tv-streaming-service-setup`, `streaming-on-iphone-privacy-checklist`, `streaming-on-ipad-setup`, `streaming-on-windows-pc`, `streaming-on-mac-setup` | Other device ecosystems and initial preparation; no same-intent priority target. |
| `streaming-app-wont-open`, `streaming-black-screen-with-audio`, `streaming-device-storage-and-updates` | Generic app-start checklist, video-layer failure with audio, and routine maintenance. Distinct from Android process crashes, a Fire TV black screen after its logo, and Android TV low-storage recovery. |
| `electronic-program-guide-explained` | Beginner definition and navigation; distinct from XMLTV encoding or refresh/mapping failure. |
| `streaming-app-privacy-and-security`, `streaming-account-privacy-and-security`, `regional-content-availability-and-rights`, `lawful-live-sports-streaming-checklist`, `watching-streaming-services-while-travelling` | App/account safety and lawful regional access, not player/device repair. No region or rights bypass added. |
| `captions-and-subtitles-on-streaming`, `streaming-parental-controls-guide`, `streaming-audio-language-and-track-issues`, `streaming-device-remote-not-responding`, `reduce-streaming-data-use`, `streaming-accessibility-features` | Distinct accessibility, household controls, audio, remote and data-budget tasks. |

The article-by-article query, scope and inbound inventory follows in [priority-intents.md](priority-intents.md). `topics.json` is the runtime source for curated related links and diagram descriptors; tests prevent it drifting away from the 20 published guides.

## Images and rendering

Twenty original locally rendered conceptual diagrams now provide relevant Article/OG/Twitter imagery. They are explanatory typography and shapes, not product photographs, screenshots, channel logos, licensed broadcasts or evidence of device testing. They are also visible at each guide's end with descriptive alt text and a clear conceptual caption. `next/image` reserves their 1200×630 aspect ratio and lazy-loads below the article; no new above-the-fold hero download was introduced. Total committed source PNG size is about 728 KiB. The generator is reproducible with optional browser QA dependencies, and no image service or application dependency was added.

## Performance: directional lab evidence, not field CWV

`performance-before.json` and `performance-after.json` record one cold Lighthouse **13.0.1 mobile simulation** per route against local production builds. Fresh visits did not accept optional analytics. Local CPU noise, throttling simulation and a single sample limit conclusions; scores are not statistical evidence and should not be used as promises.

| Route | Score before → after | LCP ms before → after | CLS before → after | TBT ms before → after |
| --- | --- | --- | --- | --- |
| `/blog` | 95 → 96 | 2831 → 2635 | 0.000192 → 0 | 62 → 126 |
| `/blog/firestick-buffering-but-internet-is-fine` | 98 → 96 | 2031 → 2661 | 0.022051 → 0 | 133 → 119 |
| `/blog/what-is-xmltv-epg` | 89 → 97 | 2969 → 2652 | 0 → 0 | 274 → 64 |
| `/blog/how-does-iptv-work-on-firestick` | 94 → 96 | 2794 → 2665 | 0.010634 → 0 | 122 → 91 |

All four final samples had zero CLS. **The Firestick buffering sample's LCP regressed by ~631 ms**, and the hub's TBT increased; this PR is not a universal performance win. Final simulated LCP remains above the 2.5-second “good” threshold. Hub transfer decreased from 378,941 to 364,025 bytes; the richer article graph/markup slightly increases article transfer (roughly 1.5–2.2 KiB on these samples). Disabling prefetch trades instant speculative navigation for lower unrequested transfer. Optional font display may retain the adjusted system fallback for a slow first visit; original fonts are still self-hosted and preloaded.

**INP was not measured. TBT is not INP. No claim of passing field CWV is made.** After deployment, use actual mobile/desktop 75th-percentile LCP/INP/CLS and repeated production Lighthouse runs to assess the trade-offs, especially the Firestick buffering route. No tracking was added to obtain these measurements.

## Validation and evidence

- `npm run lint`, `npm run typecheck`, `npm test`: passed, **53 tests across 10 suites**, including nine SEO contract tests.
- `node scripts/audit-content.mjs --complete --report docs/editorial/content-audit.json`: all 20 ready, 53,676 words, zero errors.
- `npm run build`: passed; static article routes preserved, unknown slug remains 404.
- `npm run audit:seo`: 56 routes crawled, 20 targets checked, zero failures/duplicate metadata/short-section flags/weak contextual inbound targets. Also fetches all 20 diagram assets and verifies PNG dimensions, image parity and visible counterparts.
- Browser QA: all 20 guides, both themes, widths 320/390/768/1440/1920; no reported overflow, broken in-page anchors, new page errors or post-rejection WCAG A/AA axe violations. This is automated layout/accessibility checking, not comprehensive human visual certification. Evidence: `browser-after.json`.
- **Known unrelated issue:** the initial existing cookie banner has two 3.64:1 color-contrast findings (policy link and accept button). These are recorded separately in browser evidence, not hidden by a whole-site “zero accessibility issues” claim. Consent behavior was not changed.
- Baseline `before.json` records existing gaps against the intended after contracts; its failures include missing enhancements, not proof that pages were unindexable. `after.json` is the final rendered structural evidence.

Local schema checks cover this site's supported Article/FAQ/Breadcrumb graph shape and exact visible text. They are **not** a general Schema.org validator, Google Rich Results Test submission or guarantee of rich-result eligibility/indexing/rankings. References reviewed: [Google Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article) and [Web Vitals definitions and field thresholds](https://web.dev/articles/vitals). FAQ markup is retained as a truthful content description, not a promise of a Google FAQ search feature.

## Reproduce

From `premium-iptv-website-redesign`:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
# In a separate terminal, with the production server running:
npm run audit:seo
```

Optional browser/performance tooling lives **outside** application dependencies:

```sh
npm install --prefix /tmp/seo-qa --no-audit --no-fund \
  puppeteer-core@25.19.0 @sparticuz/chromium@158.0.0 \
  @axe-core/puppeteer@4.14.1 lighthouse@13.0.1
SEO_QA_DEPS=/tmp/seo-qa npm run audit:seo:performance
EDITORIAL_QA_DEPS=/tmp/seo-qa node scripts/verify-editorial-browser.mjs
# Browser verifier writes docs/editorial/browser-audit.json; keep any rerun
# evidence separate from the historical publication report if committing it.
SEO_QA_DEPS=/tmp/seo-qa node scripts/generate-guide-diagrams.mjs
```

`SEO_AUDIT_URL` overrides the crawl/Lighthouse base; `EDITORIAL_QA_URL` overrides the browser base. Chromium may require platform libraries outside the supplied serverless Linux environment. Baseline reports are preserved snapshots; running the commands above updates after reports, not the baseline. No pricing, payment/security rules, backend, analytics or consent implementation was modified.
