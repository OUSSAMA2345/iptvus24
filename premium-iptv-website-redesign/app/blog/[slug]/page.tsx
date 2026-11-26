import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SitePage from "../../ui/SitePage";
import { SITE_NAME, SITE_URL } from "../../metadata";
import { blogPosts, getBlogPost } from "../posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const canonical = `/blog/${post.slug}`;
  const image = "/images/og-image.png";

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [`${SITE_URL}/about`],
      section: post.category,
      tags: post.keywords,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const categoryPosts = blogPosts.filter((item) => item.category === post.category);
  const currentCategoryIndex = categoryPosts.findIndex((item) => item.slug === post.slug);
  const relatedPosts = Array.from(
    { length: Math.min(3, categoryPosts.length - 1) },
    (_, index) => categoryPosts[(currentCategoryIndex + index + 1) % categoryPosts.length],
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/blog/${post.slug}`,
        },
        headline: post.title,
        description: post.excerpt,
        image: `${SITE_URL}/images/og-image.png`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@type": "Organization",
          name: `${SITE_NAME} Editorial`,
          url: `${SITE_URL}/about`,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/brand/icon-1024.png`,
          },
        },
        articleSection: post.category,
        keywords: post.keywords.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <SitePage title={post.title} description={post.excerpt}>
        <article>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-soft">
              <li><Link href="/" className="hover:text-brand">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-brand">Guides</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="break-words font-semibold text-ink">{post.title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-line py-4">
            <span className="rounded-full bg-haze px-3 py-1 text-xs font-bold text-brand">{post.category}</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-soft">
              <span>By {SITE_NAME} Editorial</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {post.sections.map((section, index) => (
              <section key={section.heading} aria-labelledby={`article-section-${index + 1}`}>
                <h2 id={`article-section-${index + 1}`}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <nav aria-label="Article navigation" className="mt-10 border-t border-line pt-5">
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 font-bold text-brand hover:text-brand-deep">
              <span aria-hidden="true">←</span> All articles
            </Link>
          </nav>

          {relatedPosts.length > 0 && (
            <section aria-labelledby="related-articles-heading" className="mt-10 border-t border-line pt-7">
              <h2 id="related-articles-heading">Related articles</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <li key={related.slug} className="rounded-xl border border-line bg-mist p-4">
                    <span className="text-xs font-bold text-brand">{related.category}</span>
                    <h3 className="mt-2 font-display font-bold text-ink">
                      <Link href={`/blog/${related.slug}`} className="hover:text-brand">
                        {related.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-soft">{related.excerpt}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </SitePage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
