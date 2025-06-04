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
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { youtubeEducationService, YouTubeVideo } from '@/utils/youtubeApiService';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';
import YouTubeSetupGuide from './YouTubeSetupGuide';

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
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const { currentTier, upgradePrompt } = useTier();

  useEffect(() => {
    fetchVideos();
  }, [searchQuery, category, difficulty]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      let fetchedVideos: YouTubeVideo[] = [];
      
      if (searchQuery) {
        fetchedVideos = await youtubeEducationService.searchEducationalVideos(searchQuery, 20);
      } else {
        fetchedVideos = await youtubeEducationService.getTrendingEducationalVideos();
      }

      // Apply filters
      let filteredVideos = fetchedVideos;

      if (category || categoryFilter) {
        const filterCategory = category || categoryFilter;
        filteredVideos = filteredVideos.filter(video => 
          video.category.toLowerCase().includes(filterCategory.toLowerCase())
        );
      }

      if (difficulty || difficultyFilter) {
        const filterDifficulty = difficulty || difficultyFilter;
        filteredVideos = filteredVideos.filter(video => 
          video.difficulty === filterDifficulty
        );
      }

      if (localSearch) {
        filteredVideos = filteredVideos.filter(video =>
          video.title.toLowerCase().includes(localSearch.toLowerCase()) ||
          video.description.toLowerCase().includes(localSearch.toLowerCase()) ||
          video.channelTitle.toLowerCase().includes(localSearch.toLowerCase())
        );
      }

      setVideos(filteredVideos);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      toast.error('Failed to load YouTube courses');
    } finally {
      setLoading(false);
    }
  };

  const isContentLocked = (tier: string) => {
    if (tier === 'freemium') return false;
    if (currentTier === 'pro') return false;
    if (tier === 'basic' && currentTier === 'basic') return false;
    return true;
  };

  const formatViewCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const openYouTubeVideo = (videoId: string, tier: string) => {
    if (isContentLocked(tier)) {
      upgradePrompt(tier === 'basic' ? 'basic' : 'pro');
      return;
    }
    
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-muted animate-pulse" />
              <CardContent className="pt-4">
                <div className="h-5 bg-muted animate-pulse mb-2 w-3/4" />
                <div className="h-4 bg-muted animate-pulse mb-1 w-full" />
                <div className="h-4 bg-muted animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Setup Guide */}
      <YouTubeSetupGuide />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search YouTube courses..."
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
              <DropdownMenuItem onClick={() => setCategoryFilter('Computer Vision')}>Computer Vision</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('NLP')}>Natural Language Processing</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('Programming')}>Programming</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Difficulty
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDifficultyFilter('')}>All Levels</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficultyFilter('beginner')}>Beginner</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficultyFilter('intermediate')}>Intermediate</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficultyFilter('advanced')}>Advanced</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            onClick={fetchVideos}
            disabled={loading}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found {videos.length} YouTube courses
        </p>
        <Badge variant="outline" className="flex items-center gap-1">
          <Youtube className="h-3 w-3" />
          Powered by YouTube
        </Badge>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="h-6 w-6 text-gray-900" />
                  </div>
                </div>
              </div>
              {isContentLocked(video.requiredTier) && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-white opacity-70" />
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{video.category}</Badge>
                <Badge variant="outline">{video.difficulty}</Badge>
              </div>
              <CardTitle className="text-sm line-clamp-2 leading-tight">
                {video.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{video.channelTitle}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatViewCount(video.viewCount)}
                  </div>
                  {video.requiredTier !== 'freemium' && (
                    <Badge variant="outline" className="text-xs">
                      {video.requiredTier}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              {isContentLocked(video.requiredTier) ? (
                <Button 
                  className="w-full" 
                  onClick={() => upgradePrompt(video.requiredTier === 'basic' ? 'basic' : 'pro')}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Upgrade to Watch
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={() => openYouTubeVideo(video.id, video.requiredTier)}
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  Watch on YouTube
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {videos.length === 0 && !loading && (
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
            fetchVideos();
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default YouTubeCourses;
