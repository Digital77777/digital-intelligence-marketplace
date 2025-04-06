
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarBrand = () => {
  return (
    <Link to="/" className="flex items-center font-bold text-xl">
      <span className="text-white">DIGITAL INTELLIGENCE</span>
    </Link>
  );
};

export default NavbarBrand;
