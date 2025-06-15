
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Brain, Download } from 'lucide-react';

const LivestockGuardianHeader: React.FC = () => {
  return (
    <div className="bg-white border-b px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Livestock Guardian Vision</h1>
            <p className="text-sm text-gray-500">AI-powered livestock monitoring and protection</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Brain className="h-3 w-3 mr-1" />
            AI Vision
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LivestockGuardianHeader;
