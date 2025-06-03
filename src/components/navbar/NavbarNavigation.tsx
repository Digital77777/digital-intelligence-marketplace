
import React from 'react';
import { NavItem } from './NavbarTypes';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarNavigationProps {
  navItems: NavItem[];
}

const NavbarNavigation: React.FC<NavbarNavigationProps> = ({ navItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Footer items that should be hidden from navbar on mobile
  const footerItemPaths = [
    '/ai-tools-directory',
    '/ai-tools',
    '/learning-hub', 
    '/learning-academy',
    '/courses',
    '/ai-streams',
    '/marketplace',
    '/community-forums',
    '/community'
  ];

  // Filter out footer items on mobile
  const filteredNavItems = isMobile 
    ? navItems.filter(item => !footerItemPaths.includes(item.path))
    : navItems;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12 overflow-x-auto scrollbar-hide">
          <div className="flex items-center space-x-1 min-w-max">
            {filteredNavItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#0071c2] text-white hover:bg-[#00487a]'
                    : 'text-gray-700 hover:text-[#0071c2] hover:bg-blue-50'
                }`}
              >
                {item.icon && (
                  <span className="mr-2 flex items-center">
                    {item.icon}
                  </span>
                )}
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarNavigation;
