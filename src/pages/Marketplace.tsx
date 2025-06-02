
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import useScrollToTop from '@/hooks/useScrollToTop';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Star,
  Search,
  Filter,
  Tag,
  BookOpen,
  Eye,
  Brain,
  BarChart,
  Workflow,
  Code,
  Database,
  Headphones,
  Users,
  ExternalLink,
  ChevronRight,
  Plus,
  Briefcase,
  Settings,
  DollarSign
} from 'lucide-react';
import { marketplaceTools } from '@/data/marketplace-tools';
import ProjectsTab from '@/components/marketplace/ProjectsTab';
import FreelancersTab from '@/components/marketplace/FreelancersTab';
import ToolsTab from '@/components/marketplace/ToolsTab';
import ServicesTab from '@/components/marketplace/ServicesTab';

const Marketplace = () => {
  useScrollToTop();
  
  const { currentTier } = useTier();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  const [filteredTools, setFilteredTools] = useState(marketplaceTools);
  const navigate = useNavigate();
  
  // Filter states
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isPremiumFilter, setIsPremiumFilter] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  
  // Scroll to top on page load or navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = marketplaceTools;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
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

  const viewToolDetails = (toolId) => {
    navigate(`/tool/${toolId}`);
  };

  const handlePostProject = () => {
    navigate('/marketplace/post-project');
  };

  const handleCreateFreelancerProfile = () => {
    navigate('/marketplace/create-profile');
  };

  const categories = [
    { id: 'nlp', name: 'Natural Language Processing', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'computer-vision', name: 'Computer Vision', icon: <Eye className="w-5 h-5" /> },
    { id: 'ml-frameworks', name: 'ML Frameworks', icon: <Brain className="w-5 h-5" /> },
    { id: 'data-analysis', name: 'Data Analysis', icon: <BarChart className="w-5 h-5" /> },
    { id: 'automation', name: 'Automation', icon: <Workflow className="w-5 h-5" /> },
    { id: 'open-source-ai', name: 'Open-Source AI', icon: <Code className="w-5 h-5" /> },
    { id: 'code-assistance', name: 'Code Assistance', icon: <Code className="w-5 h-5" /> },
    { id: 'business-intelligence', name: 'Business Intelligence', icon: <Database className="w-5 h-5" /> },
    { id: 'audio-speech', name: 'Audio & Speech', icon: <Headphones className="w-5 h-5" /> },
    { id: 'collaboration', name: 'Collaboration', icon: <Users className="w-5 h-5" /> },
  ];

  const handleCategoryToggle = (categoryId) => {
    setCategoriesFilter(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <div className="mb-12 relative overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-64 md:h-80 flex items-center">
              <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
                  AI Marketplace
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6 animate-slide-up">
                  Hire AI experts, discover tools, and sell your services in the world's premier AI marketplace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50" onClick={handlePostProject}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post a Project
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={handleCreateFreelancerProfile}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Start Freelancing
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl"></div>
          </div>

          {/* Search and filters */}
          <div className="bg-card shadow-sm border rounded-xl p-4 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search projects, freelancers, tools..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter size={16} /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[350px] sm:w-[450px]">
                    <SheetHeader>
                      <SheetTitle>Filter Results</SheetTitle>
                      <SheetDescription>
                        Refine your search with these filters
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Minimum Rating</h3>
                        <RadioGroup 
                          value={String(ratingFilter)} 
                          onValueChange={(val) => setRatingFilter(Number(val))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0" id="r0" />
                            <Label htmlFor="r0">Any rating</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4" id="r4" />
                            <Label htmlFor="r4" className="flex items-center">
                              <span>4+</span>
                              <div className="flex ml-2">
                                {[...Array(4)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4.5" id="r45" />
                            <Label htmlFor="r45" className="flex items-center">
                              <span>4.5+</span>
                              <div className="flex ml-2">
                                {[...Array(4)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Categories</h3>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`cat-${category.id}`}
                                checked={categoriesFilter.includes(category.id)}
                                onCheckedChange={() => handleCategoryToggle(category.id)}
                              />
                              <Label htmlFor={`cat-${category.id}`} className="flex items-center gap-2">
                                {category.icon}
                                <span>{category.name}</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button
                          onClick={() => {
                            setRatingFilter(0);
                            setIsPremiumFilter(false);
                            setCategoriesFilter([]);
                          }}
                          variant="outline"
                        >
                          Reset Filters
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button>Apply Filters</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Main Marketplace Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="freelancers" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Freelancers
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Tools
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Services
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects" className="mt-6">
                <ProjectsTab searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="freelancers" className="mt-6">
                <FreelancersTab searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="tools" className="mt-6">
                <ToolsTab searchQuery={searchQuery} filteredTools={filteredTools} viewToolDetails={viewToolDetails} />
              </TabsContent>
              
              <TabsContent value="services" className="mt-6">
                <ServicesTab searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
