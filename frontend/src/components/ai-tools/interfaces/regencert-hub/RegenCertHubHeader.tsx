
import React from "react";
import { Button } from "@/components/ui/button";
import { BadgePercent, Leaf, ShieldCheck } from "lucide-react";

interface RegenCertHubHeaderProps {
  onBack?: () => void;
}

const RegenCertHubHeader: React.FC<RegenCertHubHeaderProps> = ({ onBack }) => (
  <header className="flex items-center gap-3 px-6 py-4 border-b border-green-100 dark:border-green-900/40 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm">
    {onBack && (
      <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-green-100 dark:hover:bg-green-900/40">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Button>
    )}
    <div className="flex items-center gap-2">
      <BadgePercent className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
      <h1 className="text-xl font-bold text-green-900 dark:text-green-100">RegenCert Hub</h1>
    </div>
    <div className="ml-auto flex gap-2">
      <Button variant="outline" size="icon" className="border-green-200 dark:border-green-700">
        <Leaf className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="icon" className="border-green-200 dark:border-green-700">
        <ShieldCheck className="h-5 w-5" />
      </Button>
    </div>
  </header>
);

export default RegenCertHubHeader;
