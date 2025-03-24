
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Star, Search, Filter, Tag, DollarSign, BookOpen, Eye, Brain, BarChart, Workflow, Code, Database, Headphones, Users } from 'lucide-react';
import { marketplaceTools } from '@/data/marketplace-tools';

const Marketplace = () => {
  const { currentTier } = useTier();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  const [filteredTools, setFilteredTools] = useState(marketplaceTools);

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
    
    setFilteredTools(filtered);
  }, [searchQuery, selectedCategory]);

  const addToCart = (tool) => {
    toast({
      title: "Added to cart",
      description: `${tool.name} has been added to your cart`,
    });
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
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
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
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter size={16} /> Filters
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Tag size={16} /> Categories
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <DollarSign size={16} /> Free
                </Button>
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

          {currentTier === 'freemium' ? (
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Show all tools in freemium version */}
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
                        {tool.isPremium ? 'Premium' : 'Free'}
                      </Badge>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        {tool.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2 mb-3">
                        {tool.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => addToCart(tool)}
                      >
                        <ShoppingCart size={16} className="mr-2" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {/* Full marketplace for paid tiers (same as above, code not duplicated in actual implementation) */}
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
                        {tool.isPremium ? 'Premium' : 'Free'}
                      </Badge>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        {tool.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2 mb-3">
                        {tool.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => addToCart(tool)}
                      >
                        <ShoppingCart size={16} className="mr-2" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
