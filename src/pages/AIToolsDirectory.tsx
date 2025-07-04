
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import DirectoryHeader from '@/components/ai-tools/components/DirectoryHeader';
import AIToolsDirectoryContent from '@/components/ai-tools/AIToolsDirectoryContent';
import { useAIToolsSearch } from '@/components/ai-tools/hooks/useAIToolsSearch';
import useScrollToTop from '@/hooks/useScrollToTop';

const AIToolsDirectory = () => {
  useScrollToTop();
  
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTier,
    setSelectedTier,
    viewType,
    setViewType,
    activeTab,
    setActiveTab,
    allPlatformTools,
    filteredTools,
    isLoading
  } = useAIToolsSearch();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <DirectoryHeader totalTools={allPlatformTools?.length || 0} />
          
          <AIToolsDirectoryContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTier={selectedTier}
            setSelectedTier={setSelectedTier}
            viewType={viewType}
            setViewType={setViewType}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            allPlatformTools={allPlatformTools}
            filteredTools={filteredTools}
            isLoading={isLoading}
          />
        </div>
      </main>
      
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default AIToolsDirectory;
