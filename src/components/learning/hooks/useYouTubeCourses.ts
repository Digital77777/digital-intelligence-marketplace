
import { useState } from 'react';
import { CuratedCourse } from '../types/course';

export const useYouTubeCourses = (courses: CuratedCourse[]) => {
  const [localSearch, setLocalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CuratedCourse | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = !localSearch || 
      course.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      course.description.toLowerCase().includes(localSearch.toLowerCase()) ||
      course.instructor.toLowerCase().includes(localSearch.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(localSearch.toLowerCase()));
    
    const matchesCategory = !categoryFilter || course.category === categoryFilter;
    const matchesDifficulty = !difficultyFilter || course.skillLevel === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const openVideo = (course: CuratedCourse) => {
    setSelectedCourse(course);
    setShowVideoModal(true);
  };

  const clearFilters = () => {
    setLocalSearch('');
    setCategoryFilter('');
    setDifficultyFilter('');
  };

  return {
    localSearch,
    setLocalSearch,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    selectedCourse,
    showVideoModal,
    setShowVideoModal,
    filteredCourses,
    openVideo,
    clearFilters
  };
};
