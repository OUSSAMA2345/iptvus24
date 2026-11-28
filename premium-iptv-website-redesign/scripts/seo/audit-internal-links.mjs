#!/usr/bin/env node
/**
 * Full internal-linking audit for the live site and the 100-article plan.
 *
 * Live site (what is published now):
 *   - every article links to ≥ 3 related articles and ≥ 1 commercial page
 *   - Markdown guides: 3–5 contextual commercial links, ≥ 1 above the fold, 5–10 supporting blog links,
 *     no anchor repeated inside an article
 *   - legacy guides: template related links + one curated commercial next step
 *   - sitewide exact-anchor cap for commercial anchors; no broken internal links
 *   - every commercial page receives links from multiple articles and links back to related articles
 * Plan (docs/seo/content-plan/keyword-plan.json): the same rules applied to every planned article.
 *
 * Usage: node scripts/seo/audit-internal-links.mjs [--report] [--json] [--root <dir>]
 *   --report  writes docs/seo/content-plan/internal-link-audit.json and INTERNAL-LINKING-AUDIT.md
 *   --json    prints the full result instead of the summary
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadPublishedArticles } from './published-articles.mjs';

const rootIndex = process.argv.indexOf('--root');
const root = rootIndex >= 0 ? path.resolve(process.argv[rootIndex + 1]) : process.cwd();
const writeReport = process.argv.includes('--report');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

const RULES = { minRelated: 3, minSupporting: 5, maxSupporting: 10, minCommercial: 3, maxCommercial: 5, minCommercialAny: 1, anchorCap: 4, minCommercialInbound: 3, minLinkBack: 3, minInbound: 3 };
const commercial = JSON.parse(read('content/commercial/pages.json')).pages;
const legacySteps = JSON.parse(read('content/commercial/legacy-next-steps.json')).steps;
const topics = JSON.parse(read('content/blog/topics.json'));
const commercialByPath = Object.fromEntries(commercial.map(page => [page.path, page]));
const pageOf = url => url.split('#')[0] || '/';
const staticRoutes = new Set(['/', '/blog', '/contact', '/about', '/privacy', '/terms', '/refund', '/status', '/reviews', '/cookies', ...commercial.map(page => pageOf(page.path))]);

const published = loadPublishedArticles(root);
const slugs = new Set(published.map(article => article.slug));
const errors = [];
const warnings = [];

// ---------- replicate the runtime related-article module (verified against getRelatedPosts in tests) ----------
const seoSource = read('app/blog/seo.ts');
const supportingBlock = /const supportingRelatedSlugs[^{]*{([\s\S]*?)\n};/.exec(seoSource)?.[1] ?? '';
const supportingRelated = Object.fromEntries([...supportingBlock.matchAll(/"([^"]+)":\s*\[([^\]]*)\]/g)].map(m => [m[1], [...m[2].matchAll(/"([^"]+)"/g)].map(x => x[1])]));
const categoryOf = new Map();
for (const article of published) {
  if (article.kind === 'markdown') categoryOf.set(article.slug, article.data.category);
}
for (const file of ['app/blog/posts.ts', 'app/blog/additional-posts.ts']) {
  for (const m of read(file).matchAll(/slug: "([^"]+)"[\s\S]*?category: "([^"]+)"/g)) categoryOf.set(m[1], m[2]);
}
function templateRelated(slug) {
  const curated = (topics[slug]?.relatedSlugs ?? supportingRelated[slug] ?? []).filter(s => slugs.has(s) && s !== slug);
  const fallback = [...slugs].filter(s => s !== slug && !curated.includes(s))
    .sort((a, b) => Number(categoryOf.get(b) === categoryOf.get(slug)) - Number(categoryOf.get(a) === categoryOf.get(slug)) || a.localeCompare(b));
  return [...curated, ...fallback].slice(0, 3);
}

// ---------- live articles ----------
const anchorUses = new Map(); // lower-case commercial anchor → [{ slug, source }]
const noteAnchor = (anchor, slug, source) => {
  const key = anchor.toLowerCase();
  anchorUses.set(key, [...(anchorUses.get(key) ?? []), { slug, source }]);
};
const contextualInbound = new Map([...slugs].map(slug => [slug, new Set()]));
const templateInbound = new Map([...slugs].map(slug => [slug, new Set()]));
const commercialInbound = new Map(commercial.map(page => [page.id, new Set()]));

const live = published.map(article => {
  const report = { slug: article.slug, kind: article.kind, problems: [] };
  const problem = message => { report.problems.push(message); errors.push(`${article.slug}: ${message}`); };
  const related = templateRelated(article.slug);
  related.forEach(target => templateInbound.get(target).add(article.slug));
  report.templateRelated = related;

  if (article.kind === 'markdown') {
    const body = article.body;
    const tocAt = body.indexOf('\n## Table of contents');
    const faqAt = body.indexOf('\n## Frequently asked questions');
    const conclusionAt = body.indexOf('\n## Conclusion');
    const lastSectionAt = body.lastIndexOf('\n## ', faqAt - 1);
    const links = [...body.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)].map(m => ({ anchor: m[1], url: m[2], at: m.index }));
    const placementOf = at => at < tocAt ? 'above-fold' : at > faqAt && at < conclusionAt ? 'faq' : at > lastSectionAt && at < faqAt ? 'before-conclusion' : at > conclusionAt ? 'conclusion' : 'body';
    const blog = links.filter(l => l.url.startsWith('/blog/'));
    const commercialLinks = links.filter(l => commercialByPath[l.url]).map(l => ({ ...l, pageId: commercialByPath[l.url].id, placement: placementOf(l.at) }));
    for (const link of links) {
      if (link.url.startsWith('/blog/') && !slugs.has(link.url.slice(6).split('#')[0])) problem(`broken article link ${link.url}`);
      else if (!link.url.startsWith('/blog/') && !staticRoutes.has(pageOf(link.url))) problem(`unknown internal route ${link.url}`);
      if (link.url.startsWith('/') && !link.url.startsWith('/blog/') && !commercialByPath[link.url] && pageOf(link.url) !== '/contact') warnings.push(`${article.slug}: internal link ${link.url} is not a registered commercial destination`);
    }
    const blogTargets = [...new Set(blog.map(l => l.url.slice(6).split('#')[0]))].filter(s => s !== article.slug);
    blogTargets.forEach(target => contextualInbound.get(target)?.add(article.slug));
    commercialLinks.forEach(link => { commercialInbound.get(link.pageId).add(article.slug); noteAnchor(link.anchor, article.slug, 'body'); });
    const inArticle = new Set();
    for (const link of commercialLinks) {
      const key = link.anchor.toLowerCase();
      if (inArticle.has(key)) problem(`anchor repeated inside article: "${link.anchor}"`);
      inArticle.add(key);
    }
    Object.assign(report, {
      contextualRelated: blogTargets.length,
      totalRelated: new Set([...blogTargets, ...related]).size,
      commercialLinks: commercialLinks.map(({ anchor, url, placement }) => ({ anchor, url, placement })),
      aboveFold: commercialLinks.some(l => l.placement === 'above-fold'),
    });
    if (blogTargets.length < RULES.minSupporting) problem(`only ${blogTargets.length} contextual supporting article links (minimum ${RULES.minSupporting})`);
    if (blogTargets.length > RULES.maxSupporting) problem(`${blogTargets.length} supporting article links (maximum ${RULES.maxSupporting})`);
    if (commercialLinks.length < RULES.minCommercial || commercialLinks.length > RULES.maxCommercial) problem(`${commercialLinks.length} commercial links (expected ${RULES.minCommercial}–${RULES.maxCommercial})`);
    if (!report.aboveFold) problem('no commercial link above the fold');
  } else {
    const step = legacySteps[article.slug];
    const page = step && commercial.find(p => p.id === step.pageId);
    if (!page) problem('no commercial next step configured');
    else { commercialInbound.get(page.id).add(article.slug); noteAnchor(step.anchor, article.slug, 'legacy next step'); }
    Object.assign(report, {
      contextualRelated: 0, totalRelated: related.length,
      commercialLinks: page ? [{ anchor: step.anchor, url: page.path, placement: 'after-article next step' }] : [],
      aboveFold: false, note: 'Legacy short guide: related links come from the curated/template module; one commercial next step follows the body. Migrate to Markdown to add contextual links.',
    });
    if (related.length < RULES.minRelated) problem(`only ${related.length} related article links`);
  }
  if (report.totalRelated < RULES.minRelated) problem(`links to only ${report.totalRelated} related articles (minimum ${RULES.minRelated})`);
  if (report.commercialLinks.length < RULES.minCommercialAny) problem('no commercial link');
  return report;
});

for (const report of live) {
  report.inboundContextual = contextualInbound.get(report.slug).size;
  report.inboundTotal = new Set([...contextualInbound.get(report.slug), ...templateInbound.get(report.slug)]).size;
  if (report.inboundTotal < 1) { report.problems.push('orphan: no inbound article links'); errors.push(`${report.slug}: orphan article`); }
  if (report.kind === 'markdown' && report.inboundContextual < 1) { report.problems.push('no contextual inbound link'); errors.push(`${report.slug}: no contextual inbound link`); }
}

// ---------- commercial pages: inbound coverage and links back ----------
const pageFile = { '/iptv-for-firestick': 'app/iptv-for-firestick/page.tsx', '/iptv-for-samsung-smart-tv': 'app/iptv-for-samsung-smart-tv/page.tsx', '/iptv-for-lg-smart-tv': 'app/iptv-for-lg-smart-tv/page.tsx', '/iptv-for-android-tv': 'app/iptv-for-android-tv/page.tsx', '/': 'app/page.tsx', '/contact': 'app/contact/page.tsx' };
const homeSupporters = new Set([...commercialInbound.get('plans'), ...commercialInbound.get('compare')]);
const commercialReport = commercial.map(page => {
  const supporters = [...commercialInbound.get(page.id)];
  const route = pageOf(page.path);
  const file = pageFile[route];
  const exists = file && fs.existsSync(path.join(root, file));
  // Pages render getSupportingArticles(): every supporting article is eligible for the reciprocal list (capped at 8, home 6, contact 4).
  const linkBackPool = route === '/' ? homeSupporters.size : supporters.length;
  const linkBackCap = route === '/' ? 6 : route === '/contact' ? 4 : 8;
  const entry = { id: page.id, url: page.path, label: page.label, supportingArticles: supporters.length, contextual: supporters.filter(s => published.find(a => a.slug === s)?.kind === 'markdown').length, routeExists: Boolean(exists), linksBackTo: Math.min(linkBackPool, linkBackCap) };
  if (!exists) errors.push(`commercial page route missing for ${page.path}`);
  if (supporters.length < RULES.minCommercialInbound) errors.push(`${page.path} receives links from only ${supporters.length} articles (minimum ${RULES.minCommercialInbound})`);
  if (entry.linksBackTo < RULES.minLinkBack) errors.push(`${page.path} links back to only ${entry.linksBackTo} related articles (minimum ${RULES.minLinkBack})`);
  return entry;
});
const linkBackSources = {
  device: read('app/commercial/DeviceLanding.tsx').includes('getSupportingArticles(page.path)'),
  home: read('app/page.tsx').includes('getHomeSupportingArticles'),
  contact: read('app/contact/page.tsx').includes('getSupportingArticles("/contact"'),
};
for (const [name, ok] of Object.entries(linkBackSources)) if (!ok) errors.push(`commercial ${name} page does not render its related-articles list`);

// ---------- plan audit ----------
let plan = null;
const planReport = { articles: 0, problems: [] };
if (fs.existsSync(path.join(root, 'docs/seo/content-plan/keyword-plan.json'))) {
  plan = JSON.parse(read('docs/seo/content-plan/keyword-plan.json'));
  const planned = new Set(plan.keywords.map(item => item.slug));
  const inbound = new Map(plan.keywords.map(item => [item.slug, 0]));
  const planCommercialInbound = new Map(commercial.map(page => [page.id, 0]));
  for (const item of plan.keywords) {
    const fail = message => planReport.problems.push(`${item.slug}: ${message}`);
    const n = item.commercialLinks.length;
    if (n < RULES.minCommercial || n > RULES.maxCommercial) fail(`${n} commercial links`);
    if (!item.commercialLinks.some(l => l.placement === 'above-fold')) fail('no above-the-fold commercial link');
    const anchors = item.commercialLinks.map(l => l.anchor.toLowerCase());
    if (new Set(anchors).size !== anchors.length) fail('anchor repeated inside article');
    item.commercialLinks.forEach(l => { noteAnchor(l.anchor, item.slug, 'plan'); planCommercialInbound.set(l.pageId, planCommercialInbound.get(l.pageId) + 1); });
    const targets = item.supportingLinks.map(l => l.slug);
    if (targets.length < RULES.minSupporting || targets.length > RULES.maxSupporting) fail(`${targets.length} supporting links`);
    if (new Set(targets).size < RULES.minRelated) fail('fewer than 3 related articles');
    for (const target of targets) {
      if (!planned.has(target) && !slugs.has(target)) fail(`supporting link to unknown article ${target}`);
      if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
    }
  }
  for (const [slug, count] of inbound) if (count < RULES.minInbound) planReport.problems.push(`${slug}: only ${count} planned inbound article links`);
  for (const page of commercial) if (planCommercialInbound.get(page.id) < RULES.minCommercialInbound) planReport.problems.push(`${page.path}: only ${planCommercialInbound.get(page.id)} planned links`);
  planReport.articles = plan.keywords.length;
  planReport.commercialInbound = Object.fromEntries(planCommercialInbound);
  planReport.minPlannedInbound = Math.min(...inbound.values());
  planReport.problems.forEach(p => errors.push(`plan: ${p}`));
}

// ---------- sitewide anchor cap ----------
const anchorReport = [...anchorUses.entries()].map(([anchor, uses]) => ({ anchor, uses: uses.length, liveUses: uses.filter(u => u.source !== 'plan').length })).sort((a, b) => b.uses - a.uses || a.anchor.localeCompare(b.anchor));
for (const entry of anchorReport) if (entry.uses > RULES.anchorCap) errors.push(`commercial anchor "${entry.anchor}" used ${entry.uses}× (cap ${RULES.anchorCap})`);
const liveAnchors = anchorReport.filter(a => a.liveUses > 0);

const summary = {
  liveArticles: live.length,
  markdownArticles: live.filter(a => a.kind === 'markdown').length,
  legacyArticles: live.filter(a => a.kind === 'legacy').length,
  liveCommercialLinks: live.reduce((sum, a) => sum + a.commercialLinks.length, 0),
  liveContextualArticleLinks: live.reduce((sum, a) => sum + a.contextualRelated, 0),
  liveDistinctCommercialAnchors: liveAnchors.length,
  liveMaxAnchorReuse: Math.max(...liveAnchors.map(a => a.liveUses)),
  articlesWithAboveFoldLink: live.filter(a => a.aboveFold).length,
  orphans: live.filter(a => a.inboundTotal < 1).length,
  plannedArticles: planReport.articles,
  errors: errors.length,
  warnings: warnings.length,
};
const result = { auditedAt: new Date().toISOString().slice(0, 10), rules: RULES, summary, commercialPages: commercialReport, liveArticles: live, plan: planReport, anchors: anchorReport, errors, warnings };
console.log(JSON.stringify(process.argv.includes('--json') ? result : { summary, errors: errors.slice(0, 50), warnings: warnings.slice(0, 20) }, null, 2));

if (writeReport) {
  const outDir = path.join(root, 'docs/seo/content-plan');
  fs.writeFileSync(path.join(outDir, 'internal-link-audit.json'), `${JSON.stringify(result, null, 2)}\n`);
  const row = cells => `| ${cells.map(c => String(c).replace(/\|/g, '\\|')).join(' | ')} |`;
  const ok = value => value ? '✅' : '❌';
  const md = `# Internal linking audit

**Audited:** ${result.auditedAt} · **Generated by:** \`npm run audit:links\` (\`scripts/seo/audit-internal-links.mjs --report\`) · **Result:** ${errors.length ? `❌ ${errors.length} problems` : '✅ all rules pass'}

## Scope and method

The audit parses every published article (Markdown guides and legacy TypeScript guides), the related-article module, the legacy commercial next steps, the commercial page routes and the 100-article plan. It checks link placement, counts, anchors, targets and reciprocity. It does not crawl the deployed site, measure rankings or replace Search Console link reports.

## Rules

| Rule | Threshold | Result |
| --- | --- | --- |
| Every article links to related articles | ≥ ${RULES.minRelated} | ${ok(live.every(a => a.totalRelated >= RULES.minRelated))} ${live.filter(a => a.totalRelated >= RULES.minRelated).length}/${live.length} |
| Every article links to a commercial page | ≥ ${RULES.minCommercialAny} | ${ok(live.every(a => a.commercialLinks.length >= 1))} ${live.filter(a => a.commercialLinks.length >= 1).length}/${live.length} |
| Markdown guides: contextual commercial links | ${RULES.minCommercial}–${RULES.maxCommercial} | ${ok(live.filter(a => a.kind === 'markdown').every(a => a.commercialLinks.length >= RULES.minCommercial && a.commercialLinks.length <= RULES.maxCommercial))} |
| Markdown guides: commercial link above the fold | ≥ 1 | ${ok(summary.articlesWithAboveFoldLink === summary.markdownArticles)} ${summary.articlesWithAboveFoldLink}/${summary.markdownArticles} |
| Markdown guides: supporting article links | ${RULES.minSupporting}–${RULES.maxSupporting} | ${ok(live.filter(a => a.kind === 'markdown').every(a => a.contextualRelated >= RULES.minSupporting && a.contextualRelated <= RULES.maxSupporting))} |
| No anchor repeated inside an article | 0 repeats | ${ok(!errors.some(e => e.includes('repeated inside')))} |
| Exact commercial anchor sitewide (live + plan) | ≤ ${RULES.anchorCap} uses | ${ok(!errors.some(e => e.includes('cap')))} (live: ${summary.liveDistinctCommercialAnchors} distinct anchors, max reuse ${summary.liveMaxAnchorReuse}) |
| Every commercial page receives links from multiple articles | ≥ ${RULES.minCommercialInbound} | ${ok(commercialReport.every(c => c.supportingArticles >= RULES.minCommercialInbound))} |
| Every commercial page links back to related articles | ≥ ${RULES.minLinkBack} | ${ok(commercialReport.every(c => c.linksBackTo >= RULES.minLinkBack))} |
| No orphan articles / broken internal links | 0 | ${ok(summary.orphans === 0 && !errors.some(e => e.includes('broken') || e.includes('unknown internal')))} |
| Planned articles meet the same rules | ${planReport.articles} articles | ${ok(planReport.problems.length === 0)} (min planned inbound: ${planReport.minPlannedInbound ?? '—'}) |

## Commercial pages

| Commercial page | URL | Supporting articles (live) | Of which contextual | Planned links | Links back to articles |
| --- | --- | ---: | ---: | ---: | ---: |
${commercialReport.map(c => row([c.label, `\`${c.url}\``, c.supportingArticles, c.contextual, planReport.commercialInbound?.[c.id] ?? '—', c.linksBackTo])).join('\n')}

Device pages render every supporting article (up to 8) in "Related setup and troubleshooting guides"; the home page lists up to 6 guides that link to plans/compare in its setup section; the contact page lists up to 4. These lists are computed from the content at build time, so they grow as new articles link in.

## Published Markdown guides (contextual links)

| Article | Supporting article links | Related total | Commercial links | Above fold | Inbound (contextual / total) | Commercial anchors (placement) |
| --- | ---: | ---: | ---: | :---: | --- | --- |
${live.filter(a => a.kind === 'markdown').map(a => row([`\`${a.slug}\``, a.contextualRelated, a.totalRelated, a.commercialLinks.length, a.aboveFold ? '✅' : '❌', `${a.inboundContextual} / ${a.inboundTotal}`, a.commercialLinks.map(l => `${l.anchor} → ${l.url} (${l.placement})`).join('<br>')])).join('\n')}

## Legacy guides (template related links + commercial next step)

| Article | Related links (module) | Commercial next step | Inbound (contextual / total) |
| --- | ---: | --- | --- |
${live.filter(a => a.kind === 'legacy').map(a => row([`\`${a.slug}\``, a.totalRelated, a.commercialLinks.map(l => `${l.anchor} → ${l.url}`).join(''), `${a.inboundContextual} / ${a.inboundTotal}`])).join('\n')}

Legacy guides are short, plain-text articles; their related links are rendered by the curated/template module rather than inside the prose. Recommended follow-up: migrate the legacy guides that map to a planned cluster (see the plan's retrofit table) to Markdown so they carry contextual links too.

## Commercial anchor distribution (live)

| Anchor | Live uses | Live + planned uses |
| --- | ---: | ---: |
${liveAnchors.map(a => row([a.anchor, a.liveUses, a.uses])).join('\n')}

## Problems

${errors.length ? errors.map(e => `- ❌ ${e}`).join('\n') : '- None.'}
${warnings.length ? `\n### Warnings\n\n${warnings.map(w => `- ⚠️ ${w}`).join('\n')}` : ''}
`;
  fs.writeFileSync(path.join(outDir, 'INTERNAL-LINKING-AUDIT.md'), md);
}
if (errors.length) process.exitCode = 1;
