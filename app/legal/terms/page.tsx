import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service"
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
        Terms of Service
      </h1>
      <p className="mt-6 text-sm text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">
        Formal engagement terms, NDAs, and service level agreements are issued during contracting. This page will host the public
        terms once finalised. For immediate needs please email <a href="mailto:legal@360ace.net" className="underline">legal@360ace.net</a>.
      </p>
    </div>
  );
}
