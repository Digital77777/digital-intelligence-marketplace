import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our components
import { ForumCard } from '@/components/forums/ForumCard';
import { ForumGroupCard } from '@/components/forums/ForumGroupCard';
import { ForumSearch } from '@/components/forums/ForumSearch';
import { useForumData, ForumGroup } from '@/hooks/useForumData';

// Type guard for forum groups
const isForumGroup = (item: any): item is ForumGroup => {
  return item && 
    typeof item === 'object' && 
    'name' in item && 
    'description' in item &&
    'category' in item && 
    'tier_required' in item &&
    'is_private' in item &&
    'member_count' in item;
};

const CommunityForums = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const { user } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();
  
  const {
    categories,
    topicsByCategory,
    forumGroups,
    categoriesLoading,
    topicsLoading,
    groupsLoading,
    isLoading,
    formatDate
  } = useForumData();
  
  // Initialize selected category after categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);
  
  const handleCreateTopic = (categoryId: string) => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to create a new topic",
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth')
        }
      });
      return;
    }
    
    navigate(`/community/new-topic/${categoryId}`);
  };
  
  const handleCreateGroup = () => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to create a new group",
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth')
        }
      });
      return;
    }
    
    navigate('/community/new-group');
  };

  const handleJoinDiscussion = () => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to join discussions",
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth')
        }
      });
      return;
    }
    
    // Navigate to the community discussions
    setActiveTab('beginner');
    toast.success("Welcome to the discussions!");
  };
  
  const filteredCategories = searchQuery.trim() !== '' 
    ? categories.filter((cat) => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cat.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;
    
  const filteredGroups = searchQuery.trim() !== '' && Array.isArray(forumGroups)
    ? forumGroups.filter((group) => 
        isForumGroup(group) && (
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : forumGroups;
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-black to-[#0C0C14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#00FFFF] text-shadow-glow">Cyber Forum</h1>
              <p className="text-gray-300 mt-1 font-light">
                Connect with fellow <span className="text-[#FF007F]">digital pioneers</span> in our network
              </p>
            </div>
            <ForumSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full md:w-96 grid-cols-4 bg-black border border-[#00FFFF]/30 p-1 rounded-md">
              <TabsTrigger 
                value="welcome" 
                className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] data-[state=active]:shadow-[0_0_10px_rgba(0,255,255,0.5)] text-white rounded-sm transition-all duration-300"
              >
                Terminal
              </TabsTrigger>
              <TabsTrigger 
                value="beginner" 
                className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] data-[state=active]:shadow-[0_0_10px_rgba(0,255,255,0.5)] text-white rounded-sm transition-all duration-300"
              >
                Queries
              </TabsTrigger>
              <TabsTrigger 
                value="showcase" 
                className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF] data-[state=active]:shadow-[0_0_10px_rgba(0,255,255,0.5)] text-white rounded-sm transition-all duration-300"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="pro" 
                className="data-[state=active]:bg-[#8000FF]/10 data-[state=active]:text-[#8000FF] data-[state=active]:shadow-[0_0_10px_rgba(128,0,255,0.5)] text-white rounded-sm transition-all duration-300 relative"
              >
                NEO
                {currentTier !== 'pro' && (
                  <span className="absolute -top-1 -right-1 text-xs text-[#FF007F]">🔒</span>
                )}
              </TabsTrigger>
            </TabsList>
            
            {/* Welcome Tab */}
            <TabsContent value="welcome" className="mt-6">
              <ForumWelcomeTab onJoinDiscussion={handleJoinDiscussion} />
            </TabsContent>
            
            {/* Beginner Questions Tab */}
            <TabsContent value="beginner" className="mt-6">
              <ForumBeginnerQuestionsTab 
                categories={filteredCategories} 
                topicsByCategory={topicsByCategory}
                isLoading={isLoading}
                handleCreateTopic={handleCreateTopic}
                formatDate={formatDate}
                canAccess={canAccess}
                setSearchQuery={setSearchQuery}
              />
            </TabsContent>
            
            {/* Project Showcase Tab */}
            <TabsContent value="showcase" className="mt-6">
              <ForumProjectShowcaseTab 
                forumGroups={filteredGroups}
                groupsLoading={groupsLoading}
                handleCreateGroup={handleCreateGroup}
                formatDate={formatDate}
                canAccess={canAccess}
              />
            </TabsContent>
            
            {/* Pro Discussions Tab */}
            <TabsContent value="pro" className="mt-6">
              <ForumProDiscussionsTab 
                currentTier={currentTier}
                navigate={navigate}
              />
            </TabsContent>
          </Tabs>
          
          {/* Sticky CTA Button */}
          <div className="fixed bottom-8 right-8">
            <button 
              onClick={() => handleCreateTopic(selectedCategory || '')}
              className="bg-[#FF007F] hover:bg-[#D6006A] text-white px-6 py-3 rounded-full shadow-[0_0_15px_rgba(255,0,127,0.6)] flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <span className="font-bold tracking-wide">NEW THREAD</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Add custom styles for the cyberpunk theme */}
      <style>
        {`
          .text-shadow-glow {
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
          }
          
          @keyframes neon-pulse {
            0% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3); }
            50% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5); }
            100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3); }
          }
          
          .neon-border {
            border: 1px solid rgba(0, 255, 255, 0.3);
            animation: neon-pulse 2s infinite;
          }
          
          .neon-text {
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.7);
          }
          
          .purple-glow {
            text-shadow: 0 0 5px rgba(128, 0, 255, 0.7);
          }
          
          .pink-glow {
            text-shadow: 0 0 5px rgba(255, 0, 127, 0.7);
          }
        `}
      </style>
    </div>
  );
};

