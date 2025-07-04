
import React from 'react';
import { CommandDialog } from "@/components/ui/command";
import SearchCommandContent from './SearchCommandContent';
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
      <SearchCommandContent
        query={query}
        setQuery={setQuery}
        groupedItems={groupedItems}
        typeLabels={typeLabels}
        handleSelect={handleSelect}
        handleShowAll={handleShowAll}
      />
    </CommandDialog>
  );
}

export default SearchCommand;
