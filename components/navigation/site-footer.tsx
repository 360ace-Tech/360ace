import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(var(--brand-100))] bg-[hsl(var(--neutral-50))] py-12 dark:border-[hsl(var(--neutral-300))] dark:bg-[hsl(var(--neutral-900))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 text-sm text-[hsl(var(--neutral-600))] dark:text-[hsl(var(--neutral-300))] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-100))]">360ace</p>
          <p className="mt-2 max-w-xl text-sm">
            A multi-disciplinary consultancy connecting resilient technology and food systems expertise across Africa and beyond.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm md:text-right">
          <Link href="mailto:hello@360ace.net" className="hover:text-[hsl(var(--brand-500))]">
            hello@360ace.net
          </Link>
          <p>© {new Date().getFullYear()} 360ace. All rights reserved.</p>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide">
            <Link href="/legal/privacy" className="hover:text-[hsl(var(--brand-500))]">
              Privacy
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/legal/terms" className="hover:text-[hsl(var(--brand-500))]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
