import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MotionToggle } from "@/components/ui/motion-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Consulting", href: "/consulting" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--color-background)]/90 border-b border-[color:var(--color-border)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] shadow-md shadow-[color:var(--color-primary)]/35">
              360
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm uppercase tracking-[0.28em] text-[color:var(--color-muted-foreground)]">
                Consultancy Hub
              </span>
              <span className="text-lg">360ace</span>
            </div>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[color:var(--color-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <MotionToggle />
          <Button asChild size="sm" className="bg-[color:var(--color-tech)] text-white hover:bg-[color:var(--color-tech)]/90">
            <Link href="https://360ace.tech" target="_blank" rel="noreferrer">
              Explore Tech
            </Link>
          </Button>
          <Button asChild size="sm" variant="secondary" className="bg-[color:var(--color-food)] text-black hover:bg-[color:var(--color-food)]/90">
            <Link href="https://360ace.food" target="_blank" rel="noreferrer">
              Explore Food
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
