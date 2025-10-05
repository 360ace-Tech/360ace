import type { Metadata } from 'next';

const sections = [
  {
    heading: 'Engagement scope',
    body: [
      '360ace provides consultancy services through two practices: 360ace.Tech and 360ace.Food. Statements on this site are for informational purposes and do not create a binding offer.',
      'Formal statements of work, timelines, and deliverables are defined in signed agreements for each engagement.',
    ],
  },
  {
    heading: 'Use of materials',
    body: [
      'All content, branding, and assets on 360ace.net remain the property of 360ace. You may reference them for evaluation but may not republish or use them commercially without permission.',
      'Links to https://360ace.tech and https://360ace.food are provided for convenience. Their terms govern those destinations.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'The hub is provided “as is” without warranties. 360ace is not liable for any damages arising from the use of the site. Consultancy engagements are governed by the liability provisions of the signed contract.',
    ],
  },
  {
    heading: 'Contact',
    body: ['For contractual questions email legal@360ace.net.'],
  },
];

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Legal terms governing your use of the 360ace unified consultancy hub.',
};

export default function TermsPage() {
  return (
    <div className="bg-[hsl(var(--brand-surface))] py-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">Legal</p>
          <h1 className="text-4xl font-semibold text-[hsl(var(--brand-foreground))]">Terms of Use</h1>
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
