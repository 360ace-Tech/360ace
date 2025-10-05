import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBandSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-[hsl(var(--brand-200))] bg-[hsl(var(--brand-500))] px-10 py-16 text-center text-white shadow-[0_25px_60px_-25px_hsl(var(--brand-900)/0.6)]">
        <h2 className="text-3xl font-semibold">Ready to design resilient systems together?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
          Brief us on your challenge and we’ll assemble the right blend of technology and food systems experts to co-create an impact roadmap.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline" size="lg" className="text-white hover:bg-white/10">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <Button asChild variant="tech" size="lg">
            <Link href="https://360ace.tech" target="_blank" rel="noreferrer">
              Visit 360ace-Tech
            </Link>
          </Button>
          <Button asChild variant="food" size="lg">
            <Link href="https://360ace.food" target="_blank" rel="noreferrer">
              Visit 360ace-Food
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
