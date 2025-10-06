import Link from "next/link";
import PageWrapper from "@/components/layout/page-wrapper";

import { Button } from "@/components/ui/button";
import { practiceHighlights } from "@/lib/hub-content";

export const metadata = {
  title: "Consulting Practices",
  description:
    "Explore the two consultancy practices powering 360ace: technology and food systems expertise with shared delivery standards.",
};

export default function ConsultingPage() {
  return (
    <PageWrapper>
      <div className="bg-[color:var(--color-background)] py-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 sm:px-6">
          <header className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">Consultancy</p>
            <h1 className="text-balance text-4xl font-semibold sm:text-5xl">
              Choose the practice that advances your next milestone.
            </h1>
            <p className="mx-auto max-w-2xl text-base text-[color:var(--color-muted-foreground)]">
              Each practice is led by specialists with deep delivery, compliance, and leadership experience. Select the path that matches your challenge and we will assemble the right team.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {practiceHighlights.map((practice) => (
              <div
                key={practice.name}
                className="flex h-full flex-col justify-between gap-6 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-muted)]/40 p-8"
              >
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold">{practice.name}</h2>
                  <p className="text-sm text-[color:var(--color-muted-foreground)]">{practice.summary}</p>
                  <ul className="space-y-2 text-sm">
                    {practice.services.slice(0, 4).map((service) => (
                      <li key={service} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-primary)]" aria-hidden />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild>
                  <Link href={practice.href} target="_blank" rel="noreferrer">
                    Visit {practice.name}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
