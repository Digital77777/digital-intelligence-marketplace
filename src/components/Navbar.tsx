
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  MessageSquare, 
  User, 
  Info, 
  DollarSign, 
  ShoppingCart,
  LayoutDashboard,
  Users,
  GitBranch,
  LogOut,
  Settings,
  BookMarked,
  Bot,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Zap,
  BarChart,
  RocketIcon,
  Sparkles,
  MessagesSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  requiredTier: 'freemium' | 'basic' | 'pro';
  highlight?: boolean;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentTier, canAccess } = useTier();
  const { user, profile, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check scrollability of nav items
  useEffect(() => {
    const checkScroll = () => {
      if (navRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    // Create a MutationObserver to watch for changes to the navbar
    const observer = new MutationObserver(checkScroll);
    if (navRef.current) {
      observer.observe(navRef.current, { childList: true, subtree: true });
    }
    
    return () => {
      window.removeEventListener('resize', checkScroll);
      observer.disconnect();
    };
  }, [navRef.current]);

  const handleNavScroll = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      navRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update scroll indicators after scrolling
      setTimeout(() => {
        if (navRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
      }, 300);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length === 1) return name.substring(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const navItems: NavItem[] = [
    { label: 'Home', path: '/', icon: <Home className="h-5 w-5" />, requiredTier: 'freemium' },
    { label: 'AI Tools', path: '/ai-tools', icon: <RocketIcon className="h-5 w-5" />, requiredTier: 'freemium' },
    { label: 'Tools Directory', path: '/ai-tools-directory', icon: <Bot className="h-5 w-5" />, requiredTier: 'basic' },
    { label: 'Learning Hub', path: '/learning-hub', icon: <BookMarked className="h-5 w-5" />, requiredTier: 'freemium' },
    { label: 'Marketplace', path: '/marketplace', icon: <ShoppingCart className="h-5 w-5" />, requiredTier: 'freemium' },
    { label: 'Team Dashboard', path: '/team-dashboard', icon: <LayoutDashboard className="h-5 w-5" />, requiredTier: 'basic' },
    { label: 'Collaboration', path: '/collaboration-hub', icon: <Users className="h-5 w-5" />, requiredTier: 'basic' },
    { label: 'Workflow', path: '/workflow-designer', icon: <GitBranch className="h-5 w-5" />, requiredTier: 'basic' },
    { label: 'Community', path: '/forums', icon: <MessageSquare className="h-5 w-5" />, requiredTier: 'freemium' },
    { label: 'AI Studio', path: '/ai-studio', icon: <Sparkles className="h-5 w-5" />, requiredTier: 'pro' },
    { label: 'AI Assistant', path: '/ai-assistant', icon: <MessagesSquare className="h-5 w-5" />, requiredTier: 'pro', highlight: true },
    { label: 'Model Marketplace', path: '/model-marketplace', icon: <Zap className="h-5 w-5" />, requiredTier: 'pro' },
    { label: 'Business Insights', path: '/business-insights', icon: <BarChart className="h-5 w-5" />, requiredTier: 'pro' },
    { label: 'About', path: '/about', icon: <Info className="h-5 w-5" />, requiredTier: 'freemium' },
    { label: 'Pricing', path: '/pricing', icon: <DollarSign className="h-5 w-5" />, requiredTier: 'freemium' }
  ];

  // Filter accessible nav items based on current tier
  const accessibleNavItems = navItems.filter(item => {
    if (item.requiredTier === 'freemium') return true;
    if (item.requiredTier === 'basic') return currentTier === 'basic' || currentTier === 'pro';
    if (item.requiredTier === 'pro') return currentTier === 'pro';
    return false;
  });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass bg-indigo-600/95 dark:bg-indigo-950/95 backdrop-blur-md shadow-md' 
          : 'bg-indigo-600 dark:bg-indigo-950'
      }`}
    >
      {/* Top Nav with Logo and User Controls */}
      <div className="px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold flex items-center" onClick={() => window.scrollTo(0, 0)}>
              <span className="text-white mr-1">Digital</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200 font-extrabold">
                Intelligence
              </span>
            </Link>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <button className="text-white p-2 rounded-full hover:bg-white/10">
              <Search className="h-5 w-5" />
            </button>
            
            <button className="text-white p-2 rounded-full hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                1
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-white/10 md:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full p-0 w-9 h-9 hover:bg-white/10">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(profile?.username || user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.username || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="bg-white text-indigo-600 hover:bg-white/90"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Tabs */}
      <div className="relative border-t border-indigo-500/30 bg-indigo-700/50 dark:bg-indigo-900/50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 relative">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button 
              onClick={() => handleNavScroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-indigo-700 to-transparent dark:from-indigo-900 dark:to-transparent px-1 py-6 text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Scrollable navigation */}
          <div 
            ref={navRef}
            className="flex overflow-x-auto scrollbar-none py-2 px-3 space-x-1 snap-x"
          >
            {accessibleNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex-shrink-0 flex flex-col items-center justify-center px-4 py-2 rounded-full snap-start transition-colors whitespace-nowrap",
                    isActive 
                      ? "bg-white text-indigo-600 dark:text-indigo-900" 
                      : "text-white hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2 text-sm font-medium">{item.label}</span>
                    {item.highlight && (
                      <Badge variant="outline" className="ml-2 bg-yellow-400/20 text-yellow-200 border-yellow-500/20 py-0">
                        <Sparkles className="h-3 w-3 mr-1" /> Pro
                      </Badge>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right scroll button */}
          {canScrollRight && (
            <button 
              onClick={() => handleNavScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-l from-indigo-700 to-transparent dark:from-indigo-900 dark:to-transparent px-1 py-6 text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-indigo-900 animate-fade-in">
          <div className="flex flex-col space-y-1 p-4">
            {accessibleNavItems.map((item) => (
              <button
                key={item.path}
                className="text-white hover:bg-white/10 transition-colors py-3 px-4 rounded-lg flex items-center gap-3"
                onClick={() => handleNavigation(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.requiredTier !== 'freemium' && (
                  <Badge variant="outline" className="ml-auto bg-indigo-600/50 text-blue-200 border-blue-500/20">
                    {item.requiredTier === 'basic' ? 'Basic' : 'Pro'}
                  </Badge>
                )}
              </button>
            ))}
            
            {!user && (
              <div className="mt-4 flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="border-white/20 text-white w-full"
                >
                  Sign In
                </Button>
                <Button 
                  variant="default"
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-white text-indigo-700"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
