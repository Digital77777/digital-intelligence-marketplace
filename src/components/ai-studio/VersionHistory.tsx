
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { History, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const handleRestore = (version: string) => {
    toast({
      title: "Version Restored",
      description: `Successfully restored to version ${version}`,
    });
  };
  
  const toggleExpand = (version: string) => {
    setExpandedItem(expandedItem === version ? null : version);
  };

  return (
    <div className="space-y-4">
      {history.map((item, idx) => (
        <div 
          key={idx} 
          className={`flex items-start p-4 rounded-lg border transition-all duration-200 ${
            expandedItem === item.version 
              ? 'bg-gray-800/60 border-[#6AC8FF]/30' 
              : 'bg-gray-800/30 border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-4">
            <History className={`h-5 w-5 ${
              expandedItem === item.version ? 'text-[#6AC8FF]' : 'text-[#6AC8FF]/70'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div 
                className="font-medium cursor-pointer flex items-center" 
                onClick={() => toggleExpand(item.version)}
              >
                Version {item.version}
                {expandedItem === item.version ? (
                  <ChevronUp className="h-4 w-4 ml-1 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                )}
              </div>
              <span className="text-sm text-gray-400">{item.date}</span>
            </div>
            <p className={`text-gray-300 text-sm ${expandedItem === item.version ? 'mt-2' : 'line-clamp-1'}`}>
              {item.changes}
            </p>
            <div className="mt-1 text-xs text-gray-500">by {item.author}</div>
            
            {expandedItem === item.version && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Changes affected:</div>
                <div className="text-xs text-gray-500">
                  • Modified model parameters<br />
                  • Updated training dataset<br />
                  • Adjusted learning rate
                </div>
              </div>
            )}
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
