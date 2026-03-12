import React from 'react';
import { Navigation } from './landing/Navigation';
import { BackgroundEffects } from './landing/BackgroundEffects';
import { HeroSection } from './landing/HeroSection';
import { MockupSection } from './landing/MockupSection';
import { DualCardsSection } from './landing/DualCardsSection';
import { TimelineSection } from './landing/TimelineSection';
import { PricingSection } from './landing/PricingSection';
import { TestimonialSection } from './landing/TestimonialSection';
import { CTASection } from './landing/CTASection';
import { Footer } from './landing/Footer';

export const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#c9d0da] selection:bg-[#ff9146]/20 selection:text-[#ff9146]">
      <Navigation onGetStarted={onGetStarted} />
      <BackgroundEffects />
      
      <main className="w-full z-10 pt-24 pb-0 relative">
        <HeroSection onGetStarted={onGetStarted} />
        <MockupSection />
        <DualCardsSection />
        <TimelineSection />
        <PricingSection onGetStarted={onGetStarted} />
        <TestimonialSection />
        <CTASection onGetStarted={onGetStarted} />
      </main>
      
      <Footer />
    </div>
  );
};
