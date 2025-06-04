
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { aiTools, toolCategories, AIToolItem } from '@/data/ai-tools-tiers';
import { Search, Filter, ChevronRight, Zap, Award, Sparkles, BarChart3, Layers } from 'lucide-react';
import AIToolCard from '@/components/ai-tools/AIToolCard';
import CategoryToolsSection from '@/components/ai-tools/CategoryToolsSection';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Spinner } from '@/components/ui/spinner';

const AIToolsLanding = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredTools, setFeaturedTools] = useState<AIToolItem[]>([]);
  const [popularTools, setPopularTools] = useState<AIToolItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Process the tools when component mounts
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Get popular tools
      const popular = aiTools.filter(tool => tool.popularTool).slice(0, 6);
      setPopularTools(popular);
      
      // Get featured tools (premium ones)
      const featured = aiTools.filter(tool => tool.tier === 'pro').slice(0, 3);
      setFeaturedTools(featured);
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/ai-tools-directory?search=${encodeURIComponent(searchQuery)}`);
  };
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate(`/ai-tools-directory?category=${encodeURIComponent(category)}`);
  };
  
  // Filter categories to show only main ones
  const mainCategories = toolCategories.slice(0, 8);

  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0 bg-white">
        {/* Hero Section */}
        <section className="ai-tools-hero relative overflow-hidden">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                AI Tools Directory
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Discover and leverage powerful AI tools to enhance your productivity and unleash creativity
              </p>
              
              <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                <Input
                  type="search"
                  placeholder="Search for AI tools..."
                  className="bg-white/90 text-black rounded-lg text-lg flex-grow shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </form>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1.5">Text Generation</Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1.5">Image AI</Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1.5">Document Analysis</Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1.5">Data Visualization</Badge>
              </div>
            </div>
          </div>
          
          {/* Abstract shapes */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-white/10"></div>
            <div className="absolute top-[50%] right-[20%] w-32 h-32 rounded-full bg-white/10"></div>
            <div className="absolute bottom-[20%] right-[30%] w-48 h-48 rounded-full bg-white/10"></div>
          </div>
        </section>
        
        {/* Tools Summary Stats */}
        <section className="py-16 bg-[#f5f8fa]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: <Zap className="h-8 w-8 text-[#0071c2]" />, 
                  stat: aiTools.length.toString(), 
                  label: "Total AI Tools" 
                },
                { 
                  icon: <Award className="h-8 w-8 text-[#0071c2]" />, 
                  stat: aiTools.filter(t => t.tier === 'pro').length.toString(), 
                  label: "Pro Tools" 
                },
                { 
                  icon: <Sparkles className="h-8 w-8 text-[#0071c2]" />, 
                  stat: aiTools.filter(t => t.popularTool).length.toString(), 
                  label: "Popular Tools" 
                },
                { 
                  icon: <Layers className="h-8 w-8 text-[#0071c2]" />, 
                  stat: toolCategories.length.toString(), 
                  label: "Categories" 
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4 border border-gray-100">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{item.stat}</p>
                    <p className="text-gray-500">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Tools */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold section-heading">Featured AI Tools</h2>
              <Button variant="outline" onClick={() => navigate('/ai-tools-directory?tab=pro')} className="flex items-center gap-1">
                View All Pro Tools <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredTools.map((tool) => (
                  <div key={tool.id} className="ai-tools-featured">
                    <AIToolCard tool={tool} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Tool Categories */}
        <section className="py-16 bg-[#f5f8fa]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 section-heading">Browse by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {mainCategories.map((category) => (
                <div 
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="bg-blue-50 p-3 rounded-full mb-4">
                    {category.icon}
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {aiTools.filter(tool => tool.category.toLowerCase() === category.name.toLowerCase()).length} tools
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate('/ai-tools-directory')} 
                className="ai-btn px-8"
              >
                View All Categories
              </Button>
            </div>
          </div>
        </section>
        
        {/* Popular Tools */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold section-heading">Popular AI Tools</h2>
              <Button variant="outline" onClick={() => navigate('/ai-tools-directory?tab=popular')} className="flex items-center gap-1">
                View All Popular Tools <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularTools.map((tool) => (
                  <div key={tool.id} className="ai-tools-card">
                    <AIToolCard tool={tool} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Tools by Tier */}
        <section className="py-16 bg-[#f5f8fa]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 section-heading">Tools by Subscription Tier</h2>
            
            <Tabs defaultValue="freemium" className="mb-8">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="freemium" className="py-3">Freemium Tools</TabsTrigger>
                <TabsTrigger value="basic" className="py-3">Basic Tier</TabsTrigger>
                <TabsTrigger value="pro" className="py-3">Pro Tier</TabsTrigger>
              </TabsList>
              
              <TabsContent value="freemium">
                <div className="bg-amber-50/50 border border-amber-200/50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-lg mb-1">Freemium Tools</h3>
                  <p>Get started with free AI tools available to all users</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {aiTools.filter(tool => tool.tier === 'freemium').slice(0, 3).map((tool) => (
                    <div key={tool.id} className="ai-tools-card">
                      <AIToolCard tool={tool} />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="basic">
                <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-lg mb-1">Basic Tier Tools</h3>
                  <p>Enhanced AI tools for professionals with moderate needs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {aiTools.filter(tool => tool.tier === 'basic').slice(0, 3).map((tool) => (
                    <div key={tool.id} className="ai-tools-card">
                      <AIToolCard tool={tool} />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pro">
                <div className="bg-purple-50/50 border border-purple-200/50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-lg mb-1">Pro Tier Tools</h3>
                  <p>Advanced enterprise-grade AI solutions for power users</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {aiTools.filter(tool => tool.tier === 'pro').slice(0, 3).map((tool) => (
                    <div key={tool.id} className="ai-tools-card">
                      <AIToolCard tool={tool} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate('/ai-tools-directory?tab=compare')} 
                className="ai-btn px-8"
              >
                Compare All Tiers
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 ai-gradient text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to explore AI tools?</h2>
              <p className="text-xl mb-8 text-white/90">
                Get started with our comprehensive tools directory and find the perfect AI solution for your needs
              </p>
              <Button 
                onClick={() => navigate('/ai-tools-directory')} 
                className="bg-white text-[#0071c2] hover:bg-blue-50 px-8 py-6 text-lg shadow-xl"
              >
                Browse All AI Tools
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyFooter />
    </>
  );
};

export default AIToolsLanding;
