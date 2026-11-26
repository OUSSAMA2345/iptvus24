# IPTVUS24 website audit and roadmap

**Audit date:** 26 November 2026

**Scope:** Repository source, Next.js build and routes, public production review API behavior, and Vercel deployment configuration. This is a technical and UX audit, not a legal opinion, an independent licensing review, or a Lighthouse certification.

## Executive summary

The site already has a Next.js App Router foundation, responsive pricing and device sections, legal/support routes, moderated reviews, a sitemap, structured article data, and a clear no-fabricated-testimonials policy. This release adds 30 original educational articles alongside the six existing guides, consent-gated Google analytics support, Search Console verification configuration, accessible scroll reveals, and hero image optimization.

The most important unresolved production issue is external configuration: Vercel production logs identify `SUPABASE_SERVICE_ROLE_KEY` as malformed after whitespace/invisible-character normalization. The database client cannot initialize, so review reads/submissions return 503. The repository cannot verify the database table or migration until the owner replaces that credential with a valid Supabase secret/service-role key. No production test review was created.

## Findings and priority

| Priority | Area | Finding | Action/status |
| --- | --- | --- | --- |
| **P0 — release blocker** | Reviews / Supabase | Production runtime rejects `SUPABASE_SERVICE_ROLE_KEY` as `invalid_format`; GET and POST cannot reach Supabase. | Code now sanitizes and validates both server variables, shares the normalized key with rate limiting, and reports the exact invalid variable. The owner must replace the Vercel Production secret and redeploy; database persistence remains unverified. |
| **P1 — owner action** | Legal / trust | Repository text cannot establish the seller’s legal identity, jurisdiction, or rights to distribute each item of content. | Do not invent these facts. Publish the correct legal entity, address/jurisdiction, and substantiated content-rights information before presenting the service as licensed or legally authorized. |
| **P1 — owner action** | Google tooling | Search Console ownership, GA4 property, and GTM container belong to the site operator; no IDs are stored in the repository. | Optional environment-based Search Console verification and consent-gated GA4/GTM support are now implemented. Add the real IDs in Vercel and verify the domain in the respective Google accounts. |
| **P1 — SEO content** | Blog | The repository had six guides and no broad topic coverage for requested device/setup searches. | Added 30 original guides in four topic clusters (36 total). All posts are statically generated, searchable, categorized, linked to related articles, and included in BlogPosting data and the sitemap. Review and update articles as device software and service terms change. |
| **P2 — performance** | Images | The homepage hero used a raw `<img>`, bypassing Next.js image sizing/format optimization. | Replaced with `next/image`, priority loading, responsive sizes, and controlled quality. |
| **P2 — motion/accessibility** | Accessibility | Scroll animation can hide content if applied before hydration or for visitors requesting reduced motion. | Reveal component keeps server-rendered content visible, animates only after hydration, and disables movement when reduced motion is requested. |
| **P2 — architecture** | Application structure | Shared landing-page components live in `src/` while route/layout/API code lives in `app/`. | Existing separation is preserved to avoid a risky structural rewrite; new route-specific content remains in the App Router. Consider consolidating legacy presentation components in a separate migration. |
| **P2 — quality assurance** | Testing | There is no dedicated automated unit/component test suite for search, consent, or review submissions. | Build/typecheck and route/data smoke checks are run for this change. Add focused automated tests when a test runner is adopted; production review submission cannot pass until the Supabase credential is corrected. |
| **P3 — measurement** | Core Web Vitals | A repository build cannot establish real-user Core Web Vitals or Lighthouse scores. | Measure the deployed site on representative mobile/desktop devices after owner configuration; do not treat a local build score as a production guarantee. |

## Topic clusters

Articles are grouped around search intent rather than keyword variants. Each article has a canonical URL, unique title/description, keywords for the site search, related-article links, and a structured publication date.

### Choosing a service

1. [How to evaluate an internet TV service before subscribing](/blog/choose-an-internet-tv-service)
2. [How to compare streaming plan prices clearly](/blog/compare-streaming-plan-prices)
3. [A checklist for choosing a live sports streaming option](/blog/lawful-live-sports-streaming-checklist)
4. [How to compare streaming subscription costs fairly](/blog/streaming-subscription-cost-comparison)
5. [Choosing a streaming device for your television](/blog/choose-a-streaming-device-for-your-tv)
6. [Refunds and cancellations: questions to answer before subscribing](/blog/streaming-service-refund-and-cancellation-checks)

### Device and app setup

