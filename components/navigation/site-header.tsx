"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

const navLinks = [
  { href: "#services", label: "Practices" },
  { href: "#process", label: "Process" },
  { href: "#credibility", label: "Why 360ace" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--brand-100))] bg-[color-mix(in_oklab, hsl(var(--neutral-50)) 92%, white 8%)]/90 backdrop-blur-lg dark:border-[hsl(var(--neutral-300))] dark:bg-[color-mix(in_oklab, hsl(var(--neutral-900)) 90%, black 10%)]/85">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--brand-500))] text-white shadow-lg shadow-[hsl(var(--brand-900))/0.25]">
            360
          </span>
          <span className="text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">360ace</span>
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-[hsl(var(--neutral-700))] transition hover:bg-[hsl(var(--brand-100))]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-300))] dark:text-[hsl(var(--neutral-200))]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden gap-2 sm:flex">
            <Button asChild variant="tech" size="sm">
              <a href="https://360ace.tech" target="_blank" rel="noreferrer">
                Explore Tech
              </a>
            </Button>
            <Button asChild variant="food" size="sm">
              <a href="https://360ace.food" target="_blank" rel="noreferrer">
                Explore Food
              </a>
            </Button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
