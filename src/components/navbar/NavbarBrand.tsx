import React from 'react';
import { Link } from 'react-router-dom';
const NavbarBrand = () => {
  return <Link to="/" className="flex items-center group">
      <div className="bg-white/10 p-1.5 rounded-lg mr-2 group-hover:bg-white/20 transition-all">
        
      </div>
      <div className="flex flex-col items-start">
        <span className="text-white font-bold tracking-tight leading-none text-lg">
          DIGITAL<span className="opacity-85 text-sm font-normal ml-0.5">INTELLIGENCE</span>
        </span>
        <span className="text-xs font-normal text-blue-100 opacity-80 leading-none mt-0.5">Marketplace for AI Solutions</span>
      </div>
    </Link>;
};
export default NavbarBrand;