
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Workflow, Play, Settings, Download, RotateCcw, Zap } from "lucide-react";

interface OmniFlowAIInterfaceProps {
  onBack?: () => void;
}

const DEMO_WORKFLOWS = [
  { name: "Customer Support Flow", type: "Service", status: "active", efficiency: "94%" },
  { name: "Data Processing Pipeline", type: "Analytics", status: "running", efficiency: "87%" },
  { name: "Content Generation", type: "Creative", status: "ready", efficiency: "91%" }
];

const OmniFlowAIInterface: React.FC<OmniFlowAIInterfaceProps> = ({ onBack }) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleExecute = async () => {
    if (!selectedWorkflow || !inputData.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setResult(`Workflow "${selectedWorkflow}" executed successfully. Processed ${inputData.split(' ').length} data points with 95.3% accuracy. Output generated and optimized through AI pipeline.`);
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-900/20 dark:via-purple-900/20 dark:to-indigo-900/20">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-violet-100 dark:border-violet-900/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-violet-100 dark:hover:bg-violet-900/40">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Workflow className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          <h1 className="text-xl font-bold text-violet-900 dark:text-violet-100">OmniFlow AI</h1>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="icon" className="border-violet-200 dark:border-violet-700">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-violet-200 dark:border-violet-700">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex gap-6 p-6">
        {/* Workflows Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="border-violet-100 dark:border-violet-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-violet-900 dark:text-violet-100 text-lg">
                Available Workflows
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_WORKFLOWS.map((workflow, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedWorkflow === workflow.name
                      ? "border-violet-300 bg-violet-50 dark:border-violet-600 dark:bg-violet-950/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-violet-200 dark:hover:border-violet-700"
                  }`}
                  onClick={() => setSelectedWorkflow(workflow.name)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{workflow.name}</h4>
                    <Badge variant={workflow.status === "active" ? "default" : workflow.status === "running" ? "secondary" : "outline"}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Type: {workflow.type}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Efficiency: {workflow.efficiency}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Execution Area */}
        <div className="flex-1 space-y-6">
          <Card className="border-violet-100 dark:border-violet-700">
            <CardHeader>
              <CardTitle className="text-violet-900 dark:text-violet-100">
                Workflow Execution Center
              </CardTitle>
              <div className="text-sm text-violet-800 dark:text-violet-300">
                Select a workflow and input your data for AI-powered processing
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Workflow
                </label>
                <Input
                  value={selectedWorkflow}
                  placeholder="Select a workflow from the sidebar"
                  readOnly
                  className="bg-gray-50 dark:bg-gray-900 border-violet-200 dark:border-violet-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Data
                </label>
                <Textarea
                  className="h-32 border-violet-200 dark:border-violet-700 resize-none"
                  placeholder="Enter your data or parameters for workflow processing..."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                  disabled={!selectedWorkflow || !inputData.trim() || loading}
                  onClick={handleExecute}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Execute Workflow
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
                  className="border-violet-200 dark:border-violet-700"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className="border-violet-100 dark:border-violet-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-violet-900 dark:text-violet-100">
                  <Workflow className="h-5 w-5" />
                  Execution Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-violet-50 dark:bg-violet-950/40 rounded-lg p-4 border border-violet-100 dark:border-violet-800">
                  <p className="text-violet-900 dark:text-violet-100">{result}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="border-violet-200 dark:border-violet-700">
                    <Download className="mr-2 h-4 w-4" />
                    Export Results
                  </Button>
                  <Button variant="outline" size="sm" className="border-violet-200 dark:border-violet-700">
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

export default OmniFlowAIInterface;
