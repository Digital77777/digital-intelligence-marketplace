
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DirectoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const DirectoryTabs: React.FC<DirectoryTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="flex flex-wrap mb-8 p-1 bg-blue-50/50 border border-blue-100 rounded-lg h-auto">
      <TabsTrigger value="all" className="px-4 py-2.5 h-auto data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
        All Tools
      </TabsTrigger>
      <TabsTrigger value="popular" className="px-4 py-2.5 h-auto data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
        Popular
      </TabsTrigger>
      <TabsTrigger value="freemium" className="px-4 py-2.5 h-auto data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
        Freemium
      </TabsTrigger>
      <TabsTrigger value="basic" className="px-4 py-2.5 h-auto data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
        Basic
      </TabsTrigger>
      <TabsTrigger value="pro" className="px-4 py-2.5 h-auto data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
        Pro
      </TabsTrigger>
      <TabsTrigger value="compare" className="px-4 py-2.5 h-auto data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
        Compare Tiers
      </TabsTrigger>
    </TabsList>
  );
};

export default DirectoryTabs;
