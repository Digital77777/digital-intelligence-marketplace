
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Paperclip } from 'lucide-react';

export const QuickActions: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            New Discussion
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Paperclip className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
