// @vitest-environment node
import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { blogPosts } from "../app/blog/posts";
import { articleWordCount, editorialTopics, getArticleMetadata, getArticleStructuredData, getRelatedPosts, getArticleSocialImage } from "../app/blog/seo";
import sitemap from "../app/sitemap";
import { SITE_URL } from "../app/metadata";

describe("priority-article SEO contracts", () => {
  const articles = blogPosts.filter(post => post.markdown);

  it("assigns all twenty articles distinct primary queries and explicit intent boundaries", () => {
    expect(articles).toHaveLength(20);
    expect(Object.keys(editorialTopics).sort()).toEqual(articles.map(p => p.slug).sort());
    expect(new Set(Object.values(editorialTopics).map(t => t.primaryKeyword)).size).toBe(20);
    for (const post of articles) {
      expect(post.keywords[0]).toBe(editorialTopics[post.slug].primaryKeyword);
      expect(editorialTopics[post.slug].intent.length).toBeGreaterThan(60);
    }
  });

  it("uses three real, distinct, intentional related articles without self-links", () => {
    for (const post of blogPosts) {
      const related = getRelatedPosts(post, blogPosts);
      expect(related).toHaveLength(3);
      expect(new Set(related.map(p => p.slug)).size).toBe(3);
      expect(related.some(p => p.slug === post.slug)).toBe(false);
      if (post.markdown) expect(related.map(p => p.slug)).toEqual(editorialTopics[post.slug].relatedSlugs);
    }
  });

  it("gives every priority article a contextual inbound link, not just a hub or a template link", () => {
    for (const post of articles) {
      expect(articles.some(other => other.slug !== post.slug && other.markdown?.body.includes(`](/blog/${post.slug})`))).toBe(true);
    }
  });

  it("connects Article, WebPage and BreadcrumbList with stable canonical identities", () => {
    for (const post of articles) {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const graph = getArticleStructuredData(post)["@graph"];
      const article = graph.find(g => g["@type"] === "Article") as Record<string, unknown>;
      const page = graph.find(g => g["@type"] === "WebPage") as Record<string, unknown>;
      const breadcrumb = graph.find(g => g["@type"] === "BreadcrumbList") as Record<string, unknown>;
      expect(article).toMatchObject({ "@id": `${url}#article`, url, headline: post.markdown!.h1, mainEntityOfPage: { "@id": url }, datePublished: post.publishedAt, dateModified: post.markdown!.reviewedAt, wordCount: articleWordCount(post), image: { url: getArticleSocialImage(post).url, width: 1200, height: 630 }, author: { name: "IPTVUS24 Editorial" }, publisher: { "@id": `${SITE_URL}/#organization` } });
      expect(page).toMatchObject({ "@id": url, url, mainEntity: { "@id": `${url}#article` }, breadcrumb: { "@id": `${url}#breadcrumb` } });
      expect(breadcrumb).toMatchObject({ "@id": `${url}#breadcrumb`, itemListElement: [ { position: 1, item: SITE_URL }, { position: 2, item: `${SITE_URL}/blog` }, { position: 3, item: url, name: post.markdown!.h1 } ] });
      expect(articleWordCount(post)).toBeGreaterThanOrEqual(2500);
    }
  });

  it("preserves FAQPage question and answer types and exact visible text without fabricated extras", () => {
    for (const post of articles) {
      const graph = getArticleStructuredData(post)["@graph"];
      const faq = graph.find(g => g["@type"] === "FAQPage") as unknown as { mainEntity: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }[] };
      expect(faq.mainEntity).toHaveLength(8);
      // Visible answers may contain plain internal links; schema text is the same answer without link markup.
      const faqBody = post.markdown!.body.split("## Frequently asked questions\n")[1].split("\n## Conclusion")[0]
        .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1");
      for (const q of faq.mainEntity) {
        expect(q["@type"]).toBe("Question");
        expect(q.acceptedAnswer["@type"]).toBe("Answer");
        expect(faqBody).toContain(`### ${q.name}\n\n${q.acceptedAnswer.text}`);
      }
    }
  });

  it("sets explicit canonical, Open Graph and Twitter image metadata on every priority page", () => {
    for (const post of articles) {
      const meta = getArticleMetadata(post);
      expect(meta.alternates?.canonical).toBe(`${SITE_URL}/blog/${post.slug}`);
      expect(meta.openGraph).toMatchObject({ type: "article", title: post.markdown!.metaTitle, url: `${SITE_URL}/blog/${post.slug}`, description: post.excerpt, images: [getArticleSocialImage(post)] });
      expect(meta.twitter).toMatchObject({ card: "summary_large_image", title: post.markdown!.metaTitle, description: post.excerpt, images: [getArticleSocialImage(post)] });
    }
  });

  it("has unique titles and descriptions across all fifty-six blog routes", () => {
    expect(new Set(blogPosts.map(p => p.markdown?.metaTitle ?? p.title)).size).toBe(blogPosts.length);
    expect(new Set(blogPosts.map(p => p.excerpt)).size).toBe(blogPosts.length);
    expect(new Set(blogPosts.map(p => p.slug)).size).toBe(blogPosts.length);
  });

  it("includes each canonical exactly once in the sitemap with its honest modification date", () => {
    const entries = sitemap();
    for (const post of articles) {
      const matches = entries.filter(p => p.url === `${SITE_URL}/blog/${post.slug}`);
      expect(matches).toHaveLength(1);
      expect(matches[0].lastModified).toEqual(new Date(`${post.markdown!.reviewedAt}T00:00:00Z`));
    }
  });

  it("uses an existing 1200-by-630 PNG rather than declaring nonexistent social dimensions", () => {
    for (const post of articles) {
      const image = fs.readFileSync(`public/images/guides/${post.slug}.png`);
      expect(image.subarray(1,4).toString()).toBe("PNG");
      expect(image.readUInt32BE(16)).toBe(1200);
      expect(image.readUInt32BE(20)).toBe(630);
      expect(post.markdown!.articleJsonLd).toMatchObject({ image: { url: getArticleSocialImage(post).url } });
    }
  });
});
