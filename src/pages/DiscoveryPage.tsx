import React, { useEffect } from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Search, X } from 'lucide-react';
import useScrollToTop from '@/hooks/useScrollToTop';
import { useSearch, SearchResultType } from '@/hooks/useSearch';
import SearchResults from '@/components/search/SearchResults';

const DiscoveryPage = () => {
  useScrollToTop();
  
  const { 
    searchQuery, 
    setSearchQuery, 
    isSearching, 
    results, 
    selectedType,
    setSelectedType, 
    performSearch, 
    clearSearch 
  } = useSearch();

  // Search when query or type changes
  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery, selectedType);
    }
  }, [searchQuery, selectedType, performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery, selectedType);
  };

  return (
    <BasicTierLayout pageTitle="Search & Discovery" requiredFeature="discovery">
      <div className="space-y-6">
        <Card className="border-blue-100 dark:border-blue-900/50">
          <div className="pt-6 pb-4 px-6">
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
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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
          </div>
        </Card>

        {searchQuery ? (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Search results for "{searchQuery}"</h2>

            <Tabs defaultValue={selectedType} value={selectedType} onValueChange={(v) => setSelectedType(v as SearchResultType)}>
              <TabsList>
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="tools">AI Tools</TabsTrigger>
                <TabsTrigger value="learning">Learning</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="streams">Streams</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedType} className="mt-6">
                <SearchResults 
                  results={results}
                  query={searchQuery}
                  selectedType={selectedType}
                  isSearching={isSearching}
                />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <ExploreContent />
        )}
      </div>
    </BasicTierLayout>
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
