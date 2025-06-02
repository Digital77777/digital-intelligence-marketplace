
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
  Clock, 
  DollarSign, 
  Users, 
  Award,
  Briefcase,
  Filter,
  Calendar,
  CheckCircle
} from 'lucide-react';

interface ServicesTabProps {
  searchQuery: string;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ searchQuery }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating');
  const [filterBy, setFilterBy] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Fetch freelancer profiles with their service offerings
      const { data, error } = await supabase
        .from('freelancer_profiles')
        .select(`
          *,
          user:user_profiles!freelancer_profiles_user_id_fkey(username, avatar_url, full_name)
        `)
        .not('hourly_rate', 'is', null)
        .order('average_rating', { ascending: false });

      if (error) throw error;
      
      // Transform freelancer profiles into service offerings
      const serviceOfferings = (data || []).map(freelancer => ({
        id: freelancer.id,
        title: `${getServiceTitle(freelancer.skills)} Services`,
        description: freelancer.bio || `Professional ${freelancer.skills?.[0] || 'AI'} services by experienced freelancer`,
        freelancer,
        price: freelancer.hourly_rate,
        category: freelancer.skills?.[0] || 'AI Services',
        deliveryTime: getEstimatedDeliveryTime(freelancer.years_experience),
        serviceType: 'custom',
        features: getServiceFeatures(freelancer.skills, freelancer.badge)
      }));

      setServices(serviceOfferings);
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

  const getServiceTitle = (skills) => {
    if (!skills || skills.length === 0) return 'AI Development';
    if (skills.some(skill => skill.toLowerCase().includes('machine learning'))) return 'Machine Learning';
    if (skills.some(skill => skill.toLowerCase().includes('nlp'))) return 'NLP & Text Analysis';
    if (skills.some(skill => skill.toLowerCase().includes('computer vision'))) return 'Computer Vision';
    if (skills.some(skill => skill.toLowerCase().includes('data'))) return 'Data Science';
    return skills[0];
  };

  const getEstimatedDeliveryTime = (experience) => {
    if (experience >= 5) return '2-3 days';
    if (experience >= 3) return '3-5 days';
    return '5-7 days';
  };

  const getServiceFeatures = (skills, badge) => {
    const baseFeatures = [
      'Custom AI solution development',
      'Source code included',
      'Documentation provided'
    ];

    if (badge === 'gold') {
      baseFeatures.push('Priority support', '3 revisions included');
    } else if (badge === 'silver') {
      baseFeatures.push('2 revisions included');
    } else {
      baseFeatures.push('1 revision included');
    }

    if (skills?.includes('Machine Learning')) {
      baseFeatures.push('Model training & optimization');
    }
    if (skills?.includes('Data Science')) {
      baseFeatures.push('Data analysis & visualization');
    }

    return baseFeatures;
  };

  const filteredAndSortedServices = services
    .filter(service => {
      if (searchQuery) {
        return service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.freelancer.skills?.some(skill => 
                 skill.toLowerCase().includes(searchQuery.toLowerCase())
               );
      }
      return true;
    })
    .filter(service => {
      if (filterBy === 'all') return true;
      if (filterBy === 'verified') return service.freelancer.is_verified;
      if (filterBy === 'gold') return service.freelancer.badge === 'gold';
      if (filterBy === 'quick') return service.deliveryTime.includes('2-3');
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.freelancer.average_rating || 0) - (a.freelancer.average_rating || 0);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'delivery':
          return a.deliveryTime.localeCompare(b.deliveryTime);
        default:
          return 0;
      }
    });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'default';
      case 'silver': return 'secondary';
      case 'bronze': return 'outline';
      default: return 'outline';
    }
  };

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
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
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
              <SelectItem value="verified">Verified Sellers</SelectItem>
              <SelectItem value="gold">Gold Badge</SelectItem>
              <SelectItem value="quick">Quick Delivery</SelectItem>
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

        <Button onClick={() => navigate('/marketplace/create-service')}>
          Offer Your Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getBadgeColor(service.freelancer.badge)}>
                      <Award className="w-3 h-3 mr-1" />
                      {service.freelancer.badge?.toUpperCase()}
                    </Badge>
                    {service.freelancer.is_verified && (
                      <Badge variant="default" className="text-xs">
                        Verified
                      </Badge>
                    )}
                    {service.freelancer.average_rating > 0 && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{service.freelancer.average_rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    ${service.price}/hr
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.deliveryTime}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">
                {service.description}
              </CardDescription>

              <div className="space-y-2 mb-4">
                {service.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                {service.features.length > 4 && (
                  <div className="text-sm text-muted-foreground">
                    +{service.features.length - 4} more features
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={service.freelancer.user?.avatar_url} />
                    <AvatarFallback>
                      {service.freelancer.user?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{service.freelancer.user?.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{service.freelancer.total_projects} projects</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate(`/marketplace/freelancer/${service.freelancer.id}`)}
              >
                View Profile
              </Button>
              <Button 
                className="flex-1"
                onClick={() => navigate(`/marketplace/hire/${service.freelancer.id}?service=${service.id}`)}
              >
                Order Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedServices.length === 0 && (
        <div className="text-center py-16">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            No services match your current search criteria. Try adjusting your filters or search terms.
          </p>
          <Button onClick={() => navigate('/marketplace/create-service')}>
            Offer Your First Service
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
