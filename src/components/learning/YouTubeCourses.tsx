import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';
import CourseFilters from './components/CourseFilters';
import CourseCard from './components/CourseCard';
import VideoModal from './components/VideoModal';
import { useYouTubeCourses } from './hooks/useYouTubeCourses';
import { CuratedCourse } from './types/course';

const curatedCourses: CuratedCourse[] = [
  {
    id: '1',
    title: 'Deep Learning Specialization',
    instructor: 'Andrew Ng',
    institution: 'DeepLearning.AI',
    channelName: 'DeepLearningAI',
    channelUrl: 'https://www.youtube.com/c/DeepLearningAI',
    videoUrl: 'https://www.youtube.com/watch?v=CS4cs9xVecg',
    embedId: 'CS4cs9xVecg',
    description: 'Comprehensive course covering neural networks, CNNs, RNNs, and sequence models',
    skillLevel: 'Advanced',
    category: 'Deep Learning',
    tags: ['Neural Networks', 'CNN', 'RNN', 'TensorFlow'],
    duration: '25+ hours',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '2',
    title: "CS50's Introduction to AI with Python",
    instructor: 'Harvard CS50',
    institution: 'Harvard University',
    channelName: 'CS50',
    channelUrl: 'https://www.youtube.com/@cs50',
    videoUrl: 'https://www.youtube.com/watch?v=5NgNicANyqM',
    embedId: '5NgNicANyqM',
    description: 'Introduction to AI concepts including search algorithms, machine learning, neural networks, and NLP',
    skillLevel: 'Intermediate',
    category: 'AI Fundamentals',
    tags: ['Python', 'Search Algorithms', 'Machine Learning', 'NLP'],
    duration: '20+ hours',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '3',
    title: 'MIT 6.S191: Intro to Deep Learning',
    instructor: 'MIT Faculty',
    institution: 'MIT',
    channelName: 'MIT OpenCourseWare',
    channelUrl: 'https://www.youtube.com/@MITOCW',
    videoUrl: 'https://www.youtube.com/watch?v=njKP3FqW3Sk',
    embedId: 'njKP3FqW3Sk',
    description: 'Deep learning theory and practical applications using TensorFlow',
    skillLevel: 'Intermediate',
    category: 'Deep Learning',
    tags: ['Deep Learning', 'TensorFlow', 'Theory', 'Applications'],
    duration: '15+ hours',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '4',
    title: 'Machine Learning Full Course',
    instructor: 'Simplilearn',
    channelName: 'Simplilearn',
    channelUrl: 'https://www.youtube.com/@simplilearn',
    videoUrl: 'https://www.youtube.com/watch?v=ukzFI9rgwfU',
    embedId: 'ukzFI9rgwfU',
    description: 'Complete machine learning course covering supervised and unsupervised learning with practical projects',
    skillLevel: 'Beginner',
    category: 'Machine Learning',
    tags: ['Supervised Learning', 'Unsupervised Learning', 'Projects', 'Algorithms'],
    duration: '10 hours',
    thumbnail: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '5',
    title: 'AI for Everyone',
    instructor: 'Andrew Ng',
    institution: 'DeepLearning.AI',
    channelName: 'DeepLearningAI',
    channelUrl: 'https://www.youtube.com/c/DeepLearningAI',
    videoUrl: 'https://www.youtube.com/watch?v=NKpuX_yzdYs',
    embedId: 'NKpuX_yzdYs',
    description: 'Non-technical introduction to AI strategy, ethics, and business applications',
    skillLevel: 'Beginner',
    category: 'AI + Business',
    tags: ['AI Strategy', 'Ethics', 'Business', 'Non-technical'],
    duration: '8 hours',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '6',
    title: 'Neural Networks from Scratch',
    instructor: 'Sentdex',
    channelName: 'Sentdex',
    channelUrl: 'https://www.youtube.com/@sentdex',
    videoUrl: 'https://www.youtube.com/watch?v=Wo5dMEP_BbI',
    embedId: 'Wo5dMEP_BbI',
    description: 'Build neural networks from scratch using Python without external libraries',
    skillLevel: 'Intermediate',
    category: 'Neural Networks',
    tags: ['Python', 'Neural Networks', 'From Scratch', 'Implementation'],
    duration: '12+ hours',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '7',
    title: 'Fast.ai Practical Deep Learning for Coders',
    instructor: 'Jeremy Howard',
    institution: 'fast.ai',
    channelName: 'fastai',
    channelUrl: 'https://www.youtube.com/@fastai',
    videoUrl: 'https://www.youtube.com/watch?v=8SF_h3xF3cE',
    embedId: '8SF_h3xF3cE',
    description: 'Practical deep learning covering computer vision, NLP, and tabular data using PyTorch',
    skillLevel: 'Intermediate',
    category: 'Deep Learning',
    tags: ['PyTorch', 'Computer Vision', 'NLP', 'Practical'],
    duration: '18+ hours',
    thumbnail: 'https://images.unsplash.com/photo-1592609931041-40265b692757?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '8',
    title: 'Artificial Intelligence Full Course',
    instructor: 'freeCodeCamp',
    channelName: 'freeCodeCamp.org',
    channelUrl: 'https://www.youtube.com/@freecodecamp',
    videoUrl: 'https://www.youtube.com/watch?v=JMUxmLyrhSk',
    embedId: 'JMUxmLyrhSk',
    description: 'Comprehensive introduction to AI principles, logic, machine learning, and NLP',
    skillLevel: 'Beginner',
    category: 'AI Fundamentals',
    tags: ['AI Principles', 'Logic', 'Machine Learning', 'NLP'],
    duration: '6 hours',
    thumbnail: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '9',
    title: 'Python for Everybody - Full Course',
    instructor: 'Chuck Severance',
    institution: 'University of Michigan',
    channelName: 'freeCodeCamp.org',
    channelUrl: 'https://www.youtube.com/@freecodecamp',
    videoUrl: 'https://www.youtube.com/watch?v=8DvywoWv6fI',
    embedId: '8DvywoWv6fI',
    description: 'Complete Python programming course covering basics to advanced concepts',
    skillLevel: 'Beginner',
    category: 'Programming',
    tags: ['Python', 'Programming', 'Basics', 'Web Scraping'],
    duration: '14 hours',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '10',
    title: 'TensorFlow 2.0 Complete Course',
    instructor: 'Tim Ruscica',
    channelName: 'Tech With Tim',
    channelUrl: 'https://www.youtube.com/@TechWithTim',
    videoUrl: 'https://www.youtube.com/watch?v=tPYj3fFJGjk',
    embedId: 'tPYj3fFJGjk',
    description: 'Comprehensive TensorFlow 2.0 course covering neural networks and deep learning',
    skillLevel: 'Intermediate',
    category: 'Deep Learning',
    tags: ['TensorFlow', 'Neural Networks', 'Deep Learning', 'Python'],
    duration: '7 hours',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=400',
    requiredTier: 'freemium'
  }
];

interface YouTubeCoursesProps {
  searchQuery?: string;
  category?: string;
  difficulty?: string;
}

const YouTubeCourses: React.FC<YouTubeCoursesProps> = ({
  searchQuery = '',
  category = '',
  difficulty = ''
}) => {
  const {
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
  } = useYouTubeCourses(curatedCourses);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Curated AI Courses</h2>
        <p className="text-muted-foreground">
          High-quality, free AI courses from top institutions and instructors
        </p>
      </div>

      {/* Search and Filters */}
      <CourseFilters
        searchQuery={localSearch}
        onSearchChange={setLocalSearch}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        difficultyFilter={difficultyFilter}
        onDifficultyChange={setDifficultyFilter}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found {filteredCourses.length} curated courses
        </p>
        <Badge variant="outline" className="flex items-center gap-1">
          <Youtube className="h-3 w-3" />
          Free YouTube Courses
        </Badge>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onWatchCourse={openVideo}
            onViewChannel={(url) => window.open(url, '_blank')}
          />
        ))}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        course={selectedCourse}
        onOpenExternal={(url) => window.open(url, '_blank')}
      />

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <Youtube className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default YouTubeCourses;
