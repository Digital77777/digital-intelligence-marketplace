
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, Zap, Settings, Download, Play, RotateCcw } from "lucide-react";

interface NeuroForgeProInterfaceProps {
  onBack?: () => void;
}

const DEMO_MODELS = [
  { name: "Language Model", type: "NLP", accuracy: "94.2%", status: "trained" },
  { name: "Image Classifier", type: "Vision", accuracy: "97.8%", status: "training" },
  { name: "Prediction Engine", type: "Regression", accuracy: "89.5%", status: "ready" }
];

const NeuroForgeProInterface: React.FC<NeuroForgeProInterfaceProps> = ({ onBack }) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!selectedModel || !inputData.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setResult(`Processed with ${selectedModel}: Analysis complete with 95.3% confidence. Neural network identified 3 key patterns in the input data.`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-indigo-100 dark:border-indigo-900/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-indigo-100 dark:hover:bg-indigo-900/40">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">NeuroForge Pro</h1>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="icon" className="border-indigo-200 dark:border-indigo-700">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-indigo-200 dark:border-indigo-700">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex gap-6 p-6">
        {/* Models Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="border-indigo-100 dark:border-indigo-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-indigo-900 dark:text-indigo-100 text-lg">
                Available Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_MODELS.map((model, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedModel === model.name
                      ? "border-indigo-300 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700"
                  }`}
                  onClick={() => setSelectedModel(model.name)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{model.name}</h4>
                    <Badge variant={model.status === "trained" ? "default" : model.status === "training" ? "secondary" : "outline"}>
                      {model.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Type: {model.type}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Accuracy: {model.accuracy}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Processing Area */}
        <div className="flex-1 space-y-6">
          <Card className="border-indigo-100 dark:border-indigo-700">
            <CardHeader>
              <CardTitle className="text-indigo-900 dark:text-indigo-100">
                Neural Network Processing
              </CardTitle>
              <div className="text-sm text-indigo-800 dark:text-indigo-300">
                Select a model and input your data for AI-powered analysis
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Model
                </label>
                <Input
                  value={selectedModel}
                  placeholder="Select a model from the sidebar"
                  readOnly
                  className="bg-gray-50 dark:bg-gray-900 border-indigo-200 dark:border-indigo-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Data
                </label>
                <Textarea
                  className="h-32 border-indigo-200 dark:border-indigo-700 resize-none"
                  placeholder="Enter your data for neural network processing..."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={!selectedModel || !inputData.trim() || loading}
                  onClick={handleProcess}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Process Data
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setInputData("");
                    setResult(null);
                  }}
                  disabled={loading}
                  className="border-indigo-200 dark:border-indigo-700"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className="border-indigo-100 dark:border-indigo-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
                  <Brain className="h-5 w-5" />
                  Processing Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800">
                  <p className="text-indigo-900 dark:text-indigo-100">{result}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="border-indigo-200 dark:border-indigo-700">
                    <Download className="mr-2 h-4 w-4" />
                    Export Results
                  </Button>
                  <Button variant="outline" size="sm" className="border-indigo-200 dark:border-indigo-700">
                    <Play className="mr-2 h-4 w-4" />
                    Run Again
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

export default NeuroForgeProInterface;
