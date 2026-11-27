import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "./posts";
import { blogCategories } from "./categories";

export type MarkdownDetails = {
  body: string;
  h1: string;
  metaTitle: string;
  priority: number;
  reviewedAt: string;
  editorialMethod: string;
  articleJsonLd: Record<string, unknown>;
  faqJsonLd: Record<string, unknown>;
};

type ArticleFile = Omit<MarkdownDetails, "body"> & {
  status: string;
  seoTitle: string;
  slug: string;
  metaDescription: string;
  category: BlogPost["category"];
  publishedAt: string;
  keywords: string[];
};

/** JSON is a YAML-compatible front-matter format; no runtime YAML execution or HTML. */
export function loadMarkdownPosts(): BlogPost[] {
  const directory = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file): BlogPost | null => {
      const source = fs.readFileSync(path.join(directory, file), "utf8");
      const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
      if (!match) throw new Error(`Missing JSON front matter: ${file}`);
      const data = JSON.parse(match[1]) as ArticleFile;
      if (data.status !== "ready") return null;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)
        || file !== `${data.slug}.md`
        || !data.seoTitle || !data.h1 || !data.metaTitle || !data.metaDescription
        || !Number.isInteger(data.priority) || data.priority < 1
        || !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt)
        || !Array.isArray(data.keywords)
        || !blogCategories.includes(data.category)
        || data.articleJsonLd?.["@type"] !== "Article"
        || data.faqJsonLd?.["@type"] !== "FAQPage") {
        throw new Error(`Invalid article metadata: ${file}`);
      }
      const body = match[2].trim();
      if (!body.startsWith(`# ${data.h1}\n`)) throw new Error(`H1 mismatch: ${file}`);
      return {
        slug: data.slug,
        title: data.seoTitle,
        excerpt: data.metaDescription,
        category: data.category,
        publishedAt: data.publishedAt,
        keywords: data.keywords,
        sections: [],
        markdown: {
          body,
          h1: data.h1,
          metaTitle: data.metaTitle,
          priority: data.priority,
          reviewedAt: data.reviewedAt,
          editorialMethod: data.editorialMethod,
          articleJsonLd: data.articleJsonLd,
          faqJsonLd: data.faqJsonLd,
        },
      };
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => a.markdown!.priority - b.markdown!.priority);
}
