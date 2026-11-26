import type { Metadata } from "next";
import App from "../src/App";
import { pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata(
  "Plans, Device Compatibility & Support",
  "Compare IPTVUS24 plan prices, check device compatibility, and review service information before ordering.",
  "/",
);

export default function HomePage() {
  return <App />;
}
