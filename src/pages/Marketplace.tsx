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
  DollarSign,
  TrendingUp,
  Award,
  Target,
  Zap
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

  const stats = [
    { label: 'Active Projects', value: '1,234', icon: <Briefcase className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'AI Experts', value: '2,567', icon: <Users className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Tools Available', value: '890', icon: <Settings className="w-5 h-5" />, color: 'text-purple-600' },
    { label: 'Success Rate', value: '98%', icon: <Award className="w-5 h-5" />, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero section */}
          <div className="mb-12 relative overflow-hidden rounded-3xl">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 h-96 md:h-[450px] flex items-center relative">
              <div className="container mx-auto px-8 relative z-10">
                <div className="max-w-4xl">
                  <div className="mb-6">
                    <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                      <Zap className="w-4 h-4 mr-2" />
                      World's Premier AI Marketplace
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
                    Connect with
                    <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      AI Experts
                    </span>
                    Worldwide
                  </h1>
                  <p className="text-white/90 text-xl md:text-2xl max-w-3xl mb-8 animate-slide-up leading-relaxed">
                    Hire top AI talent, discover cutting-edge tools, and grow your business with the most trusted AI marketplace platform.
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mb-2 ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-white/80 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg" 
                      onClick={handlePostProject}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Post a Project
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                      onClick={handleCreateFreelancerProfile}
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Start Freelancing
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Background Elements */}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl"></div>
              <div className="absolute right-1/4 top-1/4 w-64 h-64 bg-yellow-400/20 rounded-full filter blur-2xl"></div>
            </div>
          </div>

          {/* Enhanced Search and filters */}
          <div className="bg-card shadow-lg border rounded-2xl p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search projects, experts, tools, or services..."
                  className="pl-12 w-full h-12 text-lg border-2 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="lg" className="flex items-center gap-2 h-12 px-6">
                      <Filter size={18} /> 
                      Advanced Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[400px] sm:w-[500px]">
                    <SheetHeader>
                      <SheetTitle className="text-xl">Filter Results</SheetTitle>
                      <SheetDescription>
                        Refine your search with advanced filters
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
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Categories</h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
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

          {/* Success Stories Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground text-lg">See how our AI marketplace transforms businesses</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: "$2.5M+", label: "Total Transactions", icon: <DollarSign className="w-6 h-6" /> },
                { stat: "15,000+", label: "Projects Completed", icon: <Briefcase className="w-6 h-6" /> },
                { stat: "98.5%", label: "Client Satisfaction", icon: <TrendingUp className="w-6 h-6" /> }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
