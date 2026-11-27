import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SitePage, { SiteProse } from "../../ui/SitePage";
import { SITE_NAME } from "../../metadata";
import { blogPosts, getBlogPost } from "../posts";
import MarkdownArticle from "../MarkdownArticle";
import { editorialTopics, getArticleMetadata, getArticleStructuredData, getRelatedPosts } from "../seo";

export const dynamicParams = false;

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

  return getArticleMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post, blogPosts);
  const structuredData = getArticleStructuredData(post);

  return (
    <>
      <SitePage title={post.markdown?.h1 ?? post.title} description={post.excerpt}>
        <article>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-soft">
              <li><Link href="/" className="rounded hover:text-brand">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="rounded hover:text-brand">Guides</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="break-words font-semibold text-ink">{post.markdown?.h1 ?? post.title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-line py-4">
            <span className="rounded-full bg-haze px-3 py-1 text-xs font-bold text-brand">{post.category}</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-soft">
              <span>By {SITE_NAME} Editorial</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          </div>

          {post.markdown && (
            <p className="mt-5 text-xs leading-6 text-slate-soft">
              Documentation-based diagnostic guide · Reviewed {formatDate(post.markdown.reviewedAt)}.
              No hands-on device testing is claimed. Menu labels and supported features vary by version.
            </p>
          )}

          <SiteProse className="mt-8">
            {post.markdown ? <MarkdownArticle body={post.markdown.body} /> : post.sections.map((section, index) => (
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
          </SiteProse>

          {editorialTopics[post.slug]?.diagram && (
            <figure className="mt-8">
              <Image src={`/images/guides/${post.slug}.png`} alt={editorialTopics[post.slug].diagram.alt} width={1200} height={630} sizes="(max-width: 768px) 100vw, 900px" className="h-auto w-full rounded-xl" />
              <figcaption className="mt-2 text-xs text-slate-soft">Original conceptual overview · Not a device screenshot or test result.</figcaption>
            </figure>
          )}

          <nav aria-label="Article navigation" className="mt-10 border-t border-line pt-5">
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand hover:text-brand-deep">
              <span aria-hidden="true">←</span> All articles
            </Link>
          </nav>

          {relatedPosts.length > 0 && (
            <section aria-labelledby="related-articles-heading" className="mt-10 border-t border-line pt-7">
              <h2 id="related-articles-heading" className="font-display text-xl font-extrabold leading-tight text-ink">
                Related articles
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <li key={related.slug} className="rounded-xl border border-line bg-mist p-4">
                    <span className="text-xs font-bold text-brand">{related.category}</span>
                    <h3 className="mt-2 font-display text-base font-bold text-ink">
                      <Link href={`/blog/${related.slug}`} prefetch={false} className="rounded hover:text-brand">
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
