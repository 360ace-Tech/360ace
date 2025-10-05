import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Consulting Practices"
};

const practices = [
  {
    name: "360ace-Tech",
    summary:
      "Platform engineering, DevOps, and cloud programmes designed for regulated industries and high-growth teams.",
    cta: "https://360ace.tech"
  },
  {
    name: "360ace-Food",
    summary:
      "Food safety, regulatory, and innovation consulting that elevates quality systems from factory floor to boardroom.",
    cta: "https://360ace.food"
  }
];

export default function ConsultingOverviewPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-24">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
          Choose the practice that meets your mission
        </h1>
        <p className="mx-auto max-w-2xl text-base text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">
          360ace-Tech and 360ace-Food operate as specialist consultancies, sharing a unified process and values. Explore each
          practice to dive deeper into services, case studies, and engagement models.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {practices.map((practice) => (
          <article
            key={practice.name}
            className="flex h-full flex-col gap-4 rounded-3xl border border-[hsl(var(--brand-100))] bg-white/80 p-6 shadow-[0_18px_60px_-32px_hsl(var(--brand-900)/0.4)] backdrop-blur dark:bg-[hsl(var(--neutral-900))/0.7]"
          >
            <h2 className="text-2xl font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
              {practice.name}
            </h2>
            <p className="text-sm text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">{practice.summary}</p>
            <Button asChild variant={practice.name.includes("Tech") ? "tech" : "food"} size="lg">
              <Link href={practice.cta} target="_blank" rel="noreferrer">
                Visit {practice.name}
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
