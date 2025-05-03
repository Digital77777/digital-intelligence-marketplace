
import React, { useState, useCallback, memo, useEffect } from 'react';
import { useTier } from '@/context/TierContext';
import { useNavigate } from 'react-router-dom';
import NavbarBrand from './navbar/NavbarBrand';
import NavbarActions from './navbar/NavbarActions';
import NavbarUserMenu from './navbar/NavbarUserMenu';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';
import NavbarNavigation from './navbar/NavbarNavigation';
import { Button } from '@/components/ui/button';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Search } from 'lucide-react';

const Navbar = () => {
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Use the scroll to top hook
  useScrollToTop();
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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

  // Secondary navigation items - enhanced based on the image provided
  const getSecondaryNavItems = useCallback(() => {
    // Base items for all tiers (freemium, basic, and pro)
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

    // Items for Basic and Pro tiers
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

    // Pro tier exclusive items
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

    // Add AI Assistant and Search to all tiers - always visible at the end
    baseItems.push(
      {
        title: "AI Assistant",
        path: "/ai-assistant",
        visible: true
      },
      {
        title: "Search",
        path: "/discovery",
        icon: <Search className="h-4 w-4 mr-1.5" />,
        visible: true
      }
    );

    return baseItems;
  }, [currentTier, canAccess]);

  const secondaryNavItems = getSecondaryNavItems();

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top bar with brand and actions */}
      <div className="bg-gradient-to-r from-[#005ea8] to-[#0071c2] text-white">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between">
            <NavbarBrand />
            <div className="flex items-center gap-2">
              <NavbarActions />
              <NavbarUserMenu />
              <NavbarMobileMenu navItems={secondaryNavItems} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main navigation tabs */}
      <div className="bg-[#0071c2]/90 backdrop-blur-sm px-4 border-t border-white/10">
        <div className="container overflow-x-auto scrollbar-none">
          <div className="flex space-x-2 py-3">
            {primaryNavItems.filter(item => item.visible).map((item) => (
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
      
      {/* Secondary navigation - scrollable horizontal menu */}
      <NavbarNavigation navItems={secondaryNavItems} />
    </header>
  );
};

export default memo(Navbar);
