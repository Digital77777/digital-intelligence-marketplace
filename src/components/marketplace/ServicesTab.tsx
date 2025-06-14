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
  DollarSign, 
  Clock, 
  Filter,
  Settings,
  Tag
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateServiceForm from './CreateServiceForm';

interface ServicesTabProps {
  searchQuery: string;
}

type Service = {
  id: string;
  created_at: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  delivery_time_days: number;
  is_active: boolean;
  is_featured: boolean;
  average_rating: number;
  total_reviews: number;
  seller: {
    username: string;
    avatar_url: string;
  } | null;
};


const ServicesTab: React.FC<ServicesTabProps> = ({ searchQuery }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating');
  const [filterBy, setFilterBy] = useState('all');
  const [isCreateSheetOpen, setCreateSheetOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketplace_services')
        .select(`
          *,
          seller:user_profiles!seller_id(username, avatar_url)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedServices = services
    .filter(service => {
      if (searchQuery) {
        return service.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.tags?.some(skill => 
                 skill.toLowerCase().includes(searchQuery.toLowerCase())
               );
      }
      return true;
    })
    .filter(service => {
      if (filterBy === 'all') return true;
      if (filterBy === 'featured') return service.is_featured;
      if (filterBy !== 'all' && filterBy !== 'featured') return service.category === filterBy;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.average_rating || 0) - (a.average_rating || 0);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'delivery':
          return (a.delivery_time_days || 0) - (b.delivery_time_days || 0);
        default:
          return 0;
      }
    });

  const serviceCategories = [...new Set(services.map(s => s.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
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
              <SelectValue placeholder="Filter services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {serviceCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
          <SheetTrigger asChild>
            <Button>Offer Your Service</Button>
          </SheetTrigger>
          <SheetContent className="w-[500px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Create a New Service</SheetTitle>
              <SheetDescription>
                Fill out the form below to list your service on the marketplace.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <CreateServiceForm onServiceCreated={() => {
                setCreateSheetOpen(false);
                fetchServices(); // Refresh services list
              }} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={service.seller?.avatar_url} />
                    <AvatarFallback>{service.seller?.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {service.seller?.username}</p>
                  </div>
                </div>
                {service.is_featured && (
                  <Badge variant="default" className="text-xs">Featured</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <CardDescription className="mb-4 line-clamp-3">
                  {service.description}
                </CardDescription>

                <div className="mb-4">
                  {service.average_rating > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{service.average_rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({service.total_reviews} reviews)
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 text-lg font-semibold text-green-600 mb-2">
                    <DollarSign className="w-4 h-4" />
                    Starting at ${service.price}
                  </div>
                </div>

                {service.tags && service.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {service.tags.slice(0, 4).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {service.tags.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{service.tags.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {service.category}
                </div>
                {service.delivery_time_days && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.delivery_time_days} day delivery
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full">
                View Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedServices.length === 0 && !loading && (
        <div className="text-center py-16">
          <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            No services match your current search criteria. Try adjusting your filters or search terms.
          </p>
          <Button onClick={() => navigate('/marketplace/create-profile')}>
            Offer Your First Service
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
