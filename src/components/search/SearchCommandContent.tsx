
import React from 'react';
import { CommandInput, CommandList } from "@/components/ui/command";
import CommandEmpty from './CommandEmpty';
import CommandGroup from './CommandGroup';

interface SearchCommandContentProps {
  query: string;
  setQuery: (query: string) => void;
  groupedItems: Record<string, any[]>;
  typeLabels: Record<string, string>;
  handleSelect: (item: any) => void;
  handleShowAll: () => void;
}

const SearchCommandContent: React.FC<SearchCommandContentProps> = ({
  query,
  setQuery,
  groupedItems,
  typeLabels,
  handleSelect,
  handleShowAll
}) => {
  return (
    <>
      <CommandInput 
        placeholder="Search for tools, courses, forums..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[70vh]">
        <CommandEmpty onShowAll={handleShowAll} />

        {/* Display search results by group */}
        {Object.entries(groupedItems).map(([type, items]) => (
          <CommandGroup 
            key={type} 
            title={typeLabels[type as keyof typeof typeLabels] || type}
            items={items}
            onSelect={handleSelect}
          />
        ))}

        {/* Footer "View all results" button */}
        <div className="px-2 py-3 border-t">
          <div
            onClick={handleShowAll}
            className="w-full justify-center text-sm text-muted-foreground cursor-pointer hover:bg-accent rounded-sm px-2 py-1.5 flex items-center"
          >
            <span>View all results</span>
          </div>
        </div>
      </CommandList>
    </>
  );
};

export default SearchCommandContent;
