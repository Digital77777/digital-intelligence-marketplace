
import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import ToolDetailHeader from './components/ToolDetailHeader';
import ToolDetailTabs from './components/ToolDetailTabs';
import ToolDetailSidebar from './components/ToolDetailSidebar';

interface ToolDetailViewProps {
  tool: AIToolItem;
  onBack: () => void;
  onLaunch: () => void;
}

const ToolDetailView: React.FC<ToolDetailViewProps> = ({ tool, onBack, onLaunch }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToolDetailHeader tool={tool} onBack={onBack} onLaunch={onLaunch} />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ToolDetailTabs tool={tool} />
          </div>
          
          {/* Sidebar */}
          <ToolDetailSidebar tool={tool} onLaunch={onLaunch} />
        </div>
      </div>
    </div>
  );
};

export default ToolDetailView;
