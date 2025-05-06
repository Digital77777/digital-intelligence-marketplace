
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
import { useSearch } from '@/hooks/useSearch';
import { SearchResultType } from '@/hooks/useSearch';

// Type for the searchable items displayed in the command dialog
type SearchableItem = {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  route: string;
  icon: React.ReactNode;
};

// Map search result type to human readable category
const typeLabels: Record<SearchResultType, string> = {
  'all': 'All Results',
  'tools': 'AI Tools',
  'learning': 'Courses',
  'community': 'Community',
  'streams': 'Streams',
};

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { performSearch, results, isSearching } = useSearch();

  // Create searchable items from search results
  const searchItems = results.map(result => ({
    id: result.id,
    type: result.type,
    title: result.title,
    description: result.description,
    route: result.url,
    icon: getIconForType(result.type),
  }));

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
  }, {} as Record<SearchResultType, SearchableItem[]>);

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

  useEffect(() => {
    if (query && query.length > 1) {
      performSearch(query);
    }
  }, [query, performSearch]);

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
          <CommandGroup key={type} heading={typeLabels[type as SearchResultType] || type}>
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
  );
}

// Helper function to get the icon based on the result type
function getIconForType(type: SearchResultType): React.ReactNode {
  switch (type) {
    case 'tools':
      return <Settings className="h-4 w-4 mr-2" />;
    case 'learning':
      return <BookOpen className="h-4 w-4 mr-2" />;
    case 'community':
      return <Users className="h-4 w-4 mr-2" />;
    case 'streams':
      return <Video className="h-4 w-4 mr-2" />;
    default:
      return <SearchIcon className="h-4 w-4 mr-2" />;
  }
}

export default SearchCommand;
