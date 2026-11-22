import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Icon } from "./ui";
import LogoMark from "./LogoMark";

const links = [
  { label: "Features", href: "#features" },
  { label: "Devices", href: "#devices" },
  { label: "Plans", href: "#plans" },
  { label: "Why Us", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

function useCountdown() {
  const [left, setLeft] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setLeft(
        [h, m, s]
          .map((v) => String(v).padStart(2, "0"))
          .join(":"),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

export function Logo({ light = false, tagline = false }: { light?: boolean; tagline?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="IPTVUS24 — Premium IPTV, back to top">
      <LogoMark className="h-10 w-10 shrink-0 drop-shadow-[0_10px_18px_rgba(10,132,255,0.42)] transition-transform duration-300 group-hover:scale-105" />
      {/* Icon + text on desktop; icon-only on small screens */}
      <span className="hidden flex-col justify-center leading-none min-[420px]:flex">
        <span className={cn("font-display text-[1.18rem] font-extrabold tracking-tight", light ? "text-white" : "text-ink")}>
          IPTV<span className="bg-gradient-to-r from-brand to-cyan bg-clip-text text-transparent">US24</span>
        </span>
        {tagline && (
          <span className={cn("mt-1.5 text-[8.5px] font-extrabold uppercase tracking-[0.34em]", light ? "text-white/60" : "text-slate-soft")}>
            Premium IPTV
          </span>
        )}
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const left = useCountdown();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      {/* Launch offer bar */}
      <div className="bg-gradient-to-r from-brand-deep via-brand to-cyan text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[13px] font-semibold sm:flex-row sm:text-sm">
          <span className="hidden items-center gap-2.5 lg:flex">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#ffe066]" fill="currentColor" aria-hidden="true">
                <path d="M12 2.8l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.2l6.1-.8z" />
              </svg>
              <span><b>4.9/5</b> · 2,300+ reviews</span>
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-white/40" />
            <span><b>12,400+</b> subscribers</span>
            <span aria-hidden="true" className="h-3 w-px bg-white/40" />
            <span className="flex items-center gap-1.5"><Icon name="flame" className="h-4 w-4" strokeWidth={1.9} /><span>up to <b>61% off</b></span></span>
          </span>
          <span className="flex items-center gap-2 lg:hidden">
            <Icon name="flame" className="h-4 w-4" strokeWidth={1.9} />
            Launch offer: <b>up to 61% off</b>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 font-mono text-[12px] font-bold tabular-nums ring-1 ring-white/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Ends in {left}
          </span>
        </div>
      </div>

      {/* Sticky nav */}
      <nav
        className={cn(
          "transition-all duration-300",
          scrolled ? "glass shadow-[0_8px_30px_rgba(10,48,102,0.1)]" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-[15px] font-semibold text-slate-soft transition-colors duration-200 hover:bg-haze hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#plans" className="hidden text-[15px] font-bold text-brand transition-colors hover:text-brand-deep sm:block">
              Sign in
            </a>
            <a href="#plans" className="btn-primary !px-5 !py-2.5 !text-sm">
              Start Now
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className={cn("absolute left-0 top-0 h-0.5 w-5 rounded bg-ink transition-all duration-300", open && "top-1.5 rotate-45")} />
                <span className={cn("absolute left-0 top-1.5 h-0.5 w-5 rounded bg-ink transition-all duration-300", open && "opacity-0")} />
                <span className={cn("absolute left-0 top-3 h-0.5 w-5 rounded bg-ink transition-all duration-300", open && "top-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={cn("grid overflow-hidden transition-all duration-300 lg:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div className="min-h-0">
            <div className="space-y-1 border-t border-line bg-white/95 px-4 pb-5 pt-3 backdrop-blur">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-ink transition-colors hover:bg-haze"
                >
                  {l.label}
                </a>
              ))}
              <p className="px-4 pt-2 text-xs font-medium text-slate-soft">Instant activation • 24/7 support • 7-day free trial</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
