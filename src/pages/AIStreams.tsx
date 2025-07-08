
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { useTier } from '@/context/TierContext';
import { getCategoryIcon, getCategoryColor, formatDate } from '@/utils/streamUtils';
import { useVideoStreams } from '@/hooks/useVideoStreams';
import { useStreamFilters } from '@/hooks/useStreamFilters';
import { useFeaturedStreams } from '@/hooks/useFeaturedStreams';

// Components
import PageHeader from '@/components/ai-streams/PageHeader';
import FeaturedStreams from '@/components/ai-streams/FeaturedStreams';
import StreamFilters from '@/components/ai-streams/StreamFilters';
import StreamsGrid from '@/components/ai-streams/StreamsGrid';
import UpgradeBanner from '@/components/ai-streams/UpgradeBanner';

const AIStreams = () => {
  const { data: streams = [], isLoading } = useVideoStreams();
  const { currentTier, upgradePrompt } = useTier();
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    getFilteredStreams,
  } = useStreamFilters(streams);
  const featuredStreams = useFeaturedStreams(streams);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <PageHeader />

          <FeaturedStreams 
            streams={featuredStreams} 
            getCategoryIcon={getCategoryIcon} 
            getCategoryColor={getCategoryColor} 
          />

          <StreamFilters
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <StreamsGrid 
            streams={getFilteredStreams()} 
            isLoading={isLoading}
            getCategoryIcon={getCategoryIcon}
            formatDate={formatDate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={activeTab}
            setSelectedCategory={setActiveTab}
            selectedTier="all"
            setSelectedTier={() => {}}
          />
          
          {currentTier === 'freemium' && (
            <UpgradeBanner onUpgrade={() => upgradePrompt('basic')} />
          )}
        </div>
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default AIStreams;
