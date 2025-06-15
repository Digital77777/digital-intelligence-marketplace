
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Download, Monitor, Settings } from "lucide-react";

interface IntegrationResultsProps {
  result: string;
}

const IntegrationResults: React.FC<IntegrationResultsProps> = ({ result }) => {
  return (
    <Card className="border-blue-100 dark:border-blue-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
          <Cloud className="h-5 w-5" />
          Integration Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <p className="text-blue-900 dark:text-blue-100">{result}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="border-blue-200 dark:border-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Config
          </Button>
          <Button variant="outline" size="sm" className="border-blue-200 dark:border-blue-700">
            <Monitor className="mr-2 h-4 w-4" />
            Monitor Status
          </Button>
          <Button variant="outline" size="sm" className="border-blue-200 dark:border-blue-700">
            <Settings className="mr-2 h-4 w-4" />
            Advanced Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationResults;
