import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("Terms & Conditions", "Terms for using the IPTVUS24 website and service, including acceptable use, billing, termination, intellectual property, and liability.", "/terms");

export default function TermsPage() {
  return (
    <SitePage title="Terms & Conditions" description="Effective date: November 24, 2026. These terms apply to your use of the IPTVUS24 website and any service you purchase from the seller identified in your order confirmation.">
      <section>
        <h2>1. About these terms</h2>
        <p>By using this website or ordering a service, you agree to these terms and the <a className="font-bold text-brand underline" href="/privacy">Privacy Policy</a>. “IPTVUS24” is the website/service name; your order confirmation identifies the seller responsible for your purchase. Contact us before ordering if the contracting seller is unclear.</p>
        <p>Nothing in these terms limits a consumer right that cannot legally be excluded. If a term conflicts with mandatory local law, that law applies to the extent of the conflict.</p>
      </section>
      <section>
        <h2>2. Service and permitted use</h2>
        <p>Service features, device compatibility, availability, plan duration, and price are those expressly described at the time of your order. Catalogues, channels, and features can vary by location and may change where rights, technical conditions, or law require it. We do not promise access to a particular channel or title unless it is expressly included in your order.</p>
        <p>You may use the service only for lawful personal use, in accordance with the terms of your order and the laws that apply where you are. You must not:</p>
        <ul>
          <li>Record, redistribute, resell, rebroadcast, publicly perform, or otherwise exploit content unless you have the necessary rights.</li>
          <li>Use the service to infringe intellectual-property, privacy, or other rights, or to facilitate unlawful activity.</li>
          <li>Bypass access controls, interfere with service security, reverse engineer software where prohibited by law, or disrupt other users.</li>
          <li>Share credentials beyond the number of connections expressly allowed by your plan, or use automation to abuse the service.</li>
        </ul>
        <p>You are responsible for your device, internet connection, account credentials, and ensuring your use is lawful in your location.</p>
      </section>
      <section>
        <h2>3. Orders, billing, and cancellation</h2>
        <p>Plan price, currency, billing period, renewal terms, and payment method must be shown before you authorize an order. Unless the order expressly states otherwise, a plan ends at the end of its stated term and does not renew automatically. Any recurring renewal must be clearly disclosed and authorized before payment.</p>
        <p>Payment is processed by the provider named in your order or payment instructions. Do not send card numbers, security codes, or account passwords by email or WhatsApp. Taxes may apply as shown before purchase. If a charge appears incorrect, contact support with the order reference; never send full payment credentials.</p>
        <p>You may request cancellation through the contact methods on our <a className="font-bold text-brand underline" href="/contact">Contact page</a>. Cancellation stops future renewal where applicable; it does not remove any refund or statutory cancellation rights.</p>
      </section>
      <section>
        <h2>4. Refunds</h2>
        <p>Our advertised 30-day money-back policy is described on the separate <a className="font-bold text-brand underline" href="/refund">Refund Policy</a> page. Mandatory consumer rights remain unaffected.</p>
      </section>
      <section>
        <h2>5. Suspension and termination</h2>
        <p>We may suspend or terminate access when reasonably necessary for security, non-payment, material breach, suspected fraud, unlawful use, or a legal or rights-holder requirement. Where practical and lawful, we will explain the reason and allow a reasonable opportunity to correct a breach. You may stop using the service at any time and request account or personal-data deletion, subject to legal and transaction-record retention duties.</p>
      </section>
      <section>
        <h2>6. Intellectual property and content rights</h2>
        <p>The website’s branding, design, and original materials are owned by or licensed to their respective rights holders. Nothing on this website transfers ownership of third-party content to you. Any service access is limited to the rights made available for your order and region; content may be withdrawn when required by rights, law, or technical conditions. All third-party trademarks and content remain the property of their respective owners. Report a suspected rights issue to <a className="font-bold text-brand underline" href="mailto:support@iptvus24.com">support@iptvus24.com</a> with enough information to identify it.</p>
      </section>
      <section>
        <h2>7. Availability and liability</h2>
        <p>We aim to provide a usable service but do not guarantee uninterrupted access, a particular stream quality, or continued availability of third-party networks, devices, or content. We will take reasonable steps to address issues reported through support.</p>
        <p>To the extent permitted by law, neither party is liable for indirect or consequential loss that was not reasonably foreseeable. Nothing in these terms excludes liability for fraud, intentional misconduct, death or personal injury caused by negligence, or any liability or consumer protection that cannot legally be limited. Where the law permits, our liability for a claim is limited to the amount paid for the affected service during the 12 months before the event giving rise to the claim.</p>
      </section>
      <section>
        <h2>8. Changes and contact</h2>
        <p>We may update these terms for legal, operational, or security reasons. Material changes will be posted here with a revised effective date. Questions can be sent through the <a className="font-bold text-brand underline" href="/contact">Contact page</a> or by WhatsApp at <a className="font-bold text-brand underline" href="https://wa.me/447473970663" target="_blank" rel="noopener noreferrer">+44 7473 970663</a>.</p>
      </section>
    </SitePage>
  );
}
