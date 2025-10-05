import { differentiators } from "@/content/home";

const trustedBy = [
  "African Union",
  "Google for Startups",
  "Nestlé",
  "NITDA",
  "FATE Foundation"
];

export function CredibilitySection() {
  return (
    <section id="credibility" className="bg-[hsl(var(--neutral-50))] py-24 dark:bg-[hsl(var(--neutral-950))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--brand-100))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--brand-600))]">
              Why 360ace
            </span>
            <h2 className="text-3xl font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
              Credibility you can build on
            </h2>
            <p className="text-base text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">
              Our consultants operate at the intersection of technology, compliance, and operations. We embed with your teams to
              deliver change that withstands audits, stress tests, and market shifts.
            </p>
            <ul className="grid gap-4 text-sm text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[hsl(var(--brand-500))]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-[hsl(var(--brand-100))] bg-white/80 p-10 shadow-[0_18px_60px_-32px_hsl(var(--brand-900)/0.4)] backdrop-blur dark:border-[hsl(var(--neutral-800))] dark:bg-[hsl(var(--neutral-900))/0.6]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(var(--brand-600))]">Trusted by</h3>
            <div className="mt-6 grid grid-cols-2 gap-6 text-lg font-semibold text-[hsl(var(--neutral-600))] dark:text-[hsl(var(--neutral-200))] sm:grid-cols-3">
              {trustedBy.map((item) => (
                <div key={item} className="rounded-xl border border-[hsl(var(--brand-100))] bg-white/60 p-4 text-center shadow-sm dark:border-[hsl(var(--neutral-700))] dark:bg-[hsl(var(--neutral-900))/0.7]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
