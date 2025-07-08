
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download, AlertTriangle, Scan } from "lucide-react";

interface AnalysisResultsProps {
  result: string;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  return (
    <Card className="border-red-100 dark:border-red-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-100">
          <Shield className="h-5 w-5" />
          Ethics Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-red-50 dark:bg-red-950/40 rounded-lg p-4 border border-red-100 dark:border-red-800">
          <p className="text-red-900 dark:text-red-100">{result}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="border-red-200 dark:border-red-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="border-red-200 dark:border-red-700">
            <AlertTriangle className="mr-2 h-4 w-4" />
            View Recommendations
          </Button>
          <Button variant="outline" size="sm" className="border-red-200 dark:border-red-700">
            <Scan className="mr-2 h-4 w-4" />
            Schedule Monitoring
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
