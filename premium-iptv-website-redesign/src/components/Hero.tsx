import { heroTv } from "../assets";
import { WhatsAppButton } from "./WhatsApp";

export default function Hero() {
  return (
    <section className="bg-hero-wash relative overflow-hidden pt-28 sm:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-cyan">IPTVUS24 · Streaming service</p>
          <h1 className="font-display mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
            Streaming, made simpler.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Compare plans, check device compatibility, and get clear setup guidance before you choose.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#plans" className="btn-primary text-base">
              Compare plans
              <span aria-hidden="true">→</span>
            </a>
            <div className="sm:w-56">
              <WhatsAppButton>Ask us on WhatsApp</WhatsAppButton>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Review the service terms and regional availability before ordering.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
          <img
            src={heroTv}
            alt="A television in a contemporary living room"
            width={1200}
            height={860}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
