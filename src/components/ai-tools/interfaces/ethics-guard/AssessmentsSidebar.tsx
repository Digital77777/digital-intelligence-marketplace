
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Assessment {
  name: string;
  type: string;
  status: string;
  score: string;
}

interface AssessmentsSidebarProps {
  assessments: Assessment[];
  selectedAssessment: string;
  onSelectAssessment: (assessment: string) => void;
}

const AssessmentsSidebar: React.FC<AssessmentsSidebarProps> = ({
  assessments,
  selectedAssessment,
  onSelectAssessment,
}) => {
  return (
    <div className="w-80 space-y-4">
      <Card className="border-red-100 dark:border-red-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-900 dark:text-red-100 text-lg">
            Ethics Assessments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assessments.map((assessment, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedAssessment === assessment.name
                  ? "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-950/50"
                  : "border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-700"
              }`}
              onClick={() => onSelectAssessment(assessment.name)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{assessment.name}</h4>
                <Badge variant={assessment.status === "completed" ? "default" : assessment.status === "running" ? "secondary" : "outline"}>
                  {assessment.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Type: {assessment.type}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Score: {assessment.score}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentsSidebar;
