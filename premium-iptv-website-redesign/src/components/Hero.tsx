import type { CSSProperties, ReactNode } from "react";
import { Icon, Counter, Reveal, Avatar, Stars } from "./ui";
import { useLiveViewers } from "./SocialProof";
import { tickerItems, type IconName } from "../data";
import { heroTv } from "../assets";
import { WHATSAPP_NUMBER, WhatsAppButton, WhatsAppIcon } from "./WhatsApp";

const heroStats: { icon: IconName; render: ReactNode; label: string }[] = [
  { icon: "tv", render: <Counter to={25000} suffix="+" />, label: "Live Channels" },
  { icon: "film", render: <Counter to={150000} suffix="+" />, label: "Movies & Series" },
  { icon: "signal", render: <>4K</>, label: "HD / FHD / 4K" },
  { icon: "badge", render: <>99.9%</>, label: "Uptime SLA" },
  { icon: "bolt", render: <>5 min</>, label: "Activation" },
];

function MaskedWord({ word, i, accent }: { word: string; i: number; accent?: boolean }) {
  return (
    <span className="mask-line mr-[0.28em]">
      <span style={{ "--d": `${120 + i * 70}ms` } as CSSProperties} className={accent ? "text-brand" : ""}>
        {word}
      </span>
    </span>
  );
}

