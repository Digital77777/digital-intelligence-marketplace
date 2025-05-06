
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search as SearchIcon,
  BookOpen,
  Users,
  Video,
  FileText,
  Settings,
} from "lucide-react";
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useSearch, SearchResult } from '@/hooks/useSearch';

// Demo items for search results
const createDemoItems = (): SearchableItem[] => [
  {
    id: 'tool-1',
    type: 'tool',
    title: 'AI Image Generator',
    description: 'Create stunning images with AI',
    route: '/tool/ai-image-generator',
    icon: <Settings className="h-4 w-4 mr-2" />,
  },
  {
    id: 'course-1',
    type: 'course',
    title: 'Introduction to Machine Learning',
    description: 'Learn the basics of ML',
    route: '/learning/ml-intro',
    icon: <BookOpen className="h-4 w-4 mr-2" />,
  },
  {
    id: 'forum-1',
    type: 'forum',
    title: 'Best practices for fine-tuning models',
    description: 'Community discussion',
    route: '/community/topic/fine-tuning',
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    id: 'stream-1',
    type: 'stream',
    title: 'Live Coding: Building an AI Assistant',
    description: 'Tutorial stream',
    route: '/ai-streams/live-coding',
    icon: <Video className="h-4 w-4 mr-2" />,
  },
  {
    id: 'doc-1',
    type: 'doc',
    title: 'API Documentation',
    description: 'Integration guides',
    route: '/docs/api',
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
];

type SearchableItem = {
  id: string;
  type: 'tool' | 'course' | 'forum' | 'stream' | 'doc';
  title: string;
  description?: string;
  route: string;
  icon: React.ReactNode;
};

// Map search result type to human readable category
const typeLabels = {
  'tool': 'AI Tools',
  'course': 'Courses',
  'forum': 'Community',
  'stream': 'Streams',
  'doc': 'Documentation',
};

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [searchItems, setSearchItems] = useState<SearchableItem[]>([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { profile } = useUser();
  const { currentTier } = useTier();
  const { performSearch } = useSearch();

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we're using demo items
    setSearchItems(createDemoItems());
  }, []);

  // Filter items based on search query
  const filteredItems = searchItems.filter(item => {
    if (!query) return true;
    const searchTerms = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchTerms) ||
      (item.description && item.description.toLowerCase().includes(searchTerms))
    );
  });

  // Group items by type
  const groupedItems = filteredItems.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<string, SearchableItem[]>);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (item: SearchableItem) => {
    setOpen(false);
    navigate(item.route);
  };

  // For immediate navigation to advanced search
  const handleShowAll = () => {
    setOpen(false);
    // If we have a query, bring it to discovery page
    if (query) {
      navigate(`/discovery?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/discovery');
    }
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search for tools, courses, forums..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[70vh]">
          <CommandEmpty>
            <div className="py-6 text-center">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No results found</p>
              <button 
                onClick={handleShowAll}
                className="mt-4 text-sm text-blue-500 hover:underline"
              >
                Try advanced search
              </button>
            </div>
          </CommandEmpty>

          {Object.entries(groupedItems).map(([type, items]) => (
            <CommandGroup key={type} heading={typeLabels[type as keyof typeof typeLabels] || type}>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                  className="flex items-center"
                >
                  {item.icon}
                  <div>
                    <div>{item.title}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <div className="px-2 py-3 border-t">
            <CommandItem
              onSelect={handleShowAll}
              className="w-full justify-center text-sm text-muted-foreground"
            >
              <SearchIcon className="h-4 w-4 mr-2" />
              View all results
            </CommandItem>
          </div>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCommand;
