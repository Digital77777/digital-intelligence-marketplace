
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Filter, Search, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface LearningFiltersProps {
  onFilterChange: (type: 'category' | 'difficulty', value: string) => void;
  onSearchChange: (search: string) => void;
  categoryOptions: FilterOption[];
  difficultyOptions: FilterOption[];
  selectedCategory?: string;
  selectedDifficulty?: string;
}

const LearningFilters: React.FC<LearningFiltersProps> = ({
  onFilterChange,
  onSearchChange,
  categoryOptions,
  difficultyOptions,
  selectedCategory,
  selectedDifficulty
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchQuery);
  };
  
  const handleClearFilters = () => {
    onFilterChange('category', '');
    onFilterChange('difficulty', '');
    setSearchQuery('');
    onSearchChange('');
  };
  
  const hasActiveFilters = selectedCategory || selectedDifficulty || searchQuery;
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
      <form className="relative flex-1" onSubmit={handleSearchSubmit}>
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses..."
          className="pl-9 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Category
              {selectedCategory && (
                <span className="ml-1 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                  1
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup 
              value={selectedCategory || ''} 
              onValueChange={(value) => onFilterChange('category', value)}
            >
              <DropdownMenuRadioItem value="">All Categories</DropdownMenuRadioItem>
              {categoryOptions.map(option => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Difficulty
              {selectedDifficulty && (
                <span className="ml-1 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                  1
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup 
              value={selectedDifficulty || ''} 
              onValueChange={(value) => onFilterChange('difficulty', value)}
            >
              <DropdownMenuRadioItem value="">All Difficulties</DropdownMenuRadioItem>
              {difficultyOptions.map(option => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-10"
            onClick={handleClearFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default LearningFilters;
