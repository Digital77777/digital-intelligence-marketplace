
import React from 'react';
import { Button } from "@/components/ui/button";
import { History } from 'lucide-react';

export interface VersionHistoryItem {
  version: string;
  date: string;
  author: string;
  changes: string;
}

interface VersionHistoryProps {
  history: VersionHistoryItem[];
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ history }) => {
  const handleRestore = (version: string) => {
    console.log(`Restoring to version ${version}`);
    // Future restore functionality would go here
  };

  return (
    <div className="space-y-4">
      {history.map((item, idx) => (
        <div key={idx} className="flex items-start p-4 bg-gray-800/30 rounded-lg border border-gray-800">
          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-4">
            <History className="h-5 w-5 text-[#6AC8FF]" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className="font-medium">Version {item.version}</h4>
              <span className="text-sm text-gray-400">{item.date}</span>
            </div>
            <p className="text-gray-300 text-sm">{item.changes}</p>
            <div className="mt-1 text-xs text-gray-500">by {item.author}</div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#6AC8FF] hover:bg-[#6AC8FF]/10"
            onClick={() => handleRestore(item.version)}
          >
            Restore
          </Button>
        </div>
      ))}
    </div>
  );
};

export default VersionHistory;
