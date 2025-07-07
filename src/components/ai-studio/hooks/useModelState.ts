import { Play, Globe } from 'lucide-react';

interface ModelState {
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}

export const useModelState = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'training':
        return 'default';
      case 'trained':
        return 'default';
      case 'deployed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'archived':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'training':
        return <Play className="h-3 w-3 animate-pulse" />;
      case 'deployed':
        return <Globe className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return {
    getStatusColor,
    getStatusIcon,
  };
};
