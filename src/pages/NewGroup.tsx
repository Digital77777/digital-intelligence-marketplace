
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Users } from 'lucide-react';

const NewGroup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-black to-[#0C0C14]">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-[#00FFFF]">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/community" className="text-[#00FFFF]">
                Cyber Forum
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#00FFFF]">New Project Upload</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <Card className="bg-black/70 border border-[#8000FF]/30 shadow-[0_0_15px_rgba(128,0,255,0.1)]">
            <CardHeader className="border-b border-[#8000FF]/20">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#8000FF]" />
                <span className="text-[#8000FF] purple-glow">UPLOAD NEW PROJECT</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-center py-10">Project upload form to be implemented</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      
      {/* Add custom styles for the cyberpunk theme */}
      <style>
        {`
          .purple-glow {
            text-shadow: 0 0 10px rgba(128, 0, 255, 0.7);
          }
        `}
      </style>
    </div>
  );
};

export default NewGroup;
