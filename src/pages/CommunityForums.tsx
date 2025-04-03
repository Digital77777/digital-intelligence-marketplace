
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
  const [activeTab, setActiveTab] = useState<string>('categories');
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
    <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2A5C8D]">Community Forums</h1>
              <p className="text-gray-300 mt-1">
                Join the conversation with other AI enthusiasts
              </p>
            </div>
            <ForumSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full md:w-96 grid-cols-4 bg-gray-800 text-white">
              <TabsTrigger value="welcome" className="data-[state=active]:bg-[#2A5C8D]">Welcome!</TabsTrigger>
              <TabsTrigger value="beginner" className="data-[state=active]:bg-[#2A5C8D]">Beginner Questions</TabsTrigger>
              <TabsTrigger value="showcase" className="data-[state=active]:bg-[#2A5C8D]">Project Showcase</TabsTrigger>
              <TabsTrigger value="pro" className="data-[state=active]:bg-[#2A5C8D] relative">
                Pro Discussions
                {currentTier !== 'pro' && (
                  <span className="absolute -top-1 -right-1 text-xs">🔒</span>
                )}
              </TabsTrigger>
            </TabsList>
            
            {/* Welcome Tab */}
            <TabsContent value="welcome" className="mt-6">
              <ForumWelcomeTab />
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
                setSearchQuery={setSearchQuery} // Pass the setSearchQuery function
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
              className="bg-[#2A5C8D] hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors"
            >
              <span>Start a Discussion</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Sub-components for tabs
const ForumWelcomeTab: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-[#00FF88] mb-4">Welcome to the Community Forums!</h2>
      <p className="text-gray-300 mb-6">
        This is the place to connect with fellow AI enthusiasts, share your projects, ask questions, and learn from others.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold mb-2 text-blue-300">Community Guidelines</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-2">
            <li>Be respectful and supportive of other members</li>
            <li>Share knowledge and help others learn</li>
            <li>Give credit when using others' work</li>
            <li>Keep discussions on-topic and constructive</li>
          </ul>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold mb-2 text-blue-300">Getting Started</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-2">
            <li>Introduce yourself in the "New Members" thread</li>
            <li>Browse popular topics to see what others are discussing</li>
            <li>Check the "Beginner Questions" tab for common questions</li>
            <li>Visit "Project Showcase" to share your work and get feedback</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-[#2A5C8D]/20 p-6 rounded-lg border border-[#2A5C8D]/40">
        <h3 className="text-xl font-bold mb-3 text-[#00FF88]">Featured Thread</h3>
        <div className="mb-4">
          <h4 className="text-lg font-semibold">How to Build Your First Chatbot [Freemium Guide]</h4>
          <p className="text-gray-400 text-sm">Posted by Admin • 15 replies • 3 days ago</p>
        </div>
        <p className="text-gray-300 mb-4">
          In this comprehensive guide, I'll walk you through creating a basic chatbot using only free tools available in our Freemium tier. Perfect for beginners!
        </p>
        <button className="text-[#00FF88] hover:text-green-400 font-medium flex items-center">
          Read Thread 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  setSearchQuery: (query: string) => void; // Add the setSearchQuery prop
}> = ({ categories, topicsByCategory, isLoading, handleCreateTopic, formatDate, canAccess, setSearchQuery }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {isLoading ? (
        // Loading skeletons
        Array(3).fill(0).map((_, i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-6 animate-pulse bg-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-7 w-40 mb-2 bg-gray-700" />
                <Skeleton className="h-4 w-64 bg-gray-700" />
              </div>
              <Skeleton className="h-9 w-32 bg-gray-700" />
            </div>
            <div className="mt-6">
              {Array(3).fill(0).map((_, j) => (
                <div key={j} className="py-3 border-b border-gray-700 last:border-0 flex justify-between items-center">
                  <div>
                    <Skeleton className="h-5 w-56 mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-32 bg-gray-700" />
                  </div>
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-lg text-gray-300">No categories found matching your search.</p>
          <button 
            onClick={() => setSearchQuery('')} 
            className="mt-4 text-[#00FF88] hover:text-green-300"
          >
            Clear search
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
        <h2 className="text-xl font-semibold text-[#00FF88]">Project Showcase</h2>
        <button 
          onClick={handleCreateGroup}
          className="bg-[#2A5C8D] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <span>Share Your Project</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {groupsLoading ? (
          // Loading skeletons for groups
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="border border-gray-700 rounded-lg p-6 animate-pulse bg-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Skeleton className="h-7 w-40 mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-64 bg-gray-700" />
                </div>
                <Skeleton className="h-9 w-32 bg-gray-700" />
              </div>
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-4 w-32 bg-gray-700" />
                <Skeleton className="h-4 w-24 bg-gray-700" />
              </div>
            </div>
          ))
        ) : !Array.isArray(forumGroups) || forumGroups.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-lg text-gray-300">
              No projects found. Be the first to share your work!
            </p>
            <button 
              onClick={handleCreateGroup} 
              className="mt-4 text-[#00FF88] hover:text-green-300"
            >
              Share Your Project
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
      <div className="mt-8 bg-gray-800/80 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-[#00FF88]">Featured Project</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
            <span className="text-gray-400">Image Placeholder</span>
          </div>
          <div className="w-full md:w-2/3">
            <h4 className="text-lg font-semibold">Computer Vision for Bird Species Identification</h4>
            <p className="text-gray-400 text-sm mb-3">By Alex Chen • 24 members • Posted 5 days ago</p>
            <p className="text-gray-300 mb-4">
              I built this project using the Freemium tools available on this platform. It can identify over 100 bird species with 85% accuracy using a custom trained model.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-900/40 text-blue-300 px-2 py-1 rounded text-xs">#ComputerVision</span>
              <span className="bg-green-900/40 text-green-300 px-2 py-1 rounded text-xs">#FreemiumProject</span>
              <span className="bg-purple-900/40 text-purple-300 px-2 py-1 rounded text-xs">#MachineLearning</span>
            </div>
            <button className="bg-[#2A5C8D] hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center text-sm">
              View Project
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
      <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
        <div className="w-16 h-16 bg-[#2A5C8D]/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Pro Discussions Locked</h2>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">
          Upgrade to our Pro tier to access exclusive discussions on advanced AI topics, model development, and industry insights.
        </p>
        <button 
          onClick={() => navigate('/pricing')}
          className="bg-gradient-to-r from-[#2A5C8D] to-[#00FF88] text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Upgrade to Pro
        </button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-[#00FF88] mb-4">Pro Discussions</h2>
        <p className="text-gray-300 mb-6">
          Welcome to the Pro discussion area. Here you can engage with other Pro members about advanced AI topics.
        </p>
        
        {/* Sample Pro Threads */}
        <div className="space-y-4">
          {[
            {
              title: "Enterprise AI Implementation Strategies",
              author: "Maria K.",
              replies: 28,
              date: "2 days ago"
            },
            {
              title: "Custom Model Development for Medical Imaging",
              author: "Dr. James W.",
              replies: 42,
              date: "5 days ago"
            },
            {
              title: "Optimizing GPT-4 for Production Applications",
              author: "Rajeev S.",
              replies: 19,
              date: "1 week ago"
            }
          ].map((thread, index) => (
            <div key={index} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-[#00FF88]/50 transition-colors">
              <h3 className="text-lg font-semibold">{thread.title}</h3>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Posted by {thread.author}</span>
                <span>{thread.replies} replies • {thread.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityForums;
