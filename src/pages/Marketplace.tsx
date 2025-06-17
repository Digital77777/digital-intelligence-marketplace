import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useScrollToTop from '@/hooks/useScrollToTop';
import { Briefcase, Users, Settings, DollarSign } from 'lucide-react';
import { marketplaceTools } from '@/data/marketplace-tools';
import ProjectsTab from '@/components/marketplace/ProjectsTab';
import FreelancersTab from '@/components/marketplace/FreelancersTab';
import ToolsTab from '@/components/marketplace/ToolsTab';
import ServicesTab from '@/components/marketplace/ServicesTab';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import MarketplaceSearchFilters from '@/components/marketplace/MarketplaceSearchFilters';
import MarketplaceSuccessStories from '@/components/marketplace/MarketplaceSuccessStories';
const Marketplace = () => {
  useScrollToTop();
  const {
    currentTier
  } = useTier();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredTools, setFilteredTools] = useState(marketplaceTools);
  const navigate = useNavigate();

  // Filter states
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isPremiumFilter, setIsPremiumFilter] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);

  // Scroll to top on page load or navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let filtered = marketplaceTools;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase()) || tool.category.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Filter by rating
    if (ratingFilter > 0) {
      filtered = filtered.filter(tool => tool.rating >= ratingFilter);
    }

    // Filter by premium status
    if (isPremiumFilter) {
      filtered = filtered.filter(tool => tool.isPremium);
    }

    // Filter by selected categories
    if (categoriesFilter.length > 0) {
      filtered = filtered.filter(tool => categoriesFilter.includes(tool.category));
    }
    setFilteredTools(filtered);
  }, [searchQuery, selectedCategory, ratingFilter, isPremiumFilter, categoriesFilter]);
  const viewToolDetails = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };
  const handlePostProject = () => {
    navigate('/marketplace/post-project');
  };
  const handleCreateFreelancerProfile = () => {
    navigate('/marketplace/create-profile');
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-[12px] py-[9px]">
        <div className="max-w-7xl mx-auto">
          <MarketplaceHero onPostProject={handlePostProject} onCreateFreelancerProfile={handleCreateFreelancerProfile} />

          <MarketplaceSearchFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} categoriesFilter={categoriesFilter} setCategoriesFilter={setCategoriesFilter} />

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
                <ToolsTab searchQuery={searchQuery} filteredTools={filteredTools} viewToolDetails={viewToolDetails} />
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
    </div>;
};
export default Marketplace;