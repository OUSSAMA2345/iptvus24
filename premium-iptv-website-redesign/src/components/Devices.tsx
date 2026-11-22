import { cn } from "../utils/cn";
import { Icon, Reveal, SectionHead } from "./ui";
import { devices } from "../data";
import { devicesLineup } from "../assets";

/* Consistent, premium flat-gradient device renders */
function DeviceArt({ id }: { id: string }) {
  const g = `d${id}`;
  const screen = (x: number, y: number, w: number, h: number, rx = 3) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${g})`} />
      <rect x={x + 2} y={y + 2} width={w * 0.42} height={h - 4} rx={rx - 1} fill="#fff" opacity="0.28" />
      <path d={`M${x + w * 0.55} ${y + h * 0.32} v${h * 0.36} l${w * 0.22} -${h * 0.18} z`} fill="#fff" opacity="0.9" />
    </g>
  );

  const defs = (
    <defs>
      <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0A84FF" />
        <stop offset="1" stopColor="#00C2FF" />
      </linearGradient>
      <linearGradient id={`${g}-body`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#16233c" />
        <stop offset="1" stopColor="#0c1526" />
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
          eyebrow="Every Screen. One Account."
          title={
            <>
              Watch on <span className="text-brand">every device</span> you own
            </>
          }
          sub="One subscription follows you from the big screen to your pocket. Guided, free setup for each device — no technical skills required."
        />

        {/* Lineup banner */}
        <Reveal delay={150} className="mt-14">
          <div className="group relative overflow-hidden rounded-[28px] border border-line shadow-card">
            <img
              src={devicesLineup}
              alt="Lineup of compatible streaming devices — smart TV, media box, stick, tablet and phone"
              width={1600}
              height={700}
              loading="lazy"
              decoding="async"
              className="kenburns h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07203f]/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 max-w-sm rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur sm:bottom-8 sm:left-8">
              <p className="font-display text-lg font-extrabold text-ink">Plug in. Log in. Enjoy.</p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-soft">
                8 device families supported out of the box — we handle the app, the login and the tweaks.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["2 taps install", "Free setup", "4K ready"].map((t) => (
                  <span key={t} className="rounded-full bg-haze px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-brand">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Device cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {devices.map((d, i) => (
            <Reveal key={d.id} delay={(i % 4) * 90}>
              <article className="lift group h-full rounded-3xl border border-line bg-white p-5 shadow-card hover:border-[#b7d8ff] hover:shadow-[0_18px_44px_rgba(10,132,255,0.16)] sm:p-6">
                <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mist to-haze/60">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(90px 60px at 50% 62%, rgba(0,194,255,0.16), transparent 70%)" }}
                  />
                  <DeviceArt id={d.id} />
                  <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-brand shadow-sm ring-1 ring-line">
                    <Icon name="bolt" className="h-3 w-3" strokeWidth={2.4} />
                    Instant
                  </span>
                </div>
                <h3 className="font-display mt-4 text-[17px] font-extrabold text-ink">{d.name}</h3>
                <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-slate-soft">{d.note}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-center text-sm font-semibold text-slate-soft">
            Using a MAG box, Enigma2 or a lesser-known device?{" "}
            <a href="#faq" className="font-bold text-brand underline decoration-cyan/50 underline-offset-4 hover:text-brand-deep">
              Ask our 24/7 team — most devices work
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
