import { SectionHead } from "./ui";
import { plans } from "../data";

const rows = [
  { label: "Plan length", value: (plan: (typeof plans)[number]) => plan.per },
  { label: "Total plan price", value: (plan: (typeof plans)[number]) => plan.price },
  { label: "Monthly equivalent", value: (plan: (typeof plans)[number]) => plan.monthly },
];

export default function Compare() {
  return (
    <section id="compare-plans" className="scroll-mt-28 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Compare plans"
          title={<>Clear terms. <span className="text-brand">Choose your duration.</span></>}
          sub="Compare the advertised price and length for each plan. Review the full terms and confirm availability before you order."
        />
        <div className="mt-8 grid gap-3 sm:hidden">
            {plans.map((plan) => (
              <article key={plan.name} className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-ink">{plan.name}</h3>
                    <p className="mt-1 text-sm text-slate-soft">{plan.per}</p>
                  </div>
                  <p className="text-right">
                    <span className="block font-display text-xl font-extrabold text-ink">{plan.price}</span>
                    <span className="text-xs text-slate-soft">total</span>
                  </p>
                </div>
                <p className="mt-3 border-t border-line pt-3 text-sm text-slate-soft">
                  Monthly equivalent: <span className="font-bold text-ink">{plan.monthly}</span>
                </p>
              </article>
            ))}
        </div>
        <div className="mt-10 hidden overflow-x-auto rounded-2xl border border-line bg-surface shadow-card sm:block">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Plan duration and pricing comparison</caption>
              <thead>
                <tr className="bg-mist">
                  <th scope="col" className="px-5 py-4 text-sm font-bold text-slate-soft">Plan details</th>
                  {plans.map((plan) => (
                    <th key={plan.name} scope="col" className="px-5 py-4 text-sm font-extrabold text-ink">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className="px-5 py-4 text-sm font-bold text-ink">{row.label}</th>
                    {plans.map((plan) => (
                      <td key={plan.name} className="px-5 py-4 text-sm font-semibold text-slate-soft">
                        {row.value(plan)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </section>
  );
}
