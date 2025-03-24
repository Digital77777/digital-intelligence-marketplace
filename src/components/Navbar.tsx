
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, BookOpen, MessageSquare, User, Info, DollarSign, ShoppingCart } from 'lucide-react';
import Button from './Button';
import { useTier } from '@/context/TierContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const { currentTier } = useTier();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        isScrolled ? 'glass bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Digital Intelligence
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          <Link to="/ai-tools" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>AI Tools {currentTier === 'freemium' && <span className="text-xs text-blue-500">(Limited)</span>}</span>
          </Link>
          
          <Link to="/courses" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Courses {currentTier === 'freemium' && <span className="text-xs text-blue-500">(Limited)</span>}</span>
          </Link>

          <Link to="/marketplace" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <ShoppingCart className="w-4 h-4" />
            <span>Marketplace</span>
          </Link>
          
          <Link to="/community" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            <span>Community</span>
          </Link>
          
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
          
          <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            <span>Pricing</span>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
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
            <Link
              to="/"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/ai-tools"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              <span>AI Tools {currentTier === 'freemium' && <span className="text-xs text-blue-500">(Limited)</span>}</span>
            </Link>
            <Link
              to="/courses"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              <span>Courses {currentTier === 'freemium' && <span className="text-xs text-blue-500">(Limited)</span>}</span>
            </Link>
            <Link
              to="/marketplace"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Marketplace</span>
            </Link>
            <Link
              to="/community"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Community</span>
            </Link>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
            <Link
              to="/pricing"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <DollarSign className="h-5 w-5" />
              <span>Pricing</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
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
