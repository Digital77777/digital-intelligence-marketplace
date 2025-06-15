
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CreateTopicForm from '@/components/forums/CreateTopicForm';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MessageSquarePlus } from 'lucide-react';

const NewTopic = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate('/community-forums');
  };

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
              <BreadcrumbLink href="/community-forums" className="text-[#00FFFF]">
                Cyber Forum
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#00FFFF]">New Thread</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <Card className="bg-black/70 border border-[#00FFFF]/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader className="border-b border-[#00FFFF]/20">
              <CardTitle className="flex items-center gap-2">
                <MessageSquarePlus className="h-5 w-5 text-[#FF007F]" />
                <span className="text-[#00FFFF] text-shadow-glow">CREATE NEW THREAD</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CreateTopicForm 
                categoryId={categoryId || ''}
                onCancel={handleCancel}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      
      {/* Add custom styles for the cyberpunk theme */}
      <style>
        {`
          .text-shadow-glow {
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
          }
        `}
      </style>
    </div>
  );
};

export default NewTopic;
