import { faqs, type FaqCategory } from "../data";
import { SectionHead } from "./ui";

const groups: { title: string; categories: FaqCategory[] }[] = [
  { title: "Plans and billing", categories: ["Billing"] },
  { title: "Devices and setup", categories: ["Setup", "Compatibility", "Quality"] },
  { title: "Support", categories: ["Support"] },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Frequently asked questions"
          title={<>Straight answers, <span className="text-brand">before you choose.</span></>}
          sub="Review plan terms, device compatibility, and regional availability. If anything is unclear, contact support before ordering."
        />
        <div className="mt-10 space-y-8">
          {groups.map((group) => {
            const questions = faqs.filter((faq) => group.categories.includes(faq.cat));
            if (questions.length === 0) return null;
            return (
              <section key={group.title} aria-labelledby={`faq-${group.title.replaceAll(" ", "-").toLowerCase()}`}>
                <h3 id={`faq-${group.title.replaceAll(" ", "-").toLowerCase()}`} className="font-display mb-3 text-lg font-extrabold text-ink">
                  {group.title}
                </h3>
                <div className="faq-group space-y-3">
                  {questions.map((faq) => (
                    <details key={faq.q} className="faq-item group rounded-2xl border border-line px-5 py-3 sm:px-6">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-left text-[15px] font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                        {faq.q}
                        <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-brand transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="max-w-3xl pb-1 pt-3 pr-10 text-sm leading-relaxed text-slate-soft">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
