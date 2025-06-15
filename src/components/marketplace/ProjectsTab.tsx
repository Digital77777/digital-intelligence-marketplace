
import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplaceProjects } from '@/hooks/useMarketplaceProjects';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Clock, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const ProjectsTab: React.FC = () => {
  const { data: projects, isLoading } = useMarketplaceProjects();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-4/5" />
                <div className="h-4 bg-muted rounded w-3/5" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-8 bg-muted rounded w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No projects available</h3>
        <p className="text-muted-foreground">Check back later for new opportunities.</p>
      </div>
    );
  }

  const getBudgetDisplay = (project: any) => {
    if (project.is_hourly) {
      return `$${project.budget_min}-$${project.budget_max}/hr`;
    } else if (project.fixed_price) {
      return `$${project.fixed_price} fixed`;
    } else {
      return `$${project.budget_min}-$${project.budget_max}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Projects</h2>
        <Link to="/marketplace/post-project">
          <Button>Post a Project</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="line-clamp-2 text-lg">{project.title}</CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {project.project_type}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                Posted {format(new Date(project.created_at), 'MMM d')}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                  <span className="font-medium">{getBudgetDisplay(project)}</span>
                </div>
                
                {project.estimated_hours && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-600" />
                    <span>{project.estimated_hours}h</span>
                  </div>
                )}
              </div>

              {project.required_skills && project.required_skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.required_skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {project.required_skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.required_skills.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <Badge variant="outline" className="capitalize">
                  {project.experience_level}
                </Badge>
                {project.deadline && (
                  <span>Due: {format(new Date(project.deadline), 'MMM d')}</span>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Link to={`/marketplace/project/${project.id}`} className="w-full">
                <Button className="w-full">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
