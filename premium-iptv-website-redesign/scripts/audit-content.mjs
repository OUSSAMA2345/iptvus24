import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const plan = JSON.parse(fs.readFileSync(path.join(root, 'docs/editorial/priority-plan.json'), 'utf8'));
const directory = path.join(root, 'content/blog');
const legacy = ['posts.ts', 'additional-posts.ts'].flatMap(file => [...fs.readFileSync(path.join(root, 'app/blog', file), 'utf8').matchAll(/slug: "([^"]+)"/g)].map(match => match[1]));
const files = fs.readdirSync(directory).filter(file => file.endsWith('.md'));
const slugs = new Set([...legacy, ...files.map(file => file.slice(0, -3))]);
const pageRoutes = new Set(['/', '/blog', '/contact', '/about', '/privacy', '/terms', '/refund', '/status', '/reviews', '/cookies']);
const errors = [];
const reports = [];
const paragraphs = new Map();
const bodies = new Map();
const text = value => value.replace(/```[\s\S]*?```/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_#`>|]/g, ' ');
const words = value => text(value).match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? [];
const id = value => value.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');
for (const file of files) {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(fs.readFileSync(path.join(directory, file), 'utf8'));
  if (!match) { errors.push(`${file}: missing JSON front matter`); continue; }
  const data = JSON.parse(match[1]);
  if (data.status !== 'ready') continue;
  const body = match[2].trim();
  const fail = message => errors.push(`${file}: ${message}`);
  const prose = body.replace(/## Table of contents\n[\s\S]*?(?=\n## )/, '');
  const count = words(prose).length;
  const headings = [...body.matchAll(/^#{1,3} (.+)$/gm)].map(m => m[1]);
  const ids = headings.map(id);
  const faq = body.split('## Frequently asked questions\n')[1]?.split('\n## Conclusion')[0] ?? '';
  const questions = [...faq.matchAll(/### (.+)\n\n([\s\S]*?)(?=\n### |$)/g)].map(m => ({ question: m[1], answer: m[2].trim() }));
  const canonical = `https://www.iptvus24.com/blog/${data.slug}`;
  if (count < 2000) fail(`only ${count} prose words (code, metadata and TOC excluded)`);
  if (count > 3500) fail(`more than preferred maximum: ${count}`);
  if (file !== `${data.slug}.md` || legacy.includes(data.slug)) fail('duplicate or mismatched slug');
  if (plan.find(item => item.priority === data.priority)?.slug !== data.slug) fail('priority mismatch');
  if (!body.startsWith(`# ${data.h1}\n`) || [...body.matchAll(/^# /gm)].length !== 1) fail('H1 mismatch');
  if (!data.seoTitle || !data.metaTitle || !data.metaDescription) fail('SEO metadata missing');
  if (data.metaTitle.length + ' | IPTVUS24'.length > 65) fail('meta title is unusually long');
  if (data.metaDescription.length < 120 || data.metaDescription.length > 170) fail('meta description outside editorial range');
  if (!body.includes('## Table of contents') || !body.includes('### ') || !body.includes('## Conclusion')) fail('structure incomplete');
  if (!/\|.*\|\n\|[ -]/.test(body)) fail('comparison table missing');
  if (!/best practices/i.test(body)) fail('best practices missing');
  if (questions.length < 8 || questions.length > 12) fail(`FAQ count: ${questions.length}`);
  if (new Set(ids).size !== ids.length) fail('duplicate heading IDs');
  const article = data.articleJsonLd;
  const schemaFaqs = data.faqJsonLd?.mainEntity ?? [];
  if (article?.['@type'] !== 'Article' || article?.mainEntityOfPage?.['@id'] !== canonical || article?.headline !== data.h1) fail('Article schema mismatch');
  if (article?.datePublished !== data.publishedAt || article?.dateModified !== data.reviewedAt) fail('schema date mismatch');
  if (data.faqJsonLd?.['@type'] !== 'FAQPage' || schemaFaqs.length !== questions.length) fail('FAQ schema missing or wrong length');
  questions.forEach((q, i) => {
    if (schemaFaqs[i]?.name !== q.question || schemaFaqs[i]?.acceptedAnswer?.text !== q.answer) fail(`FAQ schema differs from visible answer ${i + 1}`);
  });
  const links = [...body.matchAll(/\]\(([^)]+)\)/g)].map(m => m[1]);
  for (const link of links) {
    if (link.startsWith('#') && !ids.includes(link.slice(1))) fail(`broken TOC anchor ${link}`);
    if (link.startsWith('/blog/') && !slugs.has(link.slice(6).split('#')[0])) fail(`missing internal article ${link}`);
    if (link.startsWith('/') && !link.startsWith('/blog/') && !pageRoutes.has(link.split('#')[0])) fail(`unknown internal route ${link}`);
  }
  const internalLinks = [...new Set(links.filter(link => link.startsWith('/')))];
  if (internalLinks.length < 2) fail('insufficient contextual internal links');
  if (!Array.isArray(data.imageRecommendations) || data.imageRecommendations.length < 2) fail('image recommendations missing');
  if (!data.internalLinkOpportunities?.every(link => internalLinks.includes(link))) fail('suggested link absent from article');
  if (!links.some(link => /^https:\/\/(www\.amazon\.com|developer\.amazon\.com|tivimate\.com|raw\.githubusercontent\.com)/.test(link))) fail('primary source absent');
  for (const paragraph of prose.split(/\n\n+/)) {
    const normalized = text(paragraph).toLowerCase().replace(/\s+/g, ' ').trim();
    if (words(normalized).length < 35 || paragraph.startsWith('#') || paragraph.startsWith('|')) continue;
    if (paragraphs.has(normalized) && paragraphs.get(normalized) !== file) fail(`repeated long paragraph also in ${paragraphs.get(normalized)}`);
    paragraphs.set(normalized, file);
  }
  bodies.set(file, words(prose).map(word => word.toLowerCase()));
  reports.push({ priority: data.priority, slug: data.slug, words: count, faqs: questions.length, internalLinks: internalLinks.length, metaTitleCharactersWithBrand: data.metaTitle.length + 11, metaDescriptionCharacters: data.metaDescription.length });
}
const similarities = [];
const shingles = tokens => new Set(tokens.slice(0, -11).map((_, i) => tokens.slice(i, i + 12).join(' ')));
for (const [a, aWords] of bodies) for (const [b, bWords] of bodies) {
  if (a >= b) continue;
  const x = shingles(aWords), y = shingles(bWords);
  const shared = [...x].filter(value => y.has(value)).length;
  const overlap = shared / Math.min(x.size, y.size);
  similarities.push({ a, b, twelveWordShingleOverlapPercent: Number((overlap * 100).toFixed(2)) });
  if (overlap > .08) errors.push(`High repeated phrasing: ${a}, ${b}`);
}
reports.sort((a, b) => a.priority - b.priority);
reports.forEach((report, i) => { if (report.priority !== i + 1) errors.push('Published priority sequence has a gap'); });
const pending = plan.filter(item => !reports.some(report => report.slug === item.slug));
const result = { totalRequested: 20, readyArticles: reports.length, batchComplete: pending.length === 0, totalProseWords: reports.reduce((sum, item) => sum + item.words, 0), articles: reports, repeatedPhrasing: similarities, pending: pending.map(item => ({ priority: item.priority, slug: item.slug })), errors, limitations: ['Local repetition checks are not a web-wide plagiarism scan.', 'Writing quality, expertise and competitor superiority require editorial judgment, not a binary automated score.', 'Schema does not guarantee rankings, AI citations or rich results.'] };
console.log(JSON.stringify(result, null, 2));
const reportIndex = process.argv.indexOf('--report');
if (reportIndex >= 0 && process.argv[reportIndex + 1]) fs.writeFileSync(process.argv[reportIndex + 1], `${JSON.stringify(result, null, 2)}\n`);
if (errors.length || (process.argv.includes('--complete') && pending.length)) process.exitCode = 1;
