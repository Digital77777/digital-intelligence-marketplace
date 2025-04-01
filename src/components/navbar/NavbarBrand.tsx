
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const NavbarBrand = () => {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl">
      <Sparkles className="h-5 w-5 text-[#fff]" />
      <span className="text-white">DIGITAL INTELLIGENCE MARKETPLACE</span>
    </Link>
  );
};

export default NavbarBrand;
