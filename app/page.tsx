import { CallToActionSection } from "@/components/sections/cta-section";
import { CredibilitySection } from "@/components/sections/credibility-section";
import { DifferentiatorsSection } from "@/components/sections/differentiators-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PracticesSection } from "@/components/sections/practices-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <PracticesSection />
      <ProcessSection />
      <DifferentiatorsSection />
      <CredibilitySection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
}
