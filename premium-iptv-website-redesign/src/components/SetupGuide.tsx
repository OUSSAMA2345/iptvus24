import { Icon, SectionHead } from "./ui";
import { WHATSAPP_URL } from "./WhatsApp";

const steps = [
  {
    number: "01",
    title: "Check your device",
    description: "Confirm your device model and the player apps available in your region.",
    icon: "devices" as const,
  },
  {
    number: "02",
    title: "Review the instructions",
    description: "Ask support which app and setup steps apply to your device before you order.",
    icon: "guide" as const,
  },
  {
    number: "03",
    title: "Enter your access details",
    description: "If you proceed, follow the instructions provided with your order. Never share credentials publicly.",
    icon: "lock" as const,
  },
];

export default function SetupGuide() {
  return (
    <section id="setup" className="scroll-mt-28 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Setup guidance"
          title={<>Know the steps <span className="text-brand">before you start.</span></>}
          sub="Setup differs by device and player app. Confirm compatibility and instructions with support before placing an order."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold tracking-[0.16em] text-brand">{step.number}</span>
                <Icon name={step.icon} className="h-5 w-5 text-brand" />
              </div>
              <h3 className="font-display mt-5 text-lg font-extrabold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-soft">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-slate-soft">
          Need a device-specific video walkthrough?{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-brand underline underline-offset-4">
            Ask support what’s available for your device.
          </a>
        </p>
      </div>
    </section>
  );
}
