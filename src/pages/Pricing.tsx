
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingTiers from '@/components/PricingTiers';

const Pricing = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Choose Your Plan
              </span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Select the tier that best fits your needs and unlock the full potential of our AI tools
            </p>
          </div>
        </div>
        
        <PricingTiers />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
