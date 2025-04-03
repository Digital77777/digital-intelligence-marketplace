
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00FFFF] h-4 w-4" />
        <Input 
          placeholder="SEARCH DATABASE..." 
          className="w-full md:w-64 pl-10 bg-black border-[#00FFFF]/30 text-white focus:border-[#00FFFF] focus:ring-[#00FFFF]/20 placeholder:text-gray-500 font-mono"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
