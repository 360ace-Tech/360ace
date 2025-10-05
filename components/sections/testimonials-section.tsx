import { testimonials } from "@/lib/hub-content";

export function TestimonialsSection() {
  return (
    <section className="bg-[color:var(--color-background)] py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
            Voices from our partners
          </p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            The right expertise at the right moment across digital and product lifecycles.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.quote}
              className="flex h-full flex-col justify-between rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-muted)]/30 p-8"
            >
              <p className="text-base text-[color:var(--color-foreground)]">“{testimonial.quote}”</p>
              <footer className="mt-4 text-sm text-[color:var(--color-muted-foreground)]">
                <span className="font-semibold">{testimonial.name}</span>, {testimonial.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
