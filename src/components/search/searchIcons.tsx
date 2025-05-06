
import React from 'react';
import {
  Search,
  BookOpen,
  Users,
  Video,
  Settings,
} from "lucide-react";
import { SearchResultType } from '@/hooks/useSearch';

// Helper function to get the icon based on the result type
export function getIconForType(type: SearchResultType): React.ReactNode {
  switch (type) {
    case 'tools':
      return <Settings className="h-4 w-4 mr-2" />;
    case 'learning':
      return <BookOpen className="h-4 w-4 mr-2" />;
    case 'community':
      return <Users className="h-4 w-4 mr-2" />;
    case 'streams':
      return <Video className="h-4 w-4 mr-2" />;
    default:
      return <Search className="h-4 w-4 mr-2" />;
  }
}
