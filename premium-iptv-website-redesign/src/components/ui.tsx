import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import type { IconName } from "../data";

/* ---------------- Custom icon set (hand-drawn strokes) ---------------- */
const paths: Record<IconName, ReactNode> = {
  tv: (
    <>
      <rect x="2.5" y="4.5" width="19" height="12.5" rx="2.5" />
      <path d="M8.5 21h7M12 17v4" />
      <path d="M10 8.5v4.5l3.8-2.25z" fill="currentColor" stroke="none" />
    </>
  ),
  bolt: <path d="M13 2.5 5 13.5h5.5L11 21.5l8-11h-5.5z" />,
  headset: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1.6" />
      <rect x="17" y="13" width="4" height="6" rx="1.6" />
      <path d="M19 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 5.6v5.6c0 4.6 3.1 8.3 7.5 9.9 4.4-1.6 7.5-5.3 7.5-9.9V5.6z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  signal: (
    <>
      <path d="M4 19.5v-4M9 19.5v-7.5M14 19.5V8.5M19 19.5v-15" />
      <circle cx="19" cy="3.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  ball: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c2 2.2 3 4.8 3 7.2 0 2.3-.8 4.2-2 5.8M12 3c-2 2.2-3 4.8-3 7.2 0 2.3.8 4.2 2 5.8M3.6 9.5c2.4.8 5.1 1.2 8.4 1.2s6-.4 8.4-1.2M3.6 14.5c2.4-.8 5.1-1.2 8.4-1.2s6 .4 8.4 1.2" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M7.5 4.5v15M16.5 4.5v15M3 9h4.5M3 15h4.5M16.5 9H21M16.5 15H21" />
      <path d="m11 9.5 3.5 2.5-3.5 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  rewind: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 7v6l4 2.5" />
      <path d="M21 3v5h-5" />
    </>
  ),
  guide: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M9 9.5V20" />
      <rect x="11.5" y="12" width="6" height="2.2" rx="1.1" fill="currentColor" stroke="none" opacity="0.85" />
    </>
  ),
  devices: (
    <>
      <rect x="2.5" y="5" width="13" height="9.5" rx="2" />
      <path d="M6.5 18h6" />
      <rect x="15.5" y="10" width="6" height="10" rx="1.8" />
      <path d="M17.5 17.6h2" />
    </>
  ),
  "globe-arrows": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.1 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.1-3.5-8.5s1.2-6.2 3.5-8.5z" />
      <path d="m17.5 5.5 2.5-1 .6 2.7M6.5 18.5 4 19.5l-.6-2.7" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <circle cx="12" cy="15.5" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  minus: <path d="M6 12h12" />,
  play: <path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none" />,
  spark: (
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
  ),
  phone: (
    <>
      <rect x="7.5" y="2.5" width="9" height="19" rx="2.5" />
      <path d="M10.8 18.5h2.4" />
      <rect x="9.5" y="5" width="5" height="9" rx="1" fill="currentColor" stroke="none" opacity="0.15" />
    </>
  ),
  tablet: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="2.5" />
      <path d="M10.8 17.8h2.4" />
      <rect x="6.8" y="5.4" width="10.4" height="10" rx="1" fill="currentColor" stroke="none" opacity="0.15" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2.5" />
      <path d="M9 21h6M12 17v4" />
      <path d="M10.5 8v4.5l3.8-2.25z" fill="currentColor" stroke="none" opacity="0.9" />
    </>
  ),
  laptop: (
    <>
      <rect x="4.5" y="4.5" width="15" height="10.5" rx="2" />
      <path d="M2 19.5h20l-2-4.5H4z" />
      <path d="M9.5 8.5v3l2.8-1.5z" fill="currentColor" stroke="none" opacity="0.9" />
    </>
  ),
  box: (
    <>
      <rect x="3" y="8.5" width="18" height="8.5" rx="2.5" />
      <path d="M17.5 12.75h.01" strokeWidth="2.4" />
      <path d="M6.5 17v2.5M17.5 17v2.5" opacity="0.5" />
      <circle cx="8" cy="12.75" r="1.3" fill="currentColor" stroke="none" opacity="0.7" />
    </>
  ),
  stick: (
    <>
      <rect x="2.5" y="10" width="11.5" height="4" rx="2" />
      <path d="M14 12h4.5" />
      <rect x="15.5" y="6.5" width="6" height="11.5" rx="2" />
      <circle cx="18.5" cy="10" r="1.4" />
      <path d="M17 14.5h3" />
    </>
  ),
  cube: (
    <>
      <rect x="4.5" y="5" width="15" height="14" rx="4.5" />
      <path d="M12 2.8h.01" strokeWidth="2.4" />
      <circle cx="12" cy="12" r="3.4" opacity="0.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-5 3.5z" />
      <path d="M8.5 9.5h7M8.5 12.5h4.5" />
    </>
  ),
  star: (
    <path
      d="M12 2.8l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.2l6.1-.8z"
      fill="currentColor"
      stroke="none"
    />
  ),
  flame: (
    <path d="M12 21.5c-4 0-6.5-2.6-6.5-6 0-2.5 1.5-4.4 2.8-6C9.5 8 10.5 6.5 10.5 4c0 0 5 2 5 6.5 1-.5 1.6-1.4 1.8-2.5 1.3 1.8 2.2 4 2.2 6 0 4.5-2.7 7.5-7.5 7.5zm0 0c-2 0-3.3-1.4-3.3-3.3 0-1.6 1.1-2.6 2-3.7.8-1 1.6-2 1.8-3.4 1.6 1.2 3.4 3.2 3.4 6 0 2.6-1.5 4.4-3.9 4.4" />
  ),
  badge: (
    <>
      <path d="M12 2.5l2.2 1.9 2.9-.3 1 2.7 2.7 1-.3 2.9 1.9 2.2-1.9 2.2.3 2.9-2.7 1-1 2.7-2.9-.3-2.2 1.9-2.2-1.9-2.9.3-1-2.7-2.7-1 .3-2.9L2.5 12l1.9-2.2-.3-2.9 2.7-1 1-2.7 2.9.3z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  arrow: <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
      <path d="M6 14.5h4M14.5 14.5h3" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4.5" width="18" height="6" rx="2" />
      <rect x="3" y="13.5" width="18" height="6" rx="2" />
      <path d="M6.8 7.5h.01M6.8 16.5h.01" strokeWidth="2.6" />
      <path d="M11 7.5h3.5M11 16.5h3.5" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9.5a15 15 0 0 1 19 0" />
      <path d="M6 13.2a10 10 0 0 1 12 0" />
      <path d="M9.5 16.8a5 5 0 0 1 5 0" />
      <circle cx="12" cy="19.8" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({
  name,
  className = "w-6 h-6",
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
/* ---------------- Stars ---------------- */
export function Stars({ n = 5, className = "w-4 h-4" }: { n?: number; className?: string }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "" : "opacity-25"}>
          <Icon name="star" className={className} />
        </span>
      ))}
    </div>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-cyan" />
        {eyebrow}
      </span>
      <h2 className="font-display mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {sub && (
        <p className={cn("mt-4 text-base leading-relaxed text-slate-soft sm:text-lg", align === "center" && "mx-auto")}>
          {sub}
        </p>
      )}
    </div>
  );
}
