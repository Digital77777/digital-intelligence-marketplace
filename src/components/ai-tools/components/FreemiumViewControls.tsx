
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

interface FreemiumViewControlsProps {
  viewType: 'grid' | 'list';
  onViewTypeChange: (viewType: 'grid' | 'list') => void;
}

const FreemiumViewControls: React.FC<FreemiumViewControlsProps> = ({
  viewType,
  onViewTypeChange
}) => {
  return (
    <div className="flex items-center gap-1 bg-white border rounded-lg p-1 shadow-sm">
      <Button 
        variant={viewType === 'grid' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => onViewTypeChange('grid')}
        className="h-8"
      >
        <LayoutGrid className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
      <Button 
        variant={viewType === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewTypeChange('list')}
        className="h-8"
      >
        <List className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  );
};

export default FreemiumViewControls;
