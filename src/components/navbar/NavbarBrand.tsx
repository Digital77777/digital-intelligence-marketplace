
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarBrand = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-white font-bold tracking-tight">
        DIGITAL<span className="opacity-85 text-sm font-normal ml-0.5">INTELLIGENCE</span>
        <span className="text-xs font-normal opacity-70 ml-1.5">Marketplace</span>
      </span>
    </Link>
  );
};

export default NavbarBrand;
