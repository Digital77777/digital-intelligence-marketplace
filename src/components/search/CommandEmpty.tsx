
import React from 'react';
import { CommandEmpty as UICommandEmpty } from "@/components/ui/command";
import { Search } from 'lucide-react';

interface CommandEmptyProps {
  onShowAll: () => void;
}

export const CommandEmpty: React.FC<CommandEmptyProps> = ({ onShowAll }) => {
  return (
    <UICommandEmpty>
      <div className="py-6 text-center">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No results found</p>
        <button 
          onClick={onShowAll}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          Try advanced search
        </button>
      </div>
    </UICommandEmpty>
  )
}

export default CommandEmpty;
