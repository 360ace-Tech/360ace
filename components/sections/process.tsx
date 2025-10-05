import { unifiedProcess } from '@/content/hub';

export function ProcessSection() {
  const { title, description, steps } = unifiedProcess;
  return (
    <section id="process" className="bg-white py-24 dark:bg-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">
            How we partner
          </p>
          <h2 className="text-3xl font-semibold text-[hsl(var(--brand-foreground))] sm:text-4xl">{title}</h2>
          <p className="text-base text-[hsl(var(--brand-muted))]">{description}</p>
        </div>
        <ol className="grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step.name}
              className="rounded-3xl border border-white/20 bg-[hsl(var(--brand-surface))] p-5 text-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(var(--brand-muted))]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[hsl(var(--brand-foreground))]">{step.name}</h3>
              <p className="mt-3 text-[hsl(var(--brand-muted))]">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
