
import React, { useState } from "react";
import EthicsGuardHeader from "./ethics-guard/EthicsGuardHeader";
import AssessmentsSidebar from "./ethics-guard/AssessmentsSidebar";
import AnalysisForm from "./ethics-guard/AnalysisForm";
import AnalysisResults from "./ethics-guard/AnalysisResults";

interface EthicsGuardAIInterfaceProps {
  onBack?: () => void;
}

const DEMO_ASSESSMENTS = [
  { name: "Bias Detection Scan", type: "Fairness", status: "completed", score: "8.7/10" },
  { name: "Privacy Compliance Check", type: "Privacy", status: "running", score: "9.2/10" },
  { name: "Transparency Audit", type: "Explainability", status: "pending", score: "7.4/10" }
];

const EthicsGuardAIInterface: React.FC<EthicsGuardAIInterfaceProps> = ({ onBack }) => {
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [aiModel, setAiModel] = useState("");
  const [ethicsData, setEthicsData] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedAssessment || !aiModel.trim() || !ethicsData.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setResult(`Ethics assessment "${selectedAssessment}" completed for AI model "${aiModel}". Found 3 potential bias risks, 2 privacy concerns, and 1 transparency issue. Overall ethics score: 7.8/10. Recommendations generated for improvement.`);
      setLoading(false);
    }, 2800);
  };

  const handleReset = () => {
    setAiModel("");
    setEthicsData("");
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20">
      <EthicsGuardHeader onBack={onBack} />

      <main className="flex-1 flex gap-6 p-6">
        <AssessmentsSidebar
          assessments={DEMO_ASSESSMENTS}
          selectedAssessment={selectedAssessment}
          onSelectAssessment={setSelectedAssessment}
        />

        <div className="flex-1 space-y-6">
          <AnalysisForm
            selectedAssessment={selectedAssessment}
            aiModel={aiModel}
            ethicsData={ethicsData}
            loading={loading}
            onAiModelChange={setAiModel}
            onEthicsDataChange={setEthicsData}
            onAnalyze={handleAnalyze}
            onReset={handleReset}
          />

          {result && <AnalysisResults result={result} />}
        </div>
      </main>
    </div>
  );
};

export default EthicsGuardAIInterface;
