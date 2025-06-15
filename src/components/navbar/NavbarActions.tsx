import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Bell, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SearchCommand from '@/components/search/SearchCommand';
import { useTier } from '@/context/TierContext';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NotificationPanel from './NotificationPanel';
const NavbarActions = () => {
  const navigate = useNavigate();
  const {
    profile
  } = useUser();
  const {
    currentTier
  } = useTier();
  const [notificationCount, setNotificationCount] = useState(3);
  const handleClearNotifications = () => {
    toast.success("Notifications cleared");
    setNotificationCount(0);
  };
  const handleProClick = () => {
    if (currentTier !== 'pro') {
      navigate('/pricing');
      toast("Upgrade required", {
        description: "This feature is available for Pro tier users only"
      });
    } else {
      navigate('/learning-academy');
    }
  };
  const openSearch = () => {
    // Trigger keyboard shortcut to open search
    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true
    }));
  };
  return <>
      <div className="flex items-center gap-2 md:gap-4">
        {/* Pro Feature Button - Only visible for non-Pro users */}
        {currentTier !== 'pro' && <Tooltip>
            <TooltipTrigger asChild>
              
            </TooltipTrigger>
            <TooltipContent>
              <p>Upgrade to Pro for more features</p>
            </TooltipContent>
          </Tooltip>}
        
        {/* Search Button */}
        
        
        {/* Notification Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white hover:bg-white/20 relative" title="Notifications">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#00AAFF] to-[#0066cc] text-[10px] font-medium text-white">
                  {notificationCount}
                </span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <NotificationPanel onClear={handleClearNotifications} notificationCount={notificationCount} />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Global Search Command Dialog */}
      <SearchCommand />
    </>;
};
export default NavbarActions;