
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateProposal } from '@/hooks/useProjectProposals';
import { useUser } from '@/context/UserContext';
import { Send } from 'lucide-react';

const proposalSchema = z.object({
  cover_letter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  proposed_amount: z.number().min(1, 'Amount must be greater than 0'),
  proposed_timeline: z.number().min(1, 'Timeline must be at least 1 day'),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  projectId: string;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ projectId }) => {
  const { user } = useUser();
  const createProposal = useCreateProposal();

  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      cover_letter: '',
      proposed_amount: 0,
      proposed_timeline: 7,
    },
  });

  const onSubmit = (data: ProposalFormData) => {
    // Ensure all required fields are present
    const proposalData = {
      project_id: projectId,
      cover_letter: data.cover_letter,
      proposed_amount: data.proposed_amount,
      proposed_timeline: data.proposed_timeline,
    };
    
    createProposal.mutate(proposalData);
    form.reset();
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submit a Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please sign in to submit a proposal for this project.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="proposed_amount">Your Bid ($)</Label>
            <Input
              id="proposed_amount"
              type="number"
              step="0.01"
              {...form.register('proposed_amount', { valueAsNumber: true })}
              placeholder="Enter your bid amount"
            />
            {form.formState.errors.proposed_amount && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.proposed_amount.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="proposed_timeline">Timeline (days)</Label>
            <Input
              id="proposed_timeline"
              type="number"
              {...form.register('proposed_timeline', { valueAsNumber: true })}
              placeholder="How many days to complete?"
            />
            {form.formState.errors.proposed_timeline && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.proposed_timeline.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="cover_letter">Cover Letter</Label>
            <Textarea
              id="cover_letter"
              {...form.register('cover_letter')}
              placeholder="Explain why you're the best fit for this project..."
              rows={6}
            />
            {form.formState.errors.cover_letter && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.cover_letter.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createProposal.isPending}
          >
            {createProposal.isPending ? (
              'Submitting...'
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Proposal
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProposalForm;
