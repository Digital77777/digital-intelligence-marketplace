
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, MessageSquare, Calendar, Settings } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: <Plus className="w-4 h-4" />,
      label: 'New Task',
      description: 'Create a new task for the team',
      variant: 'default' as const,
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      label: 'Start Discussion',
      description: 'Begin a new team discussion',
      variant: 'outline' as const,
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: 'Schedule Meeting',
      description: 'Plan a team meeting',
      variant: 'outline' as const,
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: 'Invite Members',
      description: 'Add new team members',
      variant: 'outline' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="w-full justify-start h-auto p-3"
            >
              <div className="flex items-center space-x-3">
                {action.icon}
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
