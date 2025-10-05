import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-semibold text-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]">
        Privacy Policy
      </h1>
      <p className="mt-6 text-sm text-[hsl(var(--neutral-700))] dark:text-[hsl(var(--neutral-300))]">
        360ace respects your privacy. We only collect the information necessary to respond to enquiries and deliver consultancy
        engagements. We do not sell your data. Full policy coming soon as part of the compliance workstream.
      </p>
    </div>
  );
}
