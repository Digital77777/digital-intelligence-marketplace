
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
  Award,
  Filter,
  Settings,
  Calendar
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
      // For now, we'll use freelancer profiles as services
      // In a real implementation, you'd have a separate services table
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
      const serviceData = data?.map(freelancer => ({
        ...freelancer,
        service_title: `AI ${freelancer.skills?.[0] || 'Development'} Services`,
        service_description: `Professional ${freelancer.skills?.slice(0, 3).join(', ')} services with ${freelancer.years_experience} years of experience.`,
        service_type: freelancer.skills?.[0]?.includes('ML') || freelancer.skills?.[0]?.includes('AI') ? 'AI/ML' : 'Development'
      })) || [];
      
      setServices(serviceData);
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
        return service.service_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.service_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.skills?.some(skill => 
                 skill.toLowerCase().includes(searchQuery.toLowerCase())
               );
      }
      return true;
    })
    .filter(service => {
      if (filterBy === 'all') return true;
      if (filterBy === 'ai-ml') return service.service_type === 'AI/ML';
      if (filterBy === 'development') return service.service_type === 'Development';
      if (filterBy === 'featured') return service.is_featured;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.average_rating || 0) - (a.average_rating || 0);
        case 'price-low':
          return (a.hourly_rate || 0) - (b.hourly_rate || 0);
        case 'price-high':
          return (b.hourly_rate || 0) - (a.hourly_rate || 0);
        case 'experience':
          return (b.years_experience || 0) - (a.years_experience || 0);
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
              <SelectItem value="ai-ml">AI/ML Services</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => navigate('/marketplace/create-profile')}>
          Offer Your Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={service.user?.avatar_url} />
                    <AvatarFallback>{service.user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{service.service_title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {service.user?.username}</p>
                  </div>
                </div>
                {service.is_featured && (
                  <Badge variant="default" className="text-xs">Featured</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={getBadgeColor(service.badge)} className="text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  {service.badge}
                </Badge>
                {service.is_verified && (
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                )}
                <Badge variant="outline" className="text-xs">{service.service_type}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-4">
                {service.average_rating > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.average_rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({service.total_projects} reviews)
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-1 text-lg font-semibold text-green-600 mb-2">
                  <DollarSign className="w-4 h-4" />
                  Starting at ${service.hourly_rate}/hr
                </div>
              </div>

              <CardDescription className="mb-4 line-clamp-2">
                {service.service_description}
              </CardDescription>

              {service.skills && service.skills.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {service.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {service.skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{service.skills.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {service.years_experience} years exp.
                </div>
                {service.success_rate > 0 && (
                  <div>
                    {service.success_rate}% success rate
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full">
                Book Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedServices.length === 0 && (
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
