#!/usr/bin/env node
/**
 * Builds the 100-keyword SEO content plan, rankings, priority lists and per-article internal-link briefs.
 * Input:  docs/seo/content-plan/keywords.source.json, content/commercial/pages.json, published articles.
 * Output: docs/seo/content-plan/keyword-plan.json, SEO-CONTENT-PLAN.md, ARTICLE-LINK-BRIEFS.md
 * Deterministic: the same inputs always produce the same output (safe to re-run and diff).
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadPublishedArticles } from './published-articles.mjs';

const root = process.cwd();
const outDir = path.join(root, 'docs/seo/content-plan');
const source = JSON.parse(fs.readFileSync(path.join(outDir, 'keywords.source.json'), 'utf8'));
const commercial = JSON.parse(fs.readFileSync(path.join(root, 'content/commercial/pages.json'), 'utf8')).pages;
const byId = Object.fromEntries(commercial.map(page => [page.id, page]));
const published = loadPublishedArticles(root);
const publishedBySlug = new Map(published.map(article => [article.slug, article]));

const ANCHOR_CAP = 4; // maximum sitewide uses of any exact commercial anchor (live + planned)
const errors = [];

// ---------- validation ----------
const keywords = source.keywords;
if (keywords.length !== 100) errors.push(`Expected 100 keywords, found ${keywords.length}`);
const seen = new Set();
for (const row of keywords) {
  for (const field of ['k', 'c', 'v', 'kd', 'i', 's', 'd', 'title', 'slug', 'w', 'scope']) if (row[field] === undefined) errors.push(`${row.k ?? '?'}: missing ${field}`);
  if (seen.has(row.slug)) errors.push(`Duplicate slug ${row.slug}`);
  if (seen.has(row.k)) errors.push(`Duplicate keyword ${row.k}`);
  seen.add(row.slug); seen.add(row.k);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)) errors.push(`Bad slug ${row.slug}`);
  if (row.action === 'upgrade' && !publishedBySlug.has(row.slug)) errors.push(`Upgrade target not published: ${row.slug}`);
  if (row.action !== 'upgrade' && publishedBySlug.has(row.slug)) errors.push(`New article collides with published slug: ${row.slug}`);
  if (!source.clusters[row.c]) errors.push(`Unknown cluster ${row.c}`);
  if (!['howto', 'troubleshoot', 'definition', 'comparison'].includes(row.i)) errors.push(`Unknown intent ${row.i}`);
  if (row.d !== 'generic' && !byId[row.d]) errors.push(`Unknown device ${row.d}`);
}

// ---------- scoring ----------
const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
const volumeScore = v => clamp(((Math.log10(v) - 2.5) / 2) * 100); // 316 → 0, 31,600 → 100
const intentScore = { howto: 100, troubleshoot: 100, definition: 90, comparison: 75 };
const fitScore = { P: 100, E: 100, V: 90, T: 90, F: 85, D: 85, A: 80, K: 70 };
const businessBonus = { P: 8, E: 6, V: 6, T: 5, F: 5, D: 4, A: 4, K: 2 };
const intentLabel = { howto: 'Informational — how-to', troubleshoot: 'Informational — troubleshooting', definition: 'Informational — definition', comparison: 'Informational — comparison' };
const snippetLabel = { steps: 'Numbered steps', definition: 'Definition paragraph', table: 'Comparison table', list: 'Bulleted list', paragraph: 'Answer paragraph' };
const kdLabel = kd => kd <= 14 ? 'Low' : kd <= 29 ? 'Low–medium' : kd <= 39 ? 'Medium' : 'Medium–high';
const volumeRange = v => v >= 10000 ? '10K–30K' : v >= 5000 ? '5K–10K' : v >= 2000 ? '2K–5K' : v >= 1000 ? '1K–2K' : '500–1K';
const words = text => text.trim().split(/\s+/).length;

const items = keywords.map(row => {
  const vol = volumeScore(row.v);
  const fit = clamp(fitScore[row.c] + (row.t ? 10 : 0));
  const opportunity = Math.round(0.30 * vol + 0.40 * (100 - row.kd) + 0.15 * intentScore[row.i] + 0.15 * fit);
  const priority = opportunity + businessBonus[row.c] + (row.d !== 'generic' ? 2 : 0);
  const speed = Math.round(vol * (100 - row.kd) / 100 + (row.t ? 15 : 0) + (row.i === 'troubleshoot' ? 5 : 0));
  const question = /^(what|how|which|can|does|is|do|why)\b/.test(row.k) || row.i === 'definition';
  const snippet = opportunity + (question ? 8 : 0) + (['definition', 'table', 'steps'].includes(row.s) ? 5 : 0) - Math.max(0, row.kd - 30);
  const longTail = words(row.k) >= 4 && row.v <= 2400 && row.kd <= 12;
  return {
    keyword: row.k, cluster: row.c, clusterName: source.clusters[row.c].name, volume: row.v, volumeRange: volumeRange(row.v), kd: row.kd, kdLabel: kdLabel(row.kd),
    intent: intentLabel[row.i], intentType: row.i, snippetFormat: snippetLabel[row.s], trend: Boolean(row.t), device: row.d,
    opportunity, priorityScore: priority, speedScore: speed, snippetScore: snippet, longTail,
    seoTitle: row.title, slug: row.slug, url: `/blog/${row.slug}`, recommendedWords: row.w, action: row.action ?? 'new', scope: row.scope,
    isPillar: source.clusters[row.c].pillar === row.slug,
  };
});

items.sort((a, b) => b.opportunity - a.opportunity || b.volume - a.volume || a.keyword.localeCompare(b.keyword));
items.forEach((item, index) => { item.rank = index + 1; });
const bySlug = new Map(items.map(item => [item.slug, item]));

// ---------- commercial link assignment ----------
const anchorUse = new Map();
const destinationUse = Object.fromEntries(commercial.map(page => [page.id, 0]));
// Seed anchor and destination counts with commercial links already live in published Markdown.
const pathToId = Object.fromEntries(commercial.map(page => [page.path, page.id]));
for (const article of published.filter(a => a.kind === 'markdown')) {
  for (const m of article.body.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)) {
    const id = pathToId[m[2]];
    if (!id) continue;
    anchorUse.set(m[1].toLowerCase(), (anchorUse.get(m[1].toLowerCase()) ?? 0) + 1);
    destinationUse[id] += 1;
  }
}
// ...and with the curated commercial next steps shown on legacy guides.
for (const step of Object.values(JSON.parse(fs.readFileSync(path.join(root, 'content/commercial/legacy-next-steps.json'), 'utf8')).steps)) {
  anchorUse.set(step.anchor.toLowerCase(), (anchorUse.get(step.anchor.toLowerCase()) ?? 0) + 1);
  destinationUse[step.pageId] += 1;
}
const affinity = { K: ['firestick', 'androidtv'], E: ['androidtv', 'samsung', 'lg', 'firestick'], V: ['firestick', 'androidtv', 'samsung', 'lg'], T: ['samsung', 'lg', 'firestick', 'androidtv'], P: ['samsung', 'lg', 'androidtv', 'firestick'], A: ['androidtv'], F: ['firestick'], D: ['firestick', 'androidtv'] };
const secondaryDevice = { firestick: 'androidtv', androidtv: 'firestick', samsung: 'lg', lg: 'samsung' };
function pickAnchor(pageId, usedInArticle) {
  const pool = byId[pageId].anchors;
  const choice = [...pool].filter(anchor => !usedInArticle.has(anchor.toLowerCase()) && (anchorUse.get(anchor.toLowerCase()) ?? 0) < ANCHOR_CAP)
    .sort((a, b) => (anchorUse.get(a.toLowerCase()) ?? 0) - (anchorUse.get(b.toLowerCase()) ?? 0) || pool.indexOf(a) - pool.indexOf(b))[0];
  if (!choice) { errors.push(`Anchor pool exhausted for ${pageId}`); return pool[0]; }
  anchorUse.set(choice.toLowerCase(), (anchorUse.get(choice.toLowerCase()) ?? 0) + 1);
  usedInArticle.add(choice.toLowerCase());
  return choice;
}
const placementText = {
  'above-fold': 'Intro — directly after the answer-first summary (above the fold)',
  'after-compatibility': 'After the compatibility explanation',
  'after-setup': 'After the setup guide',
  'after-troubleshooting': 'After the troubleshooting solution',
  'before-conclusion': 'Final best-practices paragraph, before the conclusion',
  faq: 'Inside the most relevant FAQ answer',
};
const midFor = { howto: ['after-setup', 'after-troubleshooting'], troubleshoot: ['after-troubleshooting', 'after-compatibility'], definition: ['after-compatibility', 'after-setup'], comparison: ['after-compatibility', 'after-setup'] };

// Plan in priority order so the highest-value articles get the first pick of anchors.
for (const item of [...items].sort((a, b) => b.priorityScore - a.priorityScore || a.rank - b.rank)) {
  const count = item.recommendedWords >= 2400 ? 5 : item.recommendedWords >= 1500 ? 4 : 3;
  const [mid1, mid2] = midFor[item.intentType];
  const used = new Set();
  // Each slot lists acceptable destinations; pick the least-used one (relative to its anchor pool) not yet used in this article.
  const devices = ['firestick', 'androidtv', 'samsung', 'lg'];
  const slots = item.device !== 'generic'
    ? [['above-fold', [item.device]], [mid1, ['plans', 'compare']], ['before-conclusion', ['plans', 'compare', 'support']], ['faq', ['support', secondaryDevice[item.device]]], [mid2, [secondaryDevice[item.device], 'support', 'plans', 'compare']]]
    : [['above-fold', ['plans', 'compare']], [mid1, affinity[item.cluster]], ['before-conclusion', ['plans', 'compare', 'support']], ['faq', ['support', ...devices]], [mid2, devices]];
  const taken = [];
  const destinations = slots.slice(0, count).map(([placement, candidates]) => {
    const pool = candidates.filter(id => !taken.includes(id));
    const pageId = (pool.length ? pool : Object.keys(byId).filter(id => !taken.includes(id)))
      .sort((a, b) => destinationUse[a] / byId[a].anchors.length - destinationUse[b] / byId[b].anchors.length || pool.indexOf(a) - pool.indexOf(b))[0];
    taken.push(pageId);
    return [placement, pageId];
  });
  item.commercialLinks = destinations.map(([placement, pageId]) => {
    destinationUse[pageId] += 1;
    return { placement, placementNote: placementText[placement], pageId, url: byId[pageId].path, anchor: pickAnchor(pageId, used) };
  });
  // Present links in reading order.
  const order = ['above-fold', 'after-compatibility', 'after-setup', 'after-troubleshooting', 'before-conclusion', 'faq'];
  item.commercialLinks.sort((a, b) => order.indexOf(a.placement) - order.indexOf(b.placement));
}

// ---------- supporting article links ----------
const relatedClusters = { D: ['F', 'A'], K: ['E', 'F'], F: ['D', 'V'], A: ['P', 'D'], P: ['E', 'A'], E: ['P', 'K'], V: ['T', 'F'], T: ['V', 'P'] };
const inbound = new Map([...items.map(item => [item.slug, 0]), ...published.map(article => [article.slug, 0])]);
const titleOf = slug => bySlug.get(slug)?.seoTitle ?? publishedBySlug.get(slug)?.title ?? slug;
const keywordOf = slug => bySlug.get(slug)?.keyword ?? publishedBySlug.get(slug)?.keyword ?? slug;
const anchorFor = (slug, index) => {
  const keyword = keywordOf(slug);
  const short = titleOf(slug).split(/[:?]/)[0].trim();
  return index % 2 === 0 || short.length > 60 ? keyword : short;
};
const deviceMatch = (a, b) => a === b || a === 'generic' || b === 'generic';
for (const item of [...items].sort((a, b) => a.rank - b.rank)) {
  const target = clamp(Math.round(item.recommendedWords / 300), 5, 10);
  const chosen = [];
  const add = slug => { if (slug && slug !== item.slug && !chosen.includes(slug) && chosen.length < target) chosen.push(slug); };
  add(source.clusters[item.cluster].pillar);
  const sameCluster = items.filter(o => o.cluster === item.cluster && o.slug !== item.slug)
    .sort((a, b) => Number(deviceMatch(b.device, item.device)) - Number(deviceMatch(a.device, item.device)) || inbound.get(a.slug) - inbound.get(b.slug) || a.rank - b.rank);
  const publishedRelated = published.filter(a => a.c && (a.c === item.cluster || relatedClusters[item.cluster].includes(a.c)) && a.slug !== item.slug)
    .sort((a, b) => Number(b.d === item.device) - Number(a.d === item.device) || Number(b.c === item.cluster) - Number(a.c === item.cluster) || Number(b.kind === 'markdown') - Number(a.kind === 'markdown') || inbound.get(a.slug) - inbound.get(b.slug) || a.slug.localeCompare(b.slug));
  const crossCluster = items.filter(o => relatedClusters[item.cluster].includes(o.cluster) && deviceMatch(o.device, item.device))
    .sort((a, b) => inbound.get(a.slug) - inbound.get(b.slug) || a.rank - b.rank);
  sameCluster.slice(0, Math.max(2, target - 4)).forEach(o => add(o.slug));
  publishedRelated.slice(0, 2).forEach(a => add(a.slug));
  crossCluster.slice(0, 1).forEach(o => add(o.slug));
  for (const o of [...sameCluster, ...crossCluster]) add(o.slug);
  chosen.forEach(slug => inbound.set(slug, inbound.get(slug) + 1));
  item.supportingLinks = chosen.map((slug, index) => ({ slug, url: `/blog/${slug}`, status: bySlug.has(slug) && bySlug.get(slug).action !== 'upgrade' ? 'planned' : 'published', suggestedAnchor: anchorFor(slug, index) }));
}
// Guarantee every planned article receives at least three inbound links from other articles.
for (const item of items) {
  let guard = 0;
  while (inbound.get(item.slug) < 3 && guard++ < 10) {
    const donor = items.filter(o => o.slug !== item.slug && o.supportingLinks.length < 10 && !o.supportingLinks.some(l => l.slug === item.slug))
      .sort((a, b) => Number(b.cluster === item.cluster) - Number(a.cluster === item.cluster) || Number(deviceMatch(b.device, item.device)) - Number(deviceMatch(a.device, item.device)) || a.supportingLinks.length - b.supportingLinks.length || a.rank - b.rank)[0];
    if (!donor) break;
    donor.supportingLinks.push({ slug: item.slug, url: item.url, status: item.action === 'upgrade' ? 'published' : 'planned', suggestedAnchor: anchorFor(item.slug, donor.supportingLinks.length) });
    inbound.set(item.slug, inbound.get(item.slug) + 1);
  }
}
items.forEach(item => { item.plannedInboundFromArticles = inbound.get(item.slug); });

// ---------- retrofit: published articles should link to the new cluster pages once they go live ----------
const retrofits = published.filter(a => a.kind === 'markdown').map(article => {
  const targets = items.filter(o => o.action !== 'upgrade' && o.cluster === article.c && deviceMatch(o.device, article.d))
    .sort((a, b) => Number(b.device === article.d) - Number(a.device === article.d) || a.rank - b.rank).slice(0, 3);
  return { slug: article.slug, addLinksTo: targets.map(o => o.slug) };
});

// ---------- commercial pages → related articles ----------
const commercialBacklinks = commercial.map(page => {
  const supporters = items.filter(item => item.commercialLinks.some(link => link.pageId === page.id));
  const linkBack = [...supporters].sort((a, b) => Number(b.device === page.id) - Number(a.device === page.id) || a.rank - b.rank).slice(0, 8).map(item => item.slug);
  return { pageId: page.id, url: page.path, label: page.label, plannedSupportingArticles: supporters.length, plannedLinks: supporters.reduce((sum, item) => sum + item.commercialLinks.filter(l => l.pageId === page.id).length, 0), linkBackTo: linkBack };
});

// ---------- priority lists ----------
const top = (list, n = 20) => list.slice(0, n).map(item => item.slug);
const lists = {
  highestPriority: top([...items].sort((a, b) => b.priorityScore - a.priorityScore || b.volume - a.volume)),
  easiestWins: top([...items].filter(i => i.kd <= 12).sort((a, b) => a.kd - b.kd || b.volume - a.volume)),
  fastestTraffic: top([...items].sort((a, b) => b.speedScore - a.speedScore || a.kd - b.kd)),
  featuredSnippets: top([...items].sort((a, b) => b.snippetScore - a.snippetScore || b.volume - a.volume)),
  longTail: top([...items].filter(i => i.longTail).sort((a, b) => b.opportunity - a.opportunity || b.volume - a.volume)),
};
for (const [name, list] of Object.entries(lists)) if (list.length !== 20) errors.push(`${name} has ${list.length} entries`);

// ---------- write JSON ----------
const plan = {
  generatedFrom: 'docs/seo/content-plan/keywords.source.json',
  version: source.version, market: source.market, dataBasis: source.dataBasis,
  scoring: {
    opportunity: '0.30 × volume score (log-scaled; 316/mo = 0, 31,600/mo = 100) + 0.40 × (100 − KD) + 0.15 × intent strength (how-to/troubleshooting 100, definition 90, comparison 75) + 0.15 × newer-site fit (cluster relevance; +10 for emerging SERPs)',
    priority: 'opportunity + business-relevance bonus by cluster (P 8, E 6, V 6, T 5, F 5, D 4, A 4, K 2) + 2 for a device-specific commercial match',
    fastestTraffic: 'volume score × (100 − KD) / 100 + 15 for emerging SERPs + 5 for troubleshooting intent',
    featuredSnippet: 'opportunity + 8 for question/definition queries + 5 for step, definition or table formats − penalty for KD above 30',
    longTail: 'four or more words, ≤ 2,400 searches/mo and KD ≤ 12; ranked by opportunity',
    anchorCap: ANCHOR_CAP,
  },
  clusters: source.clusters, excluded: source.excluded, keywords: items, lists, commercialBacklinks, retrofits, errors,
};
fs.writeFileSync(path.join(outDir, 'keyword-plan.json'), `${JSON.stringify(plan, null, 2)}\n`);

// ---------- write Markdown ----------
const fmt = n => n.toLocaleString('en-US');
const esc = s => String(s).replace(/\|/g, '\\|');
const row = cells => `| ${cells.map(esc).join(' | ')} |`;
const listTable = (slugs, extra) => [row(['#', 'Keyword', 'Volume', 'KD', 'Opp.', extra.label, 'SEO title', 'Slug']), row(['---:', '---', '---:', '---:', '---:', '---', '---', '---']),
  ...slugs.map((slug, i) => { const it = bySlug.get(slug); return row([i + 1, it.keyword, fmt(it.volume), it.kd, it.opportunity, extra.value(it), it.seoTitle, `\`${it.slug}\``]); })].join('\n');
const clusterCounts = Object.entries(source.clusters).map(([code, cluster]) => {
  const members = items.filter(i => i.cluster === code);
  return row([code, cluster.name, members.length, fmt(members.reduce((s, i) => s + i.volume, 0)), members.length ? Math.round(members.reduce((s, i) => s + i.kd, 0) / members.length) : '—', `\`${cluster.pillar}\``]);
});
const md = `# IPTVUS24 SEO content plan — 100 informational keyword opportunities

**Version:** ${source.version} · **Market:** ${source.market} · **Generated by:** \`node scripts/seo/build-content-plan.mjs\` (do not edit by hand; edit \`keywords.source.json\` and re-run).

> **Data basis — read before commissioning.** ${source.dataBasis}

## 1. Executive summary

- **100 informational keywords** across 8 topic clusters (Downloader, Kodi, Fire TV, Android TV, IPTV players, EPG/M3U/XMLTV, VPN & optimization, troubleshooting), with a combined modelled demand of about **${fmt(items.reduce((s, i) => s + i.volume, 0))} searches/month** and a median KD of **${[...items].sort((a, b) => a.kd - b.kd)[49].kd}**.
- **Fastest openings for a newer site:** the Fire TV **Vega OS** transition (new Fire TV Sticks are Appstore-only, so Downloader and sideloading guides written for Fire OS no longer apply) and device-specific player troubleshooting (IBO Player, XCIPTV, Televizo, SmartOne) where SERPs are thin and dominated by forums or reseller pages.
- **Cannibalization guard:** every new slug is checked against the ${published.length} published URLs; the two overlapping topics are planned as **upgrades** of existing guides, not competing URLs: \`what is epg on tv\` → \`electronic-program-guide-explained\`, and the buffering pillar \`iptv buffering fix\` → \`troubleshoot-buffering-step-by-step\` (the hub routes to the narrower Firestick, "internet is fine", Kodi and Android TV buffering guides, each keeping its own primary query).
- **Compliance:** piracy-led queries are excluded (section 9). Every brief is scoped to device, application, setup, compatibility, optimization and troubleshooting topics; no code lists, unofficial add-ons or circumvention steps.
- **Internal linking:** every planned article carries 3–5 commercial links (at least one above the fold) and 5–10 supporting article links; the live site has been retrofitted and audited — see [INTERNAL-LINKING-AUDIT.md](./INTERNAL-LINKING-AUDIT.md) and the per-article link briefs in [ARTICLE-LINK-BRIEFS.md](./ARTICLE-LINK-BRIEFS.md).

## 2. Scoring model

| Score | Formula |
| --- | --- |
| Opportunity (1–100) | ${plan.scoring.opportunity} |
| Priority | ${plan.scoring.priority} |
| Fastest traffic | ${plan.scoring.fastestTraffic} |
| Featured snippet | ${plan.scoring.featuredSnippet} |
| Long-tail | ${plan.scoring.longTail} |

KD bands: Low ≤ 14 · Low–medium 15–29 · Medium 30–39 · Medium–high ≥ 40. Word counts are recommendations sized to SERP depth and intent, not padding targets.

## 3. Topic clusters

| Code | Cluster | Keywords | Modelled volume | Avg KD | Pillar page |
| --- | --- | ---: | ---: | ---: | --- |
${clusterCounts.join('\n')}

## 4. All 100 keywords ranked by SEO opportunity

| Rank | Keyword | Cluster | Volume/mo (est.) | KD | Search intent | Opp. | SEO title | URL slug | Words |
| ---: | --- | --- | ---: | ---: | --- | ---: | --- | --- | ---: |
${items.map(it => row([it.rank, it.keyword + (it.trend ? ' ↑' : '') + (it.action === 'upgrade' ? ' (upgrade)' : ''), it.cluster, `${fmt(it.volume)} (${it.volumeRange})`, `${it.kd} (${it.kdLabel})`, it.intent, it.opportunity, it.seoTitle, `\`/blog/${it.slug}\``, fmt(it.recommendedWords)])).join('\n')}

↑ = emerging/trending SERP (Vega OS transition, Kodi pre-release). Volumes are modelled midpoints; see the data-basis note.

## 5. Priority lists

### 5.1 Top 20 highest-priority articles
Highest combined opportunity and commercial relevance — publish these first.

${listTable(lists.highestPriority, { label: 'Priority', value: it => it.priorityScore })}

### 5.2 Top 20 easiest wins
Lowest difficulty (KD ≤ 12) with meaningful demand; typically forum- or reseller-dominated SERPs.

${listTable(lists.easiestWins, { label: 'Intent', value: it => it.intent.replace('Informational — ', '') })}

### 5.3 Top 20 fastest traffic opportunities
Demand × ease, boosted for emerging SERPs and troubleshooting queries that index and earn clicks quickly.

${listTable(lists.fastestTraffic, { label: 'Speed', value: it => it.speedScore + (it.trend ? ' ↑' : '') })}

### 5.4 Top 20 featured-snippet opportunities
Question and definition queries with a clear snippet format. Put a 40–55-word answer (or the steps/table) directly under the H1 or the matching H2.

${listTable(lists.featuredSnippets, { label: 'Snippet format', value: it => it.snippetFormat })}

### 5.5 Top 20 long-tail opportunities
Four-plus-word, low-difficulty queries; ideal supporting articles that pass authority to the pillars.

${listTable(lists.longTail, { label: 'Intent', value: it => it.intent.replace('Informational — ', '') })}

## 6. Publishing roadmap

| Sprint | Articles | Rationale |
| --- | --- | --- |
| Weeks 1–2 | ${lists.fastestTraffic.slice(0, 8).map(s => `\`${s}\``).join(', ')} | Fastest-traffic set; establishes the Vega OS / Downloader cluster while the SERP is still forming. |
| Weeks 3–4 | Remaining highest-priority articles not yet published | Commercially closest player, EPG and Fire TV topics. |
| Weeks 5–8 | Pillars of every cluster, then the easiest wins | Pillars consolidate links before the long-tail wave. |
| Weeks 9–14 | Long-tail and remaining articles (~8/week) | Fill clusters; apply retrofit links (section 8.4) as each goes live. |

Re-verify version-sensitive facts (Vega OS model list, Kodi release status, player pricing and editions) on the publication day and record the review date in front matter.

## 7. Article template (applies to every brief)

1. H1 = SEO title; 40–55-word answer-first summary (snippet target) with the **above-the-fold commercial link** immediately after it.
2. Scope paragraph (what this article does not cover → link to the sibling article).
3. Table of contents; topic H2/H3s; one comparison or decision table.
4. Setup/troubleshooting steps in diagnostic order; commercial link after the compatibility explanation, setup guide or troubleshooting solution as listed in the brief.
5. Common mistakes; best practices (+ the before-conclusion commercial link).
6. 6–8 FAQs (one answer may carry a plain internal link; FAQ schema text equals the visible text without link markup).
7. Conclusion. Article + FAQPage JSON-LD; reviewed date; primary sources (Amazon, Google, Kodi wiki, official player sites).

## 8. Internal linking architecture

### 8.1 Rules (enforced by \`npm run audit:links\`)

- 3–5 commercial links per article (hard maximum 5), at least one above the fold (before the table of contents).
- Placements: after a compatibility explanation, after a setup guide, after a troubleshooting solution, before the conclusion, and inside a relevant FAQ answer — only where they help the reader.
- Descriptive anchors; never the same anchor twice in one article; any exact commercial anchor used at most ${ANCHOR_CAP}× sitewide (anchor pools in \`content/commercial/pages.json\`).
- 5–10 supporting links to other blog articles; every article links to ≥ 3 related articles and ≥ 1 commercial page; every article receives ≥ 3 inbound article links.
- **No unverified claims in anchors.** A trial is not a standard plan feature, so "IPTV Free Trial" style anchors are phrased as availability checks (e.g. "check IPTV free trial availability") and point to pre-sales support, never to a promised trial.

### 8.2 Commercial destinations

| Commercial page | URL | Planned supporting articles | Planned links | Links back to (top related articles) |
| --- | --- | ---: | ---: | --- |
${commercialBacklinks.map(c => row([c.label, `\`${c.url}\``, c.plannedSupportingArticles, c.plannedLinks, c.linkBackTo.map(s => `\`${s}\``).join(', ')])).join('\n')}

Device landing pages render a live "Related setup and troubleshooting guides" list built from every published article that links to them, so the **Blog → Commercial → Blog** loop stays complete as new articles go live.

### 8.3 Cluster flow

\`\`\`
Supporting article ──► cluster pillar ──► sibling articles (same device first)
       │                    │
       └──► device page ◄───┘   (IPTV for Firestick / Samsung / LG / Android TV)
                 │
                 └──► plans · compare plans · pre-sales support ──► related guides
\`\`\`

### 8.4 Retrofit links for published articles
When a planned article goes live, add a contextual link to it from these existing guides:

| Published article | Add links to (when live) |
| --- | --- |
${retrofits.map(r => row([`\`${r.slug}\``, r.addLinksTo.map(s => `\`${s}\``).join(', ') || '—'])).join('\n')}

## 9. Excluded keywords (compliance)

| Keyword | Reason |
| --- | --- |
${source.excluded.map(e => row([e.k, e.reason])).join('\n')}

## 10. Validation

${errors.length ? errors.map(e => `- ❌ ${e}`).join('\n') : '- ✅ 100 unique keywords and slugs; no collision with published URLs; all five priority lists contain 20 entries; anchor caps respected.'}
`;
fs.writeFileSync(path.join(outDir, 'SEO-CONTENT-PLAN.md'), md);

const briefs = `# Article link briefs — 100 planned articles

Generated by \`node scripts/seo/build-content-plan.mjs\`. Each brief lists the keyword data, the commercial links (placement → anchor → URL) and the supporting article links. Writers may adapt anchor wording to the sentence, but must keep it descriptive, unique within the article and within the sitewide cap.

${items.map(it => `## ${it.rank}. ${it.seoTitle}

- **Keyword:** ${it.keyword} · **Volume:** ${fmt(it.volume)}/mo (est.) · **KD:** ${it.kd} · **Intent:** ${it.intent} · **Opportunity:** ${it.opportunity}
- **URL:** \`/blog/${it.slug}\` · **Words:** ${fmt(it.recommendedWords)} · **Snippet format:** ${it.snippetFormat}${it.isPillar ? ' · **Cluster pillar**' : ''}${it.action === 'upgrade' ? ' · **Upgrade existing URL**' : ''}
- **Scope:** ${it.scope}

| Commercial placement | Anchor | URL |
| --- | --- | --- |
${it.commercialLinks.map(l => row([l.placementNote, l.anchor, `\`${l.url}\``])).join('\n')}

**Supporting links (${it.supportingLinks.length}):** ${it.supportingLinks.map(l => `[${l.suggestedAnchor}](${l.url})${l.status === 'published' ? ' ✓' : ''}`).join(' · ')}
`).join('\n')}
✓ = already published.
`;
fs.writeFileSync(path.join(outDir, 'ARTICLE-LINK-BRIEFS.md'), briefs);

console.log(JSON.stringify({ keywords: items.length, errors, topOpportunity: items.slice(0, 5).map(i => `${i.keyword} (${i.opportunity})`), destinationUse }, null, 2));
if (errors.length) process.exitCode = 1;
