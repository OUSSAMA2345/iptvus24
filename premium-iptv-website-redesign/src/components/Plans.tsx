import { MotionSurface } from "./PremiumMotion";
import Image from "next/image";
import Link from "next/link";
import { pricingSportsLounge } from "../assets";
import { Icon, SectionHead } from "./ui";
import { plans } from "../data";
import { cn } from "../utils/cn";
import { WhatsAppButton } from "./WhatsApp";
import Reveal from "./Reveal";
import { PricingTrustDetails } from "./TrustDetails";

export default function Plans() {
  return (
    <section id="plans" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Plans and pricing"
          title={<>Choose the term <span className="text-brand">that suits you.</span></>}
          sub="Compare the total price and duration. Confirm availability, payment details, and service terms with support before ordering."
        />

        <div className="pricing-cinema relative mt-10 overflow-hidden rounded-3xl border border-line bg-[#07111f] shadow-card">
          <Image
            src={pricingSportsLounge}
            alt="Home cinema lounge displaying an original, unbranded football stadium scene"
            width={1408}
            height={768}
            quality={84}
            sizes="(max-width: 1280px) 100vw, 1232px"
            className="h-56 w-full object-cover object-center sm:h-80 lg:h-96"
          />
        </div>

        <div className="pricing-deck mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06} className="h-full">
              <MotionSurface className={plan.best ? "plan-surface plan-featured" : "plan-surface"}>
                <article
                  className={cn(
                    "plan-card relative flex h-full flex-col rounded-2xl border bg-surface p-5 shadow-card sm:p-6",
                    plan.best ? "border-brand ring-1 ring-brand/20" : "border-line",
                  )}
                >
                  {plan.best && (
                    <span className="mb-4 w-fit rounded-full bg-haze px-3 py-1 text-[11px] font-bold text-brand">
                      Lowest monthly equivalent
                    </span>
                  )}
                  <h3 className="font-display text-lg font-extrabold text-ink">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-soft">{plan.tagline}</p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold tracking-tight text-ink">{plan.price}</span>
                    <span className="text-sm font-medium text-slate-soft">/ {plan.per}</span>
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-soft">Monthly equivalent: {plan.monthly}</p>
                  <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <WhatsAppButton>Order on WhatsApp</WhatsAppButton>
                  </div>
                </article>
              </MotionSurface>
            </Reveal>
          ))}
        </div>
        <PricingTrustDetails />
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-soft">
          Refunds are subject to eligibility and exclusions in our{" "}
          <Link href="/refund" className="font-bold text-brand underline underline-offset-4">30-day refund policy</Link>.
          Prices are shown in USD; confirm any applicable taxes and payment terms before purchase.
        </p>
      </div>
    </section>
  );
}
