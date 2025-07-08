
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

const TopicDetails = () => {
  const { topicId } = useParams<{ topicId: string }>();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-black to-[#0C0C14]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-[#00FFFF]">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/community-forums" className="text-[#00FFFF]">
                Cyber Forum
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#00FFFF]">Thread Details</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="border border-[#00FFFF]/30 rounded-lg p-6 bg-black/70 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <h2 className="text-xl font-bold text-[#00FFFF] mb-4 neon-text">Topic ID: {topicId}</h2>
            <p className="text-gray-300">Topic details page to be implemented</p>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Add custom styles for the cyberpunk theme */}
      <style>
        {`
          .neon-text {
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.7);
          }
        `}
      </style>
    </div>
  );
};

export default TopicDetails;