/* SVG uptime gauge */
function UptimeGauge() {
  const r = 26;
  const c = 2 * Math.PI * r;
  const target = c * 0.999;
  return (
    <svg viewBox="0 0 72 72" className="h-[74px] w-[74px] -rotate-90" aria-hidden="true">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#e2ebf6" strokeWidth="7" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke="url(#ug)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${target} ${c}`}
      />
      <defs>
        <linearGradient id="ug" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0A84FF" />
          <stop offset="1" stopColor="#00C2FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const upNext = [
  { t: "8:00", ch: "ESPN", show: "Monday Night Football", live: true },
  { t: "9:30", ch: "HBO", show: "The Last of Us — Premiere", live: false },
  { t: "10:00", ch: "SKY", show: "Sky Sports News", live: false },
];

export default function Hero() {
  const headline = ["Premium", "IPTV", "Service", "With", "25,000+", "Live", "Channels", "&", "VOD"];
  let wi = 0;
  const viewers = useLiveViewers();

  return (
    <section className="bg-hero-wash relative overflow-hidden pt-[7.5rem] sm:pt-32">
      <div className="bg-dotgrid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-brand/20 to-cyan/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-12%] h-[380px] w-[380px] rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-24">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/90 px-4 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-brand shadow-sm">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-brand" />
                  USA · Canada · UK
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ffe3d0] bg-[#fff6ef] px-3.5 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-[#c2410c]">
                  <Icon name="flame" className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Launch Pricing Live
                </span>
              </div>
            </Reveal>

            <h1 className="font-display mt-6 text-[2.5rem] font-extrabold leading-[1.07] tracking-tight text-ink sm:text-6xl lg:text-[3.85rem]">
              {headline.map((w, i) => {
                const idx = wi++;
                return <MaskedWord key={i} word={w} i={idx} accent={w === "25,000+"} />;
              })}
            </h1>

            <Reveal delay={420}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-soft sm:text-xl">
                Watch sports, movies, series, international channels and premium entertainment on every device —
                <span className="font-bold text-ink"> activated in minutes, guaranteed.</span>
              </p>
            </Reveal>

            <Reveal delay={540}>
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a href="#plans" className="btn-primary text-base">
                  Start Now — $5.83/mo
                  <Icon name="arrow" className="h-5 w-5" strokeWidth={2.2} />
                </a>
                <a href="#plans" className="btn-ghost text-base">
                  <Icon name="play" className="h-4 w-4 text-brand" />
                  View Plans
                </a>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#bce9cb] bg-gradient-to-r from-[#edfff2] to-white p-4 shadow-[0_10px_30px_rgba(37,211,102,0.12)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div>
                  <p className="flex items-center gap-2 text-sm font-extrabold text-[#075e54]">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#25d366] text-white">
                      <WhatsAppIcon className="h-5 w-5" />
                    </span>
                    Need help choosing a plan?
                  </p>
                  <p className="mt-1 pl-11 text-sm font-bold text-slate-soft">{WHATSAPP_NUMBER} · 24/7 support</p>
                </div>
                <div className="sm:w-52">
                  <WhatsAppButton>Chat with us</WhatsAppButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={620}>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-bold text-slate-soft">
                <span className="flex items-center gap-1.5"><Icon name="lock" className="h-4 w-4 text-brand" strokeWidth={2.2} /> SSL-secured checkout</span>
                <span className="flex items-center gap-1.5"><Icon name="shield" className="h-4 w-4 text-brand" strokeWidth={2.2} /> 30-day money-back</span>
                <span className="flex items-center gap-1.5 tabular-nums"><span className="h-2 w-2 animate-pulse rounded-full bg-[#0f9d58]" /><b className="text-ink">{viewers}</b> viewing now</span>
              </div>
            </Reveal>

            <Reveal delay={700}>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2.5">
                  {["Mike J", "Sarah P", "Tom W", "Lisa D", "Dan R"].map((n, i) => (
                    <Avatar key={n} name={n} i={i} className="h-9 w-9 text-[11px]" />
                  ))}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-[9.5px] font-extrabold text-white ring-2 ring-mist">
                    12.4k
                  </span>
                </div>
                <div>
                  <Stars className="h-3.5 w-3.5" />
                  <p className="mt-0.5 text-sm font-semibold text-slate-soft">
                    Rated <b className="text-ink">4.9/5</b> by 2,300+ verified reviews
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Stat chips */}
            <Reveal delay={800}>
              <dl className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
                {heroStats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`lift group rounded-2xl border border-line bg-white/90 p-3 shadow-card sm:p-3.5 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-haze text-brand transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-cyan group-hover:text-white">
                      <Icon name={s.icon} className="h-4.5 w-4.5" />
                    </span>
                    <dd className="font-display mt-2 text-lg font-extrabold leading-none text-ink sm:text-[1.15rem]">{s.render}</dd>
                    <dt className="mt-1 text-[9.5px] font-extrabold uppercase leading-tight tracking-wide text-slate-soft sm:text-[10px]">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Visual — IPTV dashboard composition */}
          <div className="relative lg:col-span-6">
            <Reveal delay={180} className="relative">
              <div className="relative overflow-hidden rounded-[28px] border border-white/70 shadow-[0_30px_80px_rgba(10,48,102,0.24)] ring-1 ring-line">
                <img
                  src={heroTv}
                  alt="IPTVUS24 streaming on a large premium smart TV in a modern living room"
                  width={1200}
                  height={860}
                  fetchPriority="high"
                  decoding="async"
                  className="kenburns h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              </div>

              {/* LIVE channel card — overlays the screen */}
              <div className="glass floaty absolute left-3 top-4 rounded-2xl p-3 shadow-[0_18px_44px_rgba(10,48,102,0.22)] sm:-left-5 sm:top-8 sm:p-3.5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#e11d48] to-[#fb7185] font-display text-[13px] font-extrabold text-white shadow-md">
                    ESPN
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#e11d48]">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e11d48]" /> Live · 4K
                    </p>
                    <p className="truncate text-[13px] font-extrabold text-ink">Chiefs vs Bills — Q3 · 8:42</p>
                    <p className="text-[10.5px] font-bold text-slate-soft">Ch 701 · anti-buffer active</p>
                  </div>
                  <div className="ml-1 flex h-6 items-end gap-[3px]" aria-hidden="true">
                    {[0.9, 0.5, 1, 0.65, 0.8].map((d, i) => (
                      <span
                        key={i}
                        className="eq-bar w-[3.5px] rounded-full bg-gradient-to-t from-brand to-cyan"
                        style={{ height: `${10 + i * 3}px`, animationDelay: `${d * 0.4}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* EPG "up next" guide card */}
              <div className="glass floaty-slow absolute right-2 top-[38%] hidden w-56 rounded-2xl p-3 shadow-[0_18px_44px_rgba(10,48,102,0.22)] sm:block md:-right-5 lg:w-60" style={{ animationDelay: "0.9s" }}>
                <p className="mb-2 flex items-center justify-between text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-slate-soft">
                  Up next — EPG
                  <Icon name="guide" className="h-4 w-4 text-brand" />
                </p>
                <ul className="space-y-1.5">
                  {upNext.map((e) => (
                    <li key={e.ch + e.t} className="flex items-center gap-2 rounded-xl bg-white/70 px-2 py-1.5 ring-1 ring-line/70">
                      <span className="font-mono text-[10px] font-bold tabular-nums text-brand">{e.t}</span>
                      <span className="w-8 shrink-0 text-[10px] font-extrabold text-ink/70">{e.ch}</span>
                      <span className="truncate text-[10.5px] font-semibold text-ink/85">{e.show}</span>
                      {e.live && <span className="ml-auto h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#e11d48]" />}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4K badge */}
              <div className="glass floaty absolute right-3 top-3 rounded-2xl px-3.5 py-2.5 shadow-lg sm:-right-5 sm:top-4" style={{ animationDelay: "1.6s" }}>
                <p className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink font-display text-[10px] font-extrabold text-cyan">4K</span>
                  <span>
                    <span className="block font-display text-[12.5px] font-extrabold leading-none text-ink">UHD · HDR10</span>
                    <span className="mt-1 block text-[9.5px] font-bold uppercase tracking-wide text-slate-soft">60fps sports feed</span>
                  </span>
                </p>
              </div>

              {/* Activation success card */}
              <div className="glass floaty-slow absolute bottom-16 left-3 hidden rounded-2xl p-3 shadow-[0_18px_44px_rgba(10,48,102,0.22)] sm:flex sm:-left-6 sm:items-center sm:gap-2.5" style={{ animationDelay: "0.4s" }}>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e6f7ee] text-[#0f9d58]">
                  <Icon name="check" className="h-5 w-5" strokeWidth={2.6} />
                </span>
                <span>
                  <span className="block text-[12px] font-extrabold text-ink">Activation complete</span>
                  <span className="block text-[10.5px] font-semibold text-slate-soft">in 2 min 14 sec · Monday, 9:41 AM</span>
                </span>
              </div>

              {/* Uptime gauge card */}
              <div className="glass floaty absolute right-3 top-[13%] hidden items-center gap-3 rounded-2xl p-3 pr-4 shadow-[0_18px_44px_rgba(10,48,102,0.22)] lg:flex lg:-right-8 lg:top-24" style={{ animationDelay: "2.1s" }}>
                <div className="relative">
                  <UptimeGauge />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-[13px] font-extrabold text-ink">99.9</span>
                  </span>
                </div>
                <span>
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-soft">Network<br />Uptime · 90d</span>
                  <span className="mt-1 block text-[10.5px] font-bold text-[#0f9d58]">Zero major outages</span>
                </span>
              </div>

              {/* Player bar */}
              <div className="glass absolute -bottom-6 left-1/2 hidden w-[min(400px,84%)] -translate-x-1/2 rounded-2xl p-3.5 shadow-[0_18px_44px_rgba(10,48,102,0.22)] md:block">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-cyan text-white shadow-glow">
                    <Icon name="play" className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-soft">
                      <span className="truncate">Dune: Part Two — 4K UHD · HDR10</span>
                      <span className="ml-2 shrink-0 tabular-nums">1:47 / 2:45</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-haze">
                      <div className="progress-live h-full rounded-full bg-gradient-to-r from-brand to-cyan" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Channel ticker */}
      <div className="relative border-y border-line bg-white/80 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 sm:px-6">
          <span className="flex shrink-0 items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-brand">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff3b30]" />
            Now streaming
          </span>
          <div className="marquee flex-1">
            <div className="marquee-track gap-8 pr-8">
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-bold text-slate-soft">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-cyan" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
