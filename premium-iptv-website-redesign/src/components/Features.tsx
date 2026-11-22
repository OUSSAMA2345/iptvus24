import { Icon, Reveal, SectionHead } from "./ui";
import { features } from "../data";
import { cn } from "../utils/cn";
import { lounge, sportsStadium } from "../assets";

const lifestylePoints = [
  { icon: "signal" as const, title: "Anti-buffer engine", desc: "Adaptive bitrate keeps playback flowing, even when your Wi-Fi dips." },
  { icon: "spark" as const, title: "Updated every week", desc: "New movies, sports packages and EPG data — delivered automatically." },
  { icon: "devices" as const, title: "Built for family sharing", desc: "Two screens at once, kid profiles and parental controls included." },
];

const leagues = ["NFL", "NBA", "EPL", "UFC", "F1", "MLB", "NHL"];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-28 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Why It Feels Premium"
          title={
            <>
              Everything a <span className="text-brand">cable package</span> can't touch
            </>
          }
          sub="One clean platform with live TV, on-demand, catch-up and a guide that makes sense — engineered by streamers for streamers."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {/* Sports — bento tall card */}
          <Reveal className="h-full sm:col-span-2 lg:row-span-2" delay={60}>
            <article className="group relative h-full min-h-[380px] overflow-hidden rounded-[24px] border border-line shadow-card">
              <img
                src={sportsStadium}
                alt="Packed stadium under floodlights — live 4K sports streaming on IPTVUS24"
                width={900}
                height={1100}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050f24]/95 via-[#050f24]/45 to-[#050f24]/5" />
              <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
                <p className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-cyan">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff3b30]" /> Live Sports · 4K
                </p>
                <h3 className="font-display mt-3 max-w-sm text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                  Every match. Every buzzer-beater. Every lap.
                </h3>
                <p className="mt-2 max-w-sm text-[13.5px] font-medium leading-relaxed text-white/80">
                  247 live leagues with dedicated 4K feeds — blackout-free and anti-buffer, even in overtime.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {leagues.map((l) => (
                    <span key={l} className="rounded-lg bg-white/12 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur">
                      {l}
                    </span>
                  ))}
                </div>
                <a href="#plans" className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-[13px] font-extrabold text-ink shadow-lg transition-transform duration-300 hover:-translate-y-0.5">
                  Unlock 4K Sports
                  <Icon name="arrow" className="h-4 w-4 text-brand" strokeWidth={2.4} />
                </a>
              </div>
            </article>
          </Reveal>

          {/* Feature cards */}
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 80 + 80}>
              <article className="lift group relative h-full overflow-hidden rounded-3xl border border-line bg-mist/60 p-5 hover:border-transparent hover:bg-white hover:shadow-[0_20px_50px_rgba(10,48,102,0.14)] sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-brand/10 to-cyan/10 blur-2xl transition-all duration-500 group-hover:from-brand/20 group-hover:to-cyan/20"
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span
                      className="grid place-items-center rounded-2xl border border-line bg-white text-brand shadow-sm transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-cyan group-hover:text-white group-hover:shadow-glow"
                      style={{ width: 48, height: 48 }}
                    >
                      <Icon name={f.icon} className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-widest text-slate-soft ring-1 ring-line transition-colors duration-300 group-hover:text-brand">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-[16px] font-extrabold leading-snug text-ink sm:text-[17px]">{f.title}</h3>
                  <p className="mt-1.5 text-[12.5px] font-medium leading-relaxed text-slate-soft">{f.desc}</p>

                  {f.icon === "signal" && (
                    <div className="mt-3.5 flex items-center gap-1.5" aria-hidden="true">
                      <span className="rounded-lg bg-line/70 px-2 py-1 text-[10px] font-extrabold text-slate-soft">720p</span>
                      <span className="text-slate-soft/60">→</span>
                      <span className="rounded-lg bg-haze px-2 py-1 text-[10px] font-extrabold text-brand">FHD</span>
                      <span className="text-slate-soft/60">→</span>
                      <span className="rounded-lg bg-gradient-to-r from-brand to-cyan px-2 py-1 text-[10px] font-extrabold text-white shadow-glow">4K UHD</span>
                    </div>
                  )}
                  {f.icon === "rewind" && (
                    <div className="mt-3.5 flex items-center gap-1.5" aria-hidden="true">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, j) => (
                        <span
                          key={j}
                          className={cn(
                            "grid h-6 w-6 place-items-center rounded-md text-[9px] font-extrabold",
                            j === 5 ? "bg-gradient-to-br from-brand to-cyan text-white shadow-glow" : "bg-haze text-slate-soft",
                          )}
                        >
                          {d}
                        </span>
                      ))}
                      <span className="ml-1 text-[10px] font-extrabold text-brand">This week</span>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Lifestyle banner */}
        <Reveal delay={140} className="mt-12">
          <div className="relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(10,48,102,0.25)] ring-1 ring-line">
            <img
              src={lounge}
              alt="Premium home theater living room in the evening with a glowing 4K streaming interface"
              width={1600}
              height={750}
              loading="lazy"
              decoding="async"
              className="kenburns h-[420px] w-full object-cover sm:h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071a33]/85 via-[#071a33]/45 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-7 sm:p-12 lg:max-w-[52%]">
              <p className="text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-cyan">Your night, upgraded</p>
              <h3 className="font-display mt-3 max-w-md text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Built for the way you actually watch
              </h3>
              <ul className="mt-7 space-y-4">
                {lifestylePoints.map((p, i) => (
                  <Reveal as="li" key={p.title} delay={200 + i * 110} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/12 text-cyan ring-1 ring-white/20 backdrop-blur">
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[15px] font-extrabold text-white">{p.title}</span>
                      <span className="mt-0.5 block max-w-sm text-[13px] font-medium leading-relaxed text-white/75">{p.desc}</span>
                    </span>
                  </Reveal>
                ))}
              </ul>
              <a href="#plans" className="btn-primary mt-8 w-fit">
                Upgrade Your Nights
                <Icon name="arrow" className="h-4.5 w-4.5" strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
