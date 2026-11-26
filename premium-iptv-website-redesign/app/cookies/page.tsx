import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("Cookie Policy", "Details about cookies and browser storage used by IPTVUS24, optional consent, and how to change your choice.", "/cookies");

export default function CookiesPage() {
  return (
    <SitePage title="Cookie Policy" description="Effective date: November 24, 2026. This policy describes cookies and similar technologies used on iptvus24.com.">
      <section>
        <h2>1. What we use</h2>
        <p>At present, IPTVUS24 does not set analytics or advertising cookies and does not load analytics or advertising scripts on this website. The cookie banner stores your choice in browser local storage under a site-specific key; it is not sent to our servers. This storage is necessary to remember your preference.</p>
      </section>
      <section>
        <h2>2. Optional categories</h2>
        <p>The consent interface includes optional analytics and marketing categories so your preference can be recorded if these features are introduced. They are not active now. Accepting optional categories does not cause this version of the website to load third-party tracking.</p>
        <ul>
          <li><b>Essential:</b> remembers the privacy choice and supports basic site operation.</li>
          <li><b>Analytics:</b> currently not used.</li>
          <li><b>Marketing:</b> currently not used.</li>
        </ul>
      </section>
      <section>
        <h2>3. Third-party sites</h2>
        <p>If you follow a link to WhatsApp or another external site, that service may use cookies or similar technologies under its own policy. IPTVUS24 does not control those technologies. Review the external provider’s privacy notice before sharing information there.</p>
      </section>
      <section>
        <h2>4. Change or withdraw your choice</h2>
        <p>Use “Cookie settings” in the website footer to reopen the preference banner. You can also clear local site data in your browser. Blocking all browser storage may prevent the site from remembering your choice. Because no optional trackers are currently active, there is no analytics or marketing cookie to withdraw from at this time.</p>
      </section>
      <section>
        <h2>5. Contact</h2>
        <p>For questions about this policy, email <a className="font-bold text-brand underline" href="mailto:support@iptvus24.com">support@iptvus24.com</a>. More detail about personal data is available in our <a className="font-bold text-brand underline" href="/privacy">Privacy Policy</a>.</p>
      </section>
    </SitePage>
  );
}
