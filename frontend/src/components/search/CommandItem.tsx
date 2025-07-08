
import React from 'react';
import { CommandItem as UICommandItem } from "@/components/ui/command";

export interface SearchableItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  route: string;
  icon: React.ReactNode;
}

interface CommandItemProps {
  item: SearchableItem;
  onSelect: (item: SearchableItem) => void;
}

export const CommandItem: React.FC<CommandItemProps> = ({ item, onSelect }) => {
  return (
    <UICommandItem
      key={item.id}
      onSelect={() => onSelect(item)}
      className="flex items-center"
    >
      {item.icon}
      <div>
        <div>{item.title}</div>
        {item.description && (
          <div className="text-xs text-muted-foreground">{item.description}</div>
        )}
      </div>
    </UICommandItem>
  );
};

export default CommandItem;
