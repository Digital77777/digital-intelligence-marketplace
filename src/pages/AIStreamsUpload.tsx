
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useTier } from '@/context/TierContext';
import UploadForm from '@/components/ai-streams/UploadForm';
import TierRestrictedAccess from '@/components/ai-streams/TierRestrictedAccess';

const AIStreamsUpload = () => {
  const { currentTier } = useTier();
  const navigate = useNavigate();
  
  // Check tier access
  const canUploadStreams = currentTier === 'basic' || currentTier === 'pro';
  
  const handleUploadSuccess = () => {
    navigate('/ai-streams');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/ai-streams">AI Streams</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>Upload Stream</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          {canUploadStreams ? (
            <UploadForm onUploadSuccess={handleUploadSuccess} />
          ) : (
            <TierRestrictedAccess
              feature="Premium Feature"
              description="AI Stream uploads are available for"
              requiredTier="Basic or Pro"
              actionLabel="View Pricing Plans"
              actionPath="/pricing"
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIStreamsUpload;
