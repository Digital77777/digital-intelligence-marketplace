
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

interface CourseFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (difficulty: string) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  difficultyFilter,
  onDifficultyChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onCategoryChange('')}>All Categories</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCategoryChange('AI Fundamentals')}>AI Fundamentals</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCategoryChange('Machine Learning')}>Machine Learning</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCategoryChange('Deep Learning')}>Deep Learning</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCategoryChange('Neural Networks')}>Neural Networks</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCategoryChange('Programming')}>Programming</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCategoryChange('AI + Business')}>AI + Business</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Level
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onDifficultyChange('')}>All Levels</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDifficultyChange('Beginner')}>Beginner</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDifficultyChange('Intermediate')}>Intermediate</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDifficultyChange('Advanced')}>Advanced</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CourseFilters;
