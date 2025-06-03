
import React from 'react';
import { NavItemType } from './NavbarTypes';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarNavigationProps {
  navItems: NavItemType[];
}

const NavbarNavigation: React.FC<NavbarNavigationProps> = ({ navItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Footer items that should be hidden from navbar on mobile
  const footerItemPaths = [
    '/ai-tools-directory',
    '/ai-tools',
    '/learning-hub', 
    '/learning-academy',
    '/ai-streams',
    '/marketplace',
    '/community-forums',
    '/community'
  ];

  // Filter out footer items on mobile
  const filteredNavItems = isMobile 
    ? navItems.filter(item => !footerItemPaths.some(path => 
        item.href === path || item.href.startsWith(path)
      ))
    : navItems;

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12 overflow-x-auto scrollbar-hide">
          <div className="flex items-center space-x-1 min-w-max">
            {filteredNavItems.map((item) => (
              <Button
                key={item.id}
                variant={isActive(item.href) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.href)}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-[#0071c2] text-white hover:bg-[#00487a]'
                    : 'text-gray-700 hover:text-[#0071c2] hover:bg-blue-50'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarNavigation;
