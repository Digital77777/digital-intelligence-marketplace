
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import ToolSubmissionForm from '@/components/marketplace/ToolSubmissionForm';
import useScrollToTop from '@/hooks/useScrollToTop';

const SubmitTool = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <ToolSubmissionForm />
        </div>
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default SubmitTool;
