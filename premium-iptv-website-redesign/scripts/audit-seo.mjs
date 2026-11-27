import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const base = process.env.SEO_AUDIT_URL ?? 'http://127.0.0.1:3000';
const site = 'https://www.iptvus24.com';
const plan = JSON.parse(fs.readFileSync('docs/editorial/priority-plan.json', 'utf8'));
const targets = new Set(plan.map(p => p.slug));
const hubResponse = await fetch(`${base}/blog`);
const hub = new JSDOM(await hubResponse.text()).window.document;
const paths = [...new Set([...hub.querySelectorAll('a[href^="/blog/"]')].map(a => a.getAttribute('href')))];
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const pages = [];
const failures = [];
for (const pathname of paths) {
  const response = await fetch(`${base}${pathname}`);
  const html = await response.text();
  const document = new JSDOM(html).window.document;
  const meta = name => document.querySelector(`meta[name="${name}"],meta[property="${name}"]`)?.getAttribute('content') ?? null;
  const graphs = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => { const data = JSON.parse(el.textContent); return data['@graph'] ?? [data]; });
  const slug = pathname.slice(6), canonical = `${site}${pathname}`;
  const article = graphs.filter(g => ['Article','BlogPosting'].includes(g['@type']));
  const faq = graphs.filter(g => g['@type'] === 'FAQPage');
  const breadcrumbs = graphs.filter(g => g['@type'] === 'BreadcrumbList');
  const body = document.querySelector('.blog-markdown');
  const visibleFaq = body ? [...body.querySelectorAll('h3')].filter(h => faq[0]?.mainEntity?.some(q => q.name === h.textContent)) : [];
  const links = [...new Set([...document.querySelectorAll('a[href^="/blog/"]')].map(a => a.getAttribute('href').split('#')[0]))];
  const bodyLinks = body ? [...new Set([...body.querySelectorAll('a[href^="/blog/"]')].map(a => a.getAttribute('href').split('#')[0]))] : [];
  const questionsMatch = faq.length === 1 && faq[0].mainEntity?.every(q => q['@type'] === 'Question' && q.acceptedAnswer?.['@type'] === 'Answer' && visibleFaq.some(h => h.textContent === q.name && h.nextElementSibling?.textContent === q.acceptedAnswer.text));
  const imageUrl = value => typeof value === 'string' ? value : Array.isArray(value) ? imageUrl(value[0]) : value?.url;
  const schemaIssues = [];
  if (article.length !== 1) schemaIssues.push('Expected exactly one Article/BlogPosting');
  const a = article[0];
  if (!a?.headline || a.headline !== document.querySelector('h1')?.textContent || a.mainEntityOfPage?.['@id'] !== canonical || !a.author?.name || !a.publisher?.name || !/^\d{4}-\d{2}-\d{2}/.test(a.datePublished ?? '') || !/^\d{4}-\d{2}-\d{2}/.test(a.dateModified ?? '')) schemaIssues.push('Article identity, required editorial fields or dates inconsistent');
  if (!imageUrl(a?.image)) schemaIssues.push('Article image absent (recommended enhancement)');
  else if (!/^https:\/\//.test(imageUrl(a.image))) schemaIssues.push('Article image must use an absolute HTTPS URL');
  if (targets.has(slug) && (a?.['@id'] !== `${canonical}#article` || a.url !== canonical || a.inLanguage !== 'en' || !['Organization','Person'].includes(a.author?.['@type']) || a.publisher?.['@type'] !== 'Organization' || !a.publisher?.logo?.url || a.dateModified < a.datePublished)) schemaIssues.push('Article graph identity, author/publisher type or date order invalid');
  if (targets.has(slug) && (!questionsMatch || faq[0]?.mainEntity?.length !== 8 || faq[0]?.['@id'] !== `${canonical}#faq`)) schemaIssues.push('FAQ types, identity or visible answers inconsistent');
  const crumbs = breadcrumbs[0]?.itemListElement;
  if (breadcrumbs.length !== 1 || crumbs?.length !== 3 || !crumbs.every((c,i) => c['@type'] === 'ListItem' && c.position === i+1 && /^https:\/\//.test(c.item) && c.name) || crumbs.at(-1).item !== canonical) schemaIssues.push('Breadcrumb sequence or canonical invalid');
  if (targets.has(slug) && (breadcrumbs[0]?.['@id'] !== `${canonical}#breadcrumb` || crumbs?.at(-1)?.name !== document.querySelector('nav[aria-label="Breadcrumb"] [aria-current="page"]')?.textContent)) schemaIssues.push('Breadcrumb identity or visible label inconsistent');
  if (targets.has(slug) && imageUrl(a?.image)) {
    const asset = new URL(imageUrl(a.image));
    const assetResponse = await fetch(`${base}${asset.pathname}`);
    const bytes = Buffer.from(await assetResponse.arrayBuffer());
    if (!assetResponse.ok || bytes.subarray(1,4).toString() !== 'PNG' || bytes.length < 24 || bytes.readUInt32BE(16) !== 1200 || bytes.readUInt32BE(20) !== 630) schemaIssues.push('Article/social image is missing or not the declared 1200-by-630 PNG');
    if (meta('og:image') !== imageUrl(a.image) || meta('twitter:image') !== imageUrl(a.image)) schemaIssues.push('Article and social images disagree');
    const visibleImage = [...document.querySelectorAll('img')].find(img => img.getAttribute('alt') === meta('og:image:alt'));
    if (!visibleImage || visibleImage.getAttribute('width') !== '1200' || visibleImage.getAttribute('height') !== '630') schemaIssues.push('Article diagram missing visible counterpart or reserved dimensions');
  }
  const missingSocialFields = ['og:type','og:title','og:description','og:url','og:image','og:image:width','og:image:height','og:image:alt','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'].filter(key=>!meta(key));
  const duplicatePageTags = ['description','og:title','og:description','og:url','og:image','twitter:card','twitter:title','twitter:description','twitter:image','robots'].filter(key=>document.querySelectorAll(`meta[name="${key}"],meta[property="${key}"]`).length>1);
  const page = {
    missingSocialFields, duplicatePageTags,
    slug, target: targets.has(slug), status: response.status, htmlBytes: Buffer.byteLength(html),
    title: document.title, description: meta('description'), canonical: document.querySelector('link[rel="canonical"]')?.href,
    robots: meta('robots'), h1Count: document.querySelectorAll('h1').length,
    og: Object.fromEntries(['og:type','og:title','og:description','og:url','og:image','og:image:width','og:image:height','og:image:alt','article:published_time','article:modified_time'].map(k => [k,meta(k)])),
    twitter: Object.fromEntries(['twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'].map(k => [k,meta(k)])),
    schemaTypes: graphs.map(g => g['@type']), schemaIssues, articleImage: imageUrl(a?.image) ?? null, questionsMatch: targets.has(slug) ? questionsMatch : null,
    breadcrumbId: breadcrumbs[0]?.['@id'] ?? null, webPageGraph: graphs.some(g => g['@type'] === 'WebPage' && g.url === canonical),
    fontPreloads: [...document.querySelectorAll('link[rel="preload"][as="font"]')].map(link => link.href),
    links, bodyLinks, sitemapOccurrences: sitemap.split(`<loc>${canonical}</loc>`).length-1,
  };
  if (targets.has(slug) && (page.status !== 200 || page.h1Count !== 1 || page.canonical !== canonical || page.sitemapOccurrences !== 1 || /noindex/.test(page.robots) || !page.description || document.querySelectorAll('title').length !== 1 || duplicatePageTags.length || schemaIssues.length || Object.values(page.og).some(v=>!v) || Object.values(page.twitter).some(v=>!v))) failures.push(`${slug}: structural SEO assertion failed`);
  pages.push(page);
}
const duplicates = key => [...new Set(pages.map(p=>p[key]))].map(value => ({ value, slugs: pages.filter(p=>p[key] === value).map(p=>p.slug) })).filter(g=>g.slugs.length>1);
const duplicateMetadata = { titles: duplicates('title'), descriptions: duplicates('description'), canonicals: duplicates('canonical') };
if (Object.values(duplicateMetadata).some(list=>list.length)) failures.push('Duplicate metadata found');
const content = plan.map(({priority,slug}) => {
  const source = fs.readFileSync(`content/blog/${slug}.md`, 'utf8');
  const [,header,body] = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
  const data = JSON.parse(header);
  const words = value => (value.replace(/```[\s\S]*?```/g,'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? []).length;
  const shortSections = body.split(/^## /m).slice(1).map(section => ({ heading: section.split('\n')[0], words: words(section.slice(section.indexOf('\n'))) })).filter(s=>!['Table of contents','Conclusion','Frequently asked questions'].includes(s.heading) && s.words<80);
  const inboundBody = pages.filter(p=>p.slug!==slug && p.bodyLinks.includes(`/blog/${slug}`)).map(p=>p.slug);
  const inboundPages = pages.filter(p=>p.slug!==slug && p.links.includes(`/blog/${slug}`)).map(p=>p.slug);
  return { priority, slug, primaryKeyword: data.keywords[0], shortSections, inboundBody, inboundPages, linkedFromHub: paths.includes(`/blog/${slug}`) };
});
const missing = plan.filter(p=>!pages.some(page=>page.slug===p.slug)).map(p=>p.slug);
if (missing.length || content.some(p=>!p.linkedFromHub || p.inboundPages.length===0 || p.inboundBody.length===0)) failures.push('Missing page or weak/orphan article linking');
// A lexical shortlist is only an aid for intent review, not proof of ranking cannibalization.
const titleTerms = title => new Set(title.toLowerCase().replace(/\| iptvus24$/,'').match(/[a-z0-9]+/g)?.filter(t=>!['a','the','to','on','and','for','is','your','what','how','but','it'].includes(t)));
const overlapCandidates=[];
for(const a of pages) for(const b of pages) { if(a.slug>=b.slug || (!a.target&&!b.target)) continue; const x=titleTerms(a.title),y=titleTerms(b.title);const intersection=[...x].filter(t=>y.has(t)).length;const score=intersection/new Set([...x,...y]).size;if(score>=.25)overlapCandidates.push({a:a.slug,b:b.slug,titleTermJaccard:Number(score.toFixed(3))}); }
overlapCandidates.sort((a,b)=>b.titleTermJaccard-a.titleTermJaccard);
const result = { checkedAt:'2026-11-27', scope:'Local production-build crawl of all blog URLs; priority 1–20 assertions. Not Search Console, Google Rich Results Test, or field CWV.', crawled:pages.length, targetsChecked:pages.filter(p=>p.target).length, missing, duplicateMetadata, content, overlapCandidates, pages, failures, limitations:['Short-section and lexical-overlap flags require editorial judgment.','Schema checks validate supported structure and visible content, not Google eligibility.','Social images are original conceptual diagrams, not screenshots or hands-on evidence.'] };
const output=process.argv[process.argv.indexOf('--report')+1];
if(process.argv.includes('--report')&&output){fs.mkdirSync(new URL('.',`file://${process.cwd()}/${output}`).pathname,{recursive:true});fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify({crawled:result.crawled,targetsChecked:result.targetsChecked,duplicateMetadata,shortSections:content.filter(p=>p.shortSections.length),weakInbound:content.filter(p=>!p.inboundBody.length).map(p=>p.slug),failures},null,2));
if(process.argv.includes('--strict')&&failures.length)process.exitCode=1;
