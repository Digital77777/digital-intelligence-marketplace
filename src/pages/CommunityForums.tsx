
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
// Import Button from shadcn/ui
import { Button } from "@/components/ui/button";

import { useForumData } from '@/hooks/useForumData';
import ForumCategorySidebar from "@/components/forums/ForumCategorySidebar";
import SimpleForumCard from "@/components/forums/SimpleForumCard";

const CommunityForums = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    categories,
    topicsByCategory,
    isLoading,
    formatDate
  } = useForumData();

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const filteredCategories =
    searchQuery.trim() !== ""
      ? categories.filter(
          (cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cat.description || "")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : categories;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-2 py-8 flex gap-6">
        <ForumCategorySidebar
          categories={filteredCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="block md:hidden w-full mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="mobile-category">
            Category:
          </label>
          <select
            className="w-full rounded-md border border-gray-300 py-2 px-3 bg-white text-gray-900"
            id="mobile-category"
            value={selectedCategory || ""}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {filteredCategories.map(cat => (
              <option value={cat.id} key={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Community Forum</h1>
            <input
              type="text"
              placeholder="Search categories…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="rounded-md border border-gray-300 py-2 px-3 text-base w-full sm:w-64 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {!selectedCategory && (
            <div className="text-gray-500 text-center py-8">
              Select a category to view topics.
            </div>
          )}

          {categories.length === 0 || isLoading ? (
            <div className="text-gray-400 text-center py-12">
              Loading forums…
            </div>
          ) : (
            filteredCategories
              .filter(cat => !selectedCategory || cat.id === selectedCategory)
              .slice(0, 1)
              .map(category => (
                <SimpleForumCard
                  key={category.id}
                  categoryName={category.name}
                  topics={topicsByCategory[category.id] || []}
                  onNewTopic={() => {
                    if (!user) {
                      toast.error("Sign in to create a thread");
                      navigate("/auth");
                      return;
                    }
                    navigate(`/community/new-topic/${category.id}`);
                  }}
                  formatDate={formatDate}
                />
              ))
          )}

          <div className="fixed bottom-6 right-6 block md:hidden">
            <Button
              onClick={() => {
                if (!user && selectedCategory) {
                  toast.error("Sign in to create a thread");
                  navigate("/auth");
                  return;
                }
                if (selectedCategory) {
                  navigate(`/community/new-topic/${selectedCategory}`);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl px-6 py-3 rounded-full text-base font-bold"
            >
              + New Thread
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityForums;
