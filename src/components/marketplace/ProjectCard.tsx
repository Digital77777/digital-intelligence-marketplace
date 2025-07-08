import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database } from '@/integrations/supabase/types';

type MarketplaceProject = Database['public']['Tables']['marketplace_projects']['Row'];

interface ProjectCardProps {
  project: MarketplaceProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.required_skills?.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm font-semibold">
          Budget: ${project.budget_min} - ${project.budget_max}
        </div>
        <Button onClick={handleViewDetails}>View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
