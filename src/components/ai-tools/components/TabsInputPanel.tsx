
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Play } from "lucide-react";
import { getInputDescription } from "../ToolInterface";

interface TabsInputPanelProps {
  toolCategory: string;
  placeholder: string;
  input: string;
  setInput: (input: string) => void;
  onProcess: () => void;
  isProcessing: boolean;
  getButtonText: () => string;
}

const TabsInputPanel: React.FC<TabsInputPanelProps> = ({
  toolCategory,
  placeholder,
  input,
  setInput,
  onProcess,
  isProcessing,
  getButtonText,
}) => (
  <Card className="flex-1 flex flex-col">
    <CardHeader>
      <CardTitle className="text-lg">Input</CardTitle>
      <CardDescription>
        {getInputDescription(toolCategory)}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col">
      <Textarea
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 min-h-[200px] resize-none"
      />
      <div className="mt-4 flex gap-2">
        <Button
          onClick={onProcess}
          disabled={!input.trim() || isProcessing}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              {getButtonText()}
            </>
          )}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default TabsInputPanel;
