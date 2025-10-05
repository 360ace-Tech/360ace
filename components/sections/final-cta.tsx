import { finalCta } from '@/content/hub';
import { Button } from '@/components/ui/button';

export function FinalCtaSection() {
  const { title, description, primaryCta, secondaryCta } = finalCta;
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[hsl(var(--brand-primary)/0.12)] via-white/70 to-white/90 p-12 text-center shadow-soft backdrop-blur dark:border-white/10 dark:via-white/10 dark:to-white/5">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">
          Next step
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-[hsl(var(--brand-foreground))] sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[hsl(var(--brand-muted))]">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <a href={primaryCta.href}>{primaryCta.label}</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer">
              {secondaryCta.label}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
