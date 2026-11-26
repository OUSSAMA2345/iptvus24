"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { blogCategories, type BlogCategory, type BlogPostSummary } from "./posts";

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogListing({ posts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const searchableText = `${post.title} ${post.excerpt} ${post.category} ${post.keywords.join(" ")}`.toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, posts, query]);

  return (
    <section aria-label="Browse articles">
      <label htmlFor="blog-search" className="block text-sm font-bold text-ink">
        Search articles
      </label>
      <input
        id="blog-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search topics or keywords"
        className="mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-slate-soft/70 focus:border-brand sm:max-w-xl"
      />

      <nav aria-label="Filter articles by category" className="mt-5 flex flex-wrap gap-2">
        {(["All", ...blogCategories] as const).map((item) => {
          const selected = category === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(item)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-slate-soft hover:border-brand/40 hover:text-ink"
              }`}
            >
              {item}
            </button>
          );
        })}
      </nav>

      <p className="mt-6 text-sm text-slate-soft" role="status" aria-live="polite">
        {visiblePosts.length} {visiblePosts.length === 1 ? "article" : "articles"}
      </p>

      {visiblePosts.length ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {visiblePosts.map((post) => (
            <article key={post.slug} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-card sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-haze px-3 py-1 text-xs font-bold text-brand">{post.category}</span>
                <time dateTime={post.publishedAt} className="text-xs text-slate-soft">{formatDate(post.publishedAt)}</time>
              </div>
              <h2 className="font-display mt-4 text-xl font-extrabold leading-snug text-ink">
                <Link href={`/blog/${post.slug}`} className="rounded-sm hover:text-brand focus-visible:outline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-soft">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold text-brand hover:text-brand-deep"
              >
                Read article <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-white p-8 text-center">
          <p className="font-semibold text-ink">No articles match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-3 min-h-11 rounded-lg px-3 text-sm font-bold text-brand underline underline-offset-4"
          >
            Clear search and category
          </button>
        </div>
      )}
    </section>
  );
}
