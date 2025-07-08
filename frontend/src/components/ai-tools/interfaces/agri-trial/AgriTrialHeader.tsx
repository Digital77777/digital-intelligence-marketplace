
import React from "react";
import { Button } from "@/components/ui/button";
import { Beaker, Settings, Download } from "lucide-react";

interface AgriTrialHeaderProps {
  onBack?: () => void;
}

const AgriTrialHeader: React.FC<AgriTrialHeaderProps> = ({ onBack }) => {
  return (
    <header className="flex items-center gap-3 px-6 py-4 border-b border-green-100 dark:border-green-900/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      {onBack && (
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-green-100 dark:hover:bg-green-900/40">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </Button>
      )}
      <div className="flex items-center gap-2">
        <Beaker className="h-6 w-6 text-green-600 dark:text-green-400" />
        <h1 className="text-xl font-bold text-green-900 dark:text-green-100">AgriTrial AI</h1>
      </div>
      <div className="ml-auto flex gap-2">
        <Button variant="outline" size="icon" className="border-green-200 dark:border-green-700">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="border-green-200 dark:border-green-700">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default AgriTrialHeader;
