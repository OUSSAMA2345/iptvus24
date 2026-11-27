import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// Original editorial diagrams, rendered locally; no product photos or broadcast assets.
const require = createRequire(path.join(process.env.SEO_QA_DEPS ?? '/tmp/seo-qa', 'package.json'));
process.env.AWS_EXECUTION_ENV ??= 'AWS_Lambda_nodejs20.x';
const chromiumModule = require('@sparticuz/chromium');
const chromium = chromiumModule.default ?? chromiumModule;
const puppeteer = require('puppeteer-core');
const topics = JSON.parse(fs.readFileSync('content/blog/topics.json', 'utf8'));
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const browser = await puppeteer.launch({executablePath:await chromium.executablePath(),args:chromium.args,headless:true});
fs.mkdirSync('public/images/guides',{recursive:true});
try {
  const page = await browser.newPage();
  await page.setViewport({width:1200,height:630,deviceScaleFactor:1});
  for (const [slug,{diagram}] of Object.entries(topics)) {
    await page.setContent(`<!doctype html><html lang="en"><head><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#0f172a;color:#f8fafc;font-family:Arial,sans-serif;padding:54px}h1{font-size:43px;line-height:1.2;max-width:1000px;margin:18px 0 48px;min-height:104px}.label{color:#93c5fd;letter-spacing:3px;font-size:18px}ol{display:flex;gap:44px;list-style:none;margin:0;padding:0}li{position:relative;width:335px;min-height:182px;border:2px solid #456080;border-radius:18px;padding:24px;background:#17263c;font-size:28px;line-height:1.3}li:not(:last-child):after{content:'→';position:absolute;right:-37px;top:62px;color:#93c5fd}b{display:block;color:#93c5fd;font-size:20px;margin-bottom:14px}footer{position:absolute;bottom:40px;color:#b9c9dc;font-size:17px}</style></head><body><div class="label">STREAMING GUIDE · CONCEPTUAL OVERVIEW</div><h1>${escape(diagram.title)}</h1><ol>${diagram.stages.map((stage,i)=>`<li><b>0${i+1}</b>${escape(stage)}</li>`).join('')}</ol><footer>IPTVUS24 Editorial · An explanatory diagram, not a device screenshot</footer></body></html>`);
    await page.screenshot({path:`public/images/guides/${slug}.png`,type:'png'});
  }
} finally {await browser.close();}
console.log(`Generated ${Object.keys(topics).length} original 1200 × 630 diagrams.`);
