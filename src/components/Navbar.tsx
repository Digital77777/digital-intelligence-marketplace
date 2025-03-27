
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Bot
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentTier } = useTier();
  const { user, profile, logout } = useUser();
  const navigate = useNavigate();

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

  const renderBasicTierLinks = () => {
    if (currentTier === 'freemium') return null;
    
    return (
      <>
        <Link 
          to="/team-dashboard" 
          className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
          onClick={() => window.scrollTo(0, 0)}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Team Dashboard</span>
        </Link>
        
        <Link 
          to="/collaboration-hub" 
          className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
          onClick={() => window.scrollTo(0, 0)}
        >
          <Users className="w-4 h-4" />
          <span>Collaboration</span>
        </Link>
        
        <Link 
          to="/workflow-designer" 
          className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
          onClick={() => window.scrollTo(0, 0)}
        >
          <GitBranch className="w-4 h-4" />
          <span>Workflow Designer</span>
        </Link>
      </>
    );
  };

  const renderMobileBasicTierLinks = () => {
    if (currentTier === 'freemium') return null;
    
    return (
      <>
        <button
          className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
          onClick={() => handleNavigation('/team-dashboard')}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Team Dashboard</span>
        </button>
        <button
          className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
          onClick={() => handleNavigation('/collaboration-hub')}
        >
          <Users className="h-5 w-5" />
          <span>Collaboration</span>
        </button>
        <button
          className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
          onClick={() => handleNavigation('/workflow-designer')}
        >
          <GitBranch className="h-5 w-5" />
          <span>Workflow Designer</span>
        </button>
      </>
    );
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length === 1) return name.substring(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        isScrolled ? 'glass bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold" onClick={() => window.scrollTo(0, 0)}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Digital Intelligence
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5">
          <Link 
            to="/" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/ai-tools" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <BookOpen className="w-4 h-4" />
            <span>AI Tools {currentTier === 'freemium' && <span className="text-xs text-blue-500">(Limited)</span>}</span>
          </Link>

          <Link 
            to="/ai-tools-directory" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Bot className="w-4 h-4" />
            <span>AI Directory</span>
          </Link>
          
          <Link 
            to="/learning-hub" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <BookMarked className="w-4 h-4" />
            <span>Learning Hub</span>
          </Link>

          <Link 
            to="/marketplace" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Marketplace</span>
          </Link>
          
          {renderBasicTierLinks()}
          
          <Link 
            to="/forums" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Community</span>
          </Link>
          
          <Link 
            to="/about" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
          
          <Link 
            to="/pricing" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <DollarSign className="w-4 h-4" />
            <span>Pricing</span>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full p-0 w-9 h-9">
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
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-black glass animate-fade-in">
          <div className="flex flex-col space-y-3 p-4">
            <button
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => handleNavigation('/')}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </button>
            <button
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => handleNavigation('/ai-tools')}
            >
              <BookOpen className="h-5 w-5" />
              <span>AI Tools {currentTier === 'freemium' && <span className="text-xs text-blue-500">(Limited)</span>}</span>
            </button>
            <button
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => handleNavigation('/ai-tools-directory')}
            >
              <Bot className="h-5 w-5" />
              <span>AI Directory</span>
            </button>
            <button
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => handleNavigation('/learning-hub')}
            >
              <BookMarked className="h-5 w-5" />
              <span>Learning Hub</span>
            </button>
            <button
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => handleNavigation('/marketplace')}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Marketplace</span>
            </button>
            
            {renderMobileBasicTierLinks()}
            
            <button
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => handleNavigation('/forums')}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Community</span>
            </button>
            <button
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => handleNavigation('/about')}
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </button>
            <button
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => handleNavigation('/pricing')}
            >
              <DollarSign className="h-5 w-5" />
              <span>Pricing</span>
            </button>

            {user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(profile?.username || user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{profile?.username || user.email.split('@')[0]}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
                <button
                  className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
                  onClick={() => handleNavigation('/profile')}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button
                  className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
                  onClick={() => handleNavigation('/settings')}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="default"
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
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
