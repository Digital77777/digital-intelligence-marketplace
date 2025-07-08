
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseInterface from '@/components/learning/CourseInterface';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight, BookOpen } from 'lucide-react';

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb className="mb-8">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/learning-hub">
                Learning Hub
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>Course Details</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <CourseInterface />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
