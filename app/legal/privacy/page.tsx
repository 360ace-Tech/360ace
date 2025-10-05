import type { Metadata } from 'next';

const sections = [
  {
    heading: 'Information we collect',
    body: [
      'Contact details you submit via our forms, including name, email, company, and project context.',
      'Operational data shared during discovery sessions that help us scope technology or food consultancy engagements.',
      'Basic analytics gathered in aggregate to understand site performance. We do not use tracking cookies on the hub.',
    ],
  },
  {
    heading: 'How we use information',
    body: [
      'Respond to enquiries and prepare proposals for 360ace.Tech and/or 360ace.Food services.',
      'Operate and secure the 360ace.net hub, improve user experience, and maintain compliance obligations.',
      'Perform client work under a governing agreement and meet legal obligations.',
    ],
  },
  {
    heading: 'Data sharing & retention',
    body: [
      'We do not sell personal data. Limited information may be shared with trusted processors (e.g., email or analytics providers) under confidentiality terms.',
      'Client documents and regulated materials remain governed by engagement contracts. We retain data only as long as necessary for the stated purposes.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'You may request access, correction, or deletion of your personal information, subject to applicable law.',
      'For any privacy questions contact privacy@360ace.net.',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How 360ace collects and uses information across the unified consultancy hub.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[hsl(var(--brand-surface))] py-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">Legal</p>
          <h1 className="text-4xl font-semibold text-[hsl(var(--brand-foreground))]">Privacy Policy</h1>
          <p className="text-sm text-[hsl(var(--brand-muted))]">Last updated: January 2025</p>
        </header>
        <div className="space-y-8 text-sm text-[hsl(var(--brand-muted))]">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold text-[hsl(var(--brand-foreground))]">{section.heading}</h2>
              <ul className="space-y-2">
                {section.body.map((paragraph) => (
                  <li key={paragraph} className="leading-relaxed">
                    {paragraph}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
