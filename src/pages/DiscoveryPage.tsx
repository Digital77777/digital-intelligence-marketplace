import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Filter, TrendingUp, Star, Users, 
  Clock, BookOpen, Wrench, Video, MessageSquare
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const searchResults = [
    {
      id: 1,
      type: 'tool',
      title: 'GPT-4 Text Generator',
      description: 'Advanced language model for text generation and analysis',
      category: 'Natural Language Processing',
      rating: 4.8,
      users: 15420,
      icon: <Wrench className="h-5 w-5" />
    },
    {
      id: 2,
      type: 'course',
      title: 'Deep Learning Fundamentals',
      description: 'Learn the basics of neural networks and deep learning',
      category: 'Education',
      rating: 4.9,
      users: 8340,
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: 3,
      type: 'stream',
      title: 'Building AI Applications Live',
      description: 'Watch experts build AI applications in real-time',
      category: 'Live Streaming',
      rating: 4.7,
      users: 2150,
      icon: <Video className="h-5 w-5" />
    },
    {
      id: 4,
      type: 'forum',
      title: 'Machine Learning Best Practices',
      description: 'Community discussion on ML deployment strategies',
      category: 'Community',
      rating: 4.6,
      users: 892,
      icon: <MessageSquare className="h-5 w-5" />
    }
  ];

  const trendingTopics = [
    'Large Language Models',
    'Computer Vision',
    'MLOps',
    'Generative AI',
    'Neural Networks',
    'AI Ethics'
  ];

  const filteredResults = activeFilter === 'all' 
    ? searchResults 
    : searchResults.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Header */}
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold">Discover AI Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect AI tools, courses, and resources for your projects
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for AI tools, courses, tutorials, and more..."
                className="pl-10 pr-4 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-2" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Trending Topics */}
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              <span className="text-sm text-muted-foreground mr-2">Trending:</span>
              {trendingTopics.map((topic, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSearchQuery(topic)}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Search Results */}
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-lg mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tool">Tools</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
              <TabsTrigger value="stream">Streams</TabsTrigger>
              <TabsTrigger value="forum">Forums</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeFilter} className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {filteredResults.length} results found
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Sort by Relevance</Button>
                  <Button variant="outline" size="sm">Sort by Rating</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((item) => (
                  <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          {item.icon}
                          <Badge variant="outline" className="ml-2 capitalize">
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{item.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{item.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          {item.users.toLocaleString()}
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Featured Categories */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Natural Language Processing', count: 125, icon: <MessageSquare className="h-8 w-8" /> },
                { name: 'Computer Vision', count: 98, icon: <Video className="h-8 w-8" /> },
                { name: 'Machine Learning', count: 156, icon: <Wrench className="h-8 w-8" /> },
                { name: 'Deep Learning', count: 89, icon: <BookOpen className="h-8 w-8" /> },
              ].map((category, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      {category.icon}
                    </div>
                    <h3 className="font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} resources</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiscoveryPage;
