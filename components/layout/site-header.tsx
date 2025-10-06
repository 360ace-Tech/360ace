"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TransitionLink } from "@/components/ui/transition-link";

const sectionLinks = [
  { label: "Process", href: "/#process" },
  { label: "Why 360ace", href: "/#differentiators" },
  { label: "Impact", href: "/#credibility" },
  { label: "Testimonials", href: "/#testimonials" },
];

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Practices", href: "/#practices" },
  { label: "Learn More", href: "#" },
  { label: "Consulting", href: "/consulting" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--color-background)]/90 border-b border-[color:var(--color-border)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <TransitionLink href="/" className="flex items-center gap-2 font-semibold">
            <img src="/logo-dark.png" alt="360ace logo" className="logo-light h-12 w-auto" />
            <img src="/logo-light.png" alt="360ace logo" className="logo-dark h-12 w-auto" />
            <div className="flex flex-col leading-[1.1]">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-muted-foreground)]">
                360ace Tech Inc.
              </span>
            </div>
          </TransitionLink>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {primaryLinks.map((item) => {
            if (item.label === "Learn More") {
              return <LearnMoreMenu key={item.label} />;
            }

            const isInternal = item.href.startsWith("/") && !item.href.includes("#");
            return isInternal ? (
              <TransitionLink key={item.href} href={item.href} className="transition-colors hover:text-[color:var(--color-primary)]">
                {item.label}
              </TransitionLink>
            ) : (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-[color:var(--color-primary)]">
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
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
      {/* Mobile section nav: horizontally scrollable anchors */}
      <nav className="md:hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-background)]/95">
        <div className="mx-auto w-full max-w-6xl px-4 py-2">
          <div className="flex items-center gap-4 overflow-x-auto text-xs font-medium">
            {primaryLinks.map((item) => {
              const isInternal = item.href.startsWith("/") && !item.href.includes("#");
              return isInternal ? (
                <TransitionLink key={item.label} href={item.href} className="whitespace-nowrap text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-primary)]">
                  {item.label}
                </TransitionLink>
              ) : (
                <Link key={item.label} href={item.href} className="whitespace-nowrap text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-primary)]">
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-2 flex items-center gap-2 overflow-x-auto text-[11px]">
            {sectionLinks.map((s) => (
              <Link key={s.href} href={s.href} className="whitespace-nowrap rounded-full border border-[color:var(--color-border)] px-3 py-1.5 text-[color:var(--color-foreground)]">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

function LearnMoreMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="transition-colors hover:text-[color:var(--color-primary)]"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Learn More
      </button>
      <div
        className={
          "absolute left-0 top-full w-56 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-2 text-sm shadow-[var(--shadow-md)] " +
          (open ? "block" : "hidden")
        }
      >
        <ul>
          {sectionLinks.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="block rounded-[var(--radius-sm)] px-3 py-2 text-[color:var(--color-foreground)] hover:bg-[color:var(--color-muted)]/60"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
