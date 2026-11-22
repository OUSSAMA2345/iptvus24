import { Icon, Reveal } from "./ui";
import type { IconName } from "../data";

type Pillar = {
  icon: IconName;
  title: string;
  note: string;
  foot: string;
  visual: "ring" | "wave" | "pulse" | "radar";
};

const pillars: Pillar[] = [
  { icon: "lock", title: "SSL Secured", note: "256-bit TLS on every page", foot: "A+ rated encryption", visual: "ring" },
  { icon: "card", title: "Secure Payments", note: "Visa, Mastercard, Amex, PayPal & Apple Pay", foot: "PCI-DSS Level 1", visual: "pulse" },
  { icon: "shield", title: "Encrypted Checkout", note: "3-D Secure verified transactions", foot: "We never store cards", visual: "ring" },
  { icon: "headset", title: "24/7 Human Support", note: "Real people, every hour of the day", foot: "< 5 min avg. reply", visual: "wave" },
  { icon: "bolt", title: "Instant Delivery", note: "Login details in minutes, day or night", foot: "95% under 5 minutes", visual: "pulse" },
  { icon: "globe", title: "Worldwide Access", note: "US, Canada, UK + 40 countries", foot: "Servers in 12 regions", visual: "radar" },
];

function Visual({ kind }: { kind: Pillar["visual"] }) {
  if (kind === "ring")
    return (
      <svg aria-hidden="true" viewBox="0 0 56 56" className="rotate-slow absolute -inset-1 m-auto h-[72px] w-[72px] text-brand/35" fill="none">
        <circle cx="28" cy="28" r="25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="26 90" />
      </svg>
    );
  if (kind === "wave")
    return (
      <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-4 items-end gap-[3px]">
        {[0.5, 0.9, 0.65, 1, 0.4].map((d, i) => (
          <span key={i} className="eq-bar h-full w-[3px] rounded-full bg-brand/60" style={{ animationDelay: `${d * 0.5}s` }} />
        ))}
      </span>
    );
  if (kind === "radar")
    return (
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="radar-ring h-16 w-16 rounded-full border-2 border-brand/40" />
      </span>
    );
  return (
    <span aria-hidden="true" className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/50" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand/80" />
    </span>
  );
}

export default function TrustBar() {
  return (
    <section aria-label="Security and service guarantees" className="relative border-y border-line bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-cyan" />
              Bank-Grade Trust
            </span>
            <h2 className="font-display mt-4 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
              Secure from cart to couch — <span className="text-brand">guaranteed.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] font-semibold leading-relaxed text-slate-soft">
            Every order is encrypted end-to-end, monitored 24/7, and backed by a 30-day money-back guarantee.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-mist/60 p-4 text-center transition-all duration-300 hover:border-[#b7d8ff] hover:bg-white hover:shadow-[0_14px_36px_rgba(10,132,255,0.14)] sm:p-5">
                <div className="relative mx-auto grid h-16 w-16 place-items-center">
                  <Visual kind={p.visual} />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-cyan text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <Icon name={p.icon} className="h-6.5 w-6.5" />
                  </span>
                </div>
                <h3 className="font-display mt-3 text-[13px] font-extrabold leading-tight text-ink sm:text-[13.5px]">{p.title}</h3>
                <p className="mt-1 text-[11px] font-medium leading-snug text-slate-soft">{p.note}</p>
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wide text-brand ring-1 ring-line">
                  <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.4} />
                  {p.foot}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
