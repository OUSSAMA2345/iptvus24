import type { Metadata } from "next";
import Reviews from "../../src/components/Reviews";
import SitePage from "../ui/SitePage";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("Community Reviews", "Read moderated visitor-submitted reviews or share your experience. Purchase status is not independently verified.", "/reviews");

export default function ReviewsPage() {
  return (
    <SitePage title="Community reviews" description="Read published visitor-submitted reviews or share your experience. Submissions are moderated; purchase status is not independently verified.">
      <Reviews />
    </SitePage>
  );
}
