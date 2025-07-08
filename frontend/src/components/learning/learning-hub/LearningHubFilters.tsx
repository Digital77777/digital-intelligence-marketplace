
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Search, ChevronDown } from 'lucide-react';

interface LearningHubFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setDifficultyFilter: (difficulty: string) => void;
}

const LearningHubFilters: React.FC<LearningHubFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  setCategoryFilter,
  setDifficultyFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="relative flex-1 max-w-md w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses, events, certifications..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Category <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setCategoryFilter('')}>All Categories</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('AI Fundamentals')}>AI Fundamentals</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Machine Learning')}>Machine Learning</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Deep Learning')}>Deep Learning</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Computer Vision')}>Computer Vision</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('NLP')}>Natural Language Processing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Difficulty <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDifficultyFilter('')}>All Levels</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter('beginner')}>Beginner</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter('intermediate')}>Intermediate</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter('advanced')}>Advanced</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LearningHubFilters;
