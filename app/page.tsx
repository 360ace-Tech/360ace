import PageWrapper from "@/components/layout/page-wrapper";
import { CallToActionSection } from "@/components/sections/cta-section";
import { CredibilitySection } from "@/components/sections/credibility-section";
import { DifferentiatorsSection } from "@/components/sections/differentiators-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PracticesSection } from "@/components/sections/practices-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { JsonLd } from "@/components/seo/json-ld";
import site from "@/content/site.json" assert { type: "json" };

export default function HomePage() {
  return (
    <PageWrapper>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "360ace",
          url: site.baseUrl,
          description: site.description,
          sameAs: [
            "https://360ace.net",
            "https://360ace.tech",
            "https://360ace.food",
          ],
        }}
      />
      <div className="space-y-4">
        <HeroSection />
        <PracticesSection />
        <ProcessSection />
        <DifferentiatorsSection />
        <CredibilitySection />
        <TestimonialsSection />
        <CallToActionSection />
      </div>
    </PageWrapper>
  );
}
