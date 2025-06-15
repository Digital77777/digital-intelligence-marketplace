import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavItem } from './NavbarTypes';
interface PrimaryNavigationProps {
  items: NavItem[];
}
const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  items
}) => {
  const navigate = useNavigate();
  return <div className="bg-[#0071c2]/90 backdrop-blur-sm border-t border-white/10 px-0 my-0 mx-0 py-0">
      <div className="container overflow-x-auto scrollbar-none">
        <div className="flex space-x-2 py-3">
          {items.filter(item => item.visible).map(item => <Button key={item.path} variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 min-w-fit flex items-center whitespace-nowrap transition-all" onClick={() => navigate(item.path)}>
              {item.icon}
              {item.title}
            </Button>)}
        </div>
      </div>
    </div>;
};
export default PrimaryNavigation;