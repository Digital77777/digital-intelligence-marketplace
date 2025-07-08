
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Beaker, RefreshCw } from "lucide-react";

interface ExperimentFormProps {
  selectedTrial: string;
  cropType: string;
  trialParameters: string;
  loading: boolean;
  onCropTypeChange: (value: string) => void;
  onTrialParametersChange: (value: string) => void;
  onStartTrial: () => void;
  onReset: () => void;
}

const ExperimentForm: React.FC<ExperimentFormProps> = ({
  selectedTrial,
  cropType,
  trialParameters,
  loading,
  onCropTypeChange,
  onTrialParametersChange,
  onStartTrial,
  onReset,
}) => {
  return (
    <Card className="border-green-100 dark:border-green-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
          <Beaker className="h-5 w-5" />
          Experiment Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="trial">Selected Trial</Label>
          <Input
            id="trial"
            value={selectedTrial || "Select an agricultural trial"}
            readOnly
            className="bg-gray-50 dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="crop">Crop Type</Label>
          <Input
            id="crop"
            value={cropType}
            onChange={(e) => onCropTypeChange(e.target.value)}
            placeholder="e.g., Corn, Soybeans, Wheat..."
            disabled={!selectedTrial}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="parameters">Trial Parameters</Label>
          <Textarea
            id="parameters"
            value={trialParameters}
            onChange={(e) => onTrialParametersChange(e.target.value)}
            placeholder="Enter experimental conditions, treatments, measurement protocols, environmental factors..."
            className="min-h-[120px]"
            disabled={!selectedTrial}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={onStartTrial}
            disabled={!selectedTrial || !cropType.trim() || !trialParameters.trim() || loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Starting Trial...
              </>
            ) : (
              <>
                <Beaker className="mr-2 h-4 w-4" />
                Start Trial
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperimentForm;
