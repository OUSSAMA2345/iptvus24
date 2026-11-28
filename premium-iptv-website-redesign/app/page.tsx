import type { Metadata } from "next";
import App from "../src/App";
import { pageMetadata } from "./metadata";
import { getHomeSupportingArticles } from "./commercial/supporting-articles";

export const metadata: Metadata = pageMetadata(
  "IPTVUS24 | IPTV Plans, Setup & Support",
  "Compare IPTVUS24 plans and pricing, check device compatibility, and contact support on WhatsApp before ordering.",
  "/",
);

export default function HomePage() {
  // Commercial page → related articles: guides that link to the plans/compare sections.
  const guides = getHomeSupportingArticles(6).map(post => ({ href: `/blog/${post.slug}`, title: post.markdown?.h1 ?? post.title }));
  return <App guides={guides} />;
}
