import { credibility } from "@/lib/hub-content";

export function CredibilitySection() {
  return (
    <section className="bg-[color:var(--color-muted)]/20 py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
            Trusted impact
          </p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Delivering measurable change for regulated and growth-focused teams.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {credibility.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-8 text-center shadow-sm"
            >
              <span className="text-4xl font-semibold text-[color:var(--color-primary)]">{stat.value}</span>
              <p className="mt-3 text-sm text-[color:var(--color-muted-foreground)]">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.4em] text-[color:var(--color-muted-foreground)]">
          {credibility.logos.map((logo) => (
            <span key={logo} className="rounded-full border border-dashed border-[color:var(--color-border)] px-4 py-2">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
