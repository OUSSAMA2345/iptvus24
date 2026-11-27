import type { MetadataRoute } from "next";
import { SITE_URL } from "./metadata";
import { blogPosts } from "./blog/posts";

const STATIC_PAGE_LAST_MODIFIED: Record<string, string> = {
  "": "2026-11-26",
  "/privacy": "2026-11-24",
  "/terms": "2026-11-24",
  "/refund": "2026-11-24",
  "/cookies": "2026-11-24",
  "/contact": "2026-11-26",
  "/about": "2026-11-26",
  "/reviews": "2026-11-26",
  "/status": "2026-11-26",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/privacy", "/terms", "/refund", "/cookies", "/contact", "/about", "/reviews", "/status"];
  const staticPages = pages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(`${STATIC_PAGE_LAST_MODIFIED[path]}T00:00:00Z`),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.6,
  }));

  const latestArticleDate = blogPosts.reduce(
    (latest, post) => {
      const modified = post.markdown?.reviewedAt ?? post.publishedAt;
      return modified > latest ? modified : latest;
    },
    blogPosts[0]?.publishedAt ?? "2026-11-26",
  );

  const articles: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(`${latestArticleDate}T00:00:00Z`),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(`${post.markdown?.reviewedAt ?? post.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...articles];
}
