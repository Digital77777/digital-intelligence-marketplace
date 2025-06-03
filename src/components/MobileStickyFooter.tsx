
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bot, 
  GraduationCap, 
  Play, 
  ShoppingBag, 
  MessageSquare 
} from 'lucide-react';

const MobileStickyFooter = () => {
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

  if (!isMobile) return null;

  const footerItems = [
    {
      id: 'ai-tools',
      label: 'AI Tools',
      icon: Bot,
      path: '/ai-tools-directory',
      isActive: location.pathname === '/ai-tools-directory' || location.pathname === '/ai-tools'
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: GraduationCap,
      path: '/learning-hub',
      isActive: location.pathname === '/learning-hub' || location.pathname === '/learning-academy'
    },
    {
      id: 'streams',
      label: 'Streams',
      icon: Play,
      path: '/ai-streams',
      isActive: location.pathname === '/ai-streams'
    },
    {
      id: 'marketplace',
      label: 'Market',
      icon: ShoppingBag,
      path: '/marketplace',
      isActive: location.pathname === '/marketplace'
    },
    {
      id: 'community',
      label: 'Community',
      icon: MessageSquare,
      path: '/community-forums',
      isActive: location.pathname === '/community-forums' || location.pathname === '/community'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-lg block md:hidden">
      <div className="flex items-center justify-around py-2 px-1">
        {footerItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-2 min-w-0 flex-1 transition-colors duration-200 ${
                item.isActive 
                  ? 'text-[#0071c2]' 
                  : 'text-gray-600 hover:text-[#0071c2]'
              }`}
            >
              <div className={`relative ${item.isActive ? 'text-[#0071c2]' : ''}`}>
                <IconComponent size={18} className="mb-1" />
                {item.id === 'streams' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
              <span className={`text-xs font-medium truncate ${
                item.isActive ? 'text-[#0071c2]' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileStickyFooter;
