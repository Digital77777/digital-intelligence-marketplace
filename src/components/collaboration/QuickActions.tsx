
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, CalendarPlus, FileUp, Settings, Users } from 'lucide-react';

export const QuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <MessageCircle className="h-4 w-4 mr-2" />
            New Discussion
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <FileUp className="h-4 w-4 mr-2" />
            Share Document
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="h-4 w-4 mr-2" />
            Manage Team
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Project Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
