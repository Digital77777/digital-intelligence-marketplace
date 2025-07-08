
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarketplaceProject } from '@/hooks/useMarketplaceProjects';
import { useProjectProposals } from '@/hooks/useProjectProposals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, DollarSign, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import ProposalForm from '@/components/marketplace/ProposalForm';
import ProposalsList from '@/components/marketplace/ProposalsList';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading: projectLoading } = useMarketplaceProject(id!);
  const { data: proposals, isLoading: proposalsLoading } = useProjectProposals(id!);

  if (projectLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-40 bg-muted rounded" />
          <div className="h-20 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/marketplace">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getBudgetDisplay = () => {
    if (project.is_hourly) {
      return `$${project.budget_min}-$${project.budget_max}/hr`;
    } else if (project.fixed_price) {
      return `$${project.fixed_price} fixed`;
    } else {
      return `$${project.budget_min}-$${project.budget_max}`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/marketplace">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{project.project_type}</Badge>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted {format(new Date(project.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Project Description</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>

              {project.required_skills && project.required_skills.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.required_skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold">{getBudgetDisplay()}</div>
                  <div className="text-sm text-muted-foreground">Budget</div>
                </div>

                {project.estimated_hours && (
                  <div className="text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="font-semibold">{project.estimated_hours}h</div>
                    <div className="text-sm text-muted-foreground">Estimated</div>
                  </div>
                )}

                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold capitalize">{project.experience_level}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>

                {project.deadline && (
                  <div className="text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="font-semibold">{format(new Date(project.deadline), 'MMM d')}</div>
                    <div className="text-sm text-muted-foreground">Deadline</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Proposals section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Proposals ({proposals?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {proposalsLoading ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-muted rounded" />
                    ))}
                  </div>
                ) : (
                  <ProposalsList proposals={proposals || []} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <ProposalForm projectId={project.id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
