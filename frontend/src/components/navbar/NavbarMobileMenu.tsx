
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';

const NavbarMobileMenu = ({ navItems }: { navItems: { title: string; path: string; visible: boolean }[] }) => {
  const navigate = useNavigate();
  const { currentTier } = useTier();
  const { user, logout } = useUser();

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:w-2/3 md:w-1/2">
        <SheetHeader>
          <SheetTitle>Digital Intelligence Marketplace</SheetTitle>
          <SheetDescription>
            Explore the marketplace for digital intelligence solutions.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {navItems.map((item) => (
            <Button 
              key={item.path}
              variant="ghost" 
              className="justify-start" 
              onClick={() => navigate(item.path)}
            >
              {item.title}
            </Button>
          ))}
          
          <Button variant="ghost" className="justify-start" onClick={() => navigate('/discovery')}>
            Search
          </Button>
          
          {!user ? (
            <>
              <Button variant="ghost" className="justify-start" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button className="justify-start" onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="justify-start" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigate('/pricing')}>
                Subscription ({currentTier})
              </Button>
              <Button variant="ghost" className="justify-start" onClick={logout}>
                Log out
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobileMenu;
