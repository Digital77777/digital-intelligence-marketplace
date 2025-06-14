
import HeroSection from "@/components/HeroSection";
import AvailableTools from "@/components/AvailableTools";
import TrendingToolsCarousel from "@/components/TrendingToolsCarousel";
import FeaturedResources from "@/components/FeaturedResources";
import PricingTiers from "@/components/PricingTiers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamDashboardCTA from "@/components/TeamDashboardCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <TeamDashboardCTA />
        <AvailableTools />
        <TrendingToolsCarousel />
        <FeaturedResources />
        <PricingTiers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
