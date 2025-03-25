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
  ChevronRight
} from 'lucide-react';
import { marketplaceTools } from '@/data/marketplace-tools';

const Marketplace = () => {
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

  const handleSubmitToolClick = () => {
    if (currentTier === 'pro') {
      navigate('/submit-tool');
    } else {
      toast({
        title: "Pro tier required",
        description: "Tool submission is only available for Pro tier users",
        variant: "destructive"
      });
      navigate('/pricing');
    }
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
                  AI Tools Marketplace
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6 animate-slide-up">
                  Discover 50+ cutting-edge AI tools to enhance your productivity and innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    Explore Tools
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={handleSubmitToolClick}
                  >
                    Submit Your Tool
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
                  placeholder="Search for AI tools and services..."
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
                      <SheetTitle>Filter Tools</SheetTitle>
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
                        <h3 className="text-lg font-medium mb-3">Tool Type</h3>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="premium-only" 
                            checked={isPremiumFilter}
                            onCheckedChange={(checked) => setIsPremiumFilter(checked === true)}
                          />
                          <Label htmlFor="premium-only">Premium Tools Only</Label>
                        </div>
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
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Tag size={16} /> Categories
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[350px] sm:w-[450px]">
                    <SheetHeader>
                      <SheetTitle>Tool Categories</SheetTitle>
                      <SheetDescription>
                        Browse tools by category
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6">
                      <div className="space-y-4">
                        {categories.map((category) => (
                          <Button
                            key={category.id}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-3"
                            onClick={() => {
                              setSelectedCategory(category.id);
                              const closeButton = document.querySelector(".SheetClose") as HTMLElement;
                              if (closeButton) closeButton.click();
                            }}
                          >
                            <div className="flex items-center">
                              <div className="mr-3 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                {category.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{category.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                  {marketplaceTools.filter(t => t.category === category.id).length} tools
                                </p>
                              </div>
                              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
              <TabsList className="w-full overflow-x-auto flex flex-nowrap pb-1 justify-start">
                <TabsTrigger value="all">All Categories</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap flex items-center gap-1">
                    {category.icon}
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow border-2 group">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 flex justify-center items-center h-36">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                      {tool.icon}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                    <Badge variant={tool.isPremium ? "secondary" : "default"} className="mt-1">
                      {tool.isPremium ? 'Premium' : 'Open Source'}
                    </Badge>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {tool.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm line-clamp-2 mb-3">
                      {tool.description}
                    </p>
                    <div className="flex items-center mb-2">
                      {[...Array(Math.floor(tool.rating))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {tool.rating % 1 > 0 && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                      <span className="ml-2 text-sm text-foreground/70">{tool.rating.toFixed(1)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => viewToolDetails(tool.id)}
                    >
                      <ExternalLink size={16} className="mr-2" /> View Tool
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <div className="mb-4 text-foreground/50">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No tools found</h3>
                <p className="text-foreground/70 max-w-md mx-auto">
                  We couldn't find any tools matching your current filters. Try adjusting your search criteria or clearing filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setRatingFilter(0);
                    setIsPremiumFilter(false);
                    setCategoriesFilter([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
