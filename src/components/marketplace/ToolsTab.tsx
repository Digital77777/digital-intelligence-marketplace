
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Download, 
  DollarSign, 
  Eye,
  ExternalLink,
  Settings,
  Filter,
  Repeat,
  Calendar
} from 'lucide-react';

interface ToolsTabProps {
  searchQuery: string;
  filteredTools: any[];
  viewToolDetails: (toolId: string) => void;
}

const ToolsTab: React.FC<ToolsTabProps> = ({ searchQuery, filteredTools, viewToolDetails }) => {
  const [marketplaceTools, setMarketplaceTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMarketplaceTools();
  }, []);

  const fetchMarketplaceTools = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_tools')
        .select(`
          *,
          seller:user_profiles!marketplace_tools_seller_id_fkey(username, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMarketplaceTools(data || []);
    } catch (error) {
      console.error('Error fetching marketplace tools:', error);
      toast({
        title: "Error",
        description: "Failed to load marketplace tools",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedMarketplaceTools = marketplaceTools
    .filter(tool => {
      if (searchQuery) {
        return tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
               tool.tags?.some(tag => 
                 tag.toLowerCase().includes(searchQuery.toLowerCase())
               );
      }
      return true;
    })
    .filter(tool => {
      if (filterBy === 'all') return true;
      if (filterBy === 'subscription') return tool.is_subscription;
      if (filterBy === 'one-time') return !tool.is_subscription;
      if (filterBy === 'featured') return tool.is_featured;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'downloads':
          return (b.downloads_count || 0) - (a.downloads_count || 0);
        default:
          return 0;
      }
    });

  // Combine legacy tools with marketplace tools for display
  const allTools = [
    ...filteredAndSortedMarketplaceTools,
    ...filteredTools.map(tool => ({
      ...tool,
      isLegacy: true,
      seller: { username: 'DIM Platform', avatar_url: null }
    }))
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="bg-gray-200 h-36"></div>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter tools" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tools</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="one-time">One-time Purchase</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="downloads">Most Downloaded</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => navigate('/marketplace/sell-tool')}>
          Sell Your Tool
        </Button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTools.map((tool) => (
          <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow border-2 group">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 flex justify-center items-center h-36">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                {tool.isLegacy ? tool.icon : <Settings className="w-8 h-8" />}
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                {tool.is_featured && (
                  <Badge variant="default" className="text-xs">Featured</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {tool.isLegacy ? (
                  <Badge variant="secondary">Platform Tool</Badge>
                ) : (
                  <>
                    <Badge variant={tool.is_subscription ? "default" : "outline"}>
                      {tool.is_subscription ? (
                        <div className="flex items-center gap-1">
                          <Repeat className="w-3 h-3" />
                          ${tool.price}/{tool.subscription_period}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${tool.price}
                        </div>
                      )}
                    </Badge>
                    {tool.rating > 0 && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{tool.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <CardDescription className="text-sm text-muted-foreground">
                {tool.category}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-2">
              <p className="text-sm line-clamp-2 mb-3">
                {tool.description}
              </p>

              {!tool.isLegacy && tool.tags && tool.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tool.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{tool.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={tool.seller?.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {tool.seller?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{tool.seller?.username}</span>
                </div>
                
                {!tool.isLegacy && (
                  <div className="flex items-center gap-3">
                    {tool.downloads_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>{tool.downloads_count}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(tool.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              {tool.demo_url && (
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={tool.demo_url} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-1" />
                    Demo
                  </a>
                </Button>
              )}
              
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => {
                  if (tool.isLegacy) {
                    viewToolDetails(tool.id);
                  } else {
                    navigate(`/marketplace/tool/${tool.id}`);
                  }
                }}
              >
                <ExternalLink size={16} className="mr-2" /> 
                {tool.isLegacy ? 'Use Tool' : 'View Details'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {allTools.length === 0 && (
        <div className="text-center py-16">
          <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No tools found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            No tools match your current search criteria. Try adjusting your filters or search terms.
          </p>
          <Button onClick={() => navigate('/marketplace/sell-tool')}>
            Sell Your First Tool
          </Button>
        </div>
      )}
    </div>
  );
};

export default ToolsTab;
