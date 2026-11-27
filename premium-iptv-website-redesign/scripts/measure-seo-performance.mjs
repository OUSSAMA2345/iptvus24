import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(path.join(process.env.SEO_QA_DEPS ?? '/tmp/seo-qa', 'package.json'));
process.env.AWS_EXECUTION_ENV ??= 'AWS_Lambda_nodejs20.x';
const chromiumModule = require('@sparticuz/chromium');
const chromium = chromiumModule.default ?? chromiumModule;
const puppeteer = require('puppeteer-core');
const { default: lighthouse } = await import(pathToFileURL(require.resolve('lighthouse')).href);
const base = process.env.SEO_AUDIT_URL ?? 'http://127.0.0.1:3000';
const browser = await puppeteer.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
const reports = [];
try {
  for (const route of ['/blog', '/blog/firestick-buffering-but-internet-is-fine', '/blog/what-is-xmltv-epg', '/blog/how-does-iptv-work-on-firestick']) {
    const { lhr } = await lighthouse(`${base}${route}`, { port: Number(new URL(browser.wsEndpoint()).port), onlyCategories: ['performance'], logLevel: 'error', formFactor: 'mobile' });
    const value = id => lhr.audits[id]?.numericValue ?? null;
    reports.push({ route, lighthouseVersion: lhr.lighthouseVersion, fetchTime: lhr.fetchTime, performanceScore: lhr.categories.performance.score, lcpMs: value('largest-contentful-paint'), cls: value('cumulative-layout-shift'), totalBlockingTimeMs: value('total-blocking-time'), fcpMs: value('first-contentful-paint'), speedIndexMs: value('speed-index'), transferBytes: value('total-byte-weight'), mainThreadMs: value('mainthread-work-breakdown'), diagnostics: Object.fromEntries(['unused-javascript','unused-css-rules','render-blocking-insight','font-display-insight'].filter(id => lhr.audits[id]).map(id => [id, { score: lhr.audits[id].score, displayValue: lhr.audits[id].displayValue, savings: lhr.audits[id].details?.overallSavingsBytes }])), runtimeError: lhr.runtimeError ?? null, warnings: lhr.runWarnings });
  }
} finally { await browser.close(); }
const output = process.argv[process.argv.indexOf('--report')+1];
const result = { scope: 'One cold Lighthouse mobile simulation per route on a local production server; directional lab evidence, not field Core Web Vitals or an INP measurement.', consent: 'Fresh visit; optional analytics not accepted', fieldData: { lcp: null, inp: null, cls: null, reason: 'No CrUX/Search Console/RUM dataset available to this session; no new tracking added.' }, reports };
if (process.argv.includes('--report') && output) { fs.mkdirSync(path.dirname(output), {recursive:true}); fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n'); }
console.log(JSON.stringify(result,null,2));
if(reports.some(r=>r.runtimeError))process.exitCode=1;
