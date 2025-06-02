
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
  MapPin, 
  DollarSign, 
  Briefcase, 
  Award,
  Users,
  TrendingUp,
  Github,
  Globe,
  Filter
} from 'lucide-react';

interface FreelancersTabProps {
  searchQuery: string;
}

const FreelancersTab: React.FC<FreelancersTabProps> = ({ searchQuery }) => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating');
  const [filterBy, setFilterBy] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const { data, error } = await supabase
        .from('freelancer_profiles')
        .select(`
          *,
          user:user_profiles!freelancer_profiles_user_id_fkey(username, avatar_url, full_name)
        `)
        .order('average_rating', { ascending: false });

      if (error) throw error;
      setFreelancers(data || []);
    } catch (error) {
      console.error('Error fetching freelancers:', error);
      toast({
        title: "Error",
        description: "Failed to load freelancers",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedFreelancers = freelancers
    .filter(freelancer => {
      if (searchQuery) {
        return freelancer.user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               freelancer.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               freelancer.skills?.some(skill => 
                 skill.toLowerCase().includes(searchQuery.toLowerCase())
               );
      }
      return true;
    })
    .filter(freelancer => {
      if (filterBy === 'all') return true;
      if (filterBy === 'verified') return freelancer.is_verified;
      if (filterBy === 'gold') return freelancer.badge === 'gold';
      if (filterBy === 'available') return freelancer.hourly_rate > 0;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.average_rating || 0) - (a.average_rating || 0);
        case 'rate-low':
          return (a.hourly_rate || 0) - (b.hourly_rate || 0);
        case 'rate-high':
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

  const getBadgeIcon = (badge) => {
    return <Award className="w-3 h-3" />;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="flex gap-2 mb-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
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
              <SelectValue placeholder="Filter freelancers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Freelancers</SelectItem>
              <SelectItem value="verified">Verified Only</SelectItem>
              <SelectItem value="gold">Gold Badge</SelectItem>
              <SelectItem value="available">Available</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="rate-low">Rate: Low to High</SelectItem>
              <SelectItem value="rate-high">Rate: High to Low</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => navigate('/marketplace/create-profile')}>
          Become a Freelancer
        </Button>
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedFreelancers.map((freelancer) => (
          <Card key={freelancer.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={freelancer.user?.avatar_url} />
                  <AvatarFallback>
                    {freelancer.user?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      {freelancer.user?.full_name || freelancer.user?.username}
                    </h3>
                    {freelancer.is_verified && (
                      <Badge variant="default" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getBadgeColor(freelancer.badge)} className="text-xs">
                      {getBadgeIcon(freelancer.badge)}
                      {freelancer.badge?.toUpperCase()}
                    </Badge>
                    {freelancer.average_rating > 0 && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{freelancer.average_rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-4">
                {freelancer.hourly_rate && (
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      ${freelancer.hourly_rate}/hour
                    </span>
                  </div>
                )}
                
                {freelancer.years_experience > 0 && (
                  <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{freelancer.years_experience} years experience</span>
                  </div>
                )}

                {freelancer.total_projects > 0 && (
                  <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>{freelancer.total_projects} completed projects</span>
                  </div>
                )}
              </div>

              {freelancer.bio && (
                <CardDescription className="mb-4 line-clamp-3">
                  {freelancer.bio}
                </CardDescription>
              )}

              {freelancer.skills && freelancer.skills.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {freelancer.skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{freelancer.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {freelancer.github_url && (
                  <a 
                    href={freelancer.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <Github className="w-3 h-3" />
                    GitHub
                  </a>
                )}
                {freelancer.portfolio_url && (
                  <a 
                    href={freelancer.portfolio_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <Globe className="w-3 h-3" />
                    Portfolio
                  </a>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate(`/marketplace/freelancer/${freelancer.id}`)}
              >
                View Profile
              </Button>
              <Button 
                className="flex-1"
                onClick={() => navigate(`/marketplace/hire/${freelancer.id}`)}
              >
                Hire Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedFreelancers.length === 0 && (
        <div className="text-center py-16">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No freelancers found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            No freelancers match your current search criteria. Try adjusting your filters or search terms.
          </p>
          <Button onClick={() => navigate('/marketplace/create-profile')}>
            Join as a Freelancer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FreelancersTab;
