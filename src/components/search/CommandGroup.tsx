
import React from 'react';
import { CommandGroup as UICommandGroup } from "@/components/ui/command";
import CommandItem, { SearchableItem } from './CommandItem';

interface CommandGroupProps {
  title: string;
  items: SearchableItem[];
  onSelect: (item: SearchableItem) => void;
}

export const CommandGroup: React.FC<CommandGroupProps> = ({ 
  title, 
  items,
  onSelect 
}) => {
  if (items.length === 0) return null;
  
  return (
    <UICommandGroup heading={title}>
      {items.map((item) => (
        <CommandItem 
          key={item.id} 
          item={item} 
          onSelect={onSelect} 
        />
      ))}
    </UICommandGroup>
  );
};

export default CommandGroup;
