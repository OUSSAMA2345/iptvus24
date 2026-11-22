import { Avatar, Icon, Reveal, SectionHead, Stars } from "./ui";
import { reviews } from "../data";

export default function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-28 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-[380px] w-[380px] rounded-full bg-cyan/12 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Real Subscribers, Real Screens"
          title={
            <>
              Loved from <span className="text-brand">Maine to Los Angeles</span>
            </>
          }
          sub="Every review below is from a verified subscriber across the US, Canada and UK. We publish the rough stars too — here's why most are five."
        />

        {/* Rating summary */}
        <Reveal delay={140}>
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-5 rounded-[24px] border border-line bg-white p-6 shadow-card sm:gap-x-14">
            <div className="flex items-center gap-4">
              <p className="font-display text-5xl font-extrabold tracking-tight text-ink">4.9</p>
              <div>
                <Stars className="h-4.5 w-4.5" />
                <p className="mt-1 text-[12.5px] font-bold text-slate-soft">2,300+ verified reviews</p>
              </div>
            </div>
            <div className="hidden h-12 w-px bg-line sm:block" />
            <div className="space-y-1.5">
              {[
                { n: 5, w: "88%" },
                { n: 4, w: "9%" },
                { n: 3, w: "3%" },
              ].map((r) => (
                <div key={r.n} className="flex items-center gap-2 text-[11.5px] font-bold text-slate-soft">
                  <span className="w-3 text-right">{r.n}</span>
                  <Icon name="star" className="h-3 w-3 text-amber-400" />
                  <span className="h-1.5 w-24 overflow-hidden rounded-full bg-haze sm:w-32">
                    <span className="block h-full rounded-full bg-gradient-to-r from-brand to-cyan" style={{ width: r.w }} />
                  </span>
                  <span className="w-8">{r.w}</span>
                </div>
              ))}
            </div>
            <div className="hidden h-12 w-px bg-line sm:block" />
            <div>
              <p className="font-display text-2xl font-extrabold text-ink">98%</p>
              <p className="text-[12.5px] font-bold text-slate-soft">would recommend to a friend</p>
            </div>
          </div>
        </Reveal>

        {/* Review cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 110}>
              <figure className="lift group relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card hover:border-[#b7d8ff] hover:shadow-[0_18px_44px_rgba(10,132,255,0.14)] sm:p-7">
                <span
                  aria-hidden="true"
                  className="font-display absolute right-6 top-4 select-none text-[64px] font-extrabold leading-none text-haze transition-colors duration-300 group-hover:text-[#d3e9ff]"
                >
                  ”
                </span>
                <div className="relative flex items-center justify-between">
                  <Stars n={r.rating} className="h-4 w-4" />
                  <span className="rounded-full bg-haze px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-brand">
                    {r.tag}
                  </span>
                </div>
                <blockquote className="relative mt-4 flex-1 text-[14.5px] font-medium leading-relaxed text-ink/85">
                  “{r.text}”
                </blockquote>
                <figcaption className="relative mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <Avatar name={r.name} i={i} />
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[14.5px] font-extrabold text-ink">
                      {r.name}
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-brand to-cyan text-white" title="Verified subscriber">
                        <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.4} />
                      </span>
                    </p>
                    <p className="truncate text-[12.5px] font-semibold text-slate-soft">
                      {r.location} · <span className="text-brand">{r.plan}</span>
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
