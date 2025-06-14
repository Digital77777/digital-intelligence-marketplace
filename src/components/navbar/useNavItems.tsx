import { useCallback } from 'react';
import { useTier } from '@/context/TierContext';
import { Search } from 'lucide-react';
import { NavItem } from './NavbarTypes';

export function useNavItems() {
  const { currentTier, canAccess } = useTier();
  
  // Primary Navigation Items (shown as tabs/pills)
  const primaryNavItems: NavItem[] = [
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
    {
      title: "Forums",
      path: "/forums",
      icon: <span className="mr-1.5">💬</span>,
      visible: canAccess('forums')
    },
  ];
  
  // Remove Collaboration from primary, so we no longer add it here

  // Secondary navigation items - enhanced based on the image provided
  const getSecondaryNavItems = useCallback((): NavItem[] => {
    // Start with base items minus Forums
    const baseItems: NavItem[] = [
      {
        // Collaboration is now a secondary nav item and has no icon here
        title: "Collaboration",
        path: "/collaboration-hub",
        // icon removed per user request
        visible: canAccess('team-dashboard')
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

  return {
    primaryNavItems,
    secondaryNavItems
  };
}
