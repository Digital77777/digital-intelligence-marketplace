
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
  
  // Type guard to check if an item is a forum group
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
  
  const filteredCategories = searchQuery.trim() !== '' 
    ? categories.filter((cat) => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;
    
  const filteredGroups = searchQuery.trim() !== ''
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
            <TabsList className="grid w-full md:w-96 grid-cols-2 bg-gray-800 text-white">
              <TabsTrigger value="categories" className="data-[state=active]:bg-[#2A5C8D]">Forum Categories</TabsTrigger>
              <TabsTrigger value="groups" className="data-[state=active]:bg-[#2A5C8D]">Community Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="mt-6">
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
                ) : filteredCategories.length === 0 ? (
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
                  filteredCategories.map((category) => (
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
            </TabsContent>
            
            <TabsContent value="groups" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#00FF88]">Community Groups</h2>
                <button 
                  onClick={handleCreateGroup}
                  className="bg-[#2A5C8D] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                >
                  <span>Create Group</span>
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
                ) : filteredGroups.length === 0 ? (
                  <div className="text-center py-12 bg-gray-800 rounded-lg">
                    <p className="text-lg text-gray-300">
                      {searchQuery.trim() !== '' 
                        ? 'No groups found matching your search.' 
                        : 'No community groups available yet. Be the first to create one!'}
                    </p>
                    {searchQuery.trim() !== '' && (
                      <button 
                        onClick={() => setSearchQuery('')} 
                        className="mt-4 text-[#00FF88] hover:text-green-300"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  filteredGroups.map((group) => {
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityForums;
