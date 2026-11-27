import Image from "next/image";
import { heroCinemaLiving } from "../assets";
import { AmbientLight, CinemaArtwork } from "./PremiumMotion";
import Reveal from "./Reveal";
import { HeroDepthLayers } from "./SpatialScene";
import { WhatsAppButton } from "./WhatsApp";

export default function Hero() {
  return (
    <section data-cta-location="hero" className="premium-hero bg-hero-wash relative overflow-hidden pt-28 sm:pt-36">
      <AmbientLight />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-[1fr_1.08fr] lg:gap-14 lg:pb-24">
        <Reveal className="hero-copy max-w-2xl">
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
              <WhatsAppButton ctaLocation="hero">Ask us on WhatsApp</WhatsAppButton>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Review the service terms and regional availability before ordering.
          </p>
        </Reveal>

        <CinemaArtwork>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-brand/25 via-cyan/15 to-transparent blur-2xl"
          />
          <div className="hero-image relative overflow-hidden rounded-[28px] border border-white/15 bg-[#091526] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
            <Image
              src={heroCinemaLiving}
              alt="Photorealistic illustration of a coastal living room with a wall-mounted TV showing a mountain coastline"
              width={1264}
              height={848}
              priority
              quality={90}
              sizes="(max-width: 1023px) 100vw, 54vw"
              className="aspect-[16/10] w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07111f]/80 via-[#07111f]/25 to-transparent"
            />
          </div>
          <HeroDepthLayers />
        </CinemaArtwork>
      </div>
    </section>
  );
}
