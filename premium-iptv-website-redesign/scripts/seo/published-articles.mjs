import fs from 'node:fs';
import path from 'node:path';

/** Topic-cluster and device mapping for already published articles (used by the plan builder and link audit). */
export const publishedTaxonomy = {
  'firestick-buffering-but-internet-is-fine': { c: 'V', d: 'firestick' },
  'iptv-epg-not-updating': { c: 'E', d: 'generic' },
  'iptv-app-not-working-on-firestick': { c: 'P', d: 'firestick' },
  'tivimate-epg-no-information': { c: 'P', d: 'androidtv' },
  'tivimate-playlist-is-processed-please-wait': { c: 'P', d: 'androidtv' },
  'mag-box-portal-not-loading': { c: 'T', d: 'generic' },
  'iptv-channels-not-loading': { c: 'T', d: 'generic' },
  'iptv-app-keeps-crashing': { c: 'T', d: 'generic' },
  'iptv-app-not-working-on-samsung-tv': { c: 'P', d: 'samsung' },
  'iptv-app-not-available-on-lg-tv': { c: 'P', d: 'lg' },
  'firestick-black-screen-after-logo': { c: 'F', d: 'firestick' },
  'how-to-organize-iptv-channels': { c: 'P', d: 'generic' },
  'what-is-xmltv-epg': { c: 'E', d: 'generic' },
  'iptv-player-vs-iptv-service': { c: 'P', d: 'generic' },
  'tivimate-vs-iptv-smarters': { c: 'P', d: 'androidtv' },
  'firestick-not-connecting-to-wifi-but-other-devices-will': { c: 'F', d: 'firestick' },
  'samsung-tv-apps-not-working-but-connected-to-internet': { c: 'T', d: 'samsung' },
  'android-tv-storage-space-running-out': { c: 'A', d: 'androidtv' },
  'streaming-buffering-but-internet-is-fine': { c: 'V', d: 'generic' },
  'how-does-iptv-work-on-firestick': { c: 'F', d: 'firestick' },
  'fire-tv-streaming-setup-checklist': { c: 'F', d: 'firestick' },
  'samsung-smart-tv-streaming-setup': { c: 'T', d: 'samsung' },
  'lg-webos-streaming-app-compatibility': { c: 'P', d: 'lg' },
  'android-tv-streaming-player-setup': { c: 'A', d: 'androidtv' },
  'google-tv-streaming-app-checklist': { c: 'A', d: 'androidtv' },
  'ethernet-or-wifi-for-tv-streaming': { c: 'V', d: 'generic' },
  'improve-wifi-signal-for-smart-tv': { c: 'V', d: 'generic' },
  'troubleshoot-buffering-step-by-step': { c: 'V', d: 'generic' },
  'home-network-bandwidth-for-streaming': { c: 'V', d: 'generic' },
  'electronic-program-guide-explained': { c: 'E', d: 'generic' },
  'streaming-device-storage-and-updates': { c: 'F', d: 'generic' },
  'streaming-device-remote-not-responding': { c: 'F', d: 'firestick' },
  'streaming-app-wont-open': { c: 'T', d: 'generic' },
  'what-affects-streaming-quality': { c: 'V', d: 'generic' },
  'streaming-black-screen-with-audio': { c: 'T', d: 'generic' },
  'streaming-audio-language-and-track-issues': { c: 'T', d: 'generic' },
};

export function splitFrontMatter(source, file = 'article') {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`Missing JSON front matter: ${file}`);
  return { data: JSON.parse(match[1]), body: match[2] };
}

/** Reads every published article: Markdown editorial guides and the legacy TypeScript posts. */
export function loadPublishedArticles(root = process.cwd()) {
  const directory = path.join(root, 'content/blog');
  const markdown = fs.readdirSync(directory).filter(file => file.endsWith('.md')).map(file => {
    const { data, body } = splitFrontMatter(fs.readFileSync(path.join(directory, file), 'utf8'), file);
    return data.status === 'ready' ? { slug: data.slug, title: data.seoTitle, keyword: data.keywords?.[0] ?? data.slug, kind: 'markdown', file: path.join('content/blog', file), body, data } : null;
  }).filter(Boolean);
  const legacy = ['posts.ts', 'additional-posts.ts'].flatMap(file => {
    const source = fs.readFileSync(path.join(root, 'app/blog', file), 'utf8');
    return [...source.matchAll(/slug: "([^"]+)",\s*\n\s*title:\s*\n?\s*"([^"]+)"/g)].map(m => ({ slug: m[1], title: m[2], keyword: m[2], kind: 'legacy', file: path.join('app/blog', file) }));
  });
  return [...markdown, ...legacy].map(article => ({ ...article, ...(publishedTaxonomy[article.slug] ?? { c: null, d: 'generic' }) }));
}
