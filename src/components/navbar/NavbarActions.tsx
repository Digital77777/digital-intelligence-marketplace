
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Bell } from 'lucide-react';
import { toast } from 'sonner';

const NavbarActions = () => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(3);

  const handleNotificationClick = () => {
    toast.success("Notifications cleared");
    setNotificationCount(0);
  };

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-full text-white hover:bg-white/20"
        onClick={() => navigate('/discovery')}
        title="Search"
      >
        <Search className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-full text-white hover:bg-white/20 relative"
        onClick={handleNotificationClick}
        title="Notifications"
      >
        <Bell className="h-4 w-4" />
        {notificationCount > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium">
            {notificationCount}
          </span>
        )}
      </Button>
    </div>
  );
};

export default NavbarActions;
