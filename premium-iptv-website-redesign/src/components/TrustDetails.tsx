import { WhatsAppButton } from "./WhatsApp";

const orderDetails = [
  {
    title: "Seller details",
    description: "Your order confirmation identifies the seller. Ask for the seller name before paying if it is unclear.",
  },
  {
    title: "Payment methods",
    description: "Available methods and any applicable taxes are shown before you authorize an order.",
  },
  {
    title: "Activation",
    description: "Ask support for the current activation estimate before you pay; timing can vary.",
  },
  {
    title: "Trial availability",
    description: "A trial is not listed on these plans. Ask whether one is currently available.",
  },
  {
    title: "Renewal",
    description: "Plans end at the stated term unless your order says otherwise. Any recurring renewal must be disclosed and authorized.",
  },
  {
    title: "Refunds",
    description: "Request a refund for your first paid plan within 30 calendar days. Eligibility and exclusions apply; see the full policy.",
  },
  {
    title: "Support",
    description: "WhatsApp is the primary contact for pre-sale questions. Response times may vary.",
  },
];

export function PricingTrustDetails() {
  return (
    <section aria-labelledby="order-details-title" className="mt-10 rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold text-brand">Clear terms before ordering</p>
        <h3 id="order-details-title" className="font-display mt-2 text-2xl font-extrabold tracking-tight text-ink">
          Know what is confirmed before you order.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-soft">
          We do not advertise a fixed activation time or trial here. Confirm current details with support before paying.
        </p>
      </div>
      <dl className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {orderDetails.map((detail) => (
          <div key={detail.title} className="rounded-2xl border border-line bg-mist p-4">
            <dt className="text-sm font-extrabold text-ink">{detail.title}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-slate-soft">{detail.description}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="w-full max-w-sm">
          <WhatsAppButton>Confirm details on WhatsApp</WhatsAppButton>
        </div>
        <p className="text-center text-xs text-slate-soft">
          Read the <a href="/terms" className="font-bold text-brand underline underline-offset-4">Terms</a> and{" "}
          <a href="/refund" className="font-bold text-brand underline underline-offset-4">Refund Policy</a>.
        </p>
      </div>
    </section>
  );
}
