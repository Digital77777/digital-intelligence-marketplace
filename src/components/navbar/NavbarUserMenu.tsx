
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from 'lucide-react';

const NavbarUserMenu = () => {
  const { user, profile, logout } = useUser();
  const { currentTier } = useTier();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate('/auth')} size="sm" className="text-white hover:bg-white/20">Sign In</Button>
        <Button onClick={() => navigate('/auth')} size="sm" className="bg-[#ffffff] text-[#0088ff] hover:bg-white/90">Get Started</Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 flex items-center gap-2 rounded-full px-2 text-white hover:bg-white/20">
          <Avatar className="h-7 w-7">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={profile.username || "User Avatar"} />
            ) : (
              <AvatarFallback className="bg-[#0066cc] text-white">{profile?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm hidden sm:inline">{profile?.username || "Account"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.username || user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')} >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/pricing')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Subscription ({currentTier})</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
