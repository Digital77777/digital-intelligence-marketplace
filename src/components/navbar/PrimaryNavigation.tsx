
import React from 'react';
import { NavItem } from './NavbarTypes';
import { Link } from 'react-router-dom';
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Search } from 'lucide-react';
import useGlobalSearchModal from '@/components/search/useGlobalSearchModal';

const PrimaryNavigation = ({ items }: { items: NavItem[] }) => {
  const { openSearch } = useGlobalSearchModal();

  return (
    <nav className="primary-navigation flex items-center">
      {items.filter(item => item.visible).map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={navigationMenuTriggerStyle()}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
      <button
        type="button"
        onClick={openSearch}
        className="ml-auto flex items-center justify-center h-9 w-9 rounded-full text-white hover:bg-white/20"
        title="Open search"
      >
        <Search className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default PrimaryNavigation;