7. [A practical guide to checking streaming device compatibility](/blog/check-device-compatibility)
8. [Fire TV streaming setup: a compatibility-first checklist](/blog/fire-tv-streaming-setup-checklist)
9. [Streaming on a Samsung Smart TV: what to check first](/blog/samsung-smart-tv-streaming-setup)
10. [LG webOS streaming apps: a compatibility guide](/blog/lg-webos-streaming-app-compatibility)
11. [Apple TV streaming setup: apps, network, and account checks](/blog/apple-tv-streaming-service-setup)
12. [Android TV streaming setup: a straightforward checklist](/blog/android-tv-streaming-player-setup)
13. [Google TV streaming apps: compatibility before installation](/blog/google-tv-streaming-app-checklist)
14. [Streaming on iPhone: app, connection, and privacy basics](/blog/streaming-on-iphone-privacy-checklist)
15. [Streaming on iPad: prepare the app and home network](/blog/streaming-on-ipad-setup)
16. [Watching streams on a Windows PC: browser and network checks](/blog/streaming-on-windows-pc)
17. [Streaming on Mac: compatibility, browser, and audio checks](/blog/streaming-on-mac-setup)
18. [Captions and subtitles on streaming apps: settings to check](/blog/captions-and-subtitles-on-streaming)
19. [Manage storage and updates on a streaming device](/blog/streaming-device-storage-and-updates)
20. [A streaming remote is not responding: quick checks](/blog/streaming-device-remote-not-responding)
21. [Streaming accessibility settings worth checking](/blog/streaming-accessibility-features)

### Streaming and troubleshooting

22. [What affects streaming quality at home?](/blog/what-affects-streaming-quality)
23. [Ethernet or Wi-Fi for TV streaming: how to choose](/blog/ethernet-or-wifi-for-tv-streaming)
24. [How to improve Wi-Fi reception for a Smart TV](/blog/improve-wifi-signal-for-smart-tv)
25. [Buffering while streaming? Troubleshoot one layer at a time](/blog/troubleshoot-buffering-step-by-step)
26. [When a streaming app will not open: a safe troubleshooting guide](/blog/streaming-app-wont-open)
27. [Black screen with audio: isolate the streaming playback problem](/blog/streaming-black-screen-with-audio)
28. [What is an electronic programme guide (EPG)?](/blog/electronic-program-guide-explained)
29. [How household internet use affects streaming](/blog/home-network-bandwidth-for-streaming)
30. [Fix audio language or track issues in a streaming player](/blog/streaming-audio-language-and-track-issues)
31. [Ways to reduce mobile data use while streaming](/blog/reduce-streaming-data-use)

### Privacy, rights, and safe use

32. [Protecting your privacy when using streaming apps](/blog/streaming-app-privacy-and-security)
33. [Checking regional content availability and rights](/blog/regional-content-availability-and-rights)
34. [Protect your privacy when signing up for streaming services](/blog/streaming-account-privacy-and-security)
35. [Using streaming services while travelling: check the terms first](/blog/watching-streaming-services-while-travelling)
36. [Parental controls on streaming devices: a setup guide](/blog/streaming-parental-controls-guide)

## Before and after

| Before | After |
| --- | --- |
| Six static guides with a small search index. | Thirty new articles (36 total) across buying, device setup, troubleshooting, and privacy/rights topics. |
| No consent-aware Google analytics integration or Search Console verification field. | Optional GA4/GTM scripts load only after analytics consent; ad storage remains denied; Search Console verification is environment-configured. |
| Scroll sections had no motion system. | Subtle Framer Motion reveals honor reduced-motion preferences and avoid hiding server-rendered content before hydration. |
| Hero image used a browser-native `<img>`. | Next.js optimized image component requests responsive image sizes and prioritizes the LCP candidate. |
| Invalid production key was easily confused with missing setup. | Production API response distinguishes absent configuration from an invalid named variable; logs do not reveal secret values. |

## Release roadmap

1. **Unblock reviews:** replace the malformed `SUPABASE_SERVICE_ROLE_KEY` in Vercel Production with the key copied directly from Supabase Project Settings → API Keys, redeploy, then verify `GET /api/reviews`, a test `POST`, the pending row, moderation, and approved public display. Do not send the secret through chat.
2. **Confirm legal facts:** provide the actual seller identity, governing jurisdiction, and evidence for the service’s distribution rights; update site and policies only from verified facts.
3. **Configure Google:** add the Search Console verification token and GA4 or analytics-only GTM ID to Vercel. Verify consent behavior, the sitemap in Search Console, and real-time analytics after accepting optional analytics.
4. **Measure production:** run Lighthouse and field data checks on representative mobile/desktop routes, then prioritize any measured Core Web Vitals or accessibility regressions. No score is claimed in this audit.
5. **Maintain the editorial library:** recheck device instructions, app availability, rights terminology, and refund/payment terms whenever providers or platform software change.

## Google configuration

See the repository README and `.env.example` for these optional build-time values:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Search Console HTML verification token (not a password).
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement ID (`G-...`).
- `NEXT_PUBLIC_GTM_ID`: GTM container ID (`GTM-...`); when set, it takes precedence over direct GA4. Configure this container for analytics only unless the consent interface and privacy notices are updated to separately authorize other categories.

These values are intentionally empty by default. Search Console verification, analytics collection, indexing, and real-user metrics cannot be asserted until the owner configures the correct properties and verifies the live domain.
