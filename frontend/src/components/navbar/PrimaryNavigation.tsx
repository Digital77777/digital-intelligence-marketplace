
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavItem } from './NavbarTypes';
import { useIsMobile } from '@/hooks/use-mobile';

interface PrimaryNavigationProps {
  items: NavItem[];
}

const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  items
}) => {
  const navigate = useNavigate();
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

  // Filter out footer items on mobile to prevent duplication
  const filteredItems = isMobile 
    ? items.filter(item => !footerItemPaths.includes(item.path))
    : items;

  return (
    <div className="bg-[#0071c2]/90 backdrop-blur-sm border-t border-white/10 px-0 my-0 mx-0 py-0">
      <div className="container overflow-x-auto scrollbar-none">
        <div className="flex space-x-2 py-3">
          {filteredItems.filter(item => item.visible).map(item => (
            <Button 
              key={item.path} 
              variant="ghost" 
              className="rounded-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 min-w-fit flex items-center whitespace-nowrap transition-all" 
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {item.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrimaryNavigation;
