import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import ContactForm from "./ContactForm";
import { pageMetadata } from "../metadata";
import { WHATSAPP_NUMBER, WhatsAppButton } from "../../src/components/WhatsApp";

export const metadata: Metadata = pageMetadata("Contact Support", "Contact IPTVUS24 on WhatsApp or save a contact request through the support form.", "/contact");

export default function ContactPage() {
  return (
    <SitePage title="Contact IPTVUS24" description="WhatsApp is our primary contact method. You can also save a contact request through the support form.">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.4fr]">
        <aside className="h-fit space-y-6 rounded-2xl bg-mist p-5">
          <div>
            <h2>WhatsApp is the quickest way to reach us</h2>
            <p className="mt-2">Ask about plans, payment options, activation estimates, trial availability, or device compatibility before ordering. Response times may vary.</p>
            <div className="mt-4">
              <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
            </div>
            <p className="mt-2 text-xs text-slate-soft">{WHATSAPP_NUMBER}</p>
          </div>
          <div>
            <h2>Prefer the contact form?</h2>
            <p>Requests are saved in Supabase. Include a WhatsApp number so the team can respond through your preferred channel.</p>
          </div>
          <div>
            <h2>Frequently asked questions</h2>
            <p>See the <a className="font-bold text-brand underline" href="/#faq">FAQ section</a> for setup, compatible devices, service, and billing information.</p>
          </div>
          <div>
            <h2>Service updates</h2>
            <p>Check the <a className="font-bold text-brand underline" href="/status">service status page</a> for published incidents and maintenance notices.</p>
          </div>
        </aside>
        <section>
          <h2>Save a contact request</h2>
          <p>We save your request and use the WhatsApp number you provide to respond. Please do not include passwords or payment-card details.</p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </section>
      </div>
    </SitePage>
  );
}
