
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, DollarSign, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { Database } from '@/integrations/supabase/types';

type ProjectProposal = Database['public']['Tables']['project_proposals']['Row'];

interface ProposalsListProps {
  proposals: ProjectProposal[];
}

const ProposalsList: React.FC<ProposalsListProps> = ({ proposals }) => {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No proposals submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="border-l-4 border-l-primary/20">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="" alt="Freelancer" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Freelancer</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted {format(new Date(proposal.submitted_at), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              {proposal.is_accepted && (
                <Badge variant="default">Accepted</Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">${proposal.proposed_amount}</span>
              </div>
              
              {proposal.proposed_timeline && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{proposal.proposed_timeline} days</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {format(new Date(proposal.submitted_at), 'MMM d')}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm leading-relaxed">{proposal.cover_letter}</p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                View Profile
              </Button>
              <Button size="sm" disabled={proposal.is_accepted}>
                {proposal.is_accepted ? 'Accepted' : 'Accept Proposal'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProposalsList;
