import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// Optional browser QA dependencies live outside the repository; see editorial PROGRESS.md.
const require = createRequire(path.join(process.env.EDITORIAL_QA_DEPS ?? '/tmp/editorial-qa', 'package.json'));
const puppeteer = require('puppeteer-core');
process.env.AWS_EXECUTION_ENV ??= 'AWS_Lambda_nodejs20.x';
const chromiumModule = require('@sparticuz/chromium');
const chromium = chromiumModule.default ?? chromiumModule;
const { AxePuppeteer } = require('@axe-core/puppeteer');
const base = process.env.EDITORIAL_QA_URL ?? 'http://127.0.0.1:3000';
const plan = JSON.parse(fs.readFileSync('docs/editorial/priority-plan.json', 'utf8'));
const reports = [], errors = [], pageErrors = [];
const browser = await puppeteer.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
try {
  const page = await browser.newPage();
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(`${base}/blog/${plan[0].slug}`, { waitUntil: 'networkidle0' });
  const initialAxe = await new AxePuppeteer(page).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  const existingConsentFindings = initialAxe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ html: n.html, target: n.target, summary: n.failureSummary })) }));
  if (initialAxe.violations.some(v => v.id !== 'color-contrast' || v.nodes.some(n => !/Read the Cookie Policy|Accept optional/.test(n.html)))) errors.push('Unexpected initial-page accessibility finding');
  // Record the existing banner separately, then use its real rejection control. No consent implementation changes.
  await page.evaluate(() => [...document.querySelectorAll('button')].find(button => button.textContent.trim() === 'Reject optional')?.click());
  await page.waitForSelector('aside[aria-labelledby="cookie-title"]', { hidden: true });
  for (const theme of ['day', 'night']) {
    await page.evaluateOnNewDocument(value => localStorage.setItem('iptvus24-visual-theme', value), theme);
    for (const item of plan) {
      await page.setViewport({ width: 1440, height: 1000 });
      const response = await page.goto(`${base}/blog/${item.slug}`, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.blog-markdown');
      const report = await page.evaluate(() => {
        const graphs = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => {
          const data = JSON.parse(el.textContent); return data['@graph'] ?? [data];
        });
        const faq = graphs.filter(node => node['@type'] === 'FAQPage');
        const root = document.querySelector('.blog-markdown');
        return {
          h1: document.querySelectorAll('h1').length,
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          articles: graphs.filter(node => node['@type'] === 'Article').length,
          faqPages: faq.length,
          faqItems: faq[0]?.mainEntity?.length,
          theme: document.documentElement.dataset.visualTheme,
          brokenAnchors: [...root.querySelectorAll('a[href^="#"]')].map(el => el.getAttribute('href')).filter(href => !document.getElementById(href.slice(1))),
          visibleQuestionsMatch: faq[0]?.mainEntity?.every(q => [...root.querySelectorAll('h3')].some(h => h.textContent === q.name && h.nextElementSibling?.textContent === q.acceptedAnswer.text)),
          tables: root.querySelectorAll('table').length,
        };
      });
      report.slug = item.slug;
      report.status = response.status();
      report.widths = [];
      for (const width of [320, 390, 768, 1440, 1920]) {
        await page.setViewport({ width, height: 1000 });
        report.widths.push(await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth })));
      }
      const axe = await new AxePuppeteer(page).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      report.accessibilityViolations = axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
      if (![200, 304].includes(report.status) || report.h1 !== 1 || report.articles !== 1 || report.faqPages !== 1 || report.faqItems !== 8 || !report.visibleQuestionsMatch || report.theme !== theme || report.brokenAnchors.length || report.canonical !== `https://www.iptvus24.com/blog/${item.slug}` || report.widths.some(w => w.scroll > w.client + 1) || report.accessibilityViolations.length) errors.push(`${item.slug} (${theme}) failed browser assertions`);
      reports.push(report);
    }
  }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const sitemapMissing = plan.filter(item => !sitemap.includes(`/blog/${item.slug}<`)).map(item => item.slug);
  await page.goto(`${base}/blog`, { waitUntil: 'networkidle0' });
  const listing = await page.evaluate(() => [...document.querySelectorAll('a[href^="/blog/"]')].map(a => a.getAttribute('href').slice(6)));
  const listingMissing = plan.filter(item => !listing.includes(item.slug)).map(item => item.slug);
  const unknownStatus = (await page.goto(`${base}/blog/editorial-nonexistent-check`)).status();
  if (sitemapMissing.length || listingMissing.length || unknownStatus !== 404 || pageErrors.length) errors.push('Listing, sitemap, 404 or JavaScript errors');
  const result = { checkedAt: '2026-11-27', mode: 'Local production build; not a production deployment check', articlesChecked: plan.length, themeChecks: reports.length, accessibilityScope: 'Full pages after rejecting optional cookies; initial existing banner findings recorded separately', existingConsentFindings, viewportWidths: [320,390,768,1440,1920], reports, sitemapMissing, listingMissing, unknownStatus, pageErrors, errors, limitations: ['Automated accessibility checks are not a complete manual accessibility audit.', 'Browser rendering does not verify external device behavior, content rights or search performance.'] };
  fs.writeFileSync('docs/editorial/browser-audit.json', `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify({ articles: plan.length, themeChecks: reports.length, sitemapMissing, listingMissing, unknownStatus, pageErrors, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
