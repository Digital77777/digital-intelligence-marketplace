
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import useScrollToTop from '@/hooks/useScrollToTop';
import { useSearch, SearchResultType } from '@/hooks/useSearch';
import SearchResults from '@/components/search/SearchResults';
import SearchInput from '@/components/search/SearchInput';
import ExploreContent from '@/components/search/ExploreContent';

const DiscoveryPage = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  
  const { 
    searchQuery, 
    setSearchQuery, 
    isSearching, 
    results, 
    selectedType,
    setSelectedType, 
    performSearch, 
    clearSearch 
  } = useSearch();

  // Get search query from URL if present
  useEffect(() => {
    const queryParam = searchParams.get('search');
    if (queryParam) {
      setSearchQuery(queryParam);
      performSearch(queryParam);
    }
  }, [searchParams, setSearchQuery, performSearch]);

  const handleSearch = (query: string) => {
    performSearch(query, selectedType);
  };

  const handleClear = () => {
    clearSearch();
  };

  return (
    <BasicTierLayout pageTitle="Search & Discovery" requiredFeature="discovery">
      <div className="space-y-6">
        <Card className="border-blue-100 dark:border-blue-900/50">
          <div className="pt-6 pb-4 px-6">
            <SearchInput 
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={() => handleSearch(searchQuery)}
              onClear={handleClear}
              placeholder="Search AI tools, learning resources, communities..." 
              className="py-6 text-lg border-gray-200 dark:border-gray-700 focus-visible:ring-blue-500"
            />
          </div>
        </Card>

        {searchQuery ? (
          <SearchResultsSection 
            searchQuery={searchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            results={results}
            isSearching={isSearching}
          />
        ) : (
          <ExploreContent />
        )}
      </div>
    </BasicTierLayout>
  );
};

interface SearchResultsSectionProps {
  searchQuery: string;
  selectedType: SearchResultType;
  setSelectedType: (type: SearchResultType) => void;
  results: any[];
  isSearching: boolean;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  searchQuery,
  selectedType,
  setSelectedType,
  results,
  isSearching
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Search results for "{searchQuery}"</h2>

      <Tabs defaultValue={selectedType} value={selectedType} onValueChange={(v) => setSelectedType(v as SearchResultType)}>
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="streams">Streams</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="mt-6">
          <SearchResults 
            results={results}
            query={searchQuery}
            selectedType={selectedType}
            isSearching={isSearching}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiscoveryPage;
