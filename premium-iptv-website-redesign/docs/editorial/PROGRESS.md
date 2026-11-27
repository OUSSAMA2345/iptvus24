# Publication report — all 20 priority articles complete

Research and validation date: **27 November 2026**.

## Scope and branch

This continuation adds **15 new standalone Markdown articles, priorities 6–20**, in the requested order. The first five were already merged through PR #13 and were not rewritten or counted as new work. All 20 priority articles are now present and pass the complete content gate; there are no pending topics or placeholder drafts.

Current branch: `arena/3528cc20-iptvus24`, based on verified latest main `fcdde2fc8cf3497f513d3a7d977d634cd8c8e9dd`. This report describes local production-build validation and a review PR, **not a verified live production deployment**. The new work is not merged by this task.

## New articles and slugs

Each linked file is under `content/blog/`; its route is `/blog/<slug>`.

| Priority | Slug / Markdown file | Prose words | FAQs |
| --- | --- | ---: | ---: |
| 6 | [mag-box-portal-not-loading](../../content/blog/mag-box-portal-not-loading.md) | 2,770 | 8 |
| 7 | [iptv-channels-not-loading](../../content/blog/iptv-channels-not-loading.md) | 2,747 | 8 |
| 8 | [iptv-app-keeps-crashing](../../content/blog/iptv-app-keeps-crashing.md) | 2,577 | 8 |
| 9 | [iptv-app-not-working-on-samsung-tv](../../content/blog/iptv-app-not-working-on-samsung-tv.md) | 2,603 | 8 |
| 10 | [iptv-app-not-available-on-lg-tv](../../content/blog/iptv-app-not-available-on-lg-tv.md) | 2,572 | 8 |
| 11 | [firestick-black-screen-after-logo](../../content/blog/firestick-black-screen-after-logo.md) | 2,538 | 8 |
| 12 | [how-to-organize-iptv-channels](../../content/blog/how-to-organize-iptv-channels.md) | 2,627 | 8 |
| 13 | [what-is-xmltv-epg](../../content/blog/what-is-xmltv-epg.md) | 2,992 | 8 |
| 14 | [iptv-player-vs-iptv-service](../../content/blog/iptv-player-vs-iptv-service.md) | 2,614 | 8 |
| 15 | [tivimate-vs-iptv-smarters](../../content/blog/tivimate-vs-iptv-smarters.md) | 3,035 | 8 |
| 16 | [firestick-not-connecting-to-wifi-but-other-devices-will](../../content/blog/firestick-not-connecting-to-wifi-but-other-devices-will.md) | 2,622 | 8 |
| 17 | [samsung-tv-apps-not-working-but-connected-to-internet](../../content/blog/samsung-tv-apps-not-working-but-connected-to-internet.md) | 2,553 | 8 |
| 18 | [android-tv-storage-space-running-out](../../content/blog/android-tv-storage-space-running-out.md) | 2,632 | 8 |
| 19 | [streaming-buffering-but-internet-is-fine](../../content/blog/streaming-buffering-but-internet-is-fine.md) | 2,633 | 8 |
| 20 | [how-does-iptv-work-on-firestick](../../content/blog/how-does-iptv-work-on-firestick.md) | 2,984 | 8 |

**New batch: 40,499 prose words. All 20: 53,431 prose words**, including the unchanged first-five subtotal of 12,932. Counts exclude front matter/JSON-LD, fenced code and TOCs; visible FAQs and tables count. Every new article exceeds 2,500 prose words. The more expansive XMLTV, comparison and architecture explanations are approximately 3,000 words; other scopes were kept focused rather than padded to 4,000.

## Metadata, structure and SEO verification

