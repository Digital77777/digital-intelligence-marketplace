
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  Star, 
  Clock, 
  DollarSign, 
  ShoppingCart,
  Eye,
  Filter,
  Plus,
  AlertCircle
} from 'lucide-react';

interface ServicesTabProps {
  searchQuery: string;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ searchQuery }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('marketplace_services')
        .select(`
          *,
          provider:user_profiles!marketplace_services_provider_id_fkey(username, avatar_url)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }
      
      setServices(data || []);
    } catch (error: any) {
      console.error('Error fetching services:', error);
      setError('Unable to load services at the moment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedServices = services
    .filter(service => {
      if (searchQuery) {
        return service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.tags?.some(tag => 
                 tag.toLowerCase().includes(searchQuery.toLowerCase())
               );
      }
      if (filterBy === 'all') return true;
      if (filterBy === 'featured') return service.is_featured;
      return service.category === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'orders':
          return (b.orders_count || 0) - (a.orders_count || 0);
        default:
          return 0;
      }
    });

  const categories = [
    'AI Development',
    'Data Science',
    'Machine Learning',
    'Web Development',
    'Mobile Development',
    'Content Creation',
    'Marketing',
    'Design',
    'Consulting'
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
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-800">Service Notice</h4>
            <p className="text-sm text-yellow-700">{error}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 flex-wrap">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
              <SelectItem value="featured">Featured Only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="orders">Most Orders</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => navigate('/marketplace/create-service')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedServices.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 flex justify-center items-center h-36">
              {service.images && service.images[0] ? (
                <img 
                  src={service.images[0]} 
                  alt={service.title}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                  <ShoppingCart className="w-8 h-8" />
                </div>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                {service.is_featured && (
                  <Badge variant="default" className="text-xs ml-2">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">
                  <DollarSign className="w-3 h-3 mr-1" />
                  ${service.price}
                </Badge>
                
                {service.rating > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating.toFixed(1)}</span>
                  </div>
                )}

                {service.delivery_time && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{service.delivery_time} days</span>
                  </div>
                )}
              </div>
              
              <CardDescription className="text-sm text-muted-foreground">
                {service.category}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-2">
              <p className="text-sm line-clamp-3 mb-3">
                {service.description}
              </p>

              {service.features && service.features.length > 0 && (
                <div className="space-y-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground mt-3">
                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={service.provider?.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {service.provider?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{service.provider?.username}</span>
                </div>
                
                {service.orders_count > 0 && (
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" />
                    <span>{service.orders_count} orders</span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              
              <Button size="sm" className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Order Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedServices.length === 0 && (
        <div className="text-center py-16">
          <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            No services match your current search criteria. Try adjusting your filters or create your own service!
          </p>
          <Button onClick={() => navigate('/marketplace/create-service')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Service
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
