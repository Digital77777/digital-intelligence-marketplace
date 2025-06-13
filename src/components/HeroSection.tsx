import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Brain, Zap, Bot, Rocket, ChevronRight, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [aiTool, setAiTool] = useState('AI Assistants');
  const {
    user,
    profile
  } = useUser();
  const navigate = useNavigate();

  // List of AI tools to cycle through
  const aiTools = ['AI Assistants', 'GPT-4 Apps', 'Machine Learning', 'Computer Vision', 'NLP Models', 'Voice Synthesis', 'Data Analysis', 'Generative Art'];
  useEffect(() => {
    // Text cycling animation
    const interval = setInterval(() => {
      setAiTool(prev => {
        const currentIndex = aiTools.indexOf(prev);
        return aiTools[(currentIndex + 1) % aiTools.length];
      });
    }, 2000);
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const {
          left,
          top,
          width,
          height
        } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        heroRef.current.style.setProperty('--x', `${x}`);
        heroRef.current.style.setProperty('--y', `${y}`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);
  return <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0 pb-16 px-4 font-inter">
      {/* Welcome back banner for logged in users */}
      {user && profile && <div className="absolute top-0 left-0 right-0 z-10 py-3 px-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-white">👋 Welcome back, <span className="font-semibold">{profile.username || 'User'}</span></span>
              <Badge variant="outline" className="bg-blue-500/20 border-blue-300/30">
                {new Date().toLocaleDateString('en-US', {
              weekday: 'long'
            })}
              </Badge>
            </div>
            <div className="hidden md:flex gap-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => navigate('/ai-tools-directory')}>
                <Search className="h-4 w-4 mr-1" />
                Discover Tools
              </Button>
              <Button size="sm" className="bg-white/20 text-white hover:bg-white/30" onClick={() => navigate('/ai-assistant')}>
                <Bot className="h-4 w-4 mr-1" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/10" style={{
        backgroundSize: '200% 200%',
        animation: 'gradient-animation 15s ease infinite'
      }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
      
      {/* Interactive gradient follow */}
      <div ref={heroRef} className="absolute inset-0 opacity-30" style={{
      background: 'radial-gradient(circle at calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%), rgba(108, 43, 217, 0.8), transparent 25%)'
    }} />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] animate-float" style={{
        animationDelay: '0s'
      }}>
          <Brain className="text-purple-600/60 h-12 w-12 filter blur-[1px]" />
        </div>
        <div className="absolute top-[40%] right-[15%] animate-float" style={{
        animationDelay: '1.5s'
      }}>
          <Zap className="text-blue-500/60 h-10 w-10 filter blur-[1px]" />
        </div>
        <div className="absolute bottom-[20%] left-[20%] animate-float" style={{
        animationDelay: '1s'
      }}>
          <Bot className="text-emerald-500/60 h-14 w-14 filter blur-[1px]" />
        </div>
        <div className="absolute top-[20%] right-[25%] animate-float" style={{
        animationDelay: '0.5s'
      }}>
          <svg className="text-amber-500/60 h-8 w-8 filter blur-[1px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L14.39 8.25L20 9.27L16 13.14L16.94 18.76L12 16.09L7.06 18.76L8 13.14L4 9.27L9.61 8.25L12 3Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-[30%] right-[10%] animate-float" style={{
        animationDelay: '2s'
      }}>
          <Rocket className="text-pink-500/60 h-9 w-9 filter blur-[1px]" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="flex flex-col items-center text-center space-y-8 py-12 animate-fade-in">
          <Badge variant="outline" className="px-4 py-1.5 text-sm bg-white/10 backdrop-blur-sm border-blue-300/20 shadow-md">
            <svg className="h-3.5 w-3.5 mr-1.5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L14.39 8.25L20 9.27L16 13.14L16.94 18.76L12 16.09L7.06 18.76L8 13.14L4 9.27L9.61 8.25L12 3Z" fill="currentColor" />
            </svg>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Discover the Future of AI Technology</span>
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="block mb-2 text-4xl py-px font-semibold">
              <span className="inline-block px-4 py-1.5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200/20 rounded-lg shadow-lg">Empower</span>
              {" "}
              <span className="relative">
                <span className="inline-block">Your AI Journey</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[5px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
              </span>
            </span>
            <span className="block my-4 text-transparent bg-clip-text bg-gradient-to-r from-[#2A5C8D] via-indigo-600 to-purple-600 text-5xl py-px">with Digital Intelligence Marketplace</span>
            <div className="relative h-20 md:h-24 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" style={{
              animationDuration: '3s'
            }}></div>
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#2A5C8D] to-[#00FF88] shadow-text inline-flex items-center text-6xl">
                <Bot className="h-8 w-8 mr-2 text-[#00FF88]" />
                {aiTool}
              </span>
            </div>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mt-6 animate-slide-up leading-relaxed">
            Access cutting-edge AI tools, learn from experts, and join a global community—all for free.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>
            <Link to="/learning-hub">
              <Button size="lg" className="font-semibold bg-gradient-to-r from-[#2A5C8D] to-purple-600 hover:shadow-lg hover:from-[#2A5C8D]/90 hover:to-purple-700 transition-all duration-300 shadow-md">
                Start Learning Free
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="font-semibold group border-blue-200 dark:border-blue-900 shadow-sm backdrop-blur-sm hover:bg-white/10">
                Compare Plans
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#featured-resources" className="flex flex-col items-center text-foreground/60 hover:text-foreground transition-colors" aria-label="Scroll to featured resources">
          <span className="text-sm mb-2 font-medium">Explore Resources</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </div>;
};
export default React.memo(HeroSection);