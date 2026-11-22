import { useEffect, useState } from "react";
import { Icon, Avatar } from "./ui";
import { prefersReducedMotion } from "./ui";

/* Deterministic, smooth viewer curve — identical on every instance of the hook */
function viewersAt(t: number) {
  const base = 132 + 26 * Math.sin(t / 11000) + 12 * Math.sin(t / 3700 + 1.6) + 5 * Math.sin(t / 1500 + 0.7);
  return Math.round(base);
}

export function useLiveViewers() {
  const [n, setN] = useState(() => viewersAt(Date.now()));
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setN(viewersAt(Date.now())), 1500);
    return () => clearInterval(id);
  }, []);
  return n;
}

const purchases = [
  { name: "Mike D.", city: "Dallas, TX", plan: "12-Month Annual Plan", when: "2 min ago" },
  { name: "Rachel G.", city: "Phoenix, AZ", plan: "12-Month Annual Plan", when: "6 min ago" },
  { name: "Tom W.", city: "Chicago, IL", plan: "3-Month Quarterly Plan", when: "9 min ago" },
  { name: "Laura P.", city: "Orlando, FL", plan: "6-Month Semi-Annual Plan", when: "13 min ago" },
  { name: "Sam K.", city: "Denver, CO", plan: "12-Month Annual Plan", when: "17 min ago" },
  { name: "Priya N.", city: "Jersey City, NJ", plan: "Monthly Plan", when: "21 min ago" },
  { name: "Chris E.", city: "Seattle, WA", plan: "12-Month Annual Plan", when: "26 min ago" },
  { name: "Nina R.", city: "Toronto, ON", plan: "6-Month Semi-Annual Plan", when: "31 min ago" },
  { name: "Jake B.", city: "London, UK", plan: "3-Month Quarterly Plan", when: "38 min ago" },
];

export default function SocialProof() {
  const [idx, setIdx] = useState<number | null>(null);
  const viewers = useLiveViewers();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    const show = () => {
      setIdx(i);
      hideTimer = setTimeout(() => setIdx(null), 5200);
      i = (i + 1) % purchases.length;
    };
    const first = setTimeout(show, 3200);
    const cycle = setInterval(show, 12000);
    return () => {
      clearTimeout(first);
      clearInterval(cycle);
      clearTimeout(hideTimer);
    };
  }, []);

  const p = idx !== null ? purchases[idx] : null;

  return (
    <>
      {/* Live viewers pill — persistent, bottom-right on mobile above CTA, bottom-right desktop */}
      <div className="pointer-events-none fixed bottom-24 right-3 z-40 hidden sm:block">
        <div className="glass flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 shadow-[0_10px_30px_rgba(10,48,102,0.18)]">
          <span className="relative grid h-2.5 w-2.5 place-items-center">
            <span className="radar-ring absolute inline-flex h-full w-full rounded-full border border-brand/50" />
            <span className="h-2 w-2 rounded-full bg-brand" />
          </span>
          <p className="text-[11.5px] font-extrabold text-ink">
            <span className="tabular-nums text-brand">{viewers}</span> people viewing this page
          </p>
        </div>
      </div>

      {/* Recent purchase toast — bottom left, above sticky CTA on mobile */}
      {p && (
        <div
          key={`${idx}-${p.name}`}
          role="status"
          aria-live="polite"
          className="toast-in fixed bottom-24 left-3 z-40 max-w-[300px] sm:bottom-6 sm:left-6 sm:max-w-sm"
        >
          <div className="glass flex items-center gap-3 rounded-2xl p-3 shadow-[0_18px_44px_rgba(10,48,102,0.28)] ring-1 ring-line">
            <Avatar name={p.name} i={idx ?? 0} className="h-11 w-11 text-[11px]" />
            <div className="min-w-0 text-[12px] leading-snug">
              <p className="font-extrabold text-ink">
                {p.name} <span className="font-semibold text-slate-soft">in {p.city}</span>
              </p>
              <p className="font-medium text-slate-soft">
                purchased the <b className="text-brand">{p.plan}</b>
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 font-bold text-[#0f9d58]">
                <Icon name="badge" className="h-3.5 w-3.5" strokeWidth={2.2} />
                Verified purchase · {p.when}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIdx(null)}
              aria-label="Dismiss notification"
              className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full text-slate-soft transition-colors hover:bg-haze hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
