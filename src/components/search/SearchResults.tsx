
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { SearchResult, SearchResultType } from "@/hooks/useSearch";
import { useTier } from '@/context/TierContext';

type ResultsGroupProps = {
  title: string;
  results: SearchResult[];
  type: SearchResultType;
  onUpgradeClick: () => void;
};

const ResultsGroup: React.FC<ResultsGroupProps> = ({ 
  title, 
  results, 
  type,
  onUpgradeClick 
}) => {
  if (results.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title} ({results.length} results)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.map((result) => (
          <div 
            key={result.id} 
            className="p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/40"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {result.canAccess ? (
                  <Link to={result.url} className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    {result.title}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-muted-foreground">{result.title}</span>
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {result.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {result.category && (
                    <Badge variant="outline" className="text-xs">
                      {result.category}
                    </Badge>
                  )}
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      result.tierRequired === 'freemium' ? 'bg-gray-100 dark:bg-gray-900' : 
                      result.tierRequired === 'basic' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 
                      'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                    }`}
                  >
                    {result.tierRequired === 'freemium' ? 'Freemium' : 
                     result.tierRequired === 'basic' ? 'Basic' : 'Pro'}
                  </Badge>
                </div>
              </div>
              <div className="ml-4">
                {!result.canAccess && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs"
                    onClick={onUpgradeClick}
                  >
                    Upgrade
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

type SearchResultsProps = {
  results: SearchResult[];
  query: string;
  selectedType: SearchResultType;
  isSearching: boolean;
};

export function SearchResults({ 
  results, 
  query, 
  selectedType,
  isSearching 
}: SearchResultsProps) {
  const { upgradePrompt } = useTier();
  
  // Group results by type
  const toolResults = results.filter(r => r.type === 'tools');
  const learningResults = results.filter(r => r.type === 'learning');
  const communityResults = results.filter(r => r.type === 'community');
  const streamResults = results.filter(r => r.type === 'streams');
  
  if (isSearching) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't find anything matching "{query}". Try different keywords or browse categories.
        </p>
      </div>
    );
  }
  
  if (selectedType === 'all') {
    return (
      <div className="space-y-6">
        <ResultsGroup 
          title="AI Tools" 
          results={toolResults} 
          type="tools" 
          onUpgradeClick={() => upgradePrompt('basic')} 
        />
        <ResultsGroup 
          title="Learning Resources" 
          results={learningResults} 
          type="learning"
          onUpgradeClick={() => upgradePrompt('basic')} 
        />
        <ResultsGroup 
          title="Community Discussions" 
          results={communityResults} 
          type="community"
          onUpgradeClick={() => upgradePrompt('basic')} 
        />
        <ResultsGroup 
          title="AI Streams" 
          results={streamResults} 
          type="streams"
          onUpgradeClick={() => upgradePrompt('basic')} 
        />
      </div>
    );
  }
  
  // Show results for a specific type
  const typeLabels = {
    'all': 'All Results',
    'tools': 'AI Tools',
    'learning': 'Learning Resources',
    'community': 'Community Discussions',
    'streams': 'AI Streams'
  };
  
  return (
    <ResultsGroup 
      title={typeLabels[selectedType]} 
      results={results} 
      type={selectedType}
      onUpgradeClick={() => upgradePrompt('basic')} 
    />
  );
}

export default SearchResults;
