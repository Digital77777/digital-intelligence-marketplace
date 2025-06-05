
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { Zap, Sparkles } from 'lucide-react';

interface ProTierLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  requiredFeature: string;
}

const ProTierLayout: React.FC<ProTierLayoutProps> = ({ 
  children, 
  pageTitle, 
  requiredFeature 
}) => {
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!canAccess(requiredFeature)) {
      toast.error("This feature requires a Pro subscription", {
        description: "Please upgrade to access this premium feature.",
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50/50 to-indigo-50/30">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12 md:pb-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-purple-600" />
                <span>PRO</span>
              </Badge>
            </div>
          </div>
          
          <div className="bg-white backdrop-blur-sm rounded-xl border border-purple-100/80 p-6 shadow-lg">
            {children}
          </div>
        </div>
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default ProTierLayout;
