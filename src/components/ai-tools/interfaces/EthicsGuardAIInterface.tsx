
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, Scan, Settings, Download, RotateCcw, Zap, AlertTriangle } from "lucide-react";

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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-red-100 dark:border-red-900/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-red-100 dark:hover:bg-red-900/40">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
          <h1 className="text-xl font-bold text-red-900 dark:text-red-100">EthicsGuard AI</h1>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="icon" className="border-red-200 dark:border-red-700">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-red-200 dark:border-red-700">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex gap-6 p-6">
        {/* Assessments Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="border-red-100 dark:border-red-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-900 dark:text-red-100 text-lg">
                Ethics Assessments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_ASSESSMENTS.map((assessment, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedAssessment === assessment.name
                      ? "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-950/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-700"
                  }`}
                  onClick={() => setSelectedAssessment(assessment.name)}
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

        {/* Main Analysis Area */}
        <div className="flex-1 space-y-6">
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
                  onChange={(e) => setAiModel(e.target.value)}
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
                  onChange={(e) => setEthicsData(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={!selectedAssessment || !aiModel.trim() || !ethicsData.trim() || loading}
                  onClick={handleAnalyze}
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
                  onClick={() => {
                    setAiModel("");
                    setEthicsData("");
                    setResult(null);
                  }}
                  disabled={loading}
                  className="border-red-200 dark:border-red-700"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default EthicsGuardAIInterface;
