
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PricingTiers from '@/components/PricingTiers';
import Footer from '@/components/Footer';
import { TierProvider } from '@/context/TierContext';

const Index = () => {
  return (
    <TierProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main>
          <HeroSection />
          <PricingTiers />
        </main>
        <Footer />
      </div>
    </TierProvider>
  );
};

export default Index;
