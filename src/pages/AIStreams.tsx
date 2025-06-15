
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useTier } from '@/context/TierContext';
import { getCategoryIcon, getCategoryColor, formatDate } from '@/utils/streamUtils';
import { useVideoStreams } from '@/hooks/useVideoStreams';
import { VideoStream } from '@/types/videoStreams';

// Components
import FeaturedStreams from '@/components/ai-streams/FeaturedStreams';
import StreamsSearch from '@/components/ai-streams/StreamsSearch';
import StreamsGrid from '@/components/ai-streams/StreamsGrid';
import UpgradeBanner from '@/components/ai-streams/UpgradeBanner';

const AIStreams = () => {
  const { data: streams = [], isLoading } = useVideoStreams();
  const [featuredStreams, setFeaturedStreams] = useState<VideoStream[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { currentTier, upgradePrompt } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    setFeaturedStreams(streams.slice(0, 2));
  }, [streams]);

  const getFilteredStreams = () => {
    let filtered = [...streams];
    
    if (activeTab !== "all") {
      filtered = filtered.filter(stream => stream.category === activeTab);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        stream => 
          stream.title.toLowerCase().includes(query) || 
          (stream.description && stream.description.toLowerCase().includes(query)) ||
          (stream.author?.username?.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const handleUploadClick = () => {
    if (currentTier === 'basic' || currentTier === 'pro') {
      navigate('/ai-streams/upload');
    } else {
      upgradePrompt('basic');
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-xl overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-purple-900 py-16 px-8 rounded-xl">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Streams</h1>
                <p className="text-indigo-100 text-lg mb-6">
                  Watch tutorials, research presentations, live demos, and coding sessions from AI experts and community members.
                </p>
                <Button className="bg-white text-purple-900 hover:bg-indigo-50" onClick={handleUploadClick}>
                  {currentTier === 'basic' || currentTier === 'pro' ? 'Upload Your Stream' : 'Upgrade to Upload'}
                </Button>
              </div>
            </div>
          </div>

          <FeaturedStreams 
            streams={featuredStreams} 
            getCategoryIcon={getCategoryIcon} 
            getCategoryColor={getCategoryColor} 
          />

          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <h2 className="text-2xl font-semibold">Browse Streams</h2>
              <StreamsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="demo">Demos</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
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
              </TabsContent>
            </Tabs>
          </div>
          
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
