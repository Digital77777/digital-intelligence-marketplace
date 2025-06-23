import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
const NavbarBrand = () => {
  return <Link to="/" className="flex items-center group">
      <div className="bg-white/10 p-1.5 rounded-lg mr-2 group-hover:bg-white/20 transition-all">
        <Brain className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-white font-bold tracking-tight leading-none text-lg">
          DIGITAL INTELLIGENCE MARKETPLACE<span className="opacity-85 text-sm font-normal ml-0.5"></span>
        </span>
        
      </div>
    </Link>;
};
export default NavbarBrand;