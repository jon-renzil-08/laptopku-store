import type { Metadata } from "next";
import BuyingGuideSection from "@/components/BuyingGuideSection";
import ConditionGuideSection from "@/components/ConditionGuideSection";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import ProductPreviewSection from "@/components/ProductPreviewSection";
import TestimonialSection from "@/components/TestimonialSection";
import TrustSection from "@/components/TrustSection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />

      <FadeIn>
        <TrustSection />
      </FadeIn>

      <FadeIn>
        <BuyingGuideSection />
      </FadeIn>

      <FadeIn>
        <ProductPreviewSection />
      </FadeIn>

      <FadeIn>
        <ConditionGuideSection />
      </FadeIn>

      <FadeIn>
        <TestimonialSection />
      </FadeIn>

      <FadeIn>
        <FAQSection />
      </FadeIn>

      <FadeIn>
        <CTASection />
      </FadeIn>
    </main>
  );
}
