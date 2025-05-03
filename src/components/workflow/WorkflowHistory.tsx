
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const workflowRuns = [
  {
    id: "WF-1234",
    name: "Weekly Data Analysis",
    status: "Completed",
    duration: "4m 12s",
    startTime: "2025-05-02 14:30",
    steps: 7,
    user: "alex@example.com"
  },
  {
    id: "WF-1233",
    name: "Customer Feedback Processing",
    status: "Failed",
    duration: "2m 45s",
    startTime: "2025-05-02 12:15",
    steps: 5,
    user: "sarah@example.com"
  },
  {
    id: "WF-1232",
    name: "Monthly Report Generation",
    status: "Completed",
    duration: "8m 20s",
    startTime: "2025-05-01 09:45",
    steps: 12,
    user: "alex@example.com"
  },
  {
    id: "WF-1231",
    name: "Image Categorization",
    status: "Running",
    duration: "3m 10s",
    startTime: "2025-05-03 10:05",
    steps: 4,
    user: "mike@example.com"
  },
  {
    id: "WF-1230",
    name: "Customer Support Automation",
    status: "Completed",
    duration: "5m 32s",
    startTime: "2025-05-01 16:20",
    steps: 8,
    user: "sarah@example.com"
  }
];

const WorkflowHistory = () => {
  return (
    <Card>
      <div className="p-4">
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
              <TableRow key={run.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40">
                <TableCell className="font-medium">
                  <div>
                    <span>{run.name}</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{run.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`
                    ${run.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                    ${run.status === 'Failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                    ${run.status === 'Running' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                  `}>
                    {run.status}
                  </Badge>
                </TableCell>
                <TableCell>{run.duration}</TableCell>
                <TableCell>{run.startTime}</TableCell>
                <TableCell>{run.steps}</TableCell>
                <TableCell>{run.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default WorkflowHistory;
