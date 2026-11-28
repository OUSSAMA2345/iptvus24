import legacy from "../../content/commercial/legacy-next-steps.json";
import { blogPosts, type BlogPost } from "../blog/posts";
import { commercialPages, type CommercialPageId } from "./devices";

export type LegacyNextStep = { pageId: CommercialPageId; lead: string; anchor: string; trail: string };
export const legacyNextSteps = legacy.steps as Record<string, LegacyNextStep>;

export function getLegacyNextStep(slug: string) {
  const step = legacyNextSteps[slug];
  if (!step) return null;
  const page = commercialPages.find(item => item.id === step.pageId);
  return page ? { ...step, href: page.path } : null;
}

function linksTo(post: BlogPost, path: string) {
  if (post.markdown) return post.markdown.body.includes(`](${path})`) || post.markdown.body.includes(`](${path}#`);
  const step = getLegacyNextStep(post.slug);
  return step?.href === path;
}

/**
 * Articles that link to a commercial page, used to render the reciprocal
 * "related guides" list (Commercial page → Blog). Contextual Markdown links rank first.
 */
export function getSupportingArticles(path: string, limit = 8) {
  return blogPosts
    .filter(post => linksTo(post, path))
    .sort((a, b) => Number(Boolean(b.markdown)) - Number(Boolean(a.markdown)) || (a.markdown?.priority ?? 999) - (b.markdown?.priority ?? 999) || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

/** Supporting articles for any commercial destination that lives on the home page (/#plans, /#compare-plans). */
export function getHomeSupportingArticles(limit = 6) {
  const seen = new Set<string>();
  return ["/#plans", "/#compare-plans"].flatMap(path => getSupportingArticles(path, limit))
    .filter(post => (seen.has(post.slug) ? false : (seen.add(post.slug), true)))
    .slice(0, limit);
}
