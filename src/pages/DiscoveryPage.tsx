
import React, { useState } from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X } from 'lucide-react';

const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // In a real app, this would trigger an API search
    console.log("Searching for:", searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <BasicTierLayout pageTitle="Search & Discovery" requiredFeature="discovery">
      <div className="space-y-6">
        <Card className="border-blue-100 dark:border-blue-900/50">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input 
                className="pl-10 pr-16 py-6 text-lg border-gray-200 dark:border-gray-700 focus-visible:ring-blue-500"
                placeholder="Search AI tools, learning resources, communities..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <Button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {isSearching ? (
          <SearchResults query={searchQuery} />
        ) : (
          <ExploreContent />
        )}
      </div>
    </BasicTierLayout>
  );
};

const SearchResults = ({ query }: { query: string }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Search results for "{query}"</h2>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Tools (3 results)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/40">
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">AI Image Generator Pro</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Create stunning AI-generated images with our advanced image generator using stable diffusion...
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Resources (2 results)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/40">
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">Understanding Neural Networks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    A comprehensive guide to neural networks and their applications in machine learning...
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Tools (3 results)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/40">
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">AI Image Generator Pro</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Create stunning AI-generated images with our advanced image generator using stable diffusion...
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources (2 results)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/40">
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">Understanding Neural Networks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    A comprehensive guide to neural networks and their applications in machine learning...
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Discussions (1 result)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/40">
                <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">Best practices for training computer vision models</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Looking for advice on how to improve accuracy for my computer vision model...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ExploreContent = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
          <CardDescription>Popular topics in our community right now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["AI Ethics", "Generative Art", "LLM Fine-tuning", "Computer Vision", "ChatGPT", "Stable Diffusion", "NLP", "MLOps", "AutoML", "Neural Networks"].map((topic) => (
              <Button key={topic} variant="outline" size="sm" className="rounded-full">
                {topic}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular AI Tools</CardTitle>
            <CardDescription>Most viewed tools this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["AI Image Generator", "Text-to-Speech Converter", "Code Assistant", "Video Enhancer", "Data Visualizer"].map((tool) => (
              <div key={tool} className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
                <span>{tool}</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Latest Courses</CardTitle>
            <CardDescription>Recently added to our learning hub</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Advanced Computer Vision", "NLP with Transformers", "AI Ethics & Governance", "Machine Learning Operations", "Data Science Fundamentals"].map((course) => (
              <div key={course} className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
                <span>{course}</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiscoveryPage;
