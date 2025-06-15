
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, buttonText, onButtonClick, icon }) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-gray-400">{icon}</div>
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {buttonText && onButtonClick && (
        <div className="mt-6">
          <Button onClick={onButtonClick}>
            <Plus className="w-4 h-4 mr-2" />
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
