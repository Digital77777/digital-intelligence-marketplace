
import React, { useState } from "react";
import AgriTrialHeader from "./agri-trial/AgriTrialHeader";
import TrialsSidebar from "./agri-trial/TrialsSidebar";
import ExperimentForm from "./agri-trial/ExperimentForm";
import TrialResults from "./agri-trial/TrialResults";

interface AgriTrialAIInterfaceProps {
  onBack?: () => void;
}

const DEMO_TRIALS = [
  { name: "Corn Yield Study", type: "Yield Trial", status: "active", duration: "120 days", location: "Field A-1" },
  { name: "Drought Resistance", type: "Stress Test", status: "completed", duration: "90 days", location: "Field B-2" },
  { name: "Fertilizer Comparison", type: "Input Trial", status: "planning", duration: "150 days", location: "Field C-3" }
];

const AgriTrialAIInterface: React.FC<AgriTrialAIInterfaceProps> = ({ onBack }) => {
  const [selectedTrial, setSelectedTrial] = useState("");
  const [cropType, setCropType] = useState("");
  const [trialParameters, setTrialParameters] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleStartTrial = async () => {
    if (!selectedTrial || !cropType.trim() || !trialParameters.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setResult(`Agricultural trial "${selectedTrial}" initiated successfully for ${cropType}. Trial parameters configured and baseline measurements recorded. Expected completion in 90-150 days with automated data collection every 7 days. Statistical analysis framework deployed for yield optimization.`);
      setLoading(false);
    }, 3500);
  };

  const handleReset = () => {
    setCropType("");
    setTrialParameters("");
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20">
      <AgriTrialHeader onBack={onBack} />

      <main className="flex-1 flex gap-6 p-6">
        <TrialsSidebar
          trials={DEMO_TRIALS}
          selectedTrial={selectedTrial}
          onSelectTrial={setSelectedTrial}
        />

        <div className="flex-1 space-y-6">
          <ExperimentForm
            selectedTrial={selectedTrial}
            cropType={cropType}
            trialParameters={trialParameters}
            loading={loading}
            onCropTypeChange={setCropType}
            onTrialParametersChange={setTrialParameters}
            onStartTrial={handleStartTrial}
            onReset={handleReset}
          />

          {result && <TrialResults result={result} />}
        </div>
      </main>
    </div>
  );
};

export default AgriTrialAIInterface;
