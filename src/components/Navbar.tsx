
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { Menu, Sparkles, User, Settings, LogOut, Search, Bell, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { user, profile, logout } = useUser();
  const { currentTier } = useTier();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0071c2]/95 backdrop-blur-md text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-5 w-5 text-[#fff]" />
            <span className="text-white">DIGITAL INTELLIGENCE MARKETPLACE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-6">
            <div className="relative group">
              <Link 
                to="/ai-tools" 
                className={cn(
                  "text-sm flex items-center group hover:text-white/90 transition-colors",
                  isActive('/ai-tools') ? "text-white" : "text-white/80"
                )}
              >
                AI Tools
                <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
              </Link>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-gray-800 hidden group-hover:block animate-in fade-in-50 z-50">
                <div className="py-1">
                  <Link to="/ai-tools" className="block px-4 py-2 text-sm hover:bg-gray-100">All AI Tools</Link>
                  <Link to="/ai-tools-directory" className="block px-4 py-2 text-sm hover:bg-gray-100">Tools Directory</Link>
                  <Link to="/submit-tool" className="block px-4 py-2 text-sm hover:bg-gray-100">Submit a Tool</Link>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <Link 
                to="/learning-hub" 
                className={cn(
                  "text-sm flex items-center group hover:text-white/90 transition-colors",
                  isActive('/learning-hub') ? "text-white" : "text-white/80"
                )}
              >
                Learning
                <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
              </Link>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-gray-800 hidden group-hover:block animate-in fade-in-50 z-50">
                <div className="py-1">
                  <Link to="/learning-hub" className="block px-4 py-2 text-sm hover:bg-gray-100">Learning Hub</Link>
                  <Link to="/courses" className="block px-4 py-2 text-sm hover:bg-gray-100">Courses</Link>
                </div>
              </div>
            </div>
            
            <Link 
              to="/community" 
              className={cn(
                "text-sm hover:text-white/90 transition-colors",
                isActive('/community') ? "text-white" : "text-white/80"
              )}
            >
              Community
            </Link>
            
            <Link 
              to="/pricing" 
              className={cn(
                "text-sm hover:text-white/90 transition-colors",
                isActive('/pricing') ? "text-white" : "text-white/80"
              )}
            >
              Pricing
            </Link>
          </nav>
        </div>

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
            className="h-9 w-9 rounded-full text-white hover:bg-white/20"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 flex items-center gap-2 rounded-full px-2 text-white hover:bg-white/20">
                  <Avatar className="h-7 w-7">
                    {profile?.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} alt={profile.username || "User Avatar"} />
                    ) : (
                      <AvatarFallback className="bg-[#003580] text-white">{profile?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
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
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/auth')} size="sm" className="text-white hover:bg-white/20">Sign In</Button>
              <Button onClick={() => navigate('/auth')} size="sm" className="bg-[#ffffff] text-[#0071c2] hover:bg-white/90">Get Started</Button>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-2/3 md:w-1/2">
              <SheetHeader>
                <SheetTitle>Digital Intelligence Marketplace</SheetTitle>
                <SheetDescription>
                  Explore the marketplace for digital intelligence solutions.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/ai-tools'); setIsMobileMenuOpen(false); }}>
                  AI Tools
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/ai-tools-directory'); setIsMobileMenuOpen(false); }}>
                  Tools Directory
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/learning-hub'); setIsMobileMenuOpen(false); }}>
                  Learning Hub
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/community'); setIsMobileMenuOpen(false); }}>
                  Community
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/pricing'); setIsMobileMenuOpen(false); }}>
                  Pricing
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => { navigate('/discovery'); setIsMobileMenuOpen(false); }}>
                  Search
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
      
      {/* Secondary navigation strip - booking.com style */}
      <div className="hidden md:block bg-[#003580] py-2 px-6">
        <div className="container mx-auto">
          <div className="flex items-center space-x-6">
            <Link to="/ai-tools" className="text-white/90 text-xs font-medium hover:text-white">AI Tools</Link>
            <Link to="/ai-tools-directory" className="text-white/90 text-xs font-medium hover:text-white">Tools Directory</Link>
            <Link to="/learning-hub" className="text-white/90 text-xs font-medium hover:text-white">Learning Hub</Link>
            <Link to="/ai-streams" className="text-white/90 text-xs font-medium hover:text-white">AI Streams</Link>
            <Link to="/community" className="text-white/90 text-xs font-medium hover:text-white">Forums</Link>
            {currentTier === 'basic' && (
              <>
                <Link to="/team-dashboard" className="text-white/90 text-xs font-medium hover:text-white">Team Dashboard</Link>
                <Link to="/workflow-designer" className="text-white/90 text-xs font-medium hover:text-white">Workflow Designer</Link>
              </>
            )}
            {currentTier === 'pro' && (
              <>
                <Link to="/ai-studio" className="text-white/90 text-xs font-medium hover:text-white">AI Studio</Link>
                <Link to="/business-insights" className="text-white/90 text-xs font-medium hover:text-white">Business Insights</Link>
                <Link to="/ai-assistant" className="text-white/90 text-xs font-medium hover:text-white">AI Assistant</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
