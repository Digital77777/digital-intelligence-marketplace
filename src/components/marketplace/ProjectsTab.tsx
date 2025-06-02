
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
  Clock, 
  DollarSign, 
  MapPin, 
  Star, 
  Users, 
  Calendar,
  TrendingUp,
  Briefcase,
  Filter
} from 'lucide-react';

interface ProjectsTabProps {
  searchQuery: string;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ searchQuery }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_projects')
        .select(`
          *,
          client:user_profiles!marketplace_projects_client_id_fkey(username, avatar_url)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedProjects = projects
    .filter(project => {
      if (searchQuery) {
        return project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               project.required_skills.some(skill => 
                 skill.toLowerCase().includes(searchQuery.toLowerCase())
               );
      }
      return true;
    })
    .filter(project => {
      if (filterBy === 'all') return true;
      if (filterBy === 'fixed') return !project.is_hourly;
      if (filterBy === 'hourly') return project.is_hourly;
      if (filterBy === 'urgent') return project.urgency_level >= 4;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'budget-high':
          return (b.fixed_price || b.budget_max || 0) - (a.fixed_price || a.budget_max || 0);
        case 'budget-low':
          return (a.fixed_price || a.budget_min || 0) - (b.fixed_price || b.budget_min || 0);
        default:
          return 0;
      }
    });

  const formatBudget = (project) => {
    if (project.is_hourly) {
      return `$${project.budget_min}-$${project.budget_max}/hr`;
    }
    return `$${project.fixed_price || `${project.budget_min}-${project.budget_max}`}`;
  };

  const getUrgencyColor = (level) => {
    if (level >= 4) return 'destructive';
    if (level >= 3) return 'default';
    return 'secondary';
  };

  const getUrgencyText = (level) => {
    if (level >= 4) return 'Urgent';
    if (level >= 3) return 'Normal';
    return 'Flexible';
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
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="fixed">Fixed Price</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="budget-high">Budget: High to Low</SelectItem>
              <SelectItem value="budget-low">Budget: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => navigate('/marketplace/post-project')}>
          Post a Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getUrgencyColor(project.urgency_level)}>
                      {getUrgencyText(project.urgency_level)}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {project.project_type}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {project.experience_level}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    {formatBudget(project)}
                  </div>
                  {project.estimated_hours && (
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.estimated_hours}h est.
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription className="mb-4 line-clamp-3">
                {project.description}
              </CardDescription>

              {project.required_skills && project.required_skills.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.required_skills.slice(0, 5).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {project.required_skills.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.required_skills.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={project.client?.avatar_url} />
                    <AvatarFallback>{project.client?.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{project.client?.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate(`/marketplace/project/${project.id}`)}
              >
                View Details & Apply
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedProjects.length === 0 && (
        <div className="text-center py-16">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            No projects match your current search criteria. Try adjusting your filters or search terms.
          </p>
          <Button onClick={() => navigate('/marketplace/post-project')}>
            Post the First Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
