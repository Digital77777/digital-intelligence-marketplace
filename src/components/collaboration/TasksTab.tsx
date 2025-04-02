
import React from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  assignee: string;
  status: 'Not Started' | 'In Progress' | 'Done';
  due: string;
}

interface TasksTabProps {
  tasks: Task[];
}

export const TasksTab: React.FC<TasksTabProps> = ({ tasks }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Team Tasks</CardTitle>
          <CardDescription>Track and manage your team's tasks</CardDescription>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-4 py-3">Task</th>
                <th scope="col" className="px-4 py-3">Assignee</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Due</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">{task.title}</td>
                  <td className="px-4 py-3">{task.assignee}</td>
                  <td className="px-4 py-3">
                    <Badge variant={
                      task.status === "Done" ? "default" :
                      task.status === "In Progress" ? "outline" : "secondary"
                    }>
                      {task.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{task.due}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {task.status !== "Done" && (
                        <Button variant="outline" size="sm" className="text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
