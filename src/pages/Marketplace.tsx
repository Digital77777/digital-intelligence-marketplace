
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useScrollToTop from '@/hooks/useScrollToTop';
import { Briefcase, Users, Settings, DollarSign } from 'lucide-react';
import ProjectsTab from '@/components/marketplace/ProjectsTab';
import FreelancersTab from '@/components/marketplace/FreelancersTab';
import ToolsTab from '@/components/marketplace/ToolsTab';
import ServicesTab from '@/components/marketplace/ServicesTab';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import MarketplaceSearchFilters from '@/components/marketplace/MarketplaceSearchFilters';
import MarketplaceSuccessStories from '@/components/marketplace/MarketplaceSuccessStories';
import { useMarketplaceFilters } from '@/hooks/useMarketplaceFilters';

const Marketplace = () => {
  useScrollToTop();
  const { currentTier } = useTier();
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    ratingFilter,
    setRatingFilter,
    categoriesFilter,
    setCategoriesFilter,
    filteredTools,
  } = useMarketplaceFilters();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const viewToolDetails = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  const handlePostProject = () => {
    navigate('/marketplace/post-project');
  };

  const handleCreateFreelancerProfile = () => {
    navigate('/marketplace/create-freelancer-profile');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-[12px] my-0 py-px">
        <div className="max-w-7xl mx-auto">
          <MarketplaceHero 
            onPostProject={handlePostProject} 
            onCreateFreelancerProfile={handleCreateFreelancerProfile} 
          />

          <MarketplaceSearchFilters 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            ratingFilter={ratingFilter} 
            setRatingFilter={setRatingFilter} 
            categoriesFilter={categoriesFilter} 
            setCategoriesFilter={setCategoriesFilter} 
          />

          {/* Main Marketplace Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-14 bg-muted rounded-xl p-1">
                <TabsTrigger value="projects" className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="freelancers" className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Experts</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Tools</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <DollarSign className="w-4 h-4" />
                  <span className="hidden sm:inline">Services</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects" className="mt-8">
                <ProjectsTab />
              </TabsContent>
              
              <TabsContent value="freelancers" className="mt-8">
                <FreelancersTab searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="tools" className="mt-8">
                <ToolsTab 
                  searchQuery={searchQuery} 
                  filteredTools={filteredTools} 
                  viewToolDetails={viewToolDetails} 
                />
              </TabsContent>
              
              <TabsContent value="services" className="mt-8">
                <ServicesTab searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </div>

          <MarketplaceSuccessStories />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