- All 15 have individual SEO titles, exact planned slugs, meta titles/descriptions, H1, category, keywords and publication/review dates.
- New branded meta titles: 55–64 characters; descriptions: 151–162 characters. Rendered titles, descriptions and canonical URLs were checked in a real browser.
- Each article has an answer-first passage, linked TOC, topic-specific H2/H3 sections, useful comparison table, troubleshooting, common mistakes, best practices, eight visible FAQs and a distinct conclusion.
- Each front matter includes Article and FAQPage JSON-LD. The route emits one Article and one FAQPage in its existing graph; visible question/answer text agrees with schema. A Markdown link found in a FAQ during QA was moved into contextual prose to preserve plain-text schema agreement.
- Each new article has at least two contextual internal links and matching internal-link recommendations, plus two topic-specific original-image briefs. No image licensing claims, copyrighted broadcast frames, team/channel logos, fabricated product photos or new image assets were added.
- All 20 are in the blog listing and sitemap, in priority order through the existing Markdown loader. No new routing layer or client-side filesystem access was necessary.
- Primary sources and competitor search-extract observations are recorded in [RESEARCH.md](./RESEARCH.md), including fetch failures and model/region limitations. External URLs were researched, but this is not a promise that every external site stays available.
- Local repeated-paragraph checks passed. Maximum shared 12-word-shingle overlap among any pair of the 20 articles: **0.16%**, below the gate's 8% threshold. This is not a web-wide plagiarism certificate.
- Editorial review checked scope boundaries, readable paragraphs, explicit hypothetical examples, qualified technical claims, private credential handling and non-destructive recovery ordering. No invented hands-on tests, ratings, credentials, customer cases or independent expert approval are claimed.
- FAQPage is semantic markup requested by the brief, not a promise of FAQ search enhancements. No ranking, AI Overview or AI-citation guarantee is made.

## Validation results

| Check | Result |
| --- | --- |
| `npm run audit:content:complete` | PASS: 20 ready, 0 pending, 0 content errors |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test` | PASS: 44 tests in 9 suites |
| `npm run build` | PASS: all 56 blog article paths generated, including all 20 priority paths |
| `git diff --check` | PASS |
| Browser routes | PASS: all 20 articles in both themes, 40 page/theme checks |
| Browser metadata/schema | PASS: one H1, one Article, one FAQPage, eight matching FAQs, correct canonicals and working TOC anchors |
| Responsive geometry | PASS: no document horizontal overflow at 320, 390, 768, 1440 and 1920 pixels |
| JavaScript | No browser page errors recorded |
| Listing/sitemap/unknown route | All 20 found in listing and sitemap; unknown article returns 404 |
| Automated accessibility | Zero axe WCAG A/AA findings on full article pages after rejecting optional cookies; see existing-banner caveat below |

The five new regression tests run the real publication audit against isolated temporary copies. They cover the complete 20-article batch, the new 2,500-word floor, acceptance above the old 3,500-word ceiling, required common mistakes/exact primary host matching, and raw Markdown in FAQ answers. They do not mutate the checkout or claim to score prose quality.

Machine-readable evidence: [content-audit.json](./content-audit.json), [browser-audit.json](./browser-audit.json). Browser geometry is checked at all five widths; automated axe scans run at the final 1920-pixel viewport. A sample new article was visually inspected at desktop size. Automated checks are not a complete manual accessibility audit or real-device playback test.

### Existing cookie-banner accessibility caveat

The initial-page axe check found two **pre-existing** color-contrast failures in the unchanged consent banner: the Cookie Policy link and the Accept optional button use a 3.64:1 foreground/background combination where 4.5:1 is expected. These findings are retained explicitly under `existingConsentFindings` in the browser report. The script records them, rejects optional cookies through the real control, and audits the article pages afterward. It does not suppress contrast checks or alter consent behavior. Application code, consent, analytics, APIs, pricing, security configuration and dependencies are unchanged by this continuation.

## Reproduce the checks

From `premium-iptv-website-redesign/`:

```sh
npm ci
npm run audit:content:complete
node scripts/audit-content.mjs --complete --report docs/editorial/content-audit.json
npm run lint
npm run typecheck
npm test
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

In another terminal, install optional QA-only tooling outside the repository and run the saved browser script:

```sh
npm install --prefix /tmp/editorial-qa puppeteer-core@25.19.0 @sparticuz/chromium@158.0.0 @axe-core/puppeteer@4.14.1
EDITORIAL_QA_DEPS=/tmp/editorial-qa node scripts/verify-editorial-browser.mjs
```

`EDITORIAL_QA_URL` can point to another running build; default is the local server. The localhost URL is used only by the sandbox's QA process, never by browser-facing application code. The preview server binds to `0.0.0.0` and accepts the platform preview host. QA dependencies, browser binaries and temporary fixtures are not committed.

## Review handoff

Review the 15 new Markdown files, research ledger, strengthened content gate, its regression tests and regenerated reports. The existing first-five article files, runtime loader/renderer, route metadata/schema implementation and unrelated app behavior remain unchanged. All requested topics are finished; no continuation article batch is needed. Merge and production deployment remain separate review/release actions.
