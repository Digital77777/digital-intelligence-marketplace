
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { Shield, Sparkles } from 'lucide-react';

interface BasicTierLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  requiredFeature: string;
}

const BasicTierLayout: React.FC<BasicTierLayoutProps> = ({ 
  children, 
  pageTitle, 
  requiredFeature 
}) => {
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!canAccess(requiredFeature)) {
      toast.error("This feature requires a Basic or Pro subscription", {
        description: "Please upgrade to access this feature.",
        action: {
          label: "Upgrade",
          onClick: () => navigate('/pricing')
        }
      });
      navigate('/');
    }
  }, [currentTier, requiredFeature, navigate, canAccess]);

  if (!canAccess(requiredFeature)) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12 md:pb-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{pageTitle}</h1>
              <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800 px-3 py-1 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                <span>BASIC</span>
              </Badge>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-blue-100/80 dark:border-blue-900/50 p-6 shadow-md">
            {children}
          </div>
        </div>
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default BasicTierLayout;
