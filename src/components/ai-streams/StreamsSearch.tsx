
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, SlidersHorizontal } from 'lucide-react';

interface StreamsSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const StreamsSearch: React.FC<StreamsSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center space-x-2 w-full md:w-auto">
      <div className="relative flex-1 md:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search streams..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Most recent</DropdownMenuItem>
          <DropdownMenuItem>Most viewed</DropdownMenuItem>
          <DropdownMenuItem>Highest rated</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StreamsSearch;
