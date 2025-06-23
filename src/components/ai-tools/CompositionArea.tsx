import React from "react";
import { Button } from "@/components/ui/button";
import { StopCircle, Download } from "lucide-react";
import { Label } from "@/components/ui/label";

interface CompositionAreaProps {
  isComposing: boolean;
  musicUrl: string | null;
  handleStop: () => void;
}

const CompositionArea: React.FC<CompositionAreaProps> = ({
  isComposing,
  musicUrl,
  handleStop,
}) => {
  return (
    <>
      {isComposing && (
        <div className="mt-4 p-4 bg-purple-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center h-24 border border-purple-100 dark:border-slate-800">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-10 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-10 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2.5 h-10 bg-pink-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}

      {musicUrl && !isComposing && (
        <div className="mt-4 animate-fade-in">
          <Label className="font-semibold text-lg text-purple-800 dark:text-purple-300">
            Your Composition
          </Label>
          <div className="mt-2 p-3 bg-purple-50 dark:bg-slate-800/50 rounded-lg flex flex-col sm:flex-row items-center gap-4 border border-purple-100 dark:border-slate-800">
            <audio controls className="w-full">
              <source src={musicUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto flex-shrink-0"
              asChild
            >
              <a href={musicUrl} download>
                <Download className="h-4 w-4 mr-2" /> Download
              </a>
            </Button>
          </div>
        </div>
      )}
      {isComposing && (
        <Button
          type="button"
          variant="outline"
          className="flex items-center"
          onClick={handleStop}
        >
          <StopCircle className="h-4 w-4 mr-2" /> Stop
        </Button>
      )}
    </>
  );
};

export default CompositionArea;
