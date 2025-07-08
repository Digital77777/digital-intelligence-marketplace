
import { toast } from 'sonner';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  duration: string;
  publishedAt: string;
  viewCount: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requiredTier: 'freemium' | 'basic' | 'pro';
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: string;
  videoCount: string;
}

class YouTubeEducationService {
  private readonly apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || 'demo_key';
  private readonly baseURL = 'https://www.googleapis.com/youtube/v3';
  
  // Educational channel IDs (popular AI/ML channels)
  private readonly educationalChannels = [
    'UCWN3xxRkmTPmbKwht9FuE5A', // Sentdex
    'UCCezIgC97PvUuR4_gbFUs5g', // Corey Schafer
    'UCSHZKyawb77ixDdsGog4iWA', // Lex Fridman
    'UCkw4JCwteGrpHIsyIIKo4tQ', // Welch Labs
    'UCYO_jab_esuFRV4b17AJtAw', // 3Blue1Brown
  ];

  // AI/ML related search queries
  private readonly aiTopics = [
    'machine learning tutorial',
    'deep learning explained',
    'artificial intelligence basics',
    'neural networks tutorial',
    'python machine learning',
    'tensorflow tutorial',
    'pytorch tutorial',
    'computer vision tutorial',
    'natural language processing',
    'data science tutorial'
  ];

