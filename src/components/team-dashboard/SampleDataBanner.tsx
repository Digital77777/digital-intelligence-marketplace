
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, Database, ArrowRight } from 'lucide-react';

const SampleDataBanner = () => {
  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-blue-600" />
          <span className="text-blue-800">
            You're viewing the Team Dashboard with sample data. 
            <strong className="ml-1">Explore all features risk-free!</strong>
          </span>
        </div>
        <Button variant="outline" size="sm" className="ml-4 text-blue-600 border-blue-300 hover:bg-blue-100">
          Connect Real Data
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default SampleDataBanner;
