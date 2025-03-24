
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Users, BookOpen, MessageSquare, User, Info, DollarSign } from 'lucide-react';
import Button from './Button';
import { useTier } from '@/context/TierContext';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentTier } = useTier();

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Digital Intelligence
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5 px-2 py-1">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>AI Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <div className="px-4 py-2">
                      <h4 className="text-sm font-medium leading-none mb-2">AI Tools Directory</h4>
                      <p className="text-sm text-muted-foreground">
                        {currentTier === 'freemium' ? 'Browse limited selection of AI tools (Freemium)' : 'Browse full selection of AI tools'}
                      </p>
                    </div>
                    <Link to="/ai-tools" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">AI Tools Directory</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Discover and compare AI tools for your needs
                      </p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Learning</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <div className="px-4 py-2">
                      <h4 className="text-sm font-medium leading-none mb-2">Courses & Learning Hub</h4>
                      <p className="text-sm text-muted-foreground">
                        {currentTier === 'freemium' ? 'Access limited courses (Freemium)' : 'Access all courses and resources'}
                      </p>
                    </div>
                    <Link to="/courses" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Courses</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Learn how to use AI tools effectively
                      </p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/community" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5 px-2 py-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Community</span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/profile" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5 px-2 py-1">
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5 px-2 py-1">
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5 px-2 py-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Pricing</span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="default" size="default">
            Get Started
          </Button>
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
          <div className="flex flex-col space-y-4 p-4">
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
              <span>AI Tools</span>
            </Link>
            <Link
              to="/courses"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              <span>Courses</span>
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
              to="/profile"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Dashboard</span>
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
            <Button variant="default" size="default" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
