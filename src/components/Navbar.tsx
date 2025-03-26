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
  GitBranch
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTier } from '@/context/TierContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const { currentTier } = useTier();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
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

  const handleOpenAuthModal = (tab: 'signin' | 'signup') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    // Mock logout functionality
    setIsLoggedIn(false);
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
            to="/courses" 
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            onClick={() => window.scrollTo(0, 0)}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses {currentTier === 'freemium' && <span className="text-xs text-blue-500">(Limited)</span>}</span>
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
            to="/community" 
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

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/profile" 
                className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
                onClick={() => window.scrollTo(0, 0)}
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleOpenAuthModal('signin')}
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => handleOpenAuthModal('signup')}
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
              onClick={() => handleNavigation('/courses')}
            >
              <BookOpen className="h-5 w-5" />
              <span>Courses {currentTier === 'freemium' && <span className="text-xs text-blue-500">(Limited)</span>}</span>
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
              onClick={() => handleNavigation('/community')}
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

            {isLoggedIn ? (
              <>
                <button
                  className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
                  onClick={() => handleNavigation('/profile')}
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleOpenAuthModal('signin');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="default"
                  onClick={() => {
                    handleOpenAuthModal('signup');
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

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen} 
        defaultTab={authModalTab}
      />
    </nav>
  );
};

export default Navbar;
