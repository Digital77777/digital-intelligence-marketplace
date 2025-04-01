
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const NavbarBrand = () => {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl">
      <div className="bg-gradient-to-r from-[#00AAFF] to-[#0066cc] p-1.5 rounded-md">
        <Sparkles className="h-5 w-5 text-white" />
      </div>
      <span className="text-white tracking-tight">DIGITAL INTELLIGENCE HUB</span>
    </Link>
  );
};

export default NavbarBrand;
