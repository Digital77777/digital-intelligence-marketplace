
import React from 'react';
import StreamCard from './StreamCard';
import { VideoStream } from '@/types/videoStreams';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StreamsGridProps {
  streams: VideoStream[];
  isLoading: boolean;
  getCategoryIcon: (category: string) => JSX.Element;
  formatDate: (dateString: string) => string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTier: string;
  setSelectedTier: (tier: string) => void;
}

const StreamsGrid: React.FC<StreamsGridProps> = ({ 
  streams, 
  isLoading, 
  getCategoryIcon,
  formatDate,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTier,
  setSelectedTier
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card-skeleton">
            <div className="h-40 bg-muted animate-pulse" />
            <div className="pt-4 px-4">
              <div className="h-5 bg-muted animate-pulse mb-2 w-3/4" />
              <div className="h-4 bg-muted animate-pulse mb-1 w-full" />
              <div className="h-4 bg-muted animate-pulse w-2/3" />
            </div>
            <div className="pt-4 px-4 mt-4 border-t">
              <div className="flex justify-between w-full">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-full bg-muted animate-pulse" />
                  <div className="h-4 w-20 bg-muted animate-pulse" />
                </div>
                <div className="h-4 w-12 bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <div className="text-center py-12">
        <SearchX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No streams found</h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Try adjusting your search or filters
        </p>
        <Button onClick={() => {
          setSearchQuery('');
          setSelectedCategory('all');
          setSelectedTier('all');
        }}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {streams.map((stream) => (
        <StreamCard 
          key={stream.id} 
          stream={stream} 
          getCategoryIcon={getCategoryIcon} 
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default StreamsGrid;
