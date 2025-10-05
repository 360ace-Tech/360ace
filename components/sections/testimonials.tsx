import { testimonials } from "@/content/home";

export function TestimonialsSection() {
  return (
    <section className="bg-[hsl(var(--neutral-900))] py-24 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 text-center">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
          Client Voices
        </span>
        <h2 className="text-3xl font-semibold">Teams trust 360ace to unlock sustainable change</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote
              key={item.author}
              className="relative flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-white/10 p-8 text-left shadow-[0_18px_60px_-32px_rgba(0,0,0,0.7)]"
            >
              <span className="text-5xl text-[hsl(var(--brand-200))]" aria-hidden>
                “
              </span>
              <p className="text-base text-white/90">{item.quote}</p>
              <cite className="text-sm font-semibold text-white/70">{item.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
