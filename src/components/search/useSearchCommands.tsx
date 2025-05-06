
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch, SearchResultType } from '@/hooks/useSearch';
import { getIconForType } from './searchIcons';
import { SearchableItem } from './CommandItem';

export function useSearchCommands() {
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
    const type = item.type as SearchResultType;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<SearchResultType, SearchableItem[]>);

  // Map search result type to human readable category
  const typeLabels: Record<SearchResultType, string> = {
    'all': 'All Results',
    'tools': 'AI Tools',
    'learning': 'Courses',
    'community': 'Community',
    'streams': 'Streams',
  };

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

  return {
    open,
    setOpen,
    query,
    setQuery,
    groupedItems,
    typeLabels,
    isSearching,
    handleSelect,
    handleShowAll
  };
}
