
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Zap, RotateCcw } from "lucide-react";

interface AnalysisFormProps {
  selectedAssessment: string;
  aiModel: string;
  ethicsData: string;
  loading: boolean;
  onAiModelChange: (value: string) => void;
  onEthicsDataChange: (value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({
  selectedAssessment,
  aiModel,
  ethicsData,
  loading,
  onAiModelChange,
  onEthicsDataChange,
  onAnalyze,
  onReset,
}) => {
  return (
    <Card className="border-red-100 dark:border-red-700">
      <CardHeader>
        <CardTitle className="text-red-900 dark:text-red-100">
          AI Ethics Analysis Center
        </CardTitle>
        <div className="text-sm text-red-800 dark:text-red-300">
          Select an assessment type and analyze your AI model for ethical compliance
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selected Assessment
          </label>
          <Input
            value={selectedAssessment}
            placeholder="Select an assessment from the sidebar"
            readOnly
            className="bg-gray-50 dark:bg-gray-900 border-red-200 dark:border-red-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI Model/System Name
          </label>
          <Input
            className="border-red-200 dark:border-red-700"
            placeholder="Enter the name of your AI model or system"
            value={aiModel}
            onChange={(e) => onAiModelChange(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Model Data & Configuration
          </label>
          <Textarea
            className="h-32 border-red-200 dark:border-red-700 resize-none"
            placeholder="Describe your AI model's training data, use cases, decision-making processes, and ethical considerations..."
            value={ethicsData}
            onChange={(e) => onEthicsDataChange(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex gap-3">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={!selectedAssessment || !aiModel.trim() || !ethicsData.trim() || loading}
            onClick={onAnalyze}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Run Ethics Analysis
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onReset}
            disabled={loading}
            className="border-red-200 dark:border-red-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisForm;
