
import React from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import CommandEmpty from './CommandEmpty';
import CommandGroup from './CommandGroup';
import { useSearchCommands } from './useSearchCommands';

export function SearchCommand() {
  const {
    open,
    setOpen,
    query,
    setQuery,
    groupedItems,
    typeLabels,
    handleSelect,
    handleShowAll
  } = useSearchCommands();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
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
          <CommandItem
            onSelect={handleShowAll}
            className="w-full justify-center text-sm text-muted-foreground"
          >
            <Search className="h-4 w-4 mr-2" />
            View all results
          </CommandItem>
        </div>
      </CommandList>
    </CommandDialog>
  );
}

export default SearchCommand;
