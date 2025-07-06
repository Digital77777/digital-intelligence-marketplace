
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
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
import { User, Settings, LogOut, Shield } from 'lucide-react';

const NavbarUserMenu = () => {
  const { user, signOut } = useAuth();
  const { currentTier } = useTier();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/auth')} 
          size="sm" 
          className="text-white hover:bg-white/20 transition-colors"
        >
          Sign In
        </Button>
        <Button 
          onClick={() => navigate('/auth')} 
          size="sm" 
          className="bg-gradient-to-r from-[#ffffff] to-[#f0f0f0] text-[#0088ff] hover:from-[#f0f0f0] hover:to-[#e0e0e0] transition-colors shadow-sm"
        >
          Get Started
        </Button>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 flex items-center gap-2 rounded-full px-2 text-white hover:bg-white/20">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-[#0066cc] text-white">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm hidden sm:inline font-medium">
            {user.user_metadata?.full_name || user.email}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.full_name || user.email}
            </p>
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
          <Shield className="mr-2 h-4 w-4" />
          <span className="flex items-center gap-1.5">
            Subscription 
            <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-medium capitalize">
              {currentTier}
            </span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
