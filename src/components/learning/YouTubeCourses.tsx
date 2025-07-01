
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Clock, 
  Eye, 
  Search, 
  ExternalLink, 
  Lock,
  Youtube,
  Filter,
  GraduationCap,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';

interface CuratedCourse {
  id: string;
  title: string;
  instructor: string;
  institution?: string;
  channelName: string;
  channelUrl: string;
  videoUrl: string;
  playlistUrl?: string;
  embedId: string;
  description: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  tags: string[];
  duration: string;
  thumbnail: string;
  requiredTier: 'freemium' | 'basic' | 'pro';
}

const curatedCourses: CuratedCourse[] = [
  {
    id: '1',
    title: 'Deep Learning Specialization',
    instructor: 'Andrew Ng',
    institution: 'DeepLearning.AI',
    channelName: 'DeepLearningAI',
    channelUrl: 'https://www.youtube.com/c/DeepLearningAI',
    videoUrl: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6Ec-XTbcX1uRg2_u4xOEky0',
    embedId: 'PLkDaE6sCZn6Ec-XTbcX1uRg2_u4xOEky0',
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
    videoUrl: 'https://www.youtube.com/playlist?list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8',
    embedId: 'PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8',
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
    videoUrl: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6F6wUI9tvS_Gw1vaFAx6rd6',
    embedId: 'PLkDaE6sCZn6F6wUI9tvS_Gw1vaFAx6rd6',
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
    videoUrl: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
    embedId: 'GwIo3gDZCVQ',
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
    videoUrl: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6F6wUI9tvS_Gw1vaFAx6rd6',
    embedId: 'PLkDaE6sCZn6F6wUI9tvS_Gw1vaFAx6rd6',
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
    videoUrl: 'https://www.youtube.com/playlist?list=PLQVvvaa0QuDdttJXlLtAJxJetJcqmqlQq',
    embedId: 'PLQVvvaa0QuDdttJXlLtAJxJetJcqmqlQq',
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
    videoUrl: 'https://www.youtube.com/playlist?list=PLfYUBJiXbdtSL3ajtG6lbiFdlIP_hjWlG',
    embedId: 'PLfYUBJiXbdtSL3ajtG6lbiFdlIP_hjWlG',
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
    title: 'AI for Robotics',
    instructor: 'Sebastian Thrun',
    institution: 'Udacity',
    channelName: 'Udacity',
    channelUrl: 'https://www.youtube.com/@udacity',
    videoUrl: 'https://www.youtube.com/playlist?list=PLAwxTw4SYaPnMwH3z3tqsI_eVmSRk8fZb',
    embedId: 'PLAwxTw4SYaPnMwH3z3tqsI_eVmSRk8fZb',
    description: 'AI applications in robotics including path planning, localization, and Kalman filters',
    skillLevel: 'Intermediate',
    category: 'AI Applications',
    tags: ['Robotics', 'Path Planning', 'Localization', 'Kalman Filters'],
    duration: '14+ hours',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400',
    requiredTier: 'freemium'
  },
  {
    id: '10',
    title: 'Build an AI Startup',
    instructor: 'Latent Space',
    channelName: 'Latent Space',
    channelUrl: 'https://www.youtube.com/@LatentSpacePod',
    videoUrl: 'https://www.youtube.com/watch?v=5xvF0jNNmT4',
    embedId: '5xvF0jNNmT4',
    description: 'AI tools, product design, and business strategy for building AI startups',
    skillLevel: 'All Levels',
    category: 'AI + Business',
    tags: ['Startup', 'Product Design', 'Business Strategy', 'AI Tools'],
    duration: '2 hours',
    thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=400',
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
  const [localSearch, setLocalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CuratedCourse | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { currentTier } = useTier();

  const filteredCourses = curatedCourses.filter(course => {
    const matchesSearch = !localSearch || !searchQuery || 
      course.title.toLowerCase().includes((localSearch || searchQuery).toLowerCase()) ||
      course.description.toLowerCase().includes((localSearch || searchQuery).toLowerCase()) ||
      course.instructor.toLowerCase().includes((localSearch || searchQuery).toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes((localSearch || searchQuery).toLowerCase()));
    
    const matchesCategory = !categoryFilter && !category || 
      course.category === (categoryFilter || category);
    
    const matchesDifficulty = !difficultyFilter && !difficulty || 
      course.skillLevel === (difficultyFilter || difficulty);

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const openVideo = (course: CuratedCourse) => {
    setSelectedCourse(course);
    setShowVideoModal(true);
  };

  const getYouTubeEmbedUrl = (embedId: string) => {
    if (embedId.startsWith('PL')) {
      // Playlist
      return `https://www.youtube.com/embed/videoseries?list=${embedId}`;
    } else {
      // Single video
      return `https://www.youtube.com/embed/${embedId}`;
    }
  };

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
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-9"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCategoryFilter('')}>All Categories</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('AI Fundamentals')}>AI Fundamentals</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('Machine Learning')}>Machine Learning</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('Deep Learning')}>Deep Learning</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('Neural Networks')}>Neural Networks</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('AI Applications')}>AI Applications</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('AI + Business')}>AI + Business</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Level
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDifficultyFilter('')}>All Levels</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficultyFilter('Beginner')}>Beginner</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficultyFilter('Intermediate')}>Intermediate</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficultyFilter('Advanced')}>Advanced</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="h-6 w-6 text-gray-900" />
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {course.duration}
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant="secondary">{course.skillLevel}</Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{course.category}</Badge>
                {course.institution && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {course.institution}
                  </div>
                )}
              </div>
              <CardTitle className="text-sm line-clamp-2 leading-tight">
                {course.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground mb-2">
                by {course.instructor}
              </p>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {course.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="pt-0 flex gap-2">
              <Button 
                className="flex-1" 
                onClick={() => openVideo(course)}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Course
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(course.channelUrl, '_blank')}
              >
                <Users className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedCourse?.title}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(selectedCourse?.videoUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in YouTube
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(selectedCourse.embedId)}
                  title={selectedCourse.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  {selectedCourse.instructor}
                  {selectedCourse.institution && ` • ${selectedCourse.institution}`}
                </div>
                <p className="text-sm">{selectedCourse.description}</p>
                <div className="flex flex-wrap gap-1">
                  {selectedCourse.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <Youtube className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button onClick={() => {
            setLocalSearch('');
            setCategoryFilter('');
            setDifficultyFilter('');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default YouTubeCourses;
