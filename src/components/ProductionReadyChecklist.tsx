import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { useAIToolChecklist } from '@/hooks/useAIToolChecklist';
import { ToolChecklistItem } from '@/data/checklistItems';

interface ProductionReadyChecklistProps {
  toolId: string;
}

const ProductionReadyChecklist: React.FC<ProductionReadyChecklistProps> = ({ toolId }) => {
  const { tool, checklist, runChecks, allPassed, hasErrors } = useAIToolChecklist(toolId);

  const getStatusIcon = (status: ToolChecklistItem['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'checking':
        return <Circle className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {tool.name} - Production Readiness
          <Button onClick={runChecks} size="sm" variant="outline">
            Run Checks
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.details}</p>
                  {item.message && (
                    <p className="text-sm text-gray-500 italic">{item.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {allPassed && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Ready for Production!</h3>
            <p className="text-green-700">This tool has passed all production checks.</p>
          </div>
        )}

        {hasErrors && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Issues Detected</h3>
            <p className="text-red-700">This tool has issues that need to be resolved before production use.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductionReadyChecklist;
