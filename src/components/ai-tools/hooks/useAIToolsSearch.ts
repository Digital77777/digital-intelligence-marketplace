
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { AIToolItem, AIToolTier, aiTools, toolCategories } from '@/data/ai-tools-tiers';
import { v4 as uuidv4 } from 'uuid';
import { Zap } from 'lucide-react';

interface PublicApiEntry {
  API: string;
  Description: string;
  Link: string;
  Category: string;
}

export const useAIToolsSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial filter values from URL params
  const initialCategory = searchParams.get('category') || 'all';
  const initialTier = (searchParams.get('tier') || 'all') as AIToolTier | 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialView = (searchParams.get('view') || 'grid') as 'grid' | 'list';
  const initialTabValue = searchParams.get('tab') || 'all';
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTier, setSelectedTier] = useState<AIToolTier | 'all'>(initialTier);
  const [viewType, setViewType] = useState<'grid' | 'list'>(initialView);
  const [activeTab, setActiveTab] = useState(initialTabValue);
  
  // Debounce search query to avoid too many re-renders
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedTier !== 'all') params.set('tier', selectedTier);
    if (debouncedSearchQuery) params.set('search', debouncedSearchQuery);
    if (viewType !== 'grid') params.set('view', viewType);
    if (activeTab !== 'all') params.set('tab', activeTab);
    
    setSearchParams(params);
  }, [debouncedSearchQuery, selectedCategory, selectedTier, viewType, activeTab, setSearchParams]);

  // Filter tools based on search, category, and tier
  const { data: allPlatformTools, isLoading: isLoadingTools } = useQuery({
    queryKey: ['allPlatformTools'],
    queryFn: async (): Promise<AIToolItem[]> => {
      let externalTools: AIToolItem[] = [];
      try {
        const response = await fetch('https://api.publicapis.org/entries');
        if (response.ok) {
          const data = await response.json();
          const relevantCategories = [
            'Machine Learning', 
            'Development', 
            'Data Validation', 
            'Text Analysis',
            'Documents & Productivity',
            'Cloud Storage & File Sharing'
          ];
          
          const relevantEntries = data.entries.filter((entry: PublicApiEntry) => 
            relevantCategories.includes(entry.Category)
          );

          externalTools = relevantEntries.map((entry: PublicApiEntry): AIToolItem => ({
            id: uuidv4(),
            name: entry.API,
            description: entry.Description,
            category: entry.Category,
            tier: 'freemium',
            icon: <Zap className="h-full w-full" />,
            externalUrl: entry.Link,
            use_cases: [entry.Category],
          }));
        }
      } catch (error) {
        console.error("Failed to fetch external AI tools:", error);
      }
      return [...aiTools, ...externalTools];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: filteredTools, isLoading: isLoadingFiltered } = useQuery({
    queryKey: ['aiTools', allPlatformTools, debouncedSearchQuery, selectedCategory, selectedTier, activeTab],
    queryFn: (): AIToolItem[] => {
      if (!allPlatformTools) return [];

      let filtered: AIToolItem[] = [...allPlatformTools];
      
      // Filter by search query
      if (debouncedSearchQuery) {
        const search = debouncedSearchQuery.toLowerCase();
        filtered = filtered.filter(tool => 
          tool.name.toLowerCase().includes(search) || 
          tool.description.toLowerCase().includes(search)
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        const category = toolCategories.find(c => c.id === selectedCategory);
        if (category) {
            filtered = filtered.filter(tool => tool.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === category.id);
        }
      }
      
      // Filter by tier
      if (selectedTier !== 'all') {
        filtered = filtered.filter(tool => tool.tier === selectedTier);
      }
      
      // Apply tab filtering
      if (activeTab === 'popular') {
        filtered = filtered.filter(tool => tool.popularTool);
      } else if (activeTab === 'freemium') {
        filtered = filtered.filter(tool => tool.tier === 'freemium');
      } else if (activeTab === 'basic') {
        filtered = filtered.filter(tool => tool.tier === 'basic');
      } else if (activeTab === 'pro') {
        filtered = filtered.filter(tool => tool.tier === 'pro');
      } else if (activeTab !== 'all' && activeTab !== 'compare') {
        const categoryId = activeTab;
        filtered = filtered.filter(tool => {
          const category = toolCategories.find(c => c.id === categoryId);
          return category && tool.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === category.name.toLowerCase();
        });
      }
      
      return filtered;
    },
    enabled: !!allPlatformTools,
  });

  const isLoading = isLoadingTools || (isLoadingFiltered && !filteredTools);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTier,
    setSelectedTier,
    viewType,
    setViewType,
    activeTab,
    setActiveTab,
    allPlatformTools,
    filteredTools,
    isLoading
  };
};
