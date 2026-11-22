import { useEffect, useState, type ReactNode } from "react";
import { Icon, Reveal, Stars, Avatar } from "./ui";
import { Logo } from "./Navbar";
import { useLiveViewers } from "./SocialProof";
import { footerCols } from "../data";
import { cn } from "../utils/cn";

/* ---------------- Final CTA ---------------- */
export function FinalCta() {
  const viewers = useLiveViewers();
  return (
    <section className="relative overflow-hidden">
      <div className="relative bg-gradient-to-br from-brand-deep via-brand to-cyan">
        {/* pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0, transparent 28%), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.7) 0, transparent 32%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
          }}
        />
        <div aria-hidden="true" className="floaty absolute left-[8%] top-14 hidden h-16 w-16 rounded-2xl bg-white/12 ring-1 ring-white/25 backdrop-blur-sm lg:block" />
        <div aria-hidden="true" className="floaty-slow absolute bottom-16 right-[10%] hidden h-20 w-20 rounded-2xl bg-white/12 ring-1 ring-white/25 backdrop-blur-sm lg:block" style={{ animationDelay: "0.8s" }} />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white ring-1 ring-white/30 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              Instant activation — usually under 5 minutes
            </span>
          </Reveal>
          <Reveal delay={110}>
            <h2 className="font-display mt-7 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Start Streaming{" "}
              <span className="relative whitespace-nowrap">
                Today
                <svg aria-hidden="true" viewBox="0 0 120 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none">
                  <path d="M2 9c30-6 86-6 116-2" stroke="rgba(255,255,255,0.85)" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={210}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/85 sm:text-xl">
              Get instant access to premium entertainment — 25,000+ channels, 150,000+ movies and the
              biggest live sports, all in one clean app.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-white/90">
              <div className="flex -space-x-2.5">
                {["Dan R", "Mia S", "Kevin H", "Amy L", "Rob F", "Lena B"].map((n, i) => (
                  <Avatar key={n} name={n} i={i} className="h-9 w-9 text-[10px] ring-[#0a6df0]" />
                ))}
              </div>
              <div className="text-left text-[13px] font-semibold leading-tight">
                <p className="font-extrabold text-white">12,400+ households</p>
                <p className="text-white/75">
                  already streaming · <span className="tabular-nums font-bold text-white">{viewers}</span> viewing now
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#plans"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-9 py-4 text-base font-extrabold text-brand shadow-[0_18px_44px_rgba(4,32,66,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(4,32,66,0.45)]"
              >
                Choose Your Plan
                <Icon name="arrow" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
              </a>
              <a href="#features" className="inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-bold text-white ring-1 ring-white/45 transition-colors duration-300 hover:bg-white/12">
                Explore Features
              </a>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-bold text-white/85">
              {["7-day free trial available", "No credit card required", "30-day money-back", "24/7 human support"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-white" strokeWidth={3} />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* wave into footer */}
        <svg aria-hidden="true" viewBox="0 0 1440 60" className="block w-full text-white" preserveAspectRatio="none" style={{ height: 40 }}>
          <path d="M0 60h1440V22C1200 46 900 58 720 58S240 46 0 22z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}

/* ---------------- Social icons ---------------- */
function SocialIcon({ d, label }: { d: ReactNode; label: string }) {
  return (
    <a
      href="#top"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-slate-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b7d8ff] hover:text-brand hover:shadow-md"
    >
      {d}
    </a>
  );
}

const socials = [
  {
    label: "IPTVUS24 on X",
    d: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
        <path d="M4 4h3.6l5.1 7.2L17.9 4H20l-6.3 8.7L20.3 20h-3.6l-5.3-7.4L6 20H4l6.6-9L4 4z" />
      </svg>
    ),
  },
  {
    label: "IPTVUS24 on YouTube",
    d: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
        <path d="M23 12s0-3.85-.5-5.7a2.9 2.9 0 0 0-2.16-2.06C18.66 3.75 12 3.75 12 3.75s-6.66 0-8.34.5A2.9 2.9 0 0 0 1.5 6.3C1 8.15 1 12 1 12s0 3.85.5 5.7a2.9 2.9 0 0 0 2.16 2.06c1.68.5 8.34.5 8.34.5s6.66 0 8.34-.5a2.9 2.9 0 0 0 2.16-2.06C23 15.85 23 12 23 12zM10.2 15.2V8.8l5.8 3.2z" />
      </svg>
    ),
  },
  {
    label: "IPTVUS24 on Instagram",
    d: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "IPTVUS24 on Telegram",
    d: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
        <path d="M21.9 2.1 3.4 9.6c-1 .4-.97 1.9.07 2.26l4.4 1.5 1.7 5.1c.34 1.02 1.7 1.29 2.45.5l2.4-2.4 4.43 3.2c.86.62 2.1.13 2.33-.9l2.6-15.2c.06-1.14-1.35-1.9-2.28-1.36zM9.3 12.9l7.9-6.5-6.3 7.6-.7 3.1-.9-4.2z" />
      </svg>
    ),
  },
];

