import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with 360ace about technology consulting, food systems quality, or combined programs.",
};

export default function ContactPage() {
  return (
    <div className="bg-[color:var(--color-background)] py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 sm:px-6">
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">Contact</p>
          <h1 className="text-balance text-4xl font-semibold sm:text-5xl">
            Let’s co-create your next chapter.
          </h1>
          <p className="text-base text-[color:var(--color-muted-foreground)]">
            Share your goals and which practice you’d like to collaborate with. We’ll respond within two business days.
          </p>
        </header>
        <ContactForm />
      </div>
    </div>
  );
}
