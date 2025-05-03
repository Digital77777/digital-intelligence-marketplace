
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTier } from '@/context/TierContext';

interface NavItemProps {
  title: string;
  path: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

const NavItem = ({ title, path, isActive, icon }: NavItemProps) => {
  return (
    <Link 
      to={path} 
      className={cn(
        "text-gray-800 whitespace-nowrap px-4 py-3 text-base font-medium flex items-center",
        isActive ? "bg-gray-100 border-b-2 border-blue-600" : "hover:bg-gray-50"
      )}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {title}
    </Link>
  );
};

interface NavbarNavigationProps {
  navItems: {
    title: string;
    path: string;
    visible: boolean;
    icon?: React.ReactNode;  // Added icon as optional property
  }[];
}

const NavbarNavigation = ({ navItems }: NavbarNavigationProps) => {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const { currentTier } = useTier();

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

  // Style based on tier
  const getBgColor = () => {
    switch(currentTier) {
      case 'pro': 
        return 'bg-white border-b border-gray-200';
      case 'basic':
        return 'bg-white border-b border-gray-200';
      default:
        return 'bg-white border-b border-gray-200';
    }
  };

  return (
    <div className={`w-full overflow-hidden ${getBgColor()}`}>
      <div 
        ref={scrollRef}
        className="flex items-center overflow-x-auto scrollbar-none max-w-7xl mx-auto"
      >
        {navItems.filter(item => item.visible).map((item) => (
          <NavItem 
            key={item.path}
            title={item.title}
            path={item.path}
            isActive={isActive(item.path)}
            icon={item.icon}
          />
        ))}
        
        {/* Shadow indicator for scrollable content */}
        {scrollable && (
          <div className="absolute right-0 top-[7.5rem] h-[3.125rem] w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default NavbarNavigation;
