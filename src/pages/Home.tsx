
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TrendingToolsCarousel from '@/components/TrendingToolsCarousel';
import AvailableTools from '@/components/AvailableTools';
import FeaturedCourses from '@/components/learning/FeaturedCourses';
import FeaturedResources from '@/components/FeaturedResources';
import PricingTiers from '@/components/PricingTiers';
import TierSpecificContent from '@/components/TierSpecificContent';
import { useTier } from '@/context/TierContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Home = () => {
  const { currentTier } = useTier();
  const navigate = useNavigate();

  const handleAIStreamUpload = () => {
    if (currentTier === 'freemium') {
      toast.error("AI Stream uploads require Basic or Pro tier subscription");
      return;
    }
    navigate('/ai-streams/upload');
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrendingToolsCarousel />
        <AvailableTools />
        
        {/* AI Streams Upload CTA */}
        <section className="py-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Share Your AI Creations</h2>
                <p className="text-muted-foreground max-w-lg">
                  Upload your AI-powered videos, tutorials, and demos to share with the community.
                  Build your reputation as an AI expert.
                </p>
              </div>
              <div>
                <Button 
                  onClick={handleAIStreamUpload}
                  className="flex items-center gap-2"
                  size="lg"
                  disabled={currentTier === 'freemium'}
                >
                  <Upload className="h-5 w-5" /> 
                  Upload AI Stream
                </Button>
                {currentTier === 'freemium' && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Requires Basic or Pro tier
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedCourses />
        <TierSpecificContent />
        <PricingTiers />
        <FeaturedResources />
      </main>
      <Footer />
    </>
  );
};

export default Home;
