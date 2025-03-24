
import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { ArrowDown, Sparkles, Brain, Zap, Bot } from 'lucide-react';

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
      {/* Animated background gradient */}
      <div 
        ref={heroRef}
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%), rgba(79, 70, 229, 0.3), transparent 40%)',
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] animate-float" style={{ animationDelay: '0s' }}>
          <Brain className="text-purple-500/40 h-12 w-12" />
        </div>
        <div className="absolute top-[40%] right-[15%] animate-float" style={{ animationDelay: '1.5s' }}>
          <Zap className="text-blue-500/40 h-10 w-10" />
        </div>
        <div className="absolute bottom-[20%] left-[20%] animate-float" style={{ animationDelay: '1s' }}>
          <Bot className="text-emerald-500/40 h-14 w-14" />
        </div>
        <div className="absolute top-[20%] right-[25%] animate-float" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="text-amber-500/40 h-8 w-8" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="flex flex-col items-center text-center space-y-8 py-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 text-sm text-blue-600 dark:text-blue-400 mb-4 animate-slide-down backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Discover the Future of AI Technology</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            <span className="block mb-2">Unleash Your Potential</span>
            <span className="block mb-2">with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
              Digital Intelligence
            </span></span>
            <div className="h-16 md:h-20">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                {aiTool}
              </span>
            </div>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mt-6 animate-slide-up">
            Access cutting-edge AI tools, comprehensive learning resources, and join a thriving community of innovators — all in one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="premium" size="lg" className="font-semibold">
              Start for Free
            </Button>
            <Button variant="outline" size="lg" className="font-semibold group">
              Explore Features
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
          
          <div className="mt-16 w-full max-w-5xl px-4 relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-75 animate-pulse" />
              
              <div className="relative bg-white/10 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
                  {/* Mock dashboard UI */}
                  <div className="w-full h-full p-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex justify-center">
                          <Sparkles className="h-12 w-12 text-blue-400 mb-4 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Digital Intelligence Hub</h3>
                        <p className="text-gray-300">Your Gateway to AI-Powered Tools and Learning</p>
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
                      <div className="w-32 h-full bg-blue-500/50 rounded-md"></div>
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
          <span className="text-sm mb-2">View Pricing</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