  async searchEducationalVideos(query: string, maxResults: number = 20): Promise<YouTubeVideo[]> {
    try {
      if (this.apiKey === 'demo_key') {
        console.warn('Using demo YouTube data - add VITE_YOUTUBE_API_KEY to environment for real data');
        return this.getMockVideos(query, maxResults);
      }

      const searchQuery = `${query} tutorial education learning`;
      const url = `${this.baseURL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoCategoryId=27&maxResults=${maxResults}&order=relevance&key=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.items) {
        return [];
      }

      // Get video details for duration and statistics
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const detailsUrl = `${this.baseURL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${this.apiKey}`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();
      
      return this.formatVideos(data.items, detailsData.items);
      
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      toast.error('Failed to load YouTube videos');
      return this.getMockVideos(query, maxResults);
    }
  }

  async getChannelVideos(channelId: string, maxResults: number = 10): Promise<YouTubeVideo[]> {
    try {
      if (this.apiKey === 'demo_key') {
        return this.getMockChannelVideos(channelId, maxResults);
      }

      const url = `${this.baseURL}/search?part=snippet&channelId=${channelId}&type=video&maxResults=${maxResults}&order=date&key=${this.apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.items) {
        return [];
      }

      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const detailsUrl = `${this.baseURL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${this.apiKey}`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();
      
      return this.formatVideos(data.items, detailsData.items);
      
    } catch (error) {
      console.error('Error fetching channel videos:', error);
      return this.getMockChannelVideos(channelId, maxResults);
    }
  }

  async getTrendingEducationalVideos(): Promise<YouTubeVideo[]> {
    try {
      const videos: YouTubeVideo[] = [];
      
      // Search for trending AI/ML content
      for (const topic of this.aiTopics.slice(0, 3)) {
        const topicVideos = await this.searchEducationalVideos(topic, 5);
        videos.push(...topicVideos);
      }
      
      // Remove duplicates and sort by view count
      const uniqueVideos = videos.filter((video, index, self) => 
        index === self.findIndex(v => v.id === video.id)
      );
      
      return uniqueVideos.slice(0, 15);
      
    } catch (error) {
      console.error('Error fetching trending videos:', error);
      return this.getMockTrendingVideos();
    }
  }

  private formatVideos(items: any[], detailsItems: any[] = []): YouTubeVideo[] {
    return items.map((item, index) => {
      const details = detailsItems[index] || {};
      const snippet = item.snippet;
      
      return {
        id: item.id.videoId || item.id,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
        channelTitle: snippet.channelTitle,
        duration: this.formatDuration(details.contentDetails?.duration || 'PT10M'),
        publishedAt: snippet.publishedAt,
        viewCount: details.statistics?.viewCount || '0',
        category: this.categorizeVideo(snippet.title, snippet.description),
        difficulty: this.determineDifficulty(snippet.title, snippet.description),
        requiredTier: this.determineTier(snippet.title, snippet.description)
      };
    });
  }

  private formatDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '10:00';
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private categorizeVideo(title: string, description: string): string {
    const content = (title + ' ' + description).toLowerCase();
    
    if (content.includes('machine learning') || content.includes('ml')) return 'Machine Learning';
    if (content.includes('deep learning') || content.includes('neural network')) return 'Deep Learning';
    if (content.includes('computer vision') || content.includes('cv')) return 'Computer Vision';
    if (content.includes('nlp') || content.includes('natural language')) return 'NLP';
    if (content.includes('data science') || content.includes('data analysis')) return 'Data Science';
    if (content.includes('python') || content.includes('programming')) return 'Programming';
    if (content.includes('tensorflow') || content.includes('pytorch')) return 'Frameworks';
    
    return 'AI Fundamentals';
  }

  private determineDifficulty(title: string, description: string): 'beginner' | 'intermediate' | 'advanced' {
    const content = (title + ' ' + description).toLowerCase();
    
    if (content.includes('beginner') || content.includes('intro') || content.includes('basics')) {
      return 'beginner';
    }
    if (content.includes('advanced') || content.includes('expert') || content.includes('master')) {
      return 'advanced';
    }
    return 'intermediate';
  }

  private determineTier(title: string, description: string): 'freemium' | 'basic' | 'pro' {
    const content = (title + ' ' + description).toLowerCase();
    
    if (content.includes('advanced') || content.includes('expert') || content.includes('production')) {
      return 'pro';
    }
    if (content.includes('intermediate') || content.includes('practical') || content.includes('project')) {
      return 'basic';
    }
    return 'freemium';
  }

  // Mock data for when API key is not available
  private getMockVideos(query: string, maxResults: number): YouTubeVideo[] {
    const mockVideos: YouTubeVideo[] = [
      {
        id: 'mock-1',
        title: `Introduction to ${query}`,
        description: `Learn the fundamentals of ${query} in this comprehensive tutorial`,
        thumbnail: 'https://i.ytimg.com/vi/mock-1/mqdefault.jpg',
        channelTitle: 'AI Education Hub',
        duration: '15:30',
        publishedAt: '2024-06-01T10:00:00Z',
        viewCount: '125000',
        category: 'AI Fundamentals',
        difficulty: 'beginner',
        requiredTier: 'freemium'
      },
      {
        id: 'mock-2',
        title: `Advanced ${query} Techniques`,
        description: `Deep dive into advanced concepts and practical applications of ${query}`,
        thumbnail: 'https://i.ytimg.com/vi/mock-2/mqdefault.jpg',
        channelTitle: 'Tech Mastery',
        duration: '28:45',
        publishedAt: '2024-05-28T14:30:00Z',
        viewCount: '89000',
        category: 'Machine Learning',
        difficulty: 'advanced',
        requiredTier: 'pro'
      },
      {
        id: 'mock-3',
        title: `Practical ${query} Projects`,
        description: `Build real-world projects using ${query} concepts and tools`,
        thumbnail: 'https://i.ytimg.com/vi/mock-3/mqdefault.jpg',
        channelTitle: 'Code Academy',
        duration: '42:15',
        publishedAt: '2024-05-25T09:15:00Z',
        viewCount: '156000',
        category: 'Programming',
        difficulty: 'intermediate',
        requiredTier: 'basic'
      }
    ];

    return mockVideos.slice(0, maxResults);
  }

  private getMockChannelVideos(channelId: string, maxResults: number): YouTubeVideo[] {
    return this.getMockVideos('Channel Content', maxResults);
  }

  private getMockTrendingVideos(): YouTubeVideo[] {
    return this.getMockVideos('Trending AI Content', 15);
  }
}

export const youtubeEducationService = new YouTubeEducationService();
