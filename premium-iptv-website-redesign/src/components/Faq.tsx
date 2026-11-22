import { useState } from "react";
import { Icon, Reveal } from "./ui";
import { faqs, type FaqCategory } from "../data";
import { cn } from "../utils/cn";

const cats: { id: FaqCategory | "All"; label: string; icon?: "bolt" | "devices" | "card" | "signal" | "chat" }[] = [
  { id: "All", label: "All 9 questions" },
  { id: "Setup", label: "Setup & Activation", icon: "bolt" },
  { id: "Compatibility", label: "Compatibility", icon: "devices" },
  { id: "Quality", label: "Streaming Quality", icon: "signal" },
  { id: "Billing", label: "Billing & Refunds", icon: "card" },
  { id: "Support", label: "24/7 Support", icon: "chat" },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filter, setFilter] = useState<(typeof cats)[number]["id"]>("All");

  const visible = faqs.map((f, i) => ({ ...f, idx: i })).filter((f) => filter === "All" || f.cat === filter);

  return (
    <section id="faq" className="scroll-mt-28 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-cyan" />
                  Questions, Answered
                </span>
              </Reveal>
              <Reveal delay={90}>
                <h2 className="font-display mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                  Everything you need to know <span className="text-brand">before you press play</span>
                </h2>
              </Reveal>
              <Reveal delay={170}>
                <p className="mt-4 text-base leading-relaxed text-slate-soft sm:text-lg">
                  Straight answers, no fine print. Filter by topic — and if yours isn't here, a real
                  human is one message away, day or night.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-8 overflow-hidden rounded-[24px] border border-line bg-gradient-to-br from-mist to-haze/80 p-6 shadow-card">
                  <div className="flex items-center gap-4">
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-cyan text-white shadow-glow">
                      <span className="radar-ring absolute inset-0 rounded-2xl border-2 border-brand/40" />
                      <Icon name="chat" className="relative h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display text-[17px] font-extrabold text-ink">Still have a question?</p>
                      <p className="text-[13px] font-semibold text-slate-soft">
                        Avg. response: <b className="text-ink">under 5 minutes</b> — 24/7
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    {[
                      { v: "24/7", l: "Live chat" },
                      { v: "<5 min", l: "First reply" },
                      { v: "US/CA/UK", l: "Time zones" },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl bg-white/80 px-2 py-3 ring-1 ring-line">
                        <p className="font-display text-[15px] font-extrabold text-brand">{s.v}</p>
                        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-soft">{s.l}</p>
                      </div>
                    ))}
                  </div>
                  <a href="mailto:support@iptvus24.com" className="btn-ghost mt-5 w-full !text-sm">
                    support@iptvus24.com
                    <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Category filter + accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter questions by topic">
              {cats.map((c) => {
                const active = filter === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setFilter(c.id);
                      setOpenIdx(null);
                    }}
                    className={cn(
                      "flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 py-2 text-[12px] font-extrabold transition-all duration-200",
                      active
                        ? "border-transparent bg-gradient-to-r from-brand to-cyan text-white shadow-glow"
                        : "border-line bg-mist text-slate-soft hover:border-[#b7d8ff] hover:text-ink",
                    )}
                  >
                    {c.icon && <Icon name={c.icon} className="h-3.5 w-3.5" strokeWidth={2.2} />}
                    {c.label}
                  </button>
                );
              })}
            </div>

            <ul className="mt-5 space-y-3.5" key={filter}>
              {visible.map((f, i) => {
                const open = openIdx === f.idx;
                return (
                  <li key={f.q} className="fade-slide" style={{ animationDelay: `${i * 50}ms` }}>
                    <div
                      className={cn(
                        "overflow-hidden rounded-2xl border transition-all duration-300",
                        open
                          ? "border-[#a9cdf5] bg-gradient-to-b from-white to-haze/50 shadow-[0_14px_36px_rgba(10,132,255,0.12)]"
                          : "border-line bg-white shadow-sm hover:border-[#c3dcf8]",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIdx(open ? null : f.idx)}
                        aria-expanded={open}
                        className="flex min-h-[64px] w-full items-center gap-4 px-5 py-4 text-left sm:px-7"
                      >
                        <span
                          className={cn(
                            "font-display grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-extrabold transition-all duration-300",
                            open ? "bg-gradient-to-br from-brand to-cyan text-white shadow-glow" : "bg-haze text-brand",
                          )}
                        >
                          {String(f.idx + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-[15.5px] font-extrabold text-ink sm:text-[16px]">{f.q}</span>
                        <span
                          className={cn(
                            "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-white text-brand transition-all duration-300",
                            open && "rotate-[135deg] border-transparent bg-gradient-to-br from-brand to-cyan text-white",
                          )}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </button>
                      <div className={cn("acc-panel", open && "open")}>
                        <div className="acc-inner">
                          <p className="px-5 pb-5 pl-[4.4rem] pr-6 text-[14px] font-medium leading-relaxed text-slate-soft sm:px-7 sm:pl-[4.6rem] sm:text-[14.5px]">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              {visible.length === 0 && (
                <li className="rounded-2xl border border-dashed border-line p-8 text-center text-sm font-semibold text-slate-soft">
                  No questions in this category yet — ask us on live chat.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
