
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Brain, Zap, Bot, Rocket, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [aiTool, setAiTool] = useState('AI Assistants');

  // List of AI tools to cycle through
  const aiTools = [
    'AI Assistants',
    'GPT-4 Apps',
    'Machine Learning',
    'Computer Vision',
    'NLP Models',
    'Voice Synthesis',
    'Data Analysis',
    'Generative Art'
  ];

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
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
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

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/10"
          style={{ 
            backgroundSize: '200% 200%',
            animation: 'gradient-animation 15s ease infinite'
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
      
      {/* Interactive gradient follow */}
      <div 
        ref={heroRef}
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%), rgba(108, 43, 217, 0.8), transparent 25%)',
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] animate-float" style={{ animationDelay: '0s' }}>
          <Brain className="text-purple-600/60 h-12 w-12 filter blur-[1px]" />
        </div>
        <div className="absolute top-[40%] right-[15%] animate-float" style={{ animationDelay: '1.5s' }}>
          <Zap className="text-blue-500/60 h-10 w-10 filter blur-[1px]" />
        </div>
        <div className="absolute bottom-[20%] left-[20%] animate-float" style={{ animationDelay: '1s' }}>
          <Bot className="text-emerald-500/60 h-14 w-14 filter blur-[1px]" />
        </div>
        <div className="absolute top-[20%] right-[25%] animate-float" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="text-amber-500/60 h-8 w-8 filter blur-[1px]" />
        </div>
        <div className="absolute bottom-[30%] right-[10%] animate-float" style={{ animationDelay: '2s' }}>
          <Rocket className="text-pink-500/60 h-9 w-9 filter blur-[1px]" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="flex flex-col items-center text-center space-y-8 py-12 animate-fade-in">
          <Badge variant="outline" className="px-4 py-1.5 text-sm bg-white/10 backdrop-blur-sm border-blue-300/20 shadow-md">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">Discover the Future of AI Technology</span>
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="block mb-2">
              <span className="inline-block px-4 py-1.5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200/20 rounded-lg shadow-lg">Unleash</span>
              {" "}
              <span className="relative">
                <span className="inline-block">Your Potential</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[5px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
              </span>
            </span>
            <span className="block my-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              with Digital Intelligence
            </span>
            <div className="relative h-20 md:h-24 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDuration: '3s' }}></div>
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 shadow-text inline-flex items-center">
                <Sparkles className="h-8 w-8 mr-2 text-blue-400" />
                {aiTool}
              </span>
            </div>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mt-6 animate-slide-up leading-relaxed">
            Access cutting-edge AI tools, comprehensive learning resources, and join a thriving community of innovators — all in one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md">
              Start for Free
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="font-semibold group border-blue-200 dark:border-blue-900 shadow-sm backdrop-blur-sm hover:bg-white/10">
              Explore Features
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
          
          <div className="mt-20 w-full max-w-5xl px-4 relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-75 animate-pulse" style={{ animationDuration: '4s' }}></div>
              
              <div className="relative bg-white/5 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                  {/* Mock dashboard UI */}
                  <div className="w-full h-full p-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
                            <Sparkles className="h-16 w-16 text-blue-400 mb-4 relative z-10" />
                          </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Digital Intelligence Hub</h3>
                        <p className="text-gray-300 max-w-lg mx-auto">Your Gateway to AI-Powered Tools and Learning</p>
                        <div className="mt-6">
                          <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Launch Demo
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* UI mockup elements */}
                    <div className="absolute top-4 left-4 right-4 h-8 flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="ml-4 h-6 w-64 bg-gray-700 rounded-md"></div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 h-16 flex justify-between">
                      <div className="w-32 h-full bg-gray-700/50 rounded-md"></div>
                      <div className="w-32 h-full bg-gray-700/50 rounded-md"></div>
                      <div className="w-32 h-full bg-blue-500/30 rounded-md backdrop-blur-sm border border-blue-400/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#pricing" 
          className="flex flex-col items-center text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Scroll to pricing"
        >
          <span className="text-sm mb-2 font-medium">View Pricing</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
