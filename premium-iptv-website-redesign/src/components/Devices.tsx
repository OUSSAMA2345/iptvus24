import Image from "next/image";
import Link from "next/link";
import { DeviceDepthLayers } from "./SpatialScene";
import { devicesEcosystem } from "../assets";
import { cn } from "../utils/cn";
import { SectionHead } from "./ui";
import { devices } from "../data";

/* Original miniature hardware with photographic screens and metallic edge light. */
function DeviceArt({ id }: { id: string }) {
  const g = `d${id}`;
  const screen = (x: number, y: number, w: number, h: number, rx = 3) => (
    <g>
      <defs><clipPath id={`${g}-screen`}><rect x={x} y={y} width={w} height={h} rx={rx} /></clipPath></defs>
      <image href="/images/phone-landscape.jpg" x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${g}-screen)`} />
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="none" stroke="#d3e4f8" strokeOpacity="0.55" strokeWidth="0.7" />
      <path d={`M${x + 2} ${y + 2} h${w * .75} L${x + 2} ${y + h - 2}Z`} fill="#fff" opacity="0.1" />
    </g>
  );

  const defs = (
    <defs>
      <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0A84FF" />
        <stop offset="1" stopColor="#00C2FF" />
      </linearGradient>
      <linearGradient id={`${g}-body`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8294ad" />
        <stop offset="1" stopColor="#121d30" />
      </linearGradient>
      <radialGradient id={`${g}-glow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#0A84FF" stopOpacity="0.22" />
        <stop offset="1" stopColor="#0A84FF" stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  const wrap = "transition-transform duration-500 group-hover:scale-[1.07] group-hover:-rotate-1";

  return (
    <svg viewBox="0 0 120 84" className={cn("h-24 w-auto", wrap)} aria-hidden="true">
      {defs}
      <ellipse cx="60" cy="76" rx="42" ry="5" fill={`url(#${g}-glow)`} />
      {id === "tv" && (
        <g>
          <rect x="14" y="12" width="92" height="52" rx="6" fill={`url(#${g}-body)`} />
          {screen(18, 16, 84, 44, 3)}
          <path d="M48 64h24l3 8H45z" fill="#1c2a44" />
        </g>
      )}
      {id === "box" && (
        <g>
          <rect x="26" y="26" width="68" height="34" rx="9" fill={`url(#${g}-body)`} />
          <rect x="26" y="26" width="68" height="16" rx="8" fill="#22345a" />
          <rect x="32" y="30" width="34" height="8" rx="3" fill={`url(#${g})`} opacity="0.9" />
          <circle cx="84" cy="52" r="2.4" fill="#00C2FF" />
        </g>
      )}
      {id === "stick" && (
        <g>
          <rect x="16" y="34" width="52" height="16" rx="8" fill={`url(#${g}-body)`} />
          <rect x="16" y="34" width="26" height="16" rx="8" fill={`url(#${g})`} />
          <rect x="68" y="18" width="22" height="46" rx="6" fill={`url(#${g}-body)`} />
          <circle cx="79" cy="32" r="4.5" fill="#22345a" />
          <rect x="72" y="44" width="14" height="3.5" rx="1.75" fill={`url(#${g})`} opacity="0.85" />
          <rect x="72" y="52" width="14" height="3.5" rx="1.75" fill="#33456b" />
        </g>
      )}
      {id === "cube" && (
        <g>
          <rect x="34" y="18" width="52" height="46" rx="14" fill="#202f4e" />
          <rect x="34" y="18" width="52" height="24" rx="12" fill="#2b3d63" />
          <circle cx="60" cy="30" r="7" fill="none" stroke={`url(#${g})`} strokeWidth="2.5" />
          <rect x="44" y="52" width="32" height="4" rx="2" fill="#33456b" />
        </g>
      )}
      {id === "phone" && (
        <g>
          <rect x="42" y="10" width="36" height="62" rx="9" fill={`url(#${g}-body)`} />
          {screen(45.5, 16, 29, 46, 4)}
          <circle cx="60" cy="67.5" r="1.6" fill="#5b6b82" />
          <rect x="52" y="11.6" width="16" height="3" rx="1.5" fill="#0c1526" />
        </g>
      )}
      {id === "tablet" && (
        <g>
          <rect x="30" y="12" width="60" height="58" rx="8" fill={`url(#${g}-body)`} />
          {screen(34, 17, 52, 48, 3)}
          <circle cx="60" cy="14.5" r="1.3" fill="#5b6b82" />
        </g>
      )}
      {id === "monitor" && (
        <g>
          <rect x="22" y="10" width="76" height="48" rx="6" fill={`url(#${g}-body)`} />
          {screen(26, 14, 68, 40, 3)}
          <rect x="56" y="58" width="8" height="10" fill="#1c2a44" />
          <rect x="44" y="68" width="32" height="5" rx="2.5" fill="#1c2a44" />
        </g>
      )}
      {id === "laptop" && (
        <g>
          <rect x="28" y="10" width="64" height="44" rx="5" fill={`url(#${g}-body)`} />
          {screen(32, 14, 56, 36, 3)}
          <path d="M18 60h84l-8 12H26z" fill="#22345a" />
          <rect x="50" y="60" width="20" height="4" rx="2" fill="#1c2a44" />
        </g>
      )}
    </svg>
  );
}

export default function Devices() {
  return (
    <section id="devices" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Device compatibility"
          title={
            <>
              Check your device <span className="text-brand">before ordering.</span>
            </>
          }
          sub="Common device types are listed below. Availability depends on your model, software, player app, and region; ask support to confirm compatibility."
        />

        <div className="device-stage mx-auto mt-10 max-w-4xl rounded-3xl border border-line bg-[#081325] shadow-card">
          <Image
            src={devicesEcosystem}
            alt="Photorealistic illustration of an unbranded TV, tablet, phone, media box and remote with mountain landscapes on the screens"
            width={1264}
            height={848}
            quality={90}
            sizes="(max-width: 895px) 100vw, 896px"
            className="h-auto w-full"
          />
          <DeviceDepthLayers />
        </div>

        {/* Device cards */}
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {devices.map((d) => (
            <li key={d.id}>
              <article className="device-card group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5">
                <div className="grid h-16 w-20 shrink-0 place-items-center rounded-xl bg-mist">
                  <DeviceArt id={d.id} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-extrabold text-ink">{d.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-soft">{d.note}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm font-semibold text-slate-soft">
          Need help checking a specific model?{" "}
          <Link href="/contact" className="font-bold text-brand underline decoration-cyan/50 underline-offset-4 hover:text-brand-deep">
            Contact support before ordering
          </Link>
        </p>
      </div>
    </section>
  );
}
