
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UpgradeBannerProps {
  onUpgrade: () => void;
}

const UpgradeBanner: React.FC<UpgradeBannerProps> = ({ onUpgrade }) => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30 p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-400 mb-2">Unlock Pro Features</h3>
          <p className="text-purple-800/80 dark:text-purple-300/80 max-w-2xl">
            Upgrade to Pro to upload your own AI streams, access exclusive content, and join live coding sessions with AI experts.
          </p>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white min-w-[150px]"
          onClick={onUpgrade}
        >
          Upgrade to Pro
        </Button>
      </div>
    </Card>
  );
};

export default UpgradeBanner;
