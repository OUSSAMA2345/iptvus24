import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("Privacy Policy", "Learn what information IPTVUS24 collects, why it is used, how long it is retained, and how to exercise your privacy rights.", "/privacy");

export default function PrivacyPage() {
  return (
    <SitePage title="Privacy Policy" description="Effective date: November 24, 2026. This policy explains how IPTVUS24 handles information when you browse the website, submit a form, or contact support.">
      <section>
        <h2>1. Who we are and how to contact us</h2>
        <p>IPTVUS24 is the name used for this website and service. For privacy requests or questions, email <a className="font-bold text-brand underline" href="mailto:support@iptvus24.com">support@iptvus24.com</a> or message us on <a className="font-bold text-brand underline" href="https://wa.me/447473970663" target="_blank" rel="noopener noreferrer">WhatsApp</a>. Include enough information for us to locate your request, but do not send passwords or payment-card details.</p>
        <p>The website operator should be identified on the purchase receipt or checkout confirmation. If that information is not clear, contact us before providing payment details. This policy is not a substitute for advice from a qualified privacy professional.</p>
      </section>
      <section>
        <h2>2. Information we collect</h2>
        <ul>
          <li><b>Contact requests:</b> name, email address, subject, and the message you submit through the contact form.</li>
          <li><b>Reviews:</b> display name, 1–5 star rating, review text, submission time, and moderation state. Review submissions do not ask for an email address.</li>
          <li><b>Technical and security data:</b> limited request and diagnostic information handled by the hosting provider. Form anti-abuse controls may use a keyed, non-reversible hash of a network address for rate limiting; the raw address is not stored in the application form record.</li>
          <li><b>Cookie choice:</b> a local browser-storage preference recording whether optional categories were accepted or rejected.</li>
          <li><b>Support conversations:</b> if you choose WhatsApp or email, the details you send are also processed by the respective communications provider under its own privacy terms.</li>
        </ul>
        <p>Do not submit sensitive personal information in public reviews. This website does not request payment-card numbers. If you choose to purchase through an external payment provider, that provider collects and processes payment information under its own privacy notice.</p>
      </section>
      <section>
        <h2>3. Purposes and legal bases</h2>
        <ul>
          <li>To answer support enquiries and take steps requested before or during a service relationship (contract or pre-contractual necessity).</li>
          <li>To receive, moderate, and, if approved, publish reviews based on your consent. You can ask us to remove a published review.</li>
          <li>To secure forms, prevent spam, and maintain the service based on legitimate interests, balanced against your rights.</li>
          <li>To record your optional cookie preference so we can respect your choice.</li>
          <li>To meet legal obligations and establish or defend legal claims where required.</li>
        </ul>
        <p>Google analytics scripts, if configured by the site operator, load only after optional analytics consent. Advertising scripts are not enabled. IPTVUS24 does not sell personal information or share it for cross-context behavioural advertising.</p>
      </section>
      <section>
        <h2>4. Cookies, local storage, and analytics</h2>
        <p>The site uses browser local storage to remember your cookie choice. If Google Analytics 4 or an analytics-only Google Tag Manager container is configured, it runs only after optional analytics consent. Advertising storage stays disabled. If you follow an external link such as WhatsApp, that service may use its own technologies and privacy policy. See our <a className="font-bold text-brand underline" href="/cookies">Cookie Policy</a>.</p>
      </section>
      <section>
        <h2>5. Service providers and international transfers</h2>
        <p>When the site’s forms are configured, form submissions and review records are stored in the Supabase project configured by the operator. Website hosting and security providers may process technical data to deliver the site. We disclose only information needed for those purposes and do not authorize providers to use it for their own advertising.</p>
        <p>Processing locations depend on the hosting and database regions selected by the operator. If information is transferred internationally, the operator must apply any transfer safeguards required by applicable law. WhatsApp and email providers process information independently when you choose to use those channels.</p>
      </section>
      <section>
        <h2>6. Retention</h2>
        <ul>
          <li>Contact requests are deleted after 365 days unless a longer period is needed for a legal claim or required by law. Database backups may retain deleted data until the provider’s normal backup-expiration cycle completes.</li>
          <li>Pending reviews are retained for up to 12 months. Approved reviews remain published until removed or until the service is discontinued; moderation and abuse-prevention records are retained only as long as needed for those purposes.</li>
          <li>Rate-limit hashes and related counters are designed to expire after 30 days.</li>
          <li>The local cookie-choice preference remains in your browser until you change it or clear site storage.</li>
        </ul>
      </section>
      <section>
        <h2>7. Your privacy rights</h2>
        <p>Depending on where you live, you may have rights to access, correct, delete, restrict, object to, or receive a copy of personal information; withdraw consent; and complain to your data-protection authority. California residents may also have rights to know, access, correct, or delete personal information, to opt out of sale or sharing, to limit certain uses of sensitive information, and to receive equal service. IPTVUS24 does not sell or share information as those terms are commonly defined by applicable California privacy law.</p>
        <p>To make a request, email <a className="font-bold text-brand underline" href="mailto:support@iptvus24.com">support@iptvus24.com</a> with “Privacy request” in the subject, or use the contact page. We may ask for proportionate information to verify identity and will respond within the time required by applicable law. You may use an authorized agent where the law permits. We do not discriminate for exercising privacy rights.</p>
      </section>
      <section>
        <h2>8. Children and security</h2>
        <p>The website is not intended for children to submit personal information. We use reasonable technical and organizational safeguards appropriate to the information handled, but no internet transmission or storage method can be guaranteed completely secure. If you believe a child has submitted information, contact support so we can review and delete it where appropriate.</p>
      </section>
      <section>
        <h2>9. Changes</h2>
        <p>We may update this policy when the service or applicable requirements change. The effective date above will be updated when a revised policy is published.</p>
      </section>
    </SitePage>
  );
}
