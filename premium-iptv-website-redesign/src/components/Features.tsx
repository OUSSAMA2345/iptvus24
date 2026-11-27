import { MotionSurface } from "./PremiumMotion";
import Link from "next/link";
import { Icon, SectionHead } from "./ui";
import { features } from "../data";

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Service overview"
          title={<>What to expect from <span className="text-brand">the service.</span></>}
          sub="Review the current plan details and confirm availability for your location and device before subscribing."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <MotionSurface key={feature.title} tilt className="feature-surface">
              <article className="feature-card rounded-2xl border border-line bg-mist/60 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-brand shadow-sm">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-5 text-lg font-extrabold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-soft">{feature.desc}</p>
              </article>
            </MotionSurface>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-soft">
          Content availability and rights can vary by location.{" "}
          <Link href="/terms" className="font-bold text-brand underline underline-offset-4">Review the service terms.</Link>
        </p>
      </div>
    </section>
  );
}
