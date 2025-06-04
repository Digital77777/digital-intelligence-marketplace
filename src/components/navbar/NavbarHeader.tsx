import React from 'react';
import NavbarBrand from './NavbarBrand';
import NavbarActions from './NavbarActions';
import NavbarUserMenu from './NavbarUserMenu';
import NavbarMobileMenu from './NavbarMobileMenu';
import { NavItem } from './NavbarTypes';

interface NavbarHeaderProps {
  secondaryNavItems: NavItem[];
  isScrolled: boolean;
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ 
  secondaryNavItems,
  isScrolled
}) => {
  return (
    <div className="navbar-header-content bg-gradient-to-r from-[#005ea8] to-[#0071c2] text-white shadow-lg">
      <div className="container px-4 py-3">
        <div className="flex items-center justify-between">
          <NavbarBrand />
          <div className="flex items-center gap-2">
            <NavbarActions />
            <NavbarUserMenu />
            <NavbarMobileMenu navItems={secondaryNavItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
