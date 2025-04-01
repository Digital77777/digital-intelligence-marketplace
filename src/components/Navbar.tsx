
import React from 'react';
import { useTier } from '@/context/TierContext';
import NavbarBrand from './navbar/NavbarBrand';
import NavbarActions from './navbar/NavbarActions';
import NavbarUserMenu from './navbar/NavbarUserMenu';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';
import NavbarNavigation from './navbar/NavbarNavigation';

const Navbar = () => {
  const { currentTier, canAccess } = useTier();

  // Navigation items based on current tier
  const getNavItems = () => {
    // Base items for freemium users
    const baseItems = [
      {
        title: "AI Tools Directory",
        path: "/ai-tools-directory",
        visible: canAccess('ai-tools-directory')
      },
      {
        title: "Learning Hub",
        path: "/learning-hub",
        visible: canAccess('learning-hub')
      },
      {
        title: "AI Streams",
        path: "/ai-streams",
        visible: canAccess('ai-streams')
      },
      {
        title: "Community Forums",
        path: "/forums",
        visible: canAccess('forums')
      },
      {
        title: "Marketplace",
        path: "/marketplace",
        visible: canAccess('marketplace')
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

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0088ff]/95 backdrop-blur-md text-white">
      <div className="container flex flex-col h-auto">
        {/* Top Bar with Logo and User Controls */}
        <div className="flex items-center justify-between py-3">
          <NavbarBrand />

          <div className="flex items-center gap-2 md:gap-4">
            <NavbarActions />
            <NavbarUserMenu />
            <NavbarMobileMenu navItems={navItems} />
          </div>
        </div>
        
        {/* Scrollable Navigation Bar */}
        <NavbarNavigation navItems={navItems} />
      </div>
    </header>
  );
};

export default Navbar;
