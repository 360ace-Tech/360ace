import { unifiedProcess } from "@/lib/hub-content";

export function ProcessSection() {
  return (
    <section id="process" className="py-20 scroll-mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
            A shared engagement model
          </p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            One playbook to unite platform velocity and product integrity.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-5">
          {unifiedProcess.map((item) => (
            <div
              key={item.step}
              className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-background)]/80 p-6 shadow-sm shadow-black/5"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.4em] text-[color:var(--color-primary)]">
                {item.step}
              </div>
              <p className="mt-4 text-sm text-[color:var(--color-muted-foreground)]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
