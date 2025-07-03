import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Bell, Zap, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SearchCommand from '@/components/search/SearchCommand';
import { useTier } from '@/context/TierContext';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NotificationPanel from './NotificationPanel';
import { supabase } from '@/integrations/supabase/client';
import { useSearchCommands } from '@/components/search/useSearchCommands';
const NavbarActions = () => {
  const navigate = useNavigate();
  const {
    profile,
    user
  } = useUser();
  const {
    currentTier
  } = useTier();
  const [notificationCount, setNotificationCount] = useState(3);
  const {
    setOpen
  } = useSearchCommands();
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
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Error signing out");
    }
  };
  const openSearch = () => {
    setOpen(true);
  };
  return <>
      <div className="flex items-center gap-2 md:gap-4">
        {/* Pro Feature Button - Only visible for non-Pro users */}
        {currentTier !== 'pro' && <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/20" onClick={handleProClick}>
                <Zap className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upgrade to Pro for more features</p>
            </TooltipContent>
          </Tooltip>}
        
        {/* Search Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/20" onClick={openSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search (Ctrl+K)</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Notification Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <NotificationPanel onClear={handleClearNotifications} notificationCount={notificationCount} />
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        {user && <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white hover:bg-white/20">
                
              </Button>
            </PopoverTrigger>
            
          </Popover>}
      </div>
      
      {/* Global Search Command Dialog */}
      <SearchCommand />
    </>;
};
export default NavbarActions;