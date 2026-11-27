// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const script = path.join(root, "scripts/audit-content.mjs");
let fixture: string;
const mag = "content/blog/mag-box-portal-not-loading.md";

beforeEach(() => {
  fixture = fs.mkdtempSync(path.join(os.tmpdir(), "editorial-audit-test-"));
  for (const relative of ["content/blog", "docs/editorial/priority-plan.json", "app/blog/posts.ts", "app/blog/additional-posts.ts"]) {
    const destination = path.join(fixture, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.cpSync(path.join(root, relative), destination, { recursive: true });
  }
});
afterEach(() => fs.rmSync(fixture, { recursive: true, force: true }));

function run() {
  const result = spawnSync(process.execPath, [script, "--complete"], { cwd: fixture, encoding: "utf8" });
  expect(result.stderr).toBe("");
  return { status: result.status, report: JSON.parse(result.stdout) };
}
function mutate(change: (source: string) => string) {
  const file = path.join(fixture, mag);
  fs.writeFileSync(file, change(fs.readFileSync(file, "utf8")));
}

describe("complete editorial publication gate", () => {
  it("accepts all 20 articles and their metadata, links and visible FAQ schema", () => {
    const { status, report } = run();
    expect(status).toBe(0);
    expect(report.readyArticles).toBe(20);
    expect(report.pending).toEqual([]);
    expect(report.errors).toEqual([]);
    expect(report.articles.every((article: { words: number }) => article.words >= 2500 && article.words <= 4000)).toBe(true);
  });

  it("rejects fewer than 2500 prose words, regardless of front-matter length", () => {
    mutate(source => source.slice(0, source.indexOf("\n---\n", 4) + 5) + "\n# Short body\n");
    const { status, report } = run();
    expect(status).toBe(1);
    expect(report.errors.some((error: string) => error.includes("minimum 2500"))).toBe(true);
  });

  it("permits substantive articles above the old 3500-word ceiling and below 4000", () => {
    mutate(source => source.replace("## Common mistakes that prolong", `${Array.from({ length: 900 }, (_, i) => `fixture${i}`).join(" ")}\n\n## Common mistakes that prolong`));
    const { status, report } = run();
    expect(status).toBe(0);
    expect(report.articles.find((article: { priority: number }) => article.priority === 6).words).toBeGreaterThan(3500);
  });

  it("rejects absent common-mistakes guidance and lookalike primary-source hosts", () => {
    mutate(source => source.replace("## Common mistakes that prolong", "## Avoidable errors that prolong").replaceAll("wiki.infomir.eu", "wiki.infomir.eu.example.invalid"));
    const { status, report } = run();
    expect(status).toBe(1);
    expect(report.errors.some((error: string) => error.includes("common mistakes section missing"))).toBe(true);
    expect(report.errors.some((error: string) => error.includes("primary source absent"))).toBe(true);
  });

  it("rejects Markdown FAQ answers rather than silently publishing raw syntax in schema", () => {
    mutate(source => source.replaceAll("It means the requested portal page did not load", "It means the requested **portal** page did not load"));
    const { status, report } = run();
    expect(status).toBe(1);
    expect(report.errors.some((error: string) => error.includes("must be plain text"))).toBe(true);
  });
});
