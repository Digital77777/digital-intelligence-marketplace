
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileStickyFooter from '../components/MobileStickyFooter';
import AIToolsDirectoryContent from '../components/ai-tools/AIToolsDirectoryContent';
import { useAIToolsSearch } from '../hooks/useAIToolsSearch';
import useScrollToTop from '../hooks/useScrollToTop';
import ProductionReadyChecklist from '../components/ProductionReadyChecklist';

const AIToolsDirectory = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const toolId = searchParams.get('toolId');

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
    isLoading,
  } = useAIToolsSearch();

  if (toolId) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <ProductionReadyChecklist toolId={toolId} />
          </div>
        </main>
        <Footer />
        <MobileStickyFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-white">
        <div className="max-w-7xl mx-auto">
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
