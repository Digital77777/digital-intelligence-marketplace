
import React from 'react';
import { CommandGroup as UICommandGroup } from "@/components/ui/command";
import CommandItem from './CommandItem';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'tool' | 'course' | 'forum' | 'category';
  category?: string;
  url: string;
  route: string;
  icon?: React.ReactNode;
}

interface CommandGroupProps {
  title: string;
  items: SearchItem[];
  onSelect: (item: SearchItem) => void;
}

export const CommandGroup: React.FC<CommandGroupProps> = ({ title, items, onSelect }) => {
  if (items.length === 0) return null;

  return (
    <UICommandGroup heading={title}>
      {items.map((item) => (
        <CommandItem
          key={item.id}
          item={{
            id: item.id,
            type: item.type,
            title: item.title,
            description: item.description,
            route: item.route,
            icon: item.icon || <div className="w-4 h-4 bg-gray-300 rounded"></div>
          }}
          onSelect={() => onSelect(item)}
        />
      ))}
    </UICommandGroup>
  );
};

export default CommandGroup;
