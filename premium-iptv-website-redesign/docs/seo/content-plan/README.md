# SEO content plan and internal-linking system

| File | What it is |
| --- | --- |
| [SEO-CONTENT-PLAN.md](./SEO-CONTENT-PLAN.md) | **Start here.** 100 informational keywords ranked by opportunity, the five top-20 lists, cluster map, roadmap, linking rules, commercial-page link-back plan, retrofit table and compliance exclusions. |
| [ARTICLE-LINK-BRIEFS.md](./ARTICLE-LINK-BRIEFS.md) | One brief per planned article: keyword data, 3–5 commercial links (placement → anchor → URL) and 5–10 supporting article links. |
| [INTERNAL-LINKING-AUDIT.md](./INTERNAL-LINKING-AUDIT.md) | Full audit of the live site (56 articles, 6 commercial destinations) and the 100-article plan. |
| `keywords.source.json` | Hand-edited source data (keywords, estimates, titles, slugs, scopes, exclusions). |
| `keyword-plan.json`, `internal-link-audit.json` | Generated machine-readable outputs. |
| `../live-link-retrofit.json` | Record of the contextual links added to the 20 published Markdown guides. |
| `../../../content/commercial/pages.json` | Commercial destinations and anchor pools shared by the site and the scripts. |
| `../../../content/commercial/legacy-next-steps.json` | One commercial next step per legacy guide. |

## Commands (run from `premium-iptv-website-redesign/`)

```bash
npm run seo:plan       # rebuild the plan, rankings, lists and link briefs from keywords.source.json
npm run audit:links    # audit live + planned internal links and rewrite the audit report
```

`npm run build` runs the link audit (without rewriting the report) in `prebuild`, so an article that breaks a linking rule fails the build.

## Publishing a planned article

1. Write the Markdown guide in `content/blog/<slug>.md` using the brief in ARTICLE-LINK-BRIEFS.md (the content gate in `scripts/audit-content.mjs` still applies).
2. Use the brief's commercial anchors (adapt the wording to the sentence; keep it unique in the article and within the sitewide cap of 4 uses).
3. Add the retrofit links from SEO-CONTENT-PLAN.md §8.4 to the existing guides.
4. Run `npm run seo:plan && npm run audit:links`. Device pages and the home/contact pages pick up the new article in their related-guides lists automatically.

Search volumes and difficulty are modelled estimates (no keyword-tool export was available); validate them in your keyword tool and Search Console before commissioning.
