import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("Cookie Policy", "Details about cookies and browser storage used by IPTVUS24, optional consent, and how to change your choice.", "/cookies");

export default function CookiesPage() {
  return (
    <SitePage title="Cookie Policy" description="Effective date: November 24, 2026. This policy describes cookies and similar technologies used on iptvus24.com.">
      <section>
        <h2>1. What we use</h2>
        <p>The site stores your cookie preference in browser local storage; that preference is not sent to our servers. Google Tag Manager container GTM-MHW925PF (or a valid environment override) loads only after you accept optional analytics. No advertising tags are enabled by this implementation.</p>
      </section>
      <section>
        <h2>2. Optional categories</h2>
        <p>Rejecting optional cookies prevents Google Tag Manager and Google analytics scripts from loading. You can reopen Cookie settings in the footer and change your choice. If the configured container ID is invalid or explicitly disabled, no Google Tag Manager script loads.</p>
        <ul>
          <li><b>Essential:</b> remembers the privacy choice and supports basic site operation.</li>
          <li><b>Analytics:</b> The configured Google Tag Manager container, or direct Google Analytics 4 if Tag Manager is disabled, only after consent.</li>
          <li><b>Marketing:</b> disabled; advertising storage and advertising consent remain denied.</li>
        </ul>
      </section>
      <section>
        <h2>3. Third-party sites</h2>
        <p>If you follow a link to WhatsApp or another external site, that service may use cookies or similar technologies under its own policy. IPTVUS24 does not control those technologies. Review the external provider’s privacy notice before sharing information there.</p>
      </section>
      <section>
        <h2>4. Change or withdraw your choice</h2>
        <p>Use “Cookie settings” in the website footer to reopen the preference banner. Withdrawing analytics consent updates Google Consent Mode to denied; you can also clear local site data in your browser. Blocking all browser storage may prevent the site from remembering your choice. Google services may process data under Google’s own terms and privacy notice.</p>
      </section>
      <section>
        <h2>5. Contact</h2>
        <p>For questions about this policy, email <a className="font-bold text-brand underline" href="mailto:support@iptvus24.com">support@iptvus24.com</a>. More detail about personal data is available in our <a className="font-bold text-brand underline" href="/privacy">Privacy Policy</a>.</p>
      </section>
    </SitePage>
  );
}
