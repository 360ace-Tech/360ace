import { HeroSection } from "@/components/sections/hero";
import { PracticeHighlightsSection } from "@/components/sections/practice-highlights";
import { ProcessSection } from "@/components/sections/process";
import { CredibilitySection } from "@/components/sections/credibility";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaBandSection } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PracticeHighlightsSection />
      <ProcessSection />
      <CredibilitySection />
      <TestimonialsSection />
      <CtaBandSection />
    </div>
  );
}
