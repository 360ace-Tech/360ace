import { testimonials } from '@/content/hub';

export function TestimonialsSection() {
  const items = testimonials;
  return (
    <section id="testimonials" className="bg-white py-24 dark:bg-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">
            Social proof
          </p>
          <h2 className="text-3xl font-semibold text-[hsl(var(--brand-foreground))] sm:text-4xl">
            Trusted by platform teams, manufacturers, and NGOs alike
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((testimonial) => (
            <blockquote
              key={testimonial.quote}
              className="flex h-full flex-col justify-between rounded-3xl border border-white/20 bg-[hsl(var(--brand-surface))] p-6 text-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
            >
              <p className="text-[hsl(var(--brand-muted))]">“{testimonial.quote}”</p>
              <footer className="mt-6 text-xs uppercase tracking-[0.25em] text-[hsl(var(--brand-muted))]">
                <span className="block font-semibold text-[hsl(var(--brand-foreground))]">{testimonial.name}</span>
                <span>{testimonial.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
