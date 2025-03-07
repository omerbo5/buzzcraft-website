import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import TrustSignalsSection from '@/components/sections/TrustSignalsSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import KeySolutionsSection from '@/components/sections/KeySolutionsSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <KeySolutionsSection />
        <SocialProofSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <TrustSignalsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
