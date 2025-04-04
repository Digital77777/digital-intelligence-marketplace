
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TrendingToolsCarousel from '@/components/TrendingToolsCarousel';
import FeaturedResources from '@/components/FeaturedResources';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrendingToolsCarousel />
        <FeaturedResources />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
