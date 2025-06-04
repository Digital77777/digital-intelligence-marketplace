
import React, { useState, useEffect } from 'react';
import useScrollToTop from '@/hooks/useScrollToTop';
import NavbarHeader from './navbar/NavbarHeader';
import PrimaryNavigation from './navbar/PrimaryNavigation';
import NavbarNavigation from './navbar/NavbarNavigation';
import { useNavItems } from './navbar/useNavItems';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { primaryNavItems, secondaryNavItems } = useNavItems();
  
  // Use the scroll to top hook
  useScrollToTop();
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        position: 'fixed !important',
        top: '0 !important',
        left: '0 !important',
        right: '0 !important',
        zIndex: '50 !important',
        transform: 'none !important',
        willChange: 'auto'
      }}
    >
      {/* Top bar with brand and actions */}
      <NavbarHeader 
        secondaryNavItems={secondaryNavItems} 
        isScrolled={isScrolled} 
      />
      
      {/* Main navigation tabs */}
      <PrimaryNavigation items={primaryNavItems} />
      
      {/* Secondary navigation - scrollable horizontal menu */}
      <NavbarNavigation navItems={secondaryNavItems} />
    </header>
  );
};

export default React.memo(Navbar);
