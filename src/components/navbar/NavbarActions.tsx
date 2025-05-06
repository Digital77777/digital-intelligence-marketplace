
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Bell, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SearchCommand from '@/components/search/SearchCommand';

const NavbarActions = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const [notificationCount, setNotificationCount] = useState(3);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNotificationClick = () => {
    toast.success("Notifications cleared");
    setNotificationCount(0);
  };

  const handleProClick = () => {
    if (profile?.tier !== 'pro') {
      navigate('/pricing');
      toast("Upgrade required", {
        description: "This feature is available for Pro tier users only"
      });
    } else {
      navigate('/learning-academy');
    }
  };

  const openSearch = () => {
    // Instead of directly setting searchOpen, we'll let the SearchCommand handle this
    // The keyboard shortcut will activate the command dialog
    document.dispatchEvent(new KeyboardEvent('keydown', { 
      key: 'k',
      ctrlKey: true,
      bubbles: true 
    }));
  };

  const openAdvancedSearch = () => {
    navigate('/discovery');
  };

  return (
    <>
      <div className="flex items-center gap-2 md:gap-4">
        {/* Pro Feature Button - Only visible for non-Pro users */}
        {profile?.tier !== 'pro' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-full text-white bg-gradient-to-r from-[#00AAFF] to-[#0066cc] hover:opacity-90"
                onClick={handleProClick}
              >
                <Zap className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Go Pro</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upgrade to Pro for more features</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {/* Search Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full text-white hover:bg-white/20"
          onClick={openSearch}
          title="Quick Search (Press / or Ctrl+K)"
        >
          <Search className="h-4 w-4" />
        </Button>
        
        {/* Notification Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full text-white hover:bg-white/20 relative"
          onClick={handleNotificationClick}
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#00AAFF] to-[#0066cc] text-[10px] font-medium text-white">
              {notificationCount}
            </span>
          )}
        </Button>
      </div>
      
      {/* Global Search Command Dialog */}
      <SearchCommand />
    </>
  );
};

export default NavbarActions;
