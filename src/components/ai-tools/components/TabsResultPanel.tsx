
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, Sparkles } from "lucide-react";

interface TabsResultPanelProps {
  toolName: string;
  output: string;
  isProcessing: boolean;
  onSave: () => void;
  onProcessAgain: () => void;
}

const TabsResultPanel: React.FC<TabsResultPanelProps> = ({
  toolName,
  output,
  isProcessing,
  onSave,
  onProcessAgain,
}) => (
  <Card className="flex-1 flex flex-col">
    <CardHeader>
      <CardTitle className="text-lg">Result</CardTitle>
      <CardDescription>
        Generated output from {toolName}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col">
      {isProcessing ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Processing your request...</p>
          </div>
        </div>
      ) : output ? (
        <>
          <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-auto">
            <pre className="whitespace-pre-wrap text-sm">{output}</pre>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={onSave} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Save Result
            </Button>
            <Button onClick={onProcessAgain} variant="outline">
              Process Again
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Run the tool to see results here</p>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default TabsResultPanel;
