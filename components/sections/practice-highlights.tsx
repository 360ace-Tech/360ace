import Link from "next/link";
import { techHighlights, foodHighlights } from "@/content/home";
import { Button } from "@/components/ui/button";

function HighlightsList({
  title,
  description,
  practice
}: {
  title: string;
  description: string;
  practice: "tech" | "food";
}) {
  const highlights = practice === "tech" ? techHighlights : foodHighlights;
  const accentClass =
    practice === "tech" ? "text-[hsl(var(--tech-color))]" : "text-[hsl(var(--food-color))]";
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-[hsl(var(--brand-100))] bg-white/80 p-8 shadow-[0_18px_60px_-32px_hsl(var(--brand-900)/0.4)] backdrop-blur dark:bg-[hsl(var(--neutral-900))/0.75]">
      <div className="flex flex-col gap-3">
        <span className={`text-xs font-semibold uppercase tracking-[0.26em] ${accentClass}`}>
          {practice === "tech" ? "360ace-Tech" : "360ace-Food"}
        </span>
        <h2 className="text-2xl font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
          {title}
        </h2>
        <p className="text-sm text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">{description}</p>
      </div>
      <ul className="grid gap-4">
        {highlights.map((item) => (
          <li
            key={item.title}
            className="group rounded-2xl border border-transparent bg-[hsl(var(--neutral-50))] p-4 transition hover:-translate-y-1 hover:border-[hsl(var(--brand-200))] hover:shadow-lg dark:bg-[hsl(var(--neutral-900))]"
          >
            <p className="text-base font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
              {item.title}
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--neutral-600))] dark:text-[hsl(var(--neutral-300))]">{item.description}</p>
            <Link
              href={item.link}
              className={`mt-4 inline-flex items-center gap-2 text-sm font-medium transition group-hover:translate-x-1 ${accentClass}`}
              target="_blank"
              rel="noreferrer"
            >
              Learn more
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Button asChild variant={practice} size="lg">
          <Link href={practice === "tech" ? "https://360ace.tech" : "https://360ace.food"} target="_blank" rel="noreferrer">
            View {practice === "tech" ? "360ace-Tech" : "360ace-Food"}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function PracticeHighlightsSection() {
  return (
    <section id="services" className="bg-[hsl(var(--neutral-50))] py-24 dark:bg-[hsl(var(--neutral-900))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
            Two specialised practices. One partner.
          </h2>
          <p className="mx-auto max-w-3xl text-base text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">
            Blend the craft of software platform engineering with deep food quality and regulatory expertise. Engage one practice or
            create joint programmes guided by a unified operating model.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <HighlightsList
            title="360ace-Tech"
            description="Cloud, DevOps, and platform engineering programmes built for regulated, high-trust environments."
            practice="tech"
          />
          <HighlightsList
            title="360ace-Food"
            description="Food safety, regulatory, and innovation consulting that elevates quality systems and market readiness."
            practice="food"
          />
        </div>
      </div>
    </section>
  );
}
