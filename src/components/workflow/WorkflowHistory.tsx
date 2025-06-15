
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useWorkflowRuns } from '@/hooks/useWorkflowRuns';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const WorkflowHistory = () => {
  const { data: workflowRuns, isLoading, isError, error } = useWorkflowRuns();

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'running':
      case 'in progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Workflow History</AlertTitle>
            <AlertDescription>
                There was a problem retrieving the workflow runs. Please try again later.
                <p className="text-xs mt-2 font-mono">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
            </AlertDescription>
        </Alert>
      );
    }

    if (!workflowRuns || workflowRuns.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No workflow runs found.</p>
                <p className="text-sm">Run a workflow to see its history here.</p>
            </div>
        )
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Workflow</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Steps</TableHead>
            <TableHead>Triggered By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workflowRuns.map((run) => (
            <TableRow key={run.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div>
                  <span>{run.workflow_name || 'N/A'}</span>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">{run.id}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadgeClass(run.status)} variant="outline">
                  {run.status}
                </Badge>
              </TableCell>
              <TableCell>{run.duration}</TableCell>
              <TableCell>{run.start_time ? format(new Date(run.start_time), "PPpp") : 'N/A'}</TableCell>
              <TableCell className="text-center">{run.steps_count}</TableCell>
              <TableCell>{run.triggered_by}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Workflow History</CardTitle>
            <CardDescription>Recent workflow executions, updated in real-time.</CardDescription>
        </CardHeader>
        <CardContent>
            {renderContent()}
        </CardContent>
    </Card>
  );
};

export default WorkflowHistory;
