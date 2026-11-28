import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "../metadata";
import topics from "../../content/blog/topics.json";
import type { BlogPost } from "./posts";

export type EditorialTopic = {
  primaryKeyword: string;
  intent: string;
  relatedSlugs: string[];
  diagram: { title: string; stages: string[]; alt: string };
};
export const editorialTopics: Record<string, EditorialTopic> = topics;
export const socialImage = {
  url: `${SITE_URL}/images/og-image.png`,
  width: 1200,
  height: 630,
  alt: "IPTVUS24 streaming guides and device advice",
};

export function articleWordCount(post: BlogPost): number {
  const prose = post.markdown
    ? post.markdown.body.replace(/## Table of contents\n[\s\S]*?(?=\n## )/, "")
    : post.sections.map(section => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])].join(" ")).join(" ");
  return (prose.replace(/```[\s\S]*?```/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

export function getArticleSocialImage(post: BlogPost) {
  const diagram = editorialTopics[post.slug]?.diagram;
  return diagram ? { ...socialImage, url: `${SITE_URL}/images/guides/${post.slug}.png`, alt: diagram.alt } : socialImage;
}

export function getArticleMetadata(post: BlogPost): Metadata {
  const title = post.markdown?.metaTitle ?? post.title;
  const image = getArticleSocialImage(post);
  return {
    title: post.markdown ? { absolute: `${title} | ${SITE_NAME}` } : title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article", url: `${SITE_URL}/blog/${post.slug}`, siteName: SITE_NAME,
      title, description: post.excerpt, locale: "en_US",
      publishedTime: post.publishedAt, modifiedTime: post.markdown?.reviewedAt ?? post.publishedAt,
      authors: [`${SITE_URL}/about`], section: post.category, tags: post.keywords, images: [image],
    },
    twitter: { card: "summary_large_image", title, description: post.excerpt, images: [image] },
  };
}

export function getArticleStructuredData(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const headline = post.markdown?.h1 ?? post.title;
  const social = getArticleSocialImage(post);
  const image = { "@type": "ImageObject", url: social.url, width: social.width, height: social.height, caption: social.alt };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": url, url, name: headline, description: post.excerpt,
        inLanguage: "en", isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${url}#article` }, breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: image,
      },
      {
        ...(post.markdown?.articleJsonLd ?? {}),
        "@type": post.markdown ? "Article" : "BlogPosting", "@id": `${url}#article`, url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": url }, headline, description: post.excerpt, image,
        datePublished: post.publishedAt, dateModified: post.markdown?.reviewedAt ?? post.publishedAt,
        inLanguage: "en", articleSection: post.category, keywords: post.keywords.join(", "), wordCount: articleWordCount(post),
        author: { "@type": "Organization", name: `${SITE_NAME} Editorial`, url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/icon-1024.png` } },
      },
      ...(post.markdown ? [{ ...post.markdown.faqJsonLd, inLanguage: "en", isPartOf: { "@id": url } }] : []),
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: headline, item: url },
        ],
      },
    ],
  };
}

const supportingRelatedSlugs: Record<string, string[]> = {
  "troubleshoot-buffering-step-by-step": ["streaming-buffering-but-internet-is-fine", "firestick-buffering-but-internet-is-fine", "firestick-not-connecting-to-wifi-but-other-devices-will"],
  "streaming-app-wont-open": ["iptv-app-keeps-crashing", "iptv-app-not-working-on-firestick", "iptv-app-not-working-on-samsung-tv"],
  "electronic-program-guide-explained": ["what-is-xmltv-epg", "iptv-epg-not-updating", "tivimate-epg-no-information"],
  "fire-tv-streaming-setup-checklist": ["how-does-iptv-work-on-firestick", "iptv-app-not-working-on-firestick", "firestick-not-connecting-to-wifi-but-other-devices-will"],
  "lg-webos-streaming-app-compatibility": ["iptv-app-not-available-on-lg-tv", "tivimate-vs-iptv-smarters", "iptv-player-vs-iptv-service"],
  "samsung-smart-tv-streaming-setup": ["iptv-app-not-working-on-samsung-tv", "samsung-tv-apps-not-working-but-connected-to-internet", "iptv-app-not-available-on-lg-tv"],
  "streaming-device-storage-and-updates": ["android-tv-storage-space-running-out", "iptv-app-keeps-crashing", "tivimate-playlist-is-processed-please-wait"],
  "what-affects-streaming-quality": ["streaming-buffering-but-internet-is-fine", "firestick-buffering-but-internet-is-fine", "iptv-channels-not-loading"],
  // Give every legacy guide at least one inbound article link (no orphans; see docs/seo/content-plan/INTERNAL-LINKING-AUDIT.md).
  "streaming-app-privacy-and-security": ["streaming-on-iphone-privacy-checklist", "streaming-account-privacy-and-security", "streaming-on-ipad-setup"],
  "check-device-compatibility": ["streaming-on-windows-pc", "streaming-on-mac-setup", "choose-a-streaming-device-for-your-tv"],
  "compare-streaming-plan-prices": ["streaming-subscription-cost-comparison", "streaming-service-refund-and-cancellation-checks", "choose-an-internet-tv-service"],
  "regional-content-availability-and-rights": ["watching-streaming-services-while-travelling", "lawful-live-sports-streaming-checklist", "choose-an-internet-tv-service"],
  "captions-and-subtitles-on-streaming": ["streaming-accessibility-features", "streaming-audio-language-and-track-issues", "streaming-parental-controls-guide"],
  "home-network-bandwidth-for-streaming": ["reduce-streaming-data-use", "ethernet-or-wifi-for-tv-streaming", "streaming-buffering-but-internet-is-fine"],
  "choose-a-streaming-device-for-your-tv": ["streaming-device-remote-not-responding", "check-device-compatibility", "fire-tv-streaming-setup-checklist"],
};

export function getRelatedPosts(post: BlogPost, posts: BlogPost[]): BlogPost[] {
  const curated = editorialTopics[post.slug]?.relatedSlugs ?? supportingRelatedSlugs[post.slug] ?? [];
  const curatedPosts = curated.map(slug => posts.find(item => item.slug === slug)).filter((item): item is BlogPost => Boolean(item) && item?.slug !== post.slug);
  // Legacy articles without an editorial map retain a deterministic category-based fallback.
  const fallback = posts.filter(item => item.slug !== post.slug && !curated.includes(item.slug))
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || a.slug.localeCompare(b.slug));
  return [...curatedPosts, ...fallback].slice(0, 3);
}
