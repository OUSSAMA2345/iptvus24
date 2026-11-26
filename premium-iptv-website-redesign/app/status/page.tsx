import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import StatusFeed from "./StatusFeed";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("Service Status", "Current IPTVUS24 service status, published incidents, maintenance notices, and uptime history.", "/status");

export default function StatusPage() {
  return (
    <SitePage title="Service status" description="Current status and historical updates are shown here when monitoring data is available.">
      <StatusFeed />
    </SitePage>
  );
}
