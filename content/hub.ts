export type NavigationLink = { label: string; href: string };

export const navigationLinks: readonly NavigationLink[] = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '/contact' },
];

export type Cta = { label: string; href: string; external?: boolean };

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  stats: { label: string; value: string }[];
};

export const heroContent: HeroContent = {
  eyebrow: '360° Consulting for Technology and Food Systems',
  title: 'One partner. Two specialist practices.',
  description:
    '360ace unites cloud-native engineering with food safety and quality leadership. Choose the practice that meets your next growth inflection, or co-create programs that blend both.',
  primaryCta: { label: 'Explore 360ace.Tech', href: 'https://360ace.tech', external: true },
  secondaryCta: { label: 'Explore 360ace.Food', href: 'https://360ace.food', external: true },
  stats: [
    { label: 'Digital launches stewarded', value: '80+' },
    { label: 'Regulated markets supported', value: '15' },
    { label: 'Combined years of delivery', value: '18+' },
  ],
};

export type PracticeHighlight = {
  title: string;
  summary: string;
  items: { title: string; description: string }[];
  cta: Cta;
};

export const techHighlights: PracticeHighlight = {
  title: '360ace.Tech — Cloud Native Engineering Studio',
  summary:
    'We design and run reliable software platforms with DevOps, SRE, and AI-ready data foundations tailored for regulated and high-growth teams.',
  items: [
    {
      title: 'Cloud Strategy & Architecture',
      description: 'Landing zones, governance baselines, and FinOps guardrails that unlock safe innovation.',
    },
    {
      title: 'Platform Engineering & DevOps',
      description: 'Golden paths, GitOps automation, and developer portals that reduce lead time to production.',
    },
    {
      title: 'Site Reliability Partnerships',
      description: 'Shared SRE rituals, observability, and resilience testing aligned to measurable SLOs.',
    },
    {
      title: 'AI & Data Platform Enablement',
      description: 'Secure data pipelines, realtime streaming, and MLOps workflows for intelligent products.',
    },
  ],
  cta: { label: 'Visit 360ace.Tech', href: 'https://360ace.tech', external: true },
};

export const foodHighlights: PracticeHighlight = {
  title: '360ace.Food — Safety, Quality & Capability Consultancy',
  summary:
    'We embed world-class food safety systems, regulatory readiness, and operational excellence across manufacturers, research labs, and NGOs.',
  items: [
    {
      title: 'Training & Capability Building',
      description: 'Immersive GMP, SOP, and lab protocol programs tailored to teams and facilities.',
    },
    {
      title: 'Quality Systems Architecture',
      description: 'Design and documentation of resilient SOPs, sanitation programs, and licensing support.',
    },
    {
      title: 'Regulatory & Audit Readiness',
      description: 'Inspection playbooks, HACCP/BRC guidance, and submission management to pass audits the first time.',
    },
    {
      title: 'Research & Product Development',
      description: 'Nutritional analysis, shelf-life studies, and evidence-based storytelling for market entry.',
    },
  ],
  cta: { label: 'Visit 360ace.Food', href: 'https://360ace.food', external: true },
};

export type UnifiedProcess = {
  title: string;
  description: string;
  steps: { name: string; description: string }[];
};

export const unifiedProcess: UnifiedProcess = {
  title: 'A compound consulting model built for regulated industries',
  description:
    'Our practices collaborate through a proven five-step framework that balances strategy, execution, and measurable outcomes.',
  steps: [
    {
      name: 'Assess',
      description: 'Diagnostics, stakeholder interviews, and architecture reviews surface opportunities and risks.',
    },
    {
      name: 'Design',
      description: 'Roadmaps, service blueprints, and SOPs translate insight into sequenced delivery plans.',
    },
    {
      name: 'Implement',
      description: 'Multi-disciplinary squads embed tooling, training, and automation within your teams.',
    },
    {
      name: 'Monitor',
      description: 'Observability, audits, and feedback loops keep performance, compliance, and uptime on track.',
    },
    {
      name: 'Elevate',
      description: 'Quarterly reviews unlock new growth moves—from AI platforms to new product certifications.',
    },
  ],
};

export type Credibility = {
  differentiators: string[];
  stats: { value: string; label: string }[];
};

export const credibility: Credibility = {
  differentiators: [
    'Reliability you can measure—SLOs, audits, and improvement rituals baked into every engagement.',
    'Composable playbooks that blend technology, safety, and operations for regulated organisations.',
    'Global partner network spanning cloud vendors, research institutions, and food regulators.',
  ],
  stats: [
    { value: '4×', label: 'Average release cadence boost for platform teams' },
    { value: '30+', label: 'Peer-reviewed publications and technical papers authored' },
    { value: '99.95%', label: 'Availability target achieved for managed workloads' },
  ],
};

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      '360ace orchestrated our cloud migration and compliance uplift in parallel, letting product squads ship faster without trading away resilience.',
    name: 'Amelia Lawson',
    role: 'CTO, Fintech expansion stealth',
  },
  {
    quote:
      'Their food systems expertise turned our audit preparation into a capability-building experience for every site lead.',
    name: 'Dr. M. Kamau',
    role: 'Regional Director, Agricultural NGO',
  },
  {
    quote:
      'A single partner aligning DevOps, quality, and regulatory milestones has been a game changer for our new product pipeline.',
    name: 'Head of R&D',
    role: 'Nutraceutical Startup',
  },
];

export type FinalCta = {
  title: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

export const finalCta: FinalCta = {
  title: 'Let’s co-design your next milestone',
  description:
    'Tell us where you need momentum—cloud platforms, compliance, or an integrated transformation. We’ll assemble the right practice leads for your roadmap.',
  primaryCta: { label: 'Start a conversation', href: '/contact' },
  secondaryCta: {
    label: 'Download practice overviews',
    href: 'https://360ace.tech/capability-deck.pdf',
    external: true,
  },
};
