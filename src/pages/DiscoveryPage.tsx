
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import { LearningContent } from '@/types/learning';
import { AITool } from '@/types/tools';
import {
  Search,
  BookOpen,
  Code,
  Lightbulb,
  Users,
  Zap,
  ExternalLink,
  Filter,
  SlidersHorizontal,
  Clock,
  TrendingUp
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'tool' | 'forum' | 'group';
  category: string;
  required_tier: string;
  link: string;
  icon: React.ReactNode;
}

const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular'>('relevance');
  const { currentTier } = useTier();
  const navigate = useNavigate();

  // Handle search query changes
  useEffect(() => {
    if (searchQuery.length > 2) {
      performSearch();
    } else if (searchQuery.length === 0) {
      showRecommendations();
    }
  }, [searchQuery, activeFilter, sortBy]);

  // Show recommendations on initial load
  useEffect(() => {
    showRecommendations();
  }, []);

  const performSearch = async () => {
    setIsSearching(true);
    try {
      // Search courses
      const { data: courses } = await supabase
        .from('courses')
        .select('*')
        .textSearch('title', searchQuery, { 
          config: 'english' 
        })
        .or(`description.ilike.%${searchQuery}%`);

      // Search tools
      const { data: tools } = await supabase
        .from('ai_tools')
        .select('*')
        .textSearch('name', searchQuery, { 
          config: 'english' 
        })
        .or(`description.ilike.%${searchQuery}%`);

      // Search forum topics (if applicable)
      const { data: forums } = await supabase
        .from('forum_topics')
        .select('*')
        .textSearch('title', searchQuery, { 
          config: 'english' 
        })
        .or(`content.ilike.%${searchQuery}%`);

      // Search study groups (if applicable)
      const { data: groups } = await supabase
        .from('study_groups')
        .select('*')
        .textSearch('name', searchQuery, { 
          config: 'english' 
        })
        .or(`description.ilike.%${searchQuery}%`);

      // Process and combine results
      const processedResults: SearchResult[] = [
        ...(courses || []).map((course: LearningContent) => ({
          id: course.id,
          title: course.title,
          description: course.description || '',
          type: 'course' as const,
          category: course.category,
          required_tier: course.required_tier,
          link: `/learning/${course.id}`,
          icon: <BookOpen className="h-4 w-4" />
        })),
        ...(tools || []).map((tool: AITool) => ({
          id: tool.id,
          title: tool.name,
          description: tool.description,
          type: 'tool' as const,
          category: tool.category,
          required_tier: tool.required_tier,
          link: `/ai-tools/tool/${tool.id}`,
          icon: <Zap className="h-4 w-4" />
        })),
        ...(forums || []).map((forum: any) => ({
          id: forum.id,
          title: forum.title,
          description: forum.content.substring(0, 100) + '...',
          type: 'forum' as const,
          category: 'Discussion',
          required_tier: 'freemium',
          link: `/community/topic/${forum.id}`,
          icon: <Lightbulb className="h-4 w-4" />
        })),
        ...(groups || []).map((group: any) => ({
          id: group.id,
          title: group.name,
          description: group.description || 'A study group for AI enthusiasts',
          type: 'group' as const,
          category: group.category,
          required_tier: 'freemium',
          link: `/study-groups/${group.id}`,
          icon: <Users className="h-4 w-4" />
        }))
      ];

      // Apply filters
      let filteredResults = processedResults;
      
      if (activeFilter !== 'all') {
        filteredResults = processedResults.filter(result => result.type === activeFilter);
      }
      
      // Apply sorting
      if (sortBy === 'recent') {
        // Sort by recency (mock for now)
        filteredResults = [...filteredResults].sort(() => Math.random() - 0.5);
      } else if (sortBy === 'popular') {
        // Sort by popularity (mock for now)
        filteredResults = [...filteredResults].sort(() => Math.random() - 0.5);
      }
      
      // Filter based on user tier
      filteredResults = filteredResults.filter(result => {
        if (result.required_tier === 'freemium') return true;
        if (result.required_tier === 'basic') return currentTier === 'basic' || currentTier === 'pro';
        if (result.required_tier === 'pro') return currentTier === 'pro';
        return false;
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const showRecommendations = async () => {
    // For now we'll just fetch recently added courses and tools
    setIsSearching(true);
    try {
      // Get recent courses
      const { data: courses } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Get recent tools
      const { data: tools } = await supabase
        .from('ai_tools')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      const recommendations: SearchResult[] = [
        ...(courses || []).map((course: LearningContent) => ({
          id: course.id,
          title: course.title,
          description: course.description || '',
          type: 'course' as const,
          category: course.category,
          required_tier: course.required_tier,
          link: `/learning/${course.id}`,
          icon: <BookOpen className="h-4 w-4" />
        })),
        ...(tools || []).map((tool: AITool) => ({
          id: tool.id,
          title: tool.name,
          description: tool.description,
          type: 'tool' as const,
          category: tool.category,
          required_tier: tool.required_tier,
          link: `/ai-tools/tool/${tool.id}`,
          icon: <Zap className="h-4 w-4" />
        }))
      ];

      // Apply filters if any
      let filteredResults = recommendations;
      
      if (activeFilter !== 'all') {
        filteredResults = recommendations.filter(result => result.type === activeFilter);
      }
      
      // Filter based on user tier
      filteredResults = filteredResults.filter(result => {
        if (result.required_tier === 'freemium') return true;
        if (result.required_tier === 'basic') return currentTier === 'basic' || currentTier === 'pro';
        if (result.required_tier === 'pro') return currentTier === 'pro';
        return false;
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Recommendation error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Course';
      case 'tool': return 'AI Tool';
      case 'forum': return 'Forum Topic';
      case 'group': return 'Study Group';
      default: return 'Resource';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'tool': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'forum': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'group': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 px-4 md:px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Discover AI Resources</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Search across courses, tools, community discussions, and study groups
            </p>
          </div>
          
          <div className="mb-8">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search for courses, tools, topics or study groups..." 
                className="pl-10 pr-4 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="course">Courses</TabsTrigger>
                  <TabsTrigger value="tool">Tools</TabsTrigger>
                  <TabsTrigger value="forum">Forums</TabsTrigger>
                  <TabsTrigger value="group">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
                <Tabs defaultValue="relevance" value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                  <TabsList className="h-9">
                    <TabsTrigger value="relevance" className="text-xs px-2">
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      Relevance
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="text-xs px-2">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Recent
                    </TabsTrigger>
                    <TabsTrigger value="popular" className="text-xs px-2">
                      <SlidersHorizontal className="h-3.5 w-3.5 mr-1" />
                      Popular
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Recommended Resources'}
            </h2>
            
            {isSearching ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse space-y-4 w-full">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12 bg-muted/40 rounded-lg">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Results Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {searchQuery 
                    ? "We couldn't find any resources matching your search criteria." 
                    : "No recommended resources available. Try searching for something specific."}
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Card 
                    key={result.id}
                    className="hover:shadow-md transition-shadow border cursor-pointer"
                    onClick={() => navigate(result.link)}
                  >
                    <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary" className={`${getTypeColor(result.type)}`}>
                            {result.icon}
                            <span className="ml-1">{getTypeLabel(result.type)}</span>
                          </Badge>
                          <Badge variant="outline">{result.category}</Badge>
                          {result.required_tier !== 'freemium' && (
                            <Badge variant="outline" className="capitalize">
                              {result.required_tier} Tier
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-medium mb-1">{result.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{result.description}</p>
                      </div>
                      <div className="md:w-auto flex items-center justify-end">
                        <Button size="sm">
                          <span className="mr-1">View</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiscoveryPage;
