
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LineChart, Settings, RefreshCw, Download } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface PredictirixEnterpriseInterfaceProps {
  onBack?: () => void;
}

const DEMO_PREDICTION = {
  result: "Yield expected to increase by 7.5% this season based on current parameters and weather patterns.",
  risks: [
    "Possible drought in July - mitigate with advanced irrigation.",
    "Slight pest uptick projected post-monsoon.",
  ],
  confidence: 93
};

const PredictirixEnterpriseInterface: React.FC<PredictirixEnterpriseInterfaceProps> = ({ onBack }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<null | typeof DEMO_PREDICTION>(null);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      setPrediction(DEMO_PREDICTION);
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-purple-50 dark:from-blue-900/20 dark:via-sky-900/20 dark:to-purple-900/20">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-blue-100 dark:border-blue-900/30">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-blue-100 dark:hover:bg-blue-900/40">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Button>
        )}
        <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">Predictirix Enterprise</h1>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="icon" className="border-blue-200 dark:border-blue-700"><Settings /></Button>
          <Button variant="outline" size="icon" className="border-blue-200 dark:border-blue-700"><RefreshCw /></Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-3 md:px-0 py-8">
        <Card className="w-full max-w-2xl border-blue-100 dark:border-blue-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Enterprise AI Prediction Dashboard
            </CardTitle>
            <div className="text-sm text-blue-800 dark:text-blue-300 mt-2">
              Enter your dataset parameters or description and tap Predict.
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 pt-2">
            <Textarea
              className="w-full h-24 resize-none border-blue-200 dark:border-blue-700 bg-white dark:bg-blue-950 placeholder:text-blue-400"
              placeholder="Describe your prediction scenario, e.g. 'Wheat field, north zone, July-Oct 2025...'"
              value={input}
              onChange={e => setInput(e.target.value)}
              maxLength={600}
              disabled={loading}
            />
            <div className="flex items-center gap-4">
              <Button
                className="bg-blue-700 hover:bg-blue-900 text-white font-semibold"
                disabled={!input.trim() || loading}
                onClick={handlePredict}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <LineChart className="mr-2 h-4 w-4" />
                    Predict
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setPrediction(null)}
                disabled={loading || !prediction}
                className="border-blue-200 dark:border-blue-600"
              >
                Reset
              </Button>
              {prediction && (
                <Button
                  variant="ghost"
                  onClick={() => window.alert("Download started!")}
                  className="text-blue-700 hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-blue-900/30"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              )}
            </div>
            {prediction && (
              <div className="mt-6 bg-blue-50 dark:bg-blue-950/40 rounded-lg p-6 shadow-inner border border-blue-100 dark:border-blue-800">
                <div className="flex items-center mb-4 gap-2">
                  <LineChart className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                  <span className="text-lg font-semibold text-blue-800 dark:text-blue-100">
                    Prediction Result
                  </span>
                </div>
                <div className="text-base text-blue-900 dark:text-blue-100 mb-3">{prediction.result}</div>
                <div className="text-md text-blue-900 dark:text-blue-200 font-semibold mb-2">Risk Insights:</div>
                <ul className="list-disc pl-6 text-sm text-blue-700 dark:text-blue-300 mb-3">
                  {prediction.risks.map((risk, idx) => <li key={idx}>{risk}</li>)}
                </ul>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-200 font-medium text-xs mr-2">
                    Confidence: {prediction.confidence}%
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PredictirixEnterpriseInterface;
