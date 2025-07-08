import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StreamsSearch from './StreamsSearch';

interface StreamFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const StreamFilters: React.FC<StreamFiltersProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-semibold">Browse Streams</h2>
        <StreamsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="demo">Demos</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default StreamFilters;
