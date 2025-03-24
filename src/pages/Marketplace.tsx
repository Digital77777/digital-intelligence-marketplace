
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Search, Filter, Tag, DollarSign } from 'lucide-react';

const Marketplace = () => {
  const { currentTier } = useTier();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample marketplace items
  const marketplaceItems = [
    {
      id: 1,
      title: "AI Content Generator Pro",
      description: "Generate blog posts, articles, and social media content with advanced AI.",
      price: 49.99,
      rating: 4.7,
      seller: "Digital Solutions Inc.",
      tags: ["Content", "Writing", "Marketing"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWklMjBnZW5lcmF0b3J8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 2,
      title: "Data Analysis Assistant",
      description: "AI-powered tool for analyzing large datasets and generating insights.",
      price: 79.99,
      rating: 4.5,
      seller: "DataMind Analytics",
      tags: ["Data", "Analysis", "Business"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YSUyMGFuYWx5c2lzfGVufDB8fDB8fHww"
    },
    {
      id: 3,
      title: "AI Chatbot Builder",
      description: "Create custom chatbots for customer service, sales, or internal team support.",
      price: 34.99,
      rating: 4.8,
      seller: "BotCraft Technologies",
      tags: ["Chatbot", "Customer Service", "Automation"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhdGJvdHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 4,
      title: "Image Generation Service",
      description: "Create stunning images and illustrations with AI-powered generation.",
      price: 29.99,
      rating: 4.6,
      seller: "VisualAI Studios",
      tags: ["Images", "Design", "Creative"],
      image: "https://images.unsplash.com/photo-1655720033654-a4239dd42d10?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFpJTIwZ2VuZXJhdGVkJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 5,
      title: "SEO Optimization Tool",
      description: "AI-powered SEO analysis and optimization for better search rankings.",
      price: 59.99,
      rating: 4.4,
      seller: "RankBoost Solutions",
      tags: ["SEO", "Marketing", "Optimization"],
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VvfGVufDB8fDB8fHww"
    },
    {
      id: 6,
      title: "Video Editing AI",
      description: "Automate video editing tasks with advanced AI algorithms.",
      price: 89.99,
      rating: 4.9,
      seller: "VideoTech AI",
      tags: ["Video", "Editing", "Creative"],
      image: "https://images.unsplash.com/photo-1574717024453-354056afd6fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fHww"
    }
  ];

  // Filter items based on search query
  const filteredItems = marketplaceItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <div className="mb-12 relative overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-64 md:h-80 flex items-center">
              <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
                  AI Tools Marketplace
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6 animate-slide-up">
                  Discover, buy and sell cutting-edge AI tools and services to enhance your productivity and innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    Explore Tools
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    List Your Product
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
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter size={16} /> Filters
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Tag size={16} /> Categories
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <DollarSign size={16} /> Price
                </Button>
              </div>
            </div>
          </div>

          {currentTier === 'freemium' ? (
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="p-6 bg-muted/50 rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">Limited Access</h2>
                <p className="text-muted-foreground mb-4">
                  You're currently on the Freemium plan, which gives you limited access to the marketplace.
                </p>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Basic or Pro to access the full marketplace with unlimited transactions.
                </p>
              </div>
              
              {/* Limited items for freemium users */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.slice(0, 3).map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow border-2 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        By {item.seller}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2 mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="font-semibold text-lg">${item.price}</span>
                      <Button size="sm" className="flex items-center gap-1">
                        <ShoppingCart size={16} /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {/* Full marketplace for paid tiers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow border-2 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        By {item.seller}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm line-clamp-2 mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="font-semibold text-lg">${item.price}</span>
                      <Button size="sm" className="flex items-center gap-1">
                        <ShoppingCart size={16} /> Add to Cart
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
