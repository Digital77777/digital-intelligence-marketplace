
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ForumSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ForumSearch: React.FC<ForumSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full md:w-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Search for NLP, vision, or ML tools..." 
          className="w-full md:w-64 pl-10 bg-gray-800 border-gray-700 text-white focus:border-[#00FF88] focus:ring-[#00FF88]/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
