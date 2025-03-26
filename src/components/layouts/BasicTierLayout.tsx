
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

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
    if (currentTier === 'freemium' && requiredFeature) {
      toast.error("This feature requires a Basic or Pro subscription", {
        description: "Please upgrade to access this feature.",
        action: {
          label: "Upgrade",
          onClick: () => navigate('/pricing')
        }
      });
      navigate('/');
    }
  }, [currentTier, requiredFeature, navigate]);

  if (currentTier === 'freemium' && requiredFeature) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{pageTitle}</h1>
              <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                BASIC
              </Badge>
            </div>
          </div>
          
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BasicTierLayout;
