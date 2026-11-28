// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { blogPosts } from "../app/blog/posts";
import { getRelatedPosts } from "../app/blog/seo";
import { commercialPages, deviceLandings } from "../app/commercial/devices";
import { getHomeSupportingArticles, getLegacyNextStep, getSupportingArticles } from "../app/commercial/supporting-articles";
import sitemap from "../app/sitemap";
import { SITE_URL } from "../app/metadata";

const root = process.cwd();

function runAudit() {
  const result = spawnSync(process.execPath, [path.join(root, "scripts/seo/audit-internal-links.mjs"), "--json"], { cwd: root, encoding: "utf8" });
  expect(result.stderr).toBe("");
  return { status: result.status, report: JSON.parse(result.stdout) };
}

describe("internal linking audit", () => {
  it("passes every live and planned linking rule", () => {
    const { status, report } = runAudit();
    expect(report.errors).toEqual([]);
    expect(status).toBe(0);
    expect(report.summary.liveArticles).toBe(blogPosts.length);
    expect(report.summary.orphans).toBe(0);
    expect(report.summary.plannedArticles).toBe(100);
  });

  it("models the same related-article module the site renders", () => {
    const { report } = runAudit();
    for (const post of blogPosts) {
      const audited = report.liveArticles.find((item: { slug: string }) => item.slug === post.slug);
      expect(audited.templateRelated).toEqual(getRelatedPosts(post, blogPosts).map(related => related.slug));
    }
  });

  it("gives every Markdown guide 3–5 commercial links with one above the fold and unique anchors sitewide", () => {
    const anchors: string[] = [];
    for (const post of blogPosts.filter(item => item.markdown)) {
      const body = post.markdown!.body;
      const toc = body.indexOf("## Table of contents");
      const links = [...body.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)].filter(m => commercialPages.some(page => page.path === m[2]));
      expect(links.length).toBeGreaterThanOrEqual(3);
      expect(links.length).toBeLessThanOrEqual(5);
      expect(links.some(m => m.index! < toc)).toBe(true);
      anchors.push(...links.map(m => m[1].toLowerCase()));
    }
    expect(new Set(anchors).size).toBe(anchors.length);
  });

  it("gives every legacy guide a registered commercial next step", () => {
    for (const post of blogPosts.filter(item => !item.markdown)) {
      const step = getLegacyNextStep(post.slug);
      expect(step, post.slug).not.toBeNull();
      expect(commercialPages.some(page => page.path === step!.href)).toBe(true);
    }
  });

  it("links every commercial page back to multiple related articles", () => {
    for (const page of deviceLandings) expect(getSupportingArticles(page.path).length, page.path).toBeGreaterThanOrEqual(3);
    expect(getHomeSupportingArticles().length).toBeGreaterThanOrEqual(3);
    expect(getSupportingArticles("/contact").length).toBeGreaterThanOrEqual(3);
  });

  it("lists the device landing pages in the sitemap", () => {
    const urls = sitemap().map(entry => entry.url);
    for (const page of deviceLandings) expect(urls).toContain(`${SITE_URL}${page.path}`);
  });

  it("keeps the generated 100-keyword plan complete and internally consistent", () => {
    const plan = JSON.parse(fs.readFileSync(path.join(root, "docs/seo/content-plan/keyword-plan.json"), "utf8"));
    expect(plan.errors).toEqual([]);
    expect(plan.keywords).toHaveLength(100);
    expect(new Set(plan.keywords.map((item: { slug: string }) => item.slug)).size).toBe(100);
    for (const list of Object.values(plan.lists) as string[][]) expect(list).toHaveLength(20);
    const publishedSlugs = new Set(blogPosts.map(post => post.slug));
    for (const item of plan.keywords) {
      expect(item.opportunity).toBeGreaterThanOrEqual(1);
      expect(item.opportunity).toBeLessThanOrEqual(100);
      expect(publishedSlugs.has(item.slug)).toBe(item.action === "upgrade");
    }
  });
});
