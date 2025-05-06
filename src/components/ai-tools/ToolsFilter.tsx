
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchInput from '@/components/search/SearchInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AIToolTier,
  getTierBadgeColor,
  getTierIcon,
  getTierLabel,
  toolCategories
} from '@/data/ai-tools-tiers';
import { Grid, List, X } from 'lucide-react';

interface ToolsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTier: AIToolTier | 'all';
  setSelectedTier: (tier: AIToolTier | 'all') => void;
  viewType: 'grid' | 'list';
  setViewType: (type: 'grid' | 'list') => void;
  totalTools: number;
  filteredCount: number;
}

const ToolsFilter: React.FC<ToolsFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTier,
  setSelectedTier,
  viewType,
  setViewType,
  totalTools,
  filteredCount
}) => {
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTier('all');
  };
  
  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedTier !== 'all';
  
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tools by name or description..."
          />
        </div>
        
        <div className="flex gap-3">
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {toolCategories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedTier} 
            onValueChange={(value) => setSelectedTier(value as AIToolTier | 'all')}
          >
            <SelectTrigger className="min-w-[140px]">
              <SelectValue placeholder="All Tiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="freemium">Freemium</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="hidden sm:flex items-center rounded-md border p-1 h-10">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 ${viewType === 'grid' ? 'bg-muted' : ''}`}
              onClick={() => setViewType('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 ${viewType === 'list' ? 'bg-muted' : ''}`}
              onClick={() => setViewType('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Filters info and clear button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalTools} tools
          {hasActiveFilters && (
            <span> with active filters</span>
          )}
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-8 px-2 text-xs"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
      
      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="px-2 py-1 text-xs">
              Search: {searchQuery}
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-1.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="px-2 py-1 text-xs">
              Category: {toolCategories.find(c => c.id === selectedCategory)?.name}
              <button 
                onClick={() => setSelectedCategory('all')}
                className="ml-1.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {selectedTier !== 'all' && (
            <Badge
              variant="outline"
              className={`${getTierBadgeColor(selectedTier as AIToolTier)} px-2 py-1 text-xs flex items-center gap-1.5`}
            >
              {getTierIcon(selectedTier as AIToolTier)}
              <span>{getTierLabel(selectedTier as AIToolTier)} Tier</span>
              <button 
                onClick={() => setSelectedTier('all')}
                className="ml-1.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ToolsFilter;