// Sub-components for tabs
const ForumWelcomeTab: React.FC<{ onJoinDiscussion: () => void }> = ({ onJoinDiscussion }) => {
  return (
    <div className="bg-black/80 rounded-lg p-6 border border-[#00FFFF]/30 neon-border">
      <h2 className="text-2xl font-bold text-[#00FFFF] mb-4 neon-text">WELCOME TO THE NETWORK</h2>
      <p className="text-gray-300 mb-6 font-light">
        Connect with the neural collective. Share insights, query for solutions, and upload your digital innovations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-black/60 p-4 rounded-lg border border-[#FF007F]/40 hover:border-[#FF007F]/70 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2 text-[#FF007F] pink-glow">Protocol Guidelines</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-2 font-light">
            <li>Respect all neural nodes in the collective</li>
            <li>Share knowledge packets without restriction</li>
            <li>Attribute source code to original creators</li>
            <li>Keep signal-to-noise ratio optimal</li>
          </ul>
        </div>
        
        <div className="bg-black/60 p-4 rounded-lg border border-[#8000FF]/40 hover:border-[#8000FF]/70 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2 text-[#8000FF] purple-glow">Init Sequence</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-2 font-light">
            <li>Run your system introduction in "New Users" thread</li>
            <li>Scan high-traffic discussions for context</li>
            <li>Submit queries to the "Beginners" database</li>
            <li>Upload your projects to the neural showcase</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-black/60 p-6 rounded-lg border border-[#00FFFF]/40 hover:border-[#00FFFF]/70 transition-all duration-300">
        <h3 className="text-xl font-bold mb-3 text-[#00FFFF] neon-text">FEATURED TRANSMISSION</h3>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-white">Neural Network Architecture for Beginners [DATA PACK]</h4>
          <p className="text-gray-400 text-sm">Transmitted by SYS.ADMIN • 15 responses • 3 cycles ago</p>
        </div>
        <p className="text-gray-300 mb-4 font-light">
          Complete guide to building your first neural network using open-source tools. Optimized for those with minimal processing power.
        </p>
        <button 
          onClick={onJoinDiscussion}
          className="text-[#00FFFF] hover:text-[#4DFFFF] font-medium flex items-center group transition-all duration-300"
        >
          ACCESS DATA 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ForumBeginnerQuestionsTab: React.FC<{
  categories: any[];
  topicsByCategory: any;
  isLoading: boolean;
  handleCreateTopic: (categoryId: string) => void;
  formatDate: (date: string) => string;
  canAccess: (tier: string) => boolean;
  setSearchQuery: (query: string) => void;
}> = ({ categories, topicsByCategory, isLoading, handleCreateTopic, formatDate, canAccess, setSearchQuery }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {isLoading ? (
        // Loading skeletons
        Array(3).fill(0).map((_, i) => (
          <div key={i} className="border border-[#00FFFF]/20 rounded-lg p-6 animate-pulse bg-black/60">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-7 w-40 mb-2 bg-[#00FFFF]/5" />
                <Skeleton className="h-4 w-64 bg-[#00FFFF]/5" />
              </div>
              <Skeleton className="h-9 w-32 bg-[#00FFFF]/5" />
            </div>
            <div className="mt-6">
              {Array(3).fill(0).map((_, j) => (
                <div key={j} className="py-3 border-b border-[#00FFFF]/10 last:border-0 flex justify-between items-center">
                  <div>
                    <Skeleton className="h-5 w-56 mb-2 bg-[#00FFFF]/5" />
                    <Skeleton className="h-4 w-32 bg-[#00FFFF]/5" />
                  </div>
                  <Skeleton className="h-4 w-24 bg-[#00FFFF]/5" />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-black/60 rounded-lg border border-[#FF007F]/30">
          <p className="text-lg text-gray-300">No categories matching your search parameters detected.</p>
          <button 
            onClick={() => setSearchQuery('')} 
            className="mt-4 text-[#FF007F] hover:text-[#FF4DA1] transition-colors duration-300"
          >
            Reset search filters
          </button>
        </div>
      ) : (
        categories.map((category) => (
          <ForumCard
            key={category.id}
            category={category}
            topics={topicsByCategory[category.id] || []}
            handleCreateTopic={handleCreateTopic}
            formatDate={formatDate}
            canAccess={canAccess}
          />
        ))
      )}
    </div>
  );
};

const ForumProjectShowcaseTab: React.FC<{
  forumGroups: any;
  groupsLoading: boolean;
  handleCreateGroup: () => void;
  formatDate: (date: string) => string;
  canAccess: (tier: string) => boolean;
}> = ({ forumGroups, groupsLoading, handleCreateGroup, formatDate, canAccess }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#8000FF] purple-glow">PROJECT SHOWCASE</h2>
        <button 
          onClick={handleCreateGroup}
          className="bg-[#8000FF] hover:bg-[#6A00D9] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-300 shadow-[0_0_10px_rgba(128,0,255,0.5)]"
        >
          <span>UPLOAD PROJECT</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {groupsLoading ? (
          // Loading skeletons for groups
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="border border-[#8000FF]/20 rounded-lg p-6 animate-pulse bg-black/60">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Skeleton className="h-7 w-40 mb-2 bg-[#8000FF]/5" />
                  <Skeleton className="h-4 w-64 bg-[#8000FF]/5" />
                </div>
                <Skeleton className="h-9 w-32 bg-[#8000FF]/5" />
              </div>
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-4 w-32 bg-[#8000FF]/5" />
                <Skeleton className="h-4 w-24 bg-[#8000FF]/5" />
              </div>
            </div>
          ))
        ) : !Array.isArray(forumGroups) || forumGroups.length === 0 ? (
          <div className="text-center py-12 bg-black/60 rounded-lg border border-[#8000FF]/30">
            <p className="text-lg text-gray-300">
              No projects detected in database. Be the first to upload.
            </p>
            <button 
              onClick={handleCreateGroup} 
              className="mt-4 text-[#8000FF] hover:text-[#A14DFF] transition-colors duration-300"
            >
              Initialize Project Upload
            </button>
          </div>
        ) : (
          forumGroups.map((group) => {
            if (isForumGroup(group)) {
              return (
                <ForumGroupCard
                  key={group.id}
                  group={group}
                  formatDate={formatDate}
                  canAccess={canAccess}
                />
              );
            }
            return null;
          })
        )}
      </div>

      {/* Featured Showcase */}
      <div className="mt-8 bg-black/80 rounded-lg p-6 border border-[#8000FF]/30">
        <h3 className="text-xl font-bold mb-4 text-[#8000FF] purple-glow">FEATURED PROJECT</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 bg-gradient-to-br from-[#8000FF]/20 to-[#FF007F]/20 rounded-lg aspect-video flex items-center justify-center border border-[#8000FF]/40">
            <span className="text-gray-400 font-mono">IMAGE.DATA</span>
          </div>
          <div className="w-full md:w-2/3">
            <h4 className="text-lg font-semibold text-white">Computer Vision for Biometric Authentication</h4>
            <p className="text-gray-400 text-sm mb-3">By CyberNode.Alex • 24 connected nodes • Uploaded 5 cycles ago</p>
            <p className="text-gray-300 mb-4 font-light">
              Neural network trained on synthetic data capable of identifying 37 unique biometric markers with 98.7% accuracy. Built using freely available components.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#00FFFF]/10 text-[#00FFFF] px-2 py-1 rounded text-xs border border-[#00FFFF]/30">#ComputerVision</span>
              <span className="bg-[#8000FF]/10 text-[#8000FF] px-2 py-1 rounded text-xs border border-[#8000FF]/30">#Neural</span>
              <span className="bg-[#FF007F]/10 text-[#FF007F] px-2 py-1 rounded text-xs border border-[#FF007F]/30">#Biometrics</span>
            </div>
            <button className="bg-black text-[#8000FF] hover:text-[#A14DFF] border border-[#8000FF] px-3 py-1.5 rounded flex items-center text-sm transition-all duration-300 hover:shadow-[0_0_10px_rgba(128,0,255,0.3)]">
              Access Project Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForumProDiscussionsTab: React.FC<{
  currentTier: string;
  navigate: any;
}> = ({ currentTier, navigate }) => {
  if (currentTier !== 'pro') {
    return (
      <div className="bg-black/80 rounded-lg p-8 text-center border border-[#FF007F]/40">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FF007F]/20 to-black rounded-full flex items-center justify-center mx-auto mb-4 border border-[#FF007F]/50">
          <span className="text-3xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-[#FF007F] pink-glow">ACCESS RESTRICTED</h2>
        <p className="text-gray-300 mb-6 max-w-md mx-auto font-light">
          Upgrade to our NEO tier to link with our advanced neural network. Access restricted discussions on quantum algorithms, synthetic intelligence, and next-gen neural interfaces.
        </p>
        <button 
          onClick={() => navigate('/pricing')}
          className="bg-gradient-to-r from-[#FF007F] to-[#8000FF] text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(255,0,127,0.5)]"
        >
          UPGRADE TO NEO
        </button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-black/80 rounded-lg p-6 border border-[#FF007F]/30">
        <h2 className="text-2xl font-bold text-[#FF007F] mb-4 pink-glow">NEO TRANSMISSIONS</h2>
        <p className="text-gray-300 mb-6 font-light">
          Welcome to the NEO network. You have been granted elevated access privileges to our most advanced discourse nodes.
        </p>
        
        {/* Sample Pro Threads */}
        <div className="space-y-4">
          {[
            {
              title: "Quantum Algorithm Implementation Protocols",
              author: "NEO.Maria",
              replies: 28,
              date: "2 cycles ago"
            },
            {
              title: "Neural Interfaces for Medical Diagnostic Systems",
              author: "DR.James",
              replies: 42,
              date: "5 cycles ago"
            },
            {
              title: "Synthetic Intelligence Consciousness Parameters",
              author: "CyberNode.Rajeev",
              replies: 19,
              date: "1 revolution ago"
            }
          ].map((thread, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-black to-[#FF007F]/5 rounded-lg border border-[#FF007F]/30 hover:border-[#FF007F]/70 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-white">{thread.title}</h3>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Transmitted by {thread.author}</span>
                <span>{thread.replies} responses • {thread.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityForums;
