
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useTier } from '@/context/TierContext';
import { createMockAIStream } from '@/utils/dataConverters';
import { AIStream } from '@/types/AIStreams';
import { getCategoryIcon, getCategoryColor, formatDate } from '@/utils/streamUtils';

// Components
import FeaturedStreams from '@/components/ai-streams/FeaturedStreams';
import StreamsSearch from '@/components/ai-streams/StreamsSearch';
import StreamsGrid from '@/components/ai-streams/StreamsGrid';
import UpgradeBanner from '@/components/ai-streams/UpgradeBanner';

const AIStreams = () => {
  const [streams, setStreams] = useState<AIStream[]>([]);
  const [featuredStreams, setFeaturedStreams] = useState<AIStream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { currentTier, upgradePrompt } = useTier();
  const location = useLocation();

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    setIsLoading(true);
    
    try {
      // This is a mock implementation
      const mockAIStreams: AIStream[] = [
        createMockAIStream("1", "Building an NLP Model from Scratch", "123"),
        createMockAIStream("2", "Live Demo: Computer Vision Object Detection", "456"),
        createMockAIStream("3", "Research Presentation: Advances in Generative AI", "789"),
        createMockAIStream("4", "Live Coding: Building a Recommender System", "101")
      ];
      
      // Add more details to our mock data
      mockAIStreams[0].description = "Learn how to create a natural language processing model using Python and TensorFlow";
      mockAIStreams[0].category = "tutorial";
      mockAIStreams[0].duration = "45:22";
      mockAIStreams[0].views = 1250;
      mockAIStreams[0].author = {
        id: "123",
        username: "ai_enthusiast",
        avatar_url: "https://i.pravatar.cc/150?img=1"
      };
      
      mockAIStreams[1].description = "Watch as we demonstrate a real-time object detection system using computer vision";
      mockAIStreams[1].category = "demo";
      mockAIStreams[1].duration = "32:15";
      mockAIStreams[1].views = 876;
      mockAIStreams[1].author = {
        id: "456",
        username: "vision_expert",
        avatar_url: "https://i.pravatar.cc/150?img=2"
      };
      
      mockAIStreams[2].description = "A detailed presentation about the latest breakthroughs in generative artificial intelligence";
      mockAIStreams[2].category = "research";
      mockAIStreams[2].duration = "1:12:45";
      mockAIStreams[2].views = 2140;
      mockAIStreams[2].author = {
        id: "789",
        username: "research_lead",
        avatar_url: "https://i.pravatar.cc/150?img=3"
      };
      
      mockAIStreams[3].description = "Join us for a live coding session where we build a movie recommender system";
      mockAIStreams[3].category = "live";
      mockAIStreams[3].duration = "1:05:30";
      mockAIStreams[3].views = 1872;
      mockAIStreams[3].author = {
        id: "101",
        username: "code_pro",
        avatar_url: "https://i.pravatar.cc/150?img=4"
      };
      
      setStreams(mockAIStreams);
      setFeaturedStreams(mockAIStreams.slice(0, 2));
      
    } catch (error) {
      console.error("Error fetching AI streams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredStreams = () => {
    let filtered = [...streams];
    
    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(stream => stream.category === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        stream => 
          stream.title.toLowerCase().includes(query) || 
          stream.description.toLowerCase().includes(query) ||
          (stream.author?.username.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <div className="relative rounded-xl overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-purple-900 py-16 px-8 rounded-xl">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Streams</h1>
                <p className="text-indigo-100 text-lg mb-6">
                  Watch tutorials, research presentations, live demos, and coding sessions from AI experts and community members.
                </p>
                {currentTier === 'pro' ? (
                  <Button className="bg-white text-purple-900 hover:bg-indigo-50">
                    Upload Your Own Stream
                  </Button>
                ) : (
                  <Button className="bg-white text-purple-900 hover:bg-indigo-50" onClick={() => upgradePrompt('pro')}>
                    Upgrade to Upload Streams
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Featured streams */}
          <FeaturedStreams 
            streams={featuredStreams} 
            getCategoryIcon={getCategoryIcon} 
            getCategoryColor={getCategoryColor} 
          />

          {/* Stream browser */}
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
          
          {/* Pro upgrade banner */}
          {currentTier !== 'pro' && (
            <UpgradeBanner onUpgrade={() => upgradePrompt('pro')} />
          )}
        </div>
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default AIStreams;
