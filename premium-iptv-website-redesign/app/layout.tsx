import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "./metadata";
import { bodyFont, displayFont } from "./fonts";
import CookieConsent from "./ui/CookieConsent";
import GoogleTags from "./ui/GoogleTags";
import { FloatingWhatsAppButton } from "../src/components/WhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IPTVUS24 — Plans, Setup & Support",
    template: "%s | IPTVUS24",
  },
  description:
    "Compare IPTVUS24 plan prices, check device compatibility, and review service information before ordering.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "IPTVUS24 — Plans, Setup & Support",
    description: "Compare plans, check device compatibility, and review service information before ordering.",
    url: SITE_URL,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "IPTVUS24" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPTVUS24 — Plans, Setup & Support",
    description: "Compare plans, check device compatibility, and review service information before ordering.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#0A84FF",
  width: "device-width",
  initialScale: 1,
};

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/icon-1024.png`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <a href="#main-content" className="sr-only z-[100] rounded-lg bg-white px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        {children}
        <CookieConsent />
        <GoogleTags />
        <FloatingWhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
