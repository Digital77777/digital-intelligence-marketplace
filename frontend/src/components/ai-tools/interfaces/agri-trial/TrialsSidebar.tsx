
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Trial {
  name: string;
  type: string;
  status: string;
  duration: string;
  location: string;
}

interface TrialsSidebarProps {
  trials: Trial[];
  selectedTrial: string;
  onSelectTrial: (trial: string) => void;
}

const TrialsSidebar: React.FC<TrialsSidebarProps> = ({
  trials,
  selectedTrial,
  onSelectTrial,
}) => {
  return (
    <div className="w-80 space-y-4">
      <Card className="border-green-100 dark:border-green-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-900 dark:text-green-100 text-lg">
            Agricultural Trials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trials.map((trial, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedTrial === trial.name
                  ? "border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-950/50"
                  : "border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700"
              }`}
              onClick={() => onSelectTrial(trial.name)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{trial.name}</h4>
                <Badge variant={trial.status === "active" ? "default" : trial.status === "completed" ? "secondary" : "outline"}>
                  {trial.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Type: {trial.type}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Duration: {trial.duration}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Location: {trial.location}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialsSidebar;
