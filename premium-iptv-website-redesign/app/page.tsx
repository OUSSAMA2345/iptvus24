import type { Metadata } from "next";
import App from "../src/App";
import { pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata(
  "IPTVUS24 | IPTV Plans, Setup & Support",
  "Compare IPTVUS24 plans and pricing, check device compatibility, and contact support on WhatsApp before ordering.",
  "/",
);

export default function HomePage() {
  return <App />;
}
