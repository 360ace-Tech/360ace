import { Metadata } from 'next';

import { HeroSection } from '@/components/sections/hero';
import { PracticesSection } from '@/components/sections/practices';
import { ProcessSection } from '@/components/sections/process';
import { CredibilitySection } from '@/components/sections/credibility';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { FinalCtaSection } from '@/components/sections/final-cta';
import { PageTransition } from '@/components/motion/page-transition';

export const metadata: Metadata = {
  title: 'Unified Consultancy for Technology and Food Systems',
  description:
    'Explore how 360ace combines cloud-native engineering and food safety consultancy with two specialised practices and a shared delivery model.',
};

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <PracticesSection />
      <ProcessSection />
      <CredibilitySection />
      <TestimonialsSection />
      <FinalCtaSection />
    </PageTransition>
  );
}
