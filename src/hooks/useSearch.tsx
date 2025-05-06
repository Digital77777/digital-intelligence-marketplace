
import { useState, useCallback } from 'react';
import { useTier } from '@/context/TierContext';

// Define the search item types
export type SearchResultType = 'all' | 'tools' | 'learning' | 'community' | 'streams';

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  type: SearchResultType;
  url: string;
  tierRequired: 'freemium' | 'basic' | 'pro';
  imageUrl?: string;
  tags?: string[];
  category?: string;
  canAccess?: boolean; // Added the missing property
};

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedType, setSelectedType] = useState<SearchResultType>('all');
  const { currentTier } = useTier();

  // Mock data for search results - in a real app, this would be fetched from an API
  const mockSearch = useCallback(async (query: string, type: SearchResultType = 'all') => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock results
    const allResults: SearchResult[] = [
      {
        id: 'tool-1',
        title: 'AI Image Generator',
        description: 'Create stunning images with artificial intelligence',
        type: 'tools',
        url: '/tool/ai-image-generator',
        tierRequired: 'freemium',
        category: 'Content Creation'
      },
      {
        id: 'tool-2',
        title: 'Text to Speech Converter',
        description: 'Convert your text to natural-sounding speech',
        type: 'tools',
        url: '/tool/text-to-speech',
        tierRequired: 'basic',
        category: 'Audio Tools'
      },
      {
        id: 'course-1',
        title: 'Introduction to Machine Learning',
        description: 'Learn the fundamentals of machine learning',
        type: 'learning',
        url: '/learning/ml-intro',
        tierRequired: 'freemium',
        category: 'AI Fundamentals'
      },
      {
        id: 'forum-1',
        title: 'Best practices for fine-tuning models',
        description: 'Community discussion on optimizing model performance',
        type: 'community',
        url: '/community/topic/fine-tuning',
        tierRequired: 'freemium',
        category: 'Technical Discussions'
      },
      {
        id: 'stream-1',
        title: 'Live Coding: Building an AI Assistant',
        description: 'Watch our experts build an AI assistant from scratch',
        type: 'streams',
        url: '/ai-streams/live-coding',
        tierRequired: 'basic',
        category: 'Tutorials'
      },
    ];
    
    // Filter by query
    let filteredResults = allResults;
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredResults = allResults.filter(
        result => 
          result.title.toLowerCase().includes(lowercaseQuery) || 
          result.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Filter by type
    if (type !== 'all') {
      filteredResults = filteredResults.filter(result => result.type === type);
    }
    
    // Simulate tier restrictions
    filteredResults = filteredResults.map(result => {
      // Mark as accessible based on user's tier
      const canAccess = 
        (result.tierRequired === 'freemium') ||
        (result.tierRequired === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) ||
        (result.tierRequired === 'pro' && currentTier === 'pro');
      
      return {
        ...result,
        canAccess
      };
    });
    
    setResults(filteredResults);
    setIsSearching(false);
    
    return filteredResults;
  }, [currentTier]);
  
  const performSearch = useCallback(async (query: string, type: SearchResultType = 'all') => {
    setSearchQuery(query);
    setSelectedType(type);
    return await mockSearch(query, type);
  }, [mockSearch]);
  
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setResults([]);
  }, []);
  
  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    results,
    selectedType,
    setSelectedType,
    performSearch,
    clearSearch,
  };
}

export default useSearch;
