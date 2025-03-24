
import React, { useEffect, useRef } from 'react';
import Button from './Button';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4">
      <div 
        ref={heroRef}
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%), rgba(14, 165, 233, 0.15), transparent 50%)',
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="flex flex-col items-center text-center space-y-8 py-12 animate-fade-in">
          <div className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-4 animate-slide-down">
            Introducing Digital Intelligence Marketplace
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            <span className="block">Elevate Your Digital Intelligence</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mt-4 block">
              Choose Your Tier
            </span>
          </h1>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mt-6 animate-slide-up">
            Access premium digital intelligence tools tailored to your needs. Unlock features and capabilities as you grow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="premium" size="lg" className="font-semibold">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="font-semibold">
              Explore Features
            </Button>
          </div>
          
          <div className="w-full max-w-4xl mt-16 px-4 relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />
            <div className="bg-white/90 dark:bg-black/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-4 overflow-hidden relative">
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-400 dark:text-gray-500">Digital Intelligence Dashboard</span>
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
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-5 w-5"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
