
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Import our new components
import { ForumCard } from '@/components/forums/ForumCard';
import { ForumSearch } from '@/components/forums/ForumSearch';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  required_tier: string;
  created_at: string;
}

interface ForumTopic {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  reply_count?: number;
  author_username?: string;
}

const CommunityForums = () => {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [topicsByCategory, setTopicsByCategory] = useState<{[key: string]: ForumTopic[]}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, profile } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach(category => {
        fetchTopicsByCategory(category.id);
      });
    }
  }, [categories]);
  
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      setCategories(data || []);
      if (data && data.length > 0) {
        setSelectedCategory(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchTopicsByCategory = async (categoryId: string) => {
    try {
      // First get the topics
      const { data: topics, error } = await supabase
        .from('forum_topics')
        .select('*')
        .eq('category_id', categoryId)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      
      if (!topics) return;
      
      // Get the reply counts
      const topicsWithCounts = await Promise.all(
        topics.map(async (topic) => {
          // Get reply count
          const { count: replyCount, error: replyError } = await supabase
            .from('forum_replies')
            .select('*', { count: 'exact', head: true })
            .eq('topic_id', topic.id);
            
          if (replyError) throw replyError;
          
          // Get author username
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', topic.user_id)
            .single();
            
          if (userError && userError.code !== 'PGRST116') throw userError;
          
          return {
            ...topic,
            reply_count: replyCount || 0,
            author_username: userData?.username || 'Anonymous'
          };
        })
      );
      
      setTopicsByCategory(prev => ({
        ...prev,
        [categoryId]: topicsWithCounts
      }));
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };
  
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
    
    const category = categories.find(c => c.id === categoryId);
    if (category && !canAccess(category.required_tier)) {
      toast.error("Access restricted", {
        description: `This forum requires ${category.required_tier} tier access`,
        action: {
          label: "Upgrade",
          onClick: () => navigate('/pricing')
        }
      });
      return;
    }
    
    navigate(`/community/new-topic/${categoryId}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const filteredCategories = searchQuery.trim() !== '' 
    ? categories.filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : categories;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Community Forums</h1>
              <p className="text-muted-foreground mt-1">
                Join the conversation with other AI enthusiasts
              </p>
            </div>
            <ForumSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {filteredCategories.map((category) => (
              <ForumCard
                key={category.id}
                category={category}
                topics={topicsByCategory[category.id] || []}
                handleCreateTopic={handleCreateTopic}
                formatDate={formatDate}
                canAccess={canAccess}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityForums;
