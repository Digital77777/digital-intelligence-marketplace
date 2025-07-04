import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot, GraduationCap, Play, ShoppingBag, MessageSquare } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const MobileStickyFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Always show on mobile devices - never hide
  if (!isMobile) return null;
  const footerItems = [{
    id: 'ai-tools',
    label: 'AI Tools',
    icon: Bot,
    path: '/ai-tools-directory',
    isActive: location.pathname === '/ai-tools-directory' || location.pathname === '/ai-tools'
  }, {
    id: 'learning',
    label: 'Learning',
    icon: GraduationCap,
    path: '/learning-hub',
    isActive: location.pathname === '/learning-hub' || location.pathname === '/learning-academy' || location.pathname === '/courses'
  }, {
    id: 'streams',
    label: 'Streams',
    icon: Play,
    path: '/ai-streams',
    isActive: location.pathname === '/ai-streams'
  }, {
    id: 'marketplace',
    label: 'Market',
    icon: ShoppingBag,
    path: '/marketplace',
    isActive: location.pathname === '/marketplace'
  }, {
    id: 'community',
    label: 'Community',
    icon: MessageSquare,
    path: '/community-forums',
    isActive: location.pathname === '/community-forums' || location.pathname === '/community'
  }];
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return <div className="mobile-sticky-footer fixed bottom-0 left-0 right-0 z-[100000] bg-gradient-to-r from-[#005ea8] to-[#0071c2] border-t-2 border-white/20 shadow-2xl md:hidden" style={{
    paddingBottom: 'env(safe-area-inset-bottom, 0.5rem)'
  }}>
      <div className="flex items-center justify-around py-0 px-[5px]">
        {footerItems.map(item => {
        const IconComponent = item.icon;
        return <button key={item.id} onClick={() => handleNavigation(item.path)} className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-all duration-200 rounded-lg touch-manipulation ${item.isActive ? 'text-white bg-white/20 scale-105' : 'text-white/80 hover:text-white hover:bg-white/10 active:scale-95'}`} style={{
          WebkitTapHighlightColor: 'transparent'
        }}>
              <div className="relative mb-1">
                <IconComponent size={20} strokeWidth={2} />
                {item.id === 'streams' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
              </div>
              <span className={`text-xs font-medium truncate leading-none ${item.isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>;
      })}
      </div>
    </div>;
};
export default MobileStickyFooter;