import { useState, useEffect, useMemo } from 'react';
import { marketplaceTools } from '@/data/marketplace-tools';
import { MarketplaceTool } from '@/types/marketplace';

export const useMarketplaceFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isPremiumFilter, setIsPremiumFilter] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);

  const filteredTools = useMemo(() => {
    let filtered = marketplaceTools;

    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (ratingFilter > 0) {
      filtered = filtered.filter(tool => tool.rating >= ratingFilter);
    }

    if (isPremiumFilter) {
      filtered = filtered.filter(tool => tool.isPremium);
    }

    if (categoriesFilter.length > 0) {
      filtered = filtered.filter(tool => categoriesFilter.includes(tool.category));
    }

    return filtered;
  }, [searchQuery, ratingFilter, isPremiumFilter, categoriesFilter]);

  return {
    searchQuery,
    setSearchQuery,
    ratingFilter,
    setRatingFilter,
    isPremiumFilter,
    setIsPremiumFilter,
    categoriesFilter,
    setCategoriesFilter,
    filteredTools,
  };
};
