
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps {
  title: string;
  path: string;
  isActive: boolean;
}

const NavItem = ({ title, path, isActive }: NavItemProps) => {
  return (
    <Link 
      to={path} 
      className={cn(
        "text-white whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium flex-shrink-0",
        isActive ? "bg-white/20" : "hover:bg-white/10"
      )}
    >
      {title}
    </Link>
  );
};

interface NavbarNavigationProps {
  navItems: {
    title: string;
    path: string;
    visible: boolean;
  }[];
}

const NavbarNavigation = ({ navItems }: NavbarNavigationProps) => {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Check if the nav is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [navItems]);

  return (
    <div className="bg-[#0066cc] w-full overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex items-center space-x-1 py-2 px-2 overflow-x-auto scrollbar-none"
      >
        {navItems.filter(item => item.visible).map((item) => (
          <NavItem 
            key={item.path}
            title={item.title}
            path={item.path}
            isActive={isActive(item.path)}
          />
        ))}
        
        {/* Shadow indicator for scrollable content */}
        {scrollable && (
          <div className="absolute right-0 top-[3.75rem] h-[2.5rem] w-12 bg-gradient-to-l from-[#0066cc] to-transparent pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default NavbarNavigation;
