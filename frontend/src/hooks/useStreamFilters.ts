import { useState } from 'react';
import { VideoStream } from '@/types/videoStreams';

export const useStreamFilters = (streams: VideoStream[]) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredStreams = () => {
    let filtered = [...streams];
    
    if (activeTab !== "all") {
      filtered = filtered.filter(stream => stream.category === activeTab);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        stream => 
          stream.title.toLowerCase().includes(query) || 
          (stream.description && stream.description.toLowerCase().includes(query)) ||
          (stream.author?.username?.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    getFilteredStreams,
  };
};
