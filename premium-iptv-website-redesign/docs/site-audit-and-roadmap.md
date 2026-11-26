# IPTVUS24 website audit and roadmap

**Audit date:** 26 November 2026

**Scope:** Repository source, Next.js build and routes, public production review API behavior, and Vercel deployment configuration. This is a technical and UX audit, not a legal opinion, an independent licensing review, or a Lighthouse certification.

## Executive summary

The site has a Next.js App Router foundation, responsive pricing and device sections, legal/support routes, moderated reviews, a sitemap, structured article data, and a no-fabricated-testimonials policy. The source branch adds 30 original educational articles alongside the six existing guides, consent-gated Google analytics support, Search Console verification configuration, accessible scroll reveals, and hero image optimization.

The final SEO crawl before PR #3 was merged found valid robots and sitemap responses, working canonicals and metadata on every sitemap URL, and valid `BlogPosting` structured data on all live articles. Google Search Console ownership and sitemap submission are reported complete by the site owner. The review API also returned 200 for GET and 201 for a QA-only POST after Supabase setup; the pending test was not publicly visible.

After PR #3 was deployed, both public hostnames began returning a redirect loop. The cause was conflicting rules: Vercel redirects the apex host to `www`, while the application redirected `www` back to the apex. There is no `middleware.ts` or `next.config.js`; the application rule was in `next.config.ts`. The fix removes that application redirect and sets `SITE_URL` to Vercel's canonical `www` hostname so metadata and sitemap URLs agree with platform routing.

## Final SEO verification

| Check | Production result |
| --- | --- |
| `robots.txt` | Before PR #3 deployment, HTTP 200; allowed `/`, disallowed `/api/`, and referenced the apex sitemap. The updated source references `https://www.iptvus24.com/sitemap.xml`; current production retrieval is blocked by the redirect loop. |
| `sitemap.xml` | Before PR #3 deployment, HTTP 200 and valid XML with 16 URLs (9 static pages, the blog index, and 6 articles). After PR #3 deployment, the host redirect loop prevents current sitemap verification; the merged source includes 36 articles. |
| Canonical URLs | Vercel's configured host behavior redirects apex to `www`; application canonicals and sitemap now use `https://www.iptvus24.com`. The conflicting application redirect has been removed. |
| Metadata and Open Graph | All 16 pages have a title and description; all have Open Graph title, description, URL, and image tags. Article pages use `og:type=article` and Twitter large-image cards. |
| Article structured data | All 6 live article pages include valid `BlogPosting` JSON-LD; the blog index includes `Blog` JSON-LD. |
| Indexability | No `noindex` directives were found on sitemap pages; robots rules do not block public content. |
| Blog links | The pre-merge production blog index linked to all 6 live articles. The merged source has 36 unique article slugs, all with inbound and outbound related links through the rotating same-category selection. |

These are crawl and source checks, not a Lighthouse/Core Web Vitals certification or a report from Google’s indexing systems.

## Findings and priority

| Priority | Area | Finding | Action/status |
| --- | --- | --- | --- |
| **P0 — production availability** | SEO / host routing | After PR #3, apex redirects to `www` at Vercel while application config redirects `www` to apex, causing an infinite 308 loop. | Removed the application host redirect and aligned `SITE_URL` with Vercel's `www` canonical host; verify after deployment. |
| **P1 — index coverage** | SEO / blog | The pre-merge production sitemap listed six articles; the merged source contains 36. | After the host fix is deployed, resubmit `/sitemap.xml` in Search Console and inspect all 36 article URLs. |
| **P1 — internal linking** | SEO / blog | The previous related-article selection left 20 of 36 source articles without inbound links from another article. | Related links now rotate through same-category articles; every source article is linked from other articles as well as the blog index. |
| **P1 — owner action** | Legal / trust | Repository text cannot establish the seller’s legal identity, jurisdiction, or rights to distribute each item of content. | Do not invent these facts. Publish the correct legal entity, address/jurisdiction, and substantiated content-rights information before presenting the service as licensed or legally authorized. |
| **P1 — measurement** | Google tooling | Search Console and sitemap submission are confirmed by the owner; GA4/GTM property configuration and real-user metrics are not verified in this repository audit. | Continue Search Console coverage monitoring. Add GA4 or analytics-only GTM IDs in Vercel only if desired, and validate consent behavior before relying on analytics. |
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

1. **Verify indexing after recovery:** deploy the host-routing fix, resubmit `/sitemap.xml` in Search Console, and inspect discovery/indexing for all 36 article URLs.
2. **Monitor Search Console coverage:** review excluded, crawled-not-indexed, duplicate-canonical, and soft-404 reports; fix issues based on actual URL inspection rather than assumptions.
3. **Measure real-user performance:** collect mobile Core Web Vitals and run Lighthouse on representative landing, blog, and article routes; prioritize any measured LCP, INP, CLS, or accessibility regressions.
4. **Improve article differentiation:** add original, relevant article imagery and clearer author/editorial review details where factual ownership can be established; do not use generic stock imagery or unverifiable expertise claims.
5. **Maintain editorial accuracy:** periodically recheck device instructions, app availability, rights terminology, and refund/payment terms, and update article dates only when content is meaningfully revised.

## Google configuration

See the repository README and `.env.example` for these optional build-time values:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Search Console HTML verification token (not a password).
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement ID (`G-...`).
- `NEXT_PUBLIC_GTM_ID`: GTM container ID (`GTM-...`); when set, it takes precedence over direct GA4. Configure this container for analytics only unless the consent interface and privacy notices are updated to separately authorize other categories.

These values are intentionally empty by default. The site owner reports Search Console verification and sitemap submission are complete. This repository audit does not have access to the Search Console account, GA4/GTM properties, or their indexing and analytics reports.
