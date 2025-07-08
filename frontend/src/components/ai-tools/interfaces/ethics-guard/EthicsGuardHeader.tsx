
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, Settings, Download } from "lucide-react";

interface EthicsGuardHeaderProps {
  onBack?: () => void;
}

const EthicsGuardHeader: React.FC<EthicsGuardHeaderProps> = ({ onBack }) => {
  return (
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
  );
};

export default EthicsGuardHeader;
