import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Partner with 360ace to blend technology and food systems expertise for resilient outcomes."
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-24">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
          Let’s build resilient systems together
        </h1>
        <p className="mx-auto max-w-2xl text-base text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">
          Share a little about your challenge and we’ll connect you with the right 360ace specialists within two business days.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
