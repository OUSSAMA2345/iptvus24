import Link from "next/link";
import SitePage, { SiteProse } from "../ui/SitePage";
import { SITE_NAME, SITE_URL } from "../metadata";
import { plans } from "../../src/data";
import { WhatsAppButton } from "../../src/components/WhatsApp";
import { getDeviceLanding, type DeviceLandingContent } from "./devices";
import { getSupportingArticles } from "./supporting-articles";

const linkClass = "font-bold text-brand underline underline-offset-4";

export default function DeviceLanding({ id }: { id: DeviceLandingContent["id"] }) {
  const page = getDeviceLanding(id);
  const guides = getSupportingArticles(page.path);
  const url = `${SITE_URL}${page.path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": url, url, name: page.h1, description: page.metaDescription, inLanguage: "en", isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: page.h1, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <SitePage title={page.h1} description={page.intro}>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-soft">
            <li><Link href="/" className="rounded hover:text-brand">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-ink">{page.h1.split(":")[0]}</li>
          </ol>
        </nav>
        <SiteProse>
          <section aria-labelledby="platform-heading">
            <h2 id="platform-heading">{page.platformHeading}</h2>
            {page.platformParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <p><strong className="text-ink">Quick check:</strong> {page.platformCheck}</p>
          </section>

          <section aria-labelledby="setup-heading">
            <h2 id="setup-heading">How setup works</h2>
            <ol className="mt-3 space-y-3">
              {page.setupSteps.map((step, index) => (
                <li key={step.title} className="rounded-xl border border-line bg-mist p-4">
                  <span className="text-xs font-extrabold tracking-[0.16em] text-brand">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1">{step.title}</h3>
                  <p className="!mt-1">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="plans-heading">
            <h2 id="plans-heading">Plans at a glance</h2>
            <div className="blog-table-scroll mt-3" role="region" aria-label="Plan summary" tabIndex={0}>
              <table className="w-full text-left text-sm">
                <thead><tr><th scope="col" className="px-3 py-2 text-ink">Plan</th><th scope="col" className="px-3 py-2 text-ink">Term</th><th scope="col" className="px-3 py-2 text-ink">Price</th><th scope="col" className="px-3 py-2 text-ink">Connections</th></tr></thead>
                <tbody>
                  {plans.map(plan => (
                    <tr key={plan.name} className="border-t border-line">
                      <td className="px-3 py-2 font-semibold text-ink">{plan.name}</td>
                      <td className="px-3 py-2">{plan.per}</td>
                      <td className="px-3 py-2">{plan.price}</td>
                      <td className="px-3 py-2">{plan.features[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Full details are on the <Link className={linkClass} href="/#plans">plans and pricing section</Link>, and you can{" "}
              <Link className={linkClass} href="/#compare-plans">compare every package side by side</Link>. Read the{" "}
              <Link className={linkClass} href="/refund">refund policy</Link> before ordering.
            </p>
          </section>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading">Common questions</h2>
            {page.faqs.map(faq => (
              <div key={faq.q}>
                <h3 className="mt-4">{faq.q}</h3>
                <p className="!mt-1">{faq.a}</p>
              </div>
            ))}
          </section>

          {guides.length > 0 && (
            <section aria-labelledby="guides-heading">
              <h2 id="guides-heading">Related setup and troubleshooting guides</h2>
              <p>Independent, documentation-based guides from the {SITE_NAME} blog for this device and the player apps used on it.</p>
              <ul>
                {guides.map(post => (
                  <li key={post.slug}><Link className={linkClass} href={`/blog/${post.slug}`} prefetch={false}>{post.markdown?.h1 ?? post.title}</Link></li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="contact-heading" className="rounded-2xl bg-mist p-5">
            <h2 id="contact-heading">Confirm your device before you order</h2>
            <p>Send your model and software version to support. We will tell you which setup applies and answer questions about plans, activation estimates or trial availability.</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <WhatsAppButton>Ask on WhatsApp</WhatsAppButton>
              <Link className={linkClass} href="/contact">Use the contact form</Link>
            </div>
          </section>
        </SiteProse>
      </SitePage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
