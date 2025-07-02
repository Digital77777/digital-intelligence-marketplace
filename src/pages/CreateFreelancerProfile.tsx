
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import CreateFreelancerProfileForm from '@/components/marketplace/CreateFreelancerProfileForm';
import useScrollToTop from '@/hooks/useScrollToTop';

const CreateFreelancerProfile = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <CreateFreelancerProfileForm />
        </div>
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default CreateFreelancerProfile;
