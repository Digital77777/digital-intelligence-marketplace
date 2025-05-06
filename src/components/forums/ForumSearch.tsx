
import React from 'react';
import SearchInput from '@/components/search/SearchInput';

interface ForumSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ForumSearch: React.FC<ForumSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full md:w-auto">
      <SearchInput 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="SEARCH FORUMS..."
        className="bg-black border-[#00FFFF]/30 text-white focus:border-[#00FFFF] focus:ring-[#00FFFF]/20 placeholder:text-gray-500 font-mono"
      />
    </div>
  );
};

export default ForumSearch;
