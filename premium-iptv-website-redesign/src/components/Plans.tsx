import { Icon, Reveal, SectionHead } from "./ui";
import { plans } from "../data";
import { cn } from "../utils/cn";

const trustRow = [
  { icon: "lock" as const, title: "256-bit SSL", note: "Encrypted, PCI-compliant checkout" },
  { icon: "card" as const, title: "All Major Cards", note: "Visa · Mastercard · Amex · PayPal · Apple Pay" },
  { icon: "bolt" as const, title: "Instant Delivery", note: "Credentials in your inbox within minutes" },
];

export default function Plans() {
  return (
    <section id="plans" className="relative scroll-mt-28 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-mist via-haze/50 to-mist"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand/12 via-cyan/10 to-brand/12 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Simple, Honest Pricing"
          title={
            <>
              Pick your plan. <span className="text-brand">Stream tonight.</span>
            </>
          }
          sub="No hidden fees, no setup charges, no long-term trap. Switch or cancel anytime with one message — and every plan ships with a 30-day money-back guarantee."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-6">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 110} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[26px] p-[1.5px] transition-transform duration-300",
                  p.best
                    ? "z-10 bg-gradient-to-b from-brand via-[#00a4ff] to-cyan shadow-[0_28px_70px_rgba(10,132,255,0.35)] lg:-my-2 lg:scale-[1.03]"
                    : "bg-line shadow-card",
                )}
              >
                {p.best && (
                  <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#ff9f0a] via-[#ffb340] to-[#ff9f0a] px-5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#3a2400] shadow-[0_10px_26px_rgba(255,159,10,0.4)] ring-1 ring-[#ffd58a]">
                    ★ Best Seller — Most Popular
                  </span>
                )}
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[25px] bg-white p-6",
                    p.best && "bg-gradient-to-b from-white via-white to-[#eef7ff] p-6",
                  )}
                >
                  <h3 className="font-display text-[17px] font-extrabold text-ink">{p.name} Plan</h3>
                  <p className="text-[11.5px] font-semibold text-slate-soft">{p.tagline}</p>

                  <div className="mt-4 flex items-end gap-2">
                    <span
                      className={cn(
                        "font-display font-extrabold leading-none tracking-tight",
                        p.best ? "text-shine text-[2.6rem] xl:text-[2.85rem]" : "text-ink text-[2.35rem] xl:text-[2.6rem]",
                      )}
                    >
                      {p.price}
                    </span>
                    <span className="pb-1 text-[12px] font-bold leading-tight text-slate-soft">
                      / {p.per}
                    </span>
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[12px] font-bold text-slate-soft">
                    <span className="text-brand">{p.monthly}</span>
                    {p.save && (
                      <span className="rounded-full bg-[#e3f7ec] px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#0f9d58]">
                        {p.save}
                      </span>
                    )}
                  </p>

                  <div className="my-5 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

                  <ul className="space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[12.5px] font-semibold leading-snug text-ink/85">
                        <span
                          className={cn(
                            "mt-0.5 grid shrink-0 place-items-center rounded-full",
                            p.best ? "bg-gradient-to-br from-brand to-cyan text-white" : "bg-haze text-brand",
                          )}
                          style={{ width: 18, height: 18 }}
                        >
                          <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.2} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#top"
                    aria-label={`${p.cta} — ${p.price} ${p.per}`}
                    className={cn(
                      "mt-7 w-full text-[14.5px]",
                      p.best ? "btn-primary" : "btn-ghost",
                    )}
                  >
                    {p.cta}
                    <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
                  </a>

                  {p.trial && (
                    <p className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#eef7ff] px-3 py-2 text-[11px] font-extrabold text-brand ring-1 ring-[#cfe6ff]">
                      <Icon name="clock" className="h-3.5 w-3.5" strokeWidth={2.3} />
                      Includes 7-day free trial
                    </p>
                  )}
                  {p.best && (
                    <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#b45309]">
                      <Icon name="flame" className="h-3.5 w-3.5" strokeWidth={2.2} />
                      Only 47 launch-price slots left
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Secure checkout strip */}
        <Reveal delay={150}>
          <div className="mt-12 grid gap-3 rounded-2xl border border-line bg-white/90 p-4 shadow-card backdrop-blur sm:grid-cols-3 sm:gap-6 sm:p-5">
            {trustRow.map((t) => (
              <div key={t.title} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand/12 to-cyan/16 text-brand ring-1 ring-line">
                  <Icon name={t.icon} className="h-5.5 w-5.5" />
                </span>
                <div>
                  <p className="text-[13px] font-extrabold text-ink">{t.title}</p>
                  <p className="text-[11px] font-semibold leading-snug text-slate-soft">{t.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Money-back vault */}
        <Reveal delay={220}>
          <div className="mt-4 overflow-hidden rounded-3xl border border-[#cfe0f5] bg-gradient-to-br from-[#eaf4ff] via-white to-[#eafaff] p-6 shadow-card sm:p-8">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="relative grid h-24 w-24 shrink-0 place-items-center">
                <svg aria-hidden="true" viewBox="0 0 96 96" className="rotate-slow absolute inset-0 h-full w-full" fill="none">
                  <circle cx="48" cy="48" r="43" stroke="#0A84FF" strokeOpacity="0.3" strokeWidth="3" strokeDasharray="30 60" strokeLinecap="round" />
                </svg>
                <span className="relative grid h-[72px] w-[72px] place-items-center rounded-3xl bg-gradient-to-br from-brand to-cyan text-white shadow-glow">
                  <Icon name="shield" className="h-8 w-8" strokeWidth={1.8} />
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-display text-xl font-extrabold text-ink sm:text-2xl">
                  30-Day Iron-Clad <span className="text-brand">Money-Back Guarantee</span>
                </p>
                <p className="mt-2 max-w-2xl text-[13.5px] font-medium leading-relaxed text-slate-soft">
                  Not in love with it within 30 days — for any reason — and we refund every dollar inside 24 hours.
                  No forms. No phone tree. No hard sell. Your risk is literally <b className="text-ink">zero</b>.
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11.5px] font-extrabold uppercase tracking-wide text-brand">
                  <span className="flex items-center gap-1.5"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /> No questions asked</span>
                  <span className="flex items-center gap-1.5"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /> Refund within 24h</span>
                  <span className="flex items-center gap-1.5"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /> Cancel in one message</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
