import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How 360ace handles your information across the consultancy hub.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[color:var(--color-background)] py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 sm:px-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">Privacy</p>
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-sm text-[color:var(--color-muted-foreground)]">Last updated: January 2025</p>
        </header>
        <article className="space-y-6 text-sm text-[color:var(--color-foreground)]">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Information we collect</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Contact details you share via forms, email, or scheduling links.</li>
              <li>Engagement artefacts required to scope and deliver consulting work.</li>
              <li>Privacy-respecting analytics and server logs that help us secure and improve the site.</li>
            </ul>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">How we use information</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to enquiries, provide proposals, and deliver contracted services.</li>
              <li>Operate, secure, and improve our digital experiences.</li>
              <li>Meet legal and compliance obligations for our practices and clients.</li>
            </ul>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Sharing and retention</h2>
            <p>
              We do not sell personal information. We share data only with trusted processors under confidentiality agreements and keep
              information for as long as needed to provide services or comply with regulations.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Your choices</h2>
            <p>
              Contact us at <a className="underline" href="mailto:hello@360ace.net">hello@360ace.net</a> to access, update, or delete your information, subject to applicable law.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
