import { processSteps } from "@/content/home";

export function ProcessSection() {
  return (
    <section id="process" className="bg-[hsl(var(--neutral-900))] py-24 text-[hsl(var(--neutral-50))]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            How we partner
          </span>
          <h2 className="text-3xl font-semibold">A unified process for complex transformation</h2>
          <p className="text-base text-white/70">
            Whether you engage our technology or food systems practice, you gain multi-disciplinary teams operating within the same
            playbook. Every phase integrates risk, compliance, change management, and measurable value.
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] transition hover:border-[hsl(var(--brand-200))]/50 hover:shadow-[0_25px_60px_-30px_rgba(6,148,103,0.6)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{`0${index + 1}`}</span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-white/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
