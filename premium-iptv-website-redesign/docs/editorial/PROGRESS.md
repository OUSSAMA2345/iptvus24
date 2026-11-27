# Editorial work in progress — 5 of 20 articles

**This is not the final 20-article completion report.** The first five articles are available in the branch's production-build preview. Priorities 6–20 are not written yet. Nothing in this work has been merged or deployed to the live website.

Starting point verified against remote `main`: `058fb2f837823b9b69e0b1e2f410daa5cae1cf22`. Work remains on `arena/4975d2c3-iptvus24`.

## Completed first, in the requested order

Word counts exclude JSON front matter/schema, code blocks and the table of contents. FAQs count as visible article prose.

| Priority | Article / standalone Markdown | Words | FAQs | Branch route |
| --- | --- | ---: | ---: | --- |
| 1 | [Firestick buffering but internet is fine](../../content/blog/firestick-buffering-but-internet-is-fine.md) | 2,501 | 8 | `/blog/firestick-buffering-but-internet-is-fine` |
| 2 | [IPTV EPG not updating](../../content/blog/iptv-epg-not-updating.md) | 2,532 | 8 | `/blog/iptv-epg-not-updating` |
| 3 | [IPTV app not working on Firestick](../../content/blog/iptv-app-not-working-on-firestick.md) | 2,566 | 8 | `/blog/iptv-app-not-working-on-firestick` |
| 4 | [TiviMate EPG No information](../../content/blog/tivimate-epg-no-information.md) | 2,638 | 8 | `/blog/tivimate-epg-no-information` |
| 5 | [TiviMate playlist processing](../../content/blog/tivimate-playlist-is-processed-please-wait.md) | 2,695 | 8 | `/blog/tivimate-playlist-is-processed-please-wait` |

Total: **12,932 article words**. No short placeholders were created for the remaining articles.

Each file contains SEO title, slug, meta title/description, H1, review/publication dates, keywords, image recommendations, internal-link opportunities, Article JSON-LD and FAQPage JSON-LD in JSON-compatible front matter. The full Markdown body includes a short introduction, answer-first passage, working TOC, H2/H3 structure, comparison table, diagnostic steps, best practices, eight FAQs and a distinct conclusion. Image recommendations are proposals, not images claimed to have been created or tested.

## Publishing integration

Previously, the site rendered short structured TypeScript articles rather than Markdown. The new loader integrates `content/blog/*.md` into the existing listing, article routes, metadata, related links and sitemap. Existing articles remain intact.

- Files marked `status: ready` render; drafts do not.
- Numeric priorities determine the new articles' listing order.
- The Markdown H1 remains in the standalone file; SitePage supplies the only visible page H1.
- Article and FAQ schema come from the same file, not a duplicated content store. The audit verifies FAQ text matches the visible answers.
- Schema is emitted as JSON-LD, not exposed as a large visible code block.
- Markdown is rendered server-side with `react-markdown` and `remark-gfm`; raw HTML is not enabled.
- Tables have a keyboard-focusable horizontal scroll container. Article typography works in day/night themes.
- Only summary fields are passed to the client-side blog search; full Markdown and schema are not serialized into the listing props.
- No API, security-header, homepage-pricing, analytics, consent, CI or existing test files were changed.

## Completed checks

- Lint, strict TypeScript and all 39 existing tests in 8 suites pass.
- Production build passes with 55 routes, including the five new articles.
- Content audit passes for the five ready articles: word count, unique slugs, priority order, required sections, metadata length checks, FAQ/schema agreement, TOC anchors, internal routes and image recommendations.
- Local comparison finds no repeated prose paragraphs of 35+ words across the new articles and no matching 12-word prose shingles between the five. This is not a web-wide plagiarism certification; shared technical concepts are intentionally cross-linked rather than treated as unique discoveries.
- Production browser checks cover all five articles in both themes: one visible H1, one Article node, one FAQPage node with eight questions, correct canonical/metadata, working TOC targets and no captured JS errors.
- No horizontal page overflow at 320, 390, 768, 1440 or 1920px in the checked layouts.
- axe WCAG A/AA scans report no violations in the ten checked article states. This does not replace manual assistive-technology testing.
- Blog listing starts with priorities 1–5 in order; all five appear in the sitemap; an unknown slug returns 404. First requests return 200; cached revisits may return 304 as expected.
- The explicit 20-article completion gate **fails intentionally** while 15 articles remain. It must not be described as passing.

## Editorial review notes

See [RESEARCH.md](RESEARCH.md) for per-topic queries, sampled competing results, primary documentation, specific content improvements and limitations. Each article has its own diagnostic frame and examples. No invented customer cases, tests, expert credentials or interview quotes were added.

The main quality improvements are targeted: uncertainty is explained rather than hidden; cache clearing is separated from destructive data resets; account entitlement is separated from player purchase; guide freshness is separated from download success; and time-zone corrections are not prescribed blindly. These are meaningful editorial improvements, not a claim that rankings or every competitor have been objectively beaten.

No automated test can certify that prose is “not AI sounding,” establish real-world expertise, or guarantee Helpful Content/AI Overview treatment. A publication owner should review factual fit, organizational authorship and the final release date. Current dates describe this editorial revision; adjust publication metadata if first production publication occurs on another date. Suggestions for screenshots require actual supported devices, permission and credential redaction before use.

FAQPage markup is included as requested, **not** as a promise of Google FAQ rich results. Google's current changelog records retirement of that rich-result feature. Clear answers and Article markup also do not guarantee featured snippets or citations by AI products.

## Continue without losing priority

Next: **6. MAG box portal not loading**. Research current Infomir documentation and competing results before drafting. Then continue priorities 7–20 exactly as recorded in [priority-plan.json](priority-plan.json). Do not start the unspecified remaining topics beyond the initial 20.

Commands:

```bash
npm run audit:content
node scripts/audit-content.mjs --report docs/editorial/content-audit.json
npm run audit:content:complete  # must remain nonzero until all 20 ready articles exist
npm run lint
npm run typecheck
npm run test
npm run build
```

Builds automatically audit the ready content. The complete-batch gate is separate so an intermediate preview can be reviewed without misreporting the entire editorial assignment as finished. Keep the pull request in draft until the full set and its final report are ready.
