
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, Database, Users } from 'lucide-react';

const SampleDataBanner = () => {
  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-blue-600" />
          <span className="text-blue-800">
            You're viewing sample data. Connect your team to see real-time updates and collaboration features.
          </span>
        </div>
        <Button variant="outline" size="sm" className="ml-4 text-blue-600 border-blue-300 hover:bg-blue-100">
          <Users className="h-4 w-4 mr-2" />
          Invite Team Members
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default SampleDataBanner;
