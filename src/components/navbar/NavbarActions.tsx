
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
  const { profile, user } = useUser();
  const { currentTier } = useTier();
  const [notificationCount, setNotificationCount] = useState(3);
  const { setOpen } = useSearchCommands();

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

  return (
    <>
      <div className="flex items-center gap-2 md:gap-4">
        {/* Pro Feature Button - Only visible for non-Pro users */}
        {currentTier !== 'pro' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-white hover:bg-white/20"
                onClick={handleProClick}
              >
                <Zap className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upgrade to Pro for more features</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {/* Search Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full text-white hover:bg-white/20"
              onClick={openSearch}
            >
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
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white hover:bg-white/20 relative" title="Notifications">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#00AAFF] to-[#0066cc] text-[10px] font-medium text-white">
                  {notificationCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <NotificationPanel onClear={handleClearNotifications} notificationCount={notificationCount} />
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white hover:bg-white/20">
                <User className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="end">
              <div className="p-4 border-b">
                <p className="font-medium">{profile?.full_name || profile?.username || 'User'}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentTier} tier</p>
              </div>
              <div className="p-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      {/* Global Search Command Dialog */}
      <SearchCommand />
    </>
  );
};

export default NavbarActions;
