import type { Metadata } from "next";
import SitePage from "../ui/SitePage";
import ContactForm from "./ContactForm";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata("Contact Support", "Contact IPTVUS24 by email, WhatsApp, or the support form. Find answers in the FAQ.", "/contact");

export default function ContactPage() {
  return (
    <SitePage title="Contact IPTVUS24" description="For plan questions, setup help, refund requests, or privacy requests, contact our support team.">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <section>
          <h2>Send us a message</h2>
          <p>Complete the form and we’ll use your contact details only to respond to your request. Please do not include passwords or payment-card details.</p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </section>
        <aside className="space-y-6 rounded-2xl bg-mist p-5">
          <div>
            <h2>Support email</h2>
            <p><a className="font-bold text-brand underline" href="mailto:support@iptvus24.com">support@iptvus24.com</a></p>
          </div>
          <div>
            <h2>WhatsApp</h2>
            <p><a className="font-bold text-brand underline" href="https://wa.me/447473970663" target="_blank" rel="noopener noreferrer">+44 7473 970663</a></p>
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
      </div>
    </SitePage>
  );
}
