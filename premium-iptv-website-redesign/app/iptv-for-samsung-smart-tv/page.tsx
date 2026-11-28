import type { Metadata } from "next";
import DeviceLanding from "../commercial/DeviceLanding";
import { getDeviceLanding } from "../commercial/devices";
import { pageMetadata } from "../metadata";

const page = getDeviceLanding("samsung");

export const metadata: Metadata = pageMetadata(page.metaTitle, page.metaDescription, page.path);

export default function Page() {
  return <DeviceLanding id="samsung" />;
}
