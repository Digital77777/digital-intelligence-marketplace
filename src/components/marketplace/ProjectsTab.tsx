
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  DollarSign, 
  MapPin,
  Briefcase,
  Users,
  Calendar,
  Filter,
  Plus,
  AlertCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('marketplace_projects')
        .select(`
          *,
          client:user_profiles!marketplace_projects_client_id_fkey(username, avatar_url)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }
      
      setProjects(data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      setError('Unable to load projects at the moment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedProjects = projects
    .filter(project => {
      if (filterBy === 'all') return true;
      if (filterBy === 'remote') return project.is_remote;
      if (filterBy === 'onsite') return !project.is_remote;
      return project.experience_level === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'budget-high':
          return (b.budget_max || 0) - (a.budget_max || 0);
        case 'budget-low':
          return (a.budget_min || 0) - (b.budget_min || 0);
        case 'proposals':
          return (b.proposal_count || 0) - (a.proposal_count || 0);
        default:
          return 0;
      }
    });

  const formatBudget = (project: any) => {
    if (!project.budget_min && !project.budget_max) return 'Budget not specified';
    
    const type = project.budget_type === 'hourly' ? '/hr' : '';
    if (project.budget_min && project.budget_max) {
      return `$${project.budget_min} - $${project.budget_max}${type}`;
    }
    return project.budget_min 
      ? `From $${project.budget_min}${type}` 
      : `Up to $${project.budget_max}${type}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
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
              <SelectValue placeholder="Filter projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="remote">Remote Only</SelectItem>
              <SelectItem value="onsite">On-site Only</SelectItem>
              <SelectItem value="beginner">Beginner Level</SelectItem>
              <SelectItem value="intermediate">Intermediate Level</SelectItem>
              <SelectItem value="expert">Expert Level</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="budget-high">Highest Budget</SelectItem>
              <SelectItem value="budget-low">Lowest Budget</SelectItem>
              <SelectItem value="proposals">Most Proposals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => navigate('/marketplace/post-project')}>
          <Plus className="w-4 h-4 mr-2" />
          Post Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAndSortedProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                <Badge variant={project.is_remote ? "default" : "secondary"}>
                  {project.is_remote ? "Remote" : "On-site"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatBudget(project)}</span>
                </div>
                
                {project.timeline && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{project.timeline}</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm line-clamp-3">{project.description}</p>

              {project.skills_required && project.skills_required.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.skills_required.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {project.skills_required.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.skills_required.length - 4} more
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={project.client?.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {project.client?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{project.client?.username}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  {project.proposal_count > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{project.proposal_count} proposals</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>

              {project.location && !project.is_remote && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{project.location}</span>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button className="w-full">
                View Project Details
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
            No projects match your current filters. Try adjusting your search criteria or be the first to post a project!
          </p>
          <Button onClick={() => navigate('/marketplace/post-project')}>
            <Plus className="w-4 h-4 mr-2" />
            Post the First Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
