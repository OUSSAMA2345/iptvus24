#!/usr/bin/env node
/**
 * One-time, idempotent retrofit of contextual internal links into the 20 published Markdown guides.
 * Operations:
 *   aboveFold      – paragraph inserted before the table of contents (above-the-fold commercial link)
 *   section        – paragraph appended to the end of a named H2 section (after compatibility / setup / troubleshooting)
 *   beforeFaq      – paragraph appended to the final best-practices section, i.e. before the FAQ and conclusion
 *   faq            – sentence appended to a visible FAQ answer; FAQPage schema receives the same text without link markup
 * Re-running is safe: an operation whose text is already present is skipped.
 */
import fs from 'node:fs';
import path from 'node:path';
import { splitFrontMatter } from './published-articles.mjs';

const root = process.cwd();
const spec = JSON.parse(fs.readFileSync(path.join(root, 'docs/seo/live-link-retrofit.json'), 'utf8'));
const strip = text => text.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '$1');
let applied = 0;
let skipped = 0;

for (const [slug, operations] of Object.entries(spec.articles)) {
  const file = path.join(root, 'content/blog', `${slug}.md`);
  const { data } = splitFrontMatter(fs.readFileSync(file, 'utf8'), file);
  let body = fs.readFileSync(file, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
  const fail = message => { throw new Error(`${slug}: ${message}`); };
  for (const op of operations) {
    if (body.includes(op.text)) { skipped++; continue; }
    if (op.type === 'aboveFold') {
      const at = body.indexOf('\n## Table of contents');
      if (at < 0) fail('table of contents not found');
      body = `${body.slice(0, at)}\n${op.text}\n${body.slice(at)}`;
    } else if (op.type === 'section' || op.type === 'beforeFaq') {
      const heading = op.type === 'beforeFaq' ? null : `\n## ${op.heading}\n`;
      let end;
      if (heading) {
        const start = body.indexOf(heading);
        if (start < 0) fail(`section not found: ${op.heading}`);
        end = body.indexOf('\n## ', start + heading.length);
      } else {
        end = body.indexOf('\n## Frequently asked questions');
      }
      if (end < 0) fail(`end of section not found: ${op.heading ?? 'before FAQ'}`);
      body = `${body.slice(0, end).replace(/\n+$/, '')}\n\n${op.text}\n${body.slice(end)}`;
    } else if (op.type === 'faq') {
      const marker = `\n### ${op.question}\n\n`;
      const start = body.indexOf(marker);
      if (start < 0) fail(`FAQ not found: ${op.question}`);
      const answerStart = start + marker.length;
      const answerEnd = body.indexOf('\n', answerStart);
      const answer = body.slice(answerStart, answerEnd);
      const updated = `${answer} ${op.text}`;
      body = body.slice(0, answerStart) + updated + body.slice(answerEnd);
      const entity = data.faqJsonLd.mainEntity.find(item => item.name === op.question);
      if (!entity) fail(`FAQ schema entry not found: ${op.question}`);
      entity.acceptedAnswer.text = strip(updated);
    } else fail(`unknown operation ${op.type}`);
    applied++;
  }
  fs.writeFileSync(file, `---\n${JSON.stringify(data, null, 2)}\n---\n${body}`);
}
console.log(JSON.stringify({ applied, skipped }));
