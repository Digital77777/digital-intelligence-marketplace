
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { aiTools, toolCategories } from '@/data/ai-tools-tiers';
import { Course } from '@/data/courses';
import { forumData } from '@/data/forum';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'tool' | 'course' | 'forum' | 'category';
  category?: string;
  url: string;
  route: string;
  icon?: React.ReactNode;
}

export const useSearchCommands = () => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchItems = React.useMemo(() => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    const results: SearchItem[] = [];
    
    // Search AI Tools
    aiTools.forEach(tool => {
      if (
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.category.toLowerCase().includes(lowerQuery) ||
        tool.function?.toLowerCase().includes(lowerQuery) ||
        tool.use_cases?.some(useCase => useCase.toLowerCase().includes(lowerQuery)) ||
        tool.technologies?.some(tech => tech.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          id: tool.id,
          title: tool.name,
          description: tool.description,
          type: 'tool',
          category: tool.category,
          url: `/tool/${tool.id}`,
          route: `/tool/${tool.id}`,
          icon: tool.icon
        });
      }
    });
    
    // Search Categories
    toolCategories.forEach(category => {
      if (
        category.name.toLowerCase().includes(lowerQuery) ||
        category.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          id: category.id,
          title: category.name,
          description: category.description,
          type: 'category',
          url: `/ai-tools-directory?category=${category.id}`,
          route: `/ai-tools-directory?category=${category.id}`,
          icon: category.icon
        });
      }
    });
    
    // Search Courses
    Course.forEach(course => {
      if (
        course.title.toLowerCase().includes(lowerQuery) ||
        course.description.toLowerCase().includes(lowerQuery) ||
        course.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          id: course.id,
          title: course.title,
          description: course.description,
          type: 'course',
          url: `/courses/${course.id}`,
          route: `/courses/${course.id}`,
        });
      }
    });
    
    // Search Forum Data
    forumData.forEach(forum => {
      if (
        forum.title.toLowerCase().includes(lowerQuery) ||
        forum.content.toLowerCase().includes(lowerQuery) ||
        forum.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          id: forum.id,
          title: forum.title,
          description: forum.content,
          type: 'forum',
          url: `/forums/${forum.id}`,
          route: `/forums/${forum.id}`,
        });
      }
    });
    
    return results.slice(0, 20);
  }, [query]);

  const groupedItems = React.useMemo(() => {
    const grouped: { [key: string]: SearchItem[] } = {};
    searchItems.forEach(item => {
      if (!grouped[item.type]) {
        grouped[item.type] = [];
      }
      grouped[item.type].push(item);
    });
    return grouped;
  }, [searchItems]);

  const typeLabels: { [key: string]: string } = {
    tool: 'AI Tools',
    course: 'Courses',
    forum: 'Forums',
    category: 'Categories'
  };

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    setQuery('');
    navigate(item.url);
  };

  const handleShowAll = () => {
    setOpen(false);
    setQuery('');
    
    if (query) {
      navigate(`/ai-tools-directory?search=${query}`);
    } else {
      navigate('/ai-tools-directory');
    }
  };

  return {
    open,
    setOpen,
    query,
    setQuery,
    groupedItems,
    typeLabels,
    handleSelect,
    handleShowAll,
    searchItems
  };
};
