
import React from 'react';
import { SearchResultType, SearchResult } from '@/hooks/useSearch';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Video, 
  Settings, 
  Lock, 
  ExternalLink,
  Search 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  selectedType: SearchResultType;
  isSearching: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  query, 
  selectedType, 
  isSearching 
}) => {
  const navigate = useNavigate();

  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" />
        <p className="mt-4 text-muted-foreground">Searching...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-10 text-center">
        <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find anything matching "{query}" in {selectedType === 'all' ? 'any category' : selectedType}.
          Try different keywords or browse our featured content instead.
        </p>
      </div>
    );
  }

  const getIconForType = (type: SearchResultType) => {
    switch (type) {
      case 'tools':
        return <Settings className="h-5 w-5" />;
      case 'learning':
        return <BookOpen className="h-5 w-5" />;
      case 'community':
        return <Users className="h-5 w-5" />;
      case 'streams':
        return <Video className="h-5 w-5" />;
      default:
        return <Search className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (type: SearchResultType) => {
    switch (type) {
      case 'tools':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'learning':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'community':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'streams':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleNavigate = (result: SearchResult) => {
    navigate(result.url);
  };

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge variant="outline" className={`${getCategoryColor(result.type)} px-2 py-1`}>
                {getIconForType(result.type)}
                <span className="ml-1 capitalize">{result.type}</span>
              </Badge>
              <Badge variant={result.canAccess ? "outline" : "default"} className={result.canAccess ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-amber-100 text-amber-800"}>
                {result.canAccess ? "Available" : `${result.tierRequired} tier`}
              </Badge>
            </div>
            <CardTitle className="text-xl mt-2">{result.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{result.description}</p>
            {result.category && (
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Category: {result.category}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-2 border-t flex justify-end">
            <Button 
              variant="outline"
              size="sm"
              className="mr-2"
              onClick={() => handleNavigate(result)}
              disabled={!result.canAccess}
            >
              {result.canAccess ? (
                <>
                  View <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </>
              ) : (
                <>
                  Upgrade Required <Lock className="h-3.5 w-3.5 ml-1" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
