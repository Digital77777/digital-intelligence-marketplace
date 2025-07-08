
import React from 'react';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTier } from '@/context/TierContext';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  name: string;
  rating: number;
  users: string;
  tier: 'freemium' | 'basic' | 'pro';
  description: string;
  id: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
      
      {hasHalfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
      
      <span className="ml-1 text-sm text-gray-400">({rating.toFixed(1)})</span>
    </div>
  );
};

const ToolCard: React.FC<ToolCardProps> = ({ name, rating, users, tier, description, id }) => {
  const { currentTier } = useTier();
  const canAccess = 
    tier === 'freemium' || 
    (tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) || 
    (tier === 'pro' && currentTier === 'pro');
  
  const tierColors = {
    freemium: 'bg-amber-900/30 text-amber-300 border-amber-700',
    basic: 'bg-blue-900/30 text-blue-300 border-blue-700',
    pro: 'bg-purple-900/30 text-purple-300 border-purple-700'
  };
  
  return (
    <div className="bg-[#1A1A1A] border border-gray-700 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-white">{name}</h3>
          <span className={`text-xs px-2 py-1 rounded border ${tierColors[tier]}`}>
            {tier === 'freemium' ? '🆓 Freemium' : tier === 'basic' ? '⭐ Basic' : '✨ Pro'}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <StarRating rating={rating} />
          <span className="text-xs text-gray-400">{users} users</span>
        </div>
        
        <Link to={`/tool/${id}`}>
          <button 
            className={`w-full py-2 rounded-lg transition-colors ${
              canAccess 
                ? 'bg-[#2A5C8D] hover:bg-[#2A5C8D]/80 text-white' 
                : 'bg-gray-700 text-gray-300 cursor-not-allowed'
            }`}
          >
            {canAccess ? 'Try Free' : 'Upgrade to Access'}
          </button>
        </Link>
        
        {!canAccess && (
          <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 text-center text-xs text-[#00FF88]">
            Upgrade for API Access
          </div>
        )}
      </div>
    </div>
  );
};

const TrendingToolsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  const trendingTools = [
    {
      id: 'huggingface',
      name: 'Hugging Face Transformers',
      rating: 4.8,
      users: '10K+',
      tier: 'freemium' as const,
      description: 'Pre-trained NLP models for text generation and classification.'
    },
    {
      id: 'taskbot-mini',
      name: 'TaskBot Mini',
      rating: 4.6,
      users: '5K+',
      tier: 'freemium' as const,
      description: 'Build simple chatbots with template-based responses.'
    },
    {
      id: 'dataflow-pro',
      name: 'DataFlow Pro',
      rating: 4.9,
      users: '8K+',
      tier: 'basic' as const,
      description: 'Advanced dashboards with predictive insights and data visualization.'
    },
    {
      id: 'seo-boost-ai',
      name: 'SEO Boost AI',
      rating: 4.7,
      users: '3K+',
      tier: 'basic' as const,
      description: 'AI-driven SEO audits and keyword suggestions for content.'
    },
    {
      id: 'neuroforge-pro',
      name: 'NeuroForge Pro',
      rating: 4.9,
      users: '2K+',
      tier: 'pro' as const,
      description: 'No-code platform to build, train, and deploy custom AI/ML models.'
    },
    {
      id: 'copycraft-free',
      name: 'CopyCraft Free',
      rating: 4.5,
      users: '7K+',
      tier: 'freemium' as const,
      description: 'AI-generated social media captions and blog outlines.'
    }
  ];
  
  return (
    <section className="py-16 bg-[#1A1A1A] text-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2A5C8D] to-[#00FF88]">
              Trending Tools
            </span>
          </h2>
          
          <div className="flex space-x-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingTools.map((tool) => (
            <div key={tool.id} className="min-w-[300px] snap-start">
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingToolsCarousel;
