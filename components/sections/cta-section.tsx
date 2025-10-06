import Link from "next/link";
import { TransitionLink } from "@/components/ui/transition-link";

import { Button } from "@/components/ui/button";
import { callToAction } from "@/lib/hub-content";

export function CallToActionSection() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-5xl rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-gradient-to-br from-[color:var(--color-tech-soft)] via-white to-[color:var(--color-food-soft)] p-10 text-center shadow-[var(--shadow-md)]">
        <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
          Let’s collaborate
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">{callToAction.title}</h2>
        <p className="mt-4 text-lg text-[color:var(--color-muted-foreground)]">{callToAction.description}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <TransitionLink href={callToAction.primaryCta.href}>{callToAction.primaryCta.label}</TransitionLink>
          </Button>
          <Button asChild size="lg" variant="outline">
            <TransitionLink href={callToAction.secondaryCta.href}>{callToAction.secondaryCta.label}</TransitionLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
