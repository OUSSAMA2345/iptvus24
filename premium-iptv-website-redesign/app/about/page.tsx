import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("About IPTVUS24", "Learn about IPTVUS24’s service philosophy, device compatibility, and support commitment.", "/about");

export default function AboutPage() {
  return (
    <SitePage title="About IPTVUS24" description="Our focus is straightforward: make service information clear, help customers get set up, and provide a direct way to reach support.">
      <section>
        <h2>Our mission</h2>
        <p>IPTVUS24 aims to make internet-based television easier to understand and use. We publish plan and compatibility information, offer guided setup support, and provide contact channels for service questions.</p>
      </section>
      <section>
        <h2>Why customers choose us</h2>
        <ul>
          <li>Plan information and advertised prices are available before you contact us.</li>
          <li>WhatsApp is the primary way to contact support, including for setup questions.</li>
          <li>Customers can review device compatibility before selecting a plan.</li>
          <li>The site publishes service, refund, privacy, and cookie information in one place.</li>
        </ul>
      </section>
      <section>
        <h2>Support commitment</h2>
        <p>Our team can help with plan questions, basic setup, and troubleshooting. Message us on <a className="font-bold text-brand underline" href="https://wa.me/447473970663" target="_blank" rel="noopener noreferrer">WhatsApp</a>. Response times can vary with request volume. Never send passwords or card details in a support message.</p>
      </section>
      <section>
        <h2>Device compatibility</h2>
        <p>The website describes compatibility with Smart TVs, Android TV boxes, Fire TV devices, Apple TV, iOS and Android phones and tablets, Windows, and macOS. Compatibility depends on the device, available player software, network, and regional availability. Check the <a className="font-bold text-brand underline" href="/#devices">device guide</a> or ask support before ordering if you are unsure.</p>
      </section>
      <section>
        <h2>Responsible service</h2>
        <p>Content availability and distribution rights depend on territory and licensing. We do not grant rights to third-party content. Customers must use the service lawfully and respect the rights of content owners. See our <a className="font-bold text-brand underline" href="/terms">Terms & Conditions</a> for acceptable-use requirements.</p>
      </section>
    </SitePage>
  );
}
