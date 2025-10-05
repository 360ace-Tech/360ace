import { credibility } from '@/content/hub';

export function CredibilitySection() {
  const { differentiators, stats } = credibility;
  return (
    <section className="bg-[hsl(var(--brand-surface))] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-start">
        <div className="max-w-md space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">
            Why teams choose 360ace
          </p>
          <h2 className="text-3xl font-semibold text-[hsl(var(--brand-foreground))] sm:text-4xl">
            Credibility that scales across industries
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-[hsl(var(--brand-muted))]">
            {differentiators.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-[hsl(var(--brand-primary))]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid flex-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/15 bg-white/80 p-6 text-center shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <p className="text-4xl font-bold text-[hsl(var(--brand-foreground))]">{stat.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-[hsl(var(--brand-muted))]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
