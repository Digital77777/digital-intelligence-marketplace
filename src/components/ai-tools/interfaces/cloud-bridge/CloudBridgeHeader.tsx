
import React from "react";
import { Button } from "@/components/ui/button";
import { Cloud, Settings, Download } from "lucide-react";

interface CloudBridgeHeaderProps {
  onBack?: () => void;
}

const CloudBridgeHeader: React.FC<CloudBridgeHeaderProps> = ({ onBack }) => {
  return (
    <header className="flex items-center gap-3 px-6 py-4 border-b border-blue-100 dark:border-blue-900/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      {onBack && (
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-blue-100 dark:hover:bg-blue-900/40">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </Button>
      )}
      <div className="flex items-center gap-2">
        <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">CloudBridge AI</h1>
      </div>
      <div className="ml-auto flex gap-2">
        <Button variant="outline" size="icon" className="border-blue-200 dark:border-blue-700">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="border-blue-200 dark:border-blue-700">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default CloudBridgeHeader;
