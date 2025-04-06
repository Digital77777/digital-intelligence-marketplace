
import React, { useState, useCallback } from 'react';
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
  const getNavItems = useCallback(() => {
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
  }, [currentTier, canAccess]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/discovery?q=${encodeURIComponent(searchQuery)}`);
  }, [searchQuery, navigate]);

  const navItems = getNavItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0071c2] text-white shadow-md">
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
    </header>
  );
};

export default Navbar;
