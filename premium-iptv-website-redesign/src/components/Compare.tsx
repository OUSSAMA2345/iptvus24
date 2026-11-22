import { Icon, Reveal, Counter } from "./ui";
import { compareRows } from "../data";

export default function Compare() {
  return (
    <section id="why" className="scroll-mt-28 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: pitch */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-cyan" />
                Why Choose IPTVUS24
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="font-display mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                The provider that treats <span className="text-brand">your signal</span> like our reputation
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-4 text-base leading-relaxed text-slate-soft sm:text-lg">
                Most IPTV resellers sell you a login and disappear. We run our own anti-buffer servers,
                monitor uptime around the clock, and keep a human on chat 24/7 — because a dropped
                final is the only final that matters.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { v: 25000, s: "+", l: "live channels" },
                { v: 150000, s: "+", l: "on-demand titles" },
              ].map((stat, i) => (
                <Reveal key={stat.l} delay={220 + i * 100}>
                  <div className="lift rounded-2xl border border-line bg-mist p-5">
                    <p className="font-display text-2xl font-extrabold text-brand sm:text-[1.7rem]">
                      <Counter to={stat.v} suffix={stat.s} />
                    </p>
                    <p className="mt-1 text-[12.5px] font-bold uppercase tracking-wide text-slate-soft">{stat.l}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320}>
              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-line bg-gradient-to-r from-mist to-haze/70 p-5">
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-brand shadow-sm ring-1 ring-line">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/15" />
                  <Icon name="signal" className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-extrabold text-ink">
                    99.9% uptime, monitored every 30 seconds
                  </p>
                  <p className="text-[13px] font-medium text-slate-soft">
                    Last 90 days: 118,724 checks — zero major outages.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <p className="mt-6 text-sm font-semibold text-slate-soft">
                Switching from another provider? We migrate your channel list and favorites{" "}
                <span className="text-brand">for free, live with you on chat</span>.
              </p>
            </Reveal>
          </div>

          {/* Right: table */}
          <Reveal delay={150} className="lg:col-span-7">
            <div className="overflow-hidden rounded-[24px] border border-line shadow-card">
              <div className="grid grid-cols-[1.25fr_1.1fr_1fr] items-center gap-2 bg-gradient-to-r from-ink to-[#14213c] px-5 py-4 text-white sm:px-7">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/60">Feature</p>
                <p className="flex items-center gap-1.5 text-[13px] font-extrabold sm:text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-brand to-cyan">
                    <Icon name="play" className="h-3 w-3" />
                  </span>
                  IPTVUS24
                  <span className="hidden rounded-full bg-[#0f9d58]/25 px-2 py-0.5 text-[10px] font-extrabold text-[#34d399] ring-1 ring-[#34d399]/40 sm:inline">
                    98/100
                  </span>
                </p>
                <p className="flex items-center gap-1.5 text-[12px] font-bold text-white/55 sm:text-[13px]">
                  Typical IPTV
                  <span className="hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-extrabold text-white/55 ring-1 ring-white/15 md:inline">
                    52/100
                  </span>
                </p>
              </div>

              <ul>
                {compareRows.map((r, i) => (
                  <li
                    key={r.label}
                    className={`grid grid-cols-[1.25fr_1.1fr_1fr] items-center gap-2 px-5 py-4 sm:px-7 ${
                      i % 2 ? "bg-mist/70" : "bg-white"
                    }`}
                  >
                    <p className="pr-2 text-[13.5px] font-extrabold text-ink sm:text-sm">{r.label}</p>
                    <p className="flex items-start gap-2 pr-2 text-[13px] font-bold leading-snug text-ink sm:text-sm">
                      <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-cyan text-white" style={{ width: 18, height: 18 }}>
                        <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.4} />
                      </span>
                      {r.us}
                    </p>
                    <p className="flex items-start gap-2 text-[13px] font-semibold leading-snug text-slate-soft/80 sm:text-sm">
                      <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-line text-slate-soft/70" style={{ width: 18, height: 18 }}>
                        <Icon name="minus" className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {r.them}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-center justify-between gap-3 border-t border-line bg-gradient-to-r from-haze/60 to-mist px-5 py-4 sm:flex-row sm:px-7">
                <p className="text-[12.5px] font-bold text-slate-soft">
                  Public status page + 30-day guarantee back every claim.
                </p>
                <a href="#plans" className="btn-primary !px-5 !py-2.5 !text-sm">
                  Beat Your Current Provider
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