/* ---------------- Footer ---------------- */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white pb-32 pt-10 lg:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 rounded-[28px] border border-line bg-mist/70 p-8 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tagline />
            <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-slate-soft">
              Premium IPTV for the US, Canada and UK — 25,000+ live channels and 150,000+ movies &
              series in 4K, with the kind of support that actually answers.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Stars className="h-4 w-4" />
              <span className="text-[13px] font-bold text-slate-soft">
                4.9/5 from <b className="text-ink">2,300+ verified reviews</b>
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["256-bit SSL", "PCI-DSS", "3-D Secure", "30-Day Money-Back"].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-brand"
                >
                  <Icon name="lock" className="h-3 w-3" strokeWidth={2.4} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2.5">{socials.map((s) => <SocialIcon key={s.label} d={s.d} label={s.label} />)}</div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerCols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="text-[14px] font-semibold text-slate-soft transition-colors duration-200 hover:text-brand">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-[12.5px] font-semibold text-slate-soft sm:flex-row">
          <p>© {year} IPTVUS24 — <span className="text-brand">iptvus24.com</span> · All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="mailto:support@iptvus24.com" className="transition-colors hover:text-brand">support@iptvus24.com</a>
            <p className="flex items-center gap-2">
              <span className="pulse-dot h-2 w-2 rounded-full bg-[#0f9d58]" />
              99.9% uptime
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] font-medium leading-relaxed text-slate-soft/70 sm:text-left">
          IPTVUS24 provides an internet protocol television service with access to licensed channel and VOD catalogs.
          Availability of specific content may vary by region. Internet speed requirements apply as described in our FAQ.
          Prices in USD, taxes may apply.
        </p>
      </div>
    </footer>
  );
}

/* ---------------- Mobile sticky CTA ---------------- */
export function StickyCta() {
  const [show, setShow] = useState(false);
  const viewers = useLiveViewers();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 lg:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass mx-3 mb-3 flex items-center justify-between gap-3 rounded-2xl p-3 shadow-[0_18px_44px_rgba(10,48,102,0.3)] ring-1 ring-white/70">
        <div className="min-w-0 pl-1">
          <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#b45309]">
            <Icon name="flame" className="h-3.5 w-3.5" strokeWidth={2.2} /> Launch price · <span className="tabular-nums">{viewers} viewing</span>
          </p>
          <p className="truncate text-[15px] font-extrabold text-ink">
            Annual <span className="text-brand">$69.99</span>{" "}
            <span className="text-[11px] font-bold text-slate-soft">$5.83/mo · save 61%</span>
          </p>
        </div>
        <a href="#plans" className="btn-primary shrink-0 !rounded-xl !px-5 !py-3 !text-sm" aria-label="Get the Annual plan for $69.99">
          Start Now
          <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
        </a>
      </div>
    </div>
  );
}
