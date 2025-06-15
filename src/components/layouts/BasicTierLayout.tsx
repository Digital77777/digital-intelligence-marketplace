
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import TierGuard from '@/components/auth/TierGuard';
import { Helmet } from 'react-helmet-async';

interface BasicTierLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  requiredFeature?: string;
  requiredTier?: 'basic' | 'pro';
}

const BasicTierLayout: React.FC<BasicTierLayoutProps> = ({
  children,
  pageTitle,
  requiredFeature,
  requiredTier = 'basic'
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{pageTitle} - DIM</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pb-20 md:pb-8">
        {requiredTier ? (
          <TierGuard requiredTier={requiredTier} feature={requiredFeature}>
            {children}
          </TierGuard>
        ) : (
          children
        )}
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default BasicTierLayout;
