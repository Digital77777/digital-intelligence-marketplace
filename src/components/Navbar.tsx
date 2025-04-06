
import React, { useState } from 'react';
import { useTier } from '@/context/TierContext';
import { useNavigate } from 'react-router-dom';
import NavbarBrand from './navbar/NavbarBrand';
import NavbarActions from './navbar/NavbarActions';
import NavbarUserMenu from './navbar/NavbarUserMenu';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';
import { Button } from '@/components/ui/button';
import { Search, CalendarDays, Users } from 'lucide-react';
import useScrollToTop from '@/hooks/useScrollToTop';

const Navbar = () => {
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();
  // Use the scroll to top hook
  useScrollToTop();
  
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Navigation Items (shown as tabs/pills)
  const primaryNavItems = [
    {
      title: "AI Tools",
      path: "/ai-tools-directory",
      icon: <span className="mr-1.5">🔧</span>,
      visible: canAccess('ai-tools-directory')
    },
    {
      title: "Learning Hub",
      path: "/learning-hub",
      icon: <span className="mr-1.5">📚</span>,
      visible: canAccess('learning-hub')
    },
    {
      title: "AI Streams",
      path: "/ai-streams",
      icon: <span className="mr-1.5">📺</span>,
      visible: canAccess('ai-streams')
    },
    {
      title: "Marketplace",
      path: "/marketplace",
      icon: <span className="mr-1.5">🛒</span>,
      visible: canAccess('marketplace')
    },
  ];
  
  // Only show Collaboration Hub for Basic and Pro tiers
  if (currentTier === 'basic' || currentTier === 'pro') {
    primaryNavItems.push({
      title: "Collaboration",
      path: "/collaboration-hub",
      icon: <span className="mr-1.5">👥</span>,
      visible: canAccess('team-dashboard')
    });
  }

  // Secondary navigation items are the ones that were previously in the dropdown
  const getNavItems = () => {
    // Base items for freemium users
    const baseItems = [
      {
        title: "Forums",
        path: "/forums",
        visible: canAccess('forums')
      },
      {
        title: "Pricing",
        path: "/pricing",
        visible: true
      }
    ];

    // Add items based on tier
    if (currentTier === 'basic' || currentTier === 'pro') {
      baseItems.push(
        {
          title: "Team Dashboard",
          path: "/team-dashboard",
          visible: canAccess('team-dashboard')
        },
        {
          title: "Workflow Designer",
          path: "/workflow-designer",
          visible: canAccess('workflow-designer')
        }
      );
    }

    if (currentTier === 'pro') {
      baseItems.push(
        {
          title: "AI Studio",
          path: "/ai-studio",
          visible: canAccess('ai-studio')
        },
        {
          title: "Business Insights",
          path: "/business-insights",
          visible: canAccess('business-insights')
        },
        {
          title: "Pipeline Designer",
          path: "/pipeline-designer",
          visible: canAccess('pipeline-designer')
        },
        {
          title: "Compliance Center",
          path: "/compliance-center",
          visible: canAccess('compliance-center')
        },
        {
          title: "Learning Academy",
          path: "/learning-academy",
          visible: canAccess('learning-academy')
        }
      );
    }

    // Add AI Assistant to all tiers
    baseItems.push({
      title: "AI Assistant",
      path: "/ai-assistant",
      visible: true
    });

    return baseItems;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/discovery?q=${encodeURIComponent(searchQuery)}`);
  };

  const navItems = getNavItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0071c2] text-white">
      {/* Top bar with brand and actions */}
      <div className="container px-4 py-3">
        <div className="flex items-center justify-between">
          <NavbarBrand />
          <div className="flex items-center gap-2">
            <NavbarActions />
            <NavbarUserMenu />
            <NavbarMobileMenu navItems={navItems} />
          </div>
        </div>
      </div>
      
      {/* Main navigation tabs */}
      <div className="bg-[#0071c2] px-4">
        <div className="container overflow-x-auto scrollbar-none">
          <div className="flex space-x-2 py-3">
            {primaryNavItems.filter(item => item.visible).map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="rounded-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 min-w-fit flex items-center whitespace-nowrap"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Search container */}
      <div className="bg-[#ffb700] py-4">
        <div className="container px-4">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            {/* Search fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="bg-white rounded-md flex items-center p-3">
                <Search className="text-gray-500 h-5 w-5 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search for tools, courses, or content..." 
                  className="flex-1 outline-none text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="bg-white rounded-md flex items-center p-3">
                <CalendarDays className="text-gray-500 h-5 w-5 mr-2" />
                <div className="text-gray-600 text-sm">Today - Tomorrow</div>
              </div>
              <div className="bg-white rounded-md flex items-center p-3">
                <Users className="text-gray-500 h-5 w-5 mr-2" />
                <div className="text-gray-600 text-sm">1 user • Freemium</div>
              </div>
            </div>
            
            {/* Search button */}
            <div className="mt-2">
              <Button 
                type="submit"
                className="w-full bg-[#0071c2] hover:bg-[#00487a] text-white font-medium text-lg py-3"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
