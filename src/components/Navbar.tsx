
import React, { useState, useRef, useEffect } from 'react';
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
import { toast } from 'sonner';

const Navbar = () => {
  const { user, profile, logout } = useUser();
  const { currentTier } = useTier();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNotificationClick = () => {
    toast.success("Notifications cleared");
    setNotificationCount(0);
  };

  // Check if the nav is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  // Navigation items based on current tier
  const getNavItems = () => {
    // Base items for freemium users
    const baseItems = [
      {
        title: "AI Tools Directory",
        path: "/ai-tools-directory",
        visible: true
      },
      {
        title: "Learning Hub",
        path: "/learning-hub",
        visible: true
      },
      {
        title: "AI Streams",
        path: "/ai-streams",
        visible: true
      },
      {
        title: "Community Forums",
        path: "/forums",
        visible: true
      },
      {
        title: "Marketplace",
        path: "/marketplace",
        visible: true
      },
      {
        title: "Pricing",
        path: "/pricing",
        visible: true
      }
    ];

    // Add items based on tier
    if (currentTier === 'basic' || currentTier === 'pro') {
      baseItems.push(
        {
          title: "Team Dashboard",
          path: "/team-dashboard",
          visible: true
        },
        {
          title: "Workflow Designer",
          path: "/workflow-designer",
          visible: true
        }
      );
    }

    if (currentTier === 'pro') {
      baseItems.push(
        {
          title: "AI Studio",
          path: "/ai-studio",
          visible: true
        },
        {
          title: "Business Insights",
          path: "/business-insights",
          visible: true
        },
        {
          title: "Pipeline Designer",
          path: "/pipeline-designer",
          visible: true
        },
        {
          title: "Compliance Center",
          path: "/compliance-center",
          visible: true
        },
        {
          title: "AI Assistant",
          path: "/ai-assistant",
          visible: true
        }
      );
    }

    return baseItems.filter(item => item.visible);
  };

  const navItems = getNavItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0071c2]/95 backdrop-blur-md text-white">
      <div className="container flex flex-col h-auto">
        {/* Top Bar with Logo and User Controls */}
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl">
            <Sparkles className="h-5 w-5 text-[#fff]" />
            <span className="text-white">DIGITAL INTELLIGENCE MARKETPLACE</span>
          </Link>

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
                  {navItems.map((item) => (
                    <Button 
                      key={item.path}
                      variant="ghost" 
                      className="justify-start" 
                      onClick={() => { 
                        navigate(item.path); 
                        setIsMobileMenuOpen(false); 
                      }}
                    >
                      {item.title}
                    </Button>
                  ))}
                  
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
        
        {/* Scrollable Navigation Bar - booking.com style */}
        <div className="bg-[#003580] w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex items-center space-x-1 py-2 px-2 overflow-x-auto scrollbar-none"
          >
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={cn(
                  "text-white whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium flex-shrink-0",
                  isActive(item.path) ? "bg-white/20" : "hover:bg-white/10"
                )}
              >
                {item.title}
              </Link>
            ))}
            
            {/* Shadow indicator for scrollable content */}
            {scrollable && (
              <div className="absolute right-0 top-[3.75rem] h-[2.5rem] w-12 bg-gradient-to-l from-[#003580] to-transparent pointer-events-none"></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
