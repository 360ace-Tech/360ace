import hub from "@/content/hub.json" assert { type: "json" };

type Hero = typeof hub.hero;
type Practice = (typeof hub.practiceHighlights)[number];
type ProcessStep = (typeof hub.unifiedProcess)[number];
type Differentiator = (typeof hub.differentiators)[number];
type Credibility = typeof hub.credibility;
type Testimonial = (typeof hub.testimonials)[number];
type CallToAction = typeof hub.callToAction;

export const hero: Hero = hub.hero;
export const practiceHighlights: Practice[] = hub.practiceHighlights;
export const unifiedProcess: ProcessStep[] = hub.unifiedProcess;
export const differentiators: Differentiator[] = hub.differentiators;
export const credibility: Credibility = hub.credibility;
export const testimonials: Testimonial[] = hub.testimonials;
export const callToAction: CallToAction = hub.callToAction;
