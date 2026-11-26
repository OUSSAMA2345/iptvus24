import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("Refund Policy", "Eligibility, limits, and instructions for requesting a refund under IPTVUS24’s 30-day money-back policy.", "/refund");

export default function RefundPage() {
  return (
    <SitePage title="Refund Policy" description="Effective date: November 24, 2026. This policy explains how to request a refund under the advertised 30-day money-back guarantee.">
      <section>
        <h2>1. 30-day money-back guarantee</h2>
        <p>If you are not satisfied with your first paid IPTVUS24 plan, contact us within 30 calendar days of the initial purchase date to request a refund. This policy applies to the plan price paid for that first purchase. It is in addition to, and does not restrict, any cancellation or refund rights you have under applicable law.</p>
      </section>
      <section>
        <h2>2. Eligibility and limits</h2>
        <ul>
          <li>The request must be received within 30 calendar days of the first payment for the plan.</li>
          <li>The guarantee may be used once per customer. It covers the initial plan purchase, not separate renewals, later purchases, third-party fees, or unrelated products.</li>
          <li>We may ask for the order reference and a short description of the issue so we can identify the transaction and improve the service. We will not require you to disclose sensitive information.</li>
          <li>Nothing in this policy limits mandatory statutory rights or remedies.</li>
        </ul>
      </section>
      <section>
        <h2>3. How to request a refund</h2>
        <p>Email <a className="font-bold text-brand underline" href="mailto:support@iptvus24.com?subject=Refund%20request">support@iptvus24.com</a> with “Refund request” in the subject, or send us a WhatsApp message at <a className="font-bold text-brand underline" href="https://wa.me/447473970663" target="_blank" rel="noopener noreferrer">+44 7473 970663</a>. Include the name on the order, order reference, purchase date, and the email used at purchase. Do not send card numbers, security codes, or passwords.</p>
        <p>You may also use the <a className="font-bold text-brand underline" href="/contact">contact form</a>. We will confirm receipt and may contact you if we need reasonable information to locate the order.</p>
      </section>
      <section>
        <h2>4. Decision and processing time</h2>
        <p>We aim to review complete requests within two business days. Approved refunds are submitted to the original payment method within five business days of approval. Your bank or payment provider controls when the credit appears, which can take additional time. We will tell you if the payment provider requires another process.</p>
      </section>
      <section>
        <h2>5. Cancellation and legal rights</h2>
        <p>Requesting cancellation does not waive statutory consumer rights. Laws in some locations provide additional cancellation periods or remedies for digital services. If local law provides a more favourable right, that right prevails.</p>
      </section>
    </SitePage>
  );
}
