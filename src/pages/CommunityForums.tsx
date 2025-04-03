
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
import { useForumData } from '@/hooks/useForumData';

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
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;
    
  const filteredGroups = searchQuery.trim() !== ''
    ? forumGroups.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : forumGroups;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 animate-fade-in">Community Forums</h1>
              <p className="text-muted-foreground mt-1">
                Join the conversation with other AI enthusiasts
              </p>
            </div>
            <ForumSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full md:w-96 grid-cols-2">
              <TabsTrigger value="categories">Forum Categories</TabsTrigger>
              <TabsTrigger value="groups">Community Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                  // Loading skeletons
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="border rounded-lg p-6 animate-pulse">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Skeleton className="h-7 w-40 mb-2" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                        <Skeleton className="h-9 w-32" />
                      </div>
                      <div className="mt-6">
                        {Array(3).fill(0).map((_, j) => (
                          <div key={j} className="py-3 border-b last:border-0 flex justify-between items-center">
                            <div>
                              <Skeleton className="h-5 w-56 mb-2" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-4 w-24" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : filteredCategories.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">No categories found matching your search.</p>
                    <button 
                      onClick={() => setSearchQuery('')} 
                      className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
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
                <h2 className="text-xl font-semibold">Community Groups</h2>
                <button 
                  onClick={handleCreateGroup}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <span>Create Group</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {groupsLoading ? (
                  // Loading skeletons for groups
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="border rounded-lg p-6 animate-pulse">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Skeleton className="h-7 w-40 mb-2" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                        <Skeleton className="h-9 w-32" />
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  ))
                ) : filteredGroups.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">
                      {searchQuery.trim() !== '' 
                        ? 'No groups found matching your search.' 
                        : 'No community groups available yet. Be the first to create one!'}
                    </p>
                    {searchQuery.trim() !== '' && (
                      <button 
                        onClick={() => setSearchQuery('')} 
                        className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  filteredGroups.map((group) => (
                    <ForumGroupCard
                      key={group.id}
                      group={group}
                      formatDate={formatDate}
                      canAccess={canAccess}
                    />
                  ))
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
