import type { Metadata } from "next";

export const SITE_URL = "https://www.iptvus24.com";
export const SITE_NAME = "IPTVUS24";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = path === "/" ? "/" : path;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "IPTVUS24" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}
