import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import { SITE_NAME, SITE_URL, pageMetadata } from "../metadata";
import BlogListing from "./BlogListing";
import { blogPosts, getBlogPostSummary } from "./posts";

export const metadata: Metadata = pageMetadata(
  "Streaming Guides and Advice",
  "Practical guides to choosing a streaming service, comparing plans, checking devices, and protecting your privacy.",
  "/blog",
);

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE_NAME} Blog`,
  description:
    "Practical guides to choosing a streaming service, comparing plans, checking devices, and protecting your privacy.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    articleSection: post.category,
  })),
};

export default function BlogPage() {
  return (
    <>
      <SitePage
        title="IPTVUS24 blog"
        description="Practical, straightforward guides to streaming plans, device compatibility, playback, privacy, and content availability."
      >
        <BlogListing posts={blogPosts.map(getBlogPostSummary)} />
      </SitePage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
