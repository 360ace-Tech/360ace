import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the 360ace consultancy hub site and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-[color:var(--color-background)] py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 sm:px-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">Terms</p>
          <h1 className="text-4xl font-semibold">Terms of Use</h1>
          <p className="text-sm text-[color:var(--color-muted-foreground)]">Last updated: January 2025</p>
        </header>
        <article className="space-y-6 text-sm text-[color:var(--color-foreground)]">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">1. Scope</h2>
            <p>
              These terms apply to the 360ace.net hub and describe how we present information about our consulting services. Engaging
              360ace.Tech or 360ace.Food is subject to mutually executed service agreements.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">2. Use of content</h2>
            <p>
              You may reference materials for evaluation purposes. Do not republish, resell, or misrepresent our content, trademarks,
              or service descriptions without written permission.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">3. External links</h2>
            <p>
              The hub links to 360ace.Tech and 360ace.Food. Each practice maintains its own site, policies, and contractual terms.
              Review those policies when engaging either practice.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">4. Liability</h2>
            <p>
              The hub is provided “as is”. We disclaim liability for reliance on its content outside of formal engagements and limit
              remedies to those defined in executed agreements.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">5. Contact</h2>
            <p>
              Reach us at <a className="underline" href="mailto:hello@360ace.net">hello@360ace.net</a> with questions about these terms.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
