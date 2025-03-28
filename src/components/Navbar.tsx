import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Sparkles, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {}

const Navbar = () => {
  const { user, profile, logout } = useUser();
  const { currentTier } = useTier();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI HUB</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/ai-tools" className="text-foreground/70 hover:text-foreground transition-colors">
              AI Tools
            </Link>
            <Link to="/courses" className="text-foreground/70 hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/learning-hub" className="text-foreground/70 hover:text-foreground transition-colors">
              Learning Hub
            </Link>
            <Link to="/community" className="text-foreground/70 hover:text-foreground transition-colors">
              Community
            </Link>
            <Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                  <Avatar className="h-8 w-8">
                    {profile?.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} alt={profile.username || "User Avatar"} />
                    ) : (
                      <AvatarFallback>{profile?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    )}
                  </Avatar>
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
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>Sign In</Button>
              <Button onClick={() => navigate('/auth')}>Get Started</Button>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-2/3 md:w-1/2">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore the AI Hub platform.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/ai-tools'); setIsMobileMenuOpen(false); }}>
                  AI Tools
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/courses'); setIsMobileMenuOpen(false); }}>
                  Courses
                </Button>
                 <Button variant="ghost" className="justify-start" onClick={() => { navigate('/learning-hub'); setIsMobileMenuOpen(false); }}>
                  Learning Hub
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/community'); setIsMobileMenuOpen(false); }}>
                  Community
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}>
                  About
                </Button>
                {!user ? (
                  <>
                    <Button variant="ghost" className="justify-start" onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}>
                      Sign In
                    </Button>
                    <Button className="justify-start" onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}>
                      Get Started
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start" onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => { navigate('/pricing'); setIsMobileMenuOpen(false); }}>
                      Subscription ({currentTier})
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                      Log out
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
