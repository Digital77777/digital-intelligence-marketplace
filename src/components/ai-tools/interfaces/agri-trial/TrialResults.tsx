
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Beaker, Download, BarChart3, Settings } from "lucide-react";

interface TrialResultsProps {
  result: string;
}

const TrialResults: React.FC<TrialResultsProps> = ({ result }) => {
  return (
    <Card className="border-green-100 dark:border-green-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
          <Beaker className="h-5 w-5" />
          Trial Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-green-50 dark:bg-green-950/40 rounded-lg p-4 border border-green-100 dark:border-green-800">
          <p className="text-green-900 dark:text-green-100">{result}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="border-green-200 dark:border-green-700">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" className="border-green-200 dark:border-green-700">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button variant="outline" size="sm" className="border-green-200 dark:border-green-700">
            <Settings className="mr-2 h-4 w-4" />
            Trial Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrialResults;
