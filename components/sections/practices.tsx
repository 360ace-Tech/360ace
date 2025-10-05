import { foodHighlights, techHighlights, type PracticeHighlight } from '@/content/hub';
import { Button } from '@/components/ui/button';

type PracticeCard = {
  accent: string;
  highlight: PracticeHighlight;
};

const practices: readonly PracticeCard[] = [
  { accent: 'from-[hsl(var(--brand-tech)/0.2)] to-transparent', highlight: techHighlights },
  { accent: 'from-[hsl(var(--brand-food)/0.25)] to-transparent', highlight: foodHighlights },
];

export function PracticesSection() {
  return (
    <section id="expertise" className="bg-[hsl(var(--brand-surface))] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">
            Dual practice leadership
          </p>
          <h2 className="text-3xl font-semibold text-[hsl(var(--brand-foreground))] sm:text-4xl">
            Built to handle high-stakes technology and food system transformations
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {practices.map(({ accent, highlight }) => (
            <article
              key={highlight.title}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/80 p-8 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} aria-hidden />
              <div className="relative flex h-full flex-col gap-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-[hsl(var(--brand-foreground))]">{highlight.title}</h3>
                  <p className="text-sm text-[hsl(var(--brand-muted))]">{highlight.summary}</p>
                </div>
                <ul className="flex-1 space-y-3 text-sm text-[hsl(var(--brand-foreground))]">
                  {highlight.items.map((item) => (
                    <li key={item.title} className="rounded-2xl bg-white/70 p-3 shadow-sm backdrop-blur dark:bg-white/5">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-[hsl(var(--brand-muted))]">{item.description}</p>
                    </li>
                  ))}
                </ul>
                <Button asChild className="self-start">
                  <a href={highlight.cta.href} target="_blank" rel="noopener noreferrer">
                    {highlight.cta.label}
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
