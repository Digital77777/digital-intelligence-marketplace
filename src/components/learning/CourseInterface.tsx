import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import CourseSidebar from './CourseSidebar';
import CourseTabs from './course/CourseTabs';
import CourseLoadingSkeleton from './course/CourseLoadingSkeleton';
import CourseErrorState from './course/CourseErrorState';
import { useCourseData } from '@/hooks/useCourseData';
import { updateUserProgress } from '@/utils/courseService';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';

const CourseInterface = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('content');
  
  const {
    course,
    loading,
    userProgress,
    setUserProgress,
    courseResources
  } = useCourseData(courseId);
  
  const handleUpdateProgress = async (progress: number) => {
    if (!user || !courseId || !course) return;
    setUserProgress(progress);
  };
  
  const handleDownloadCertificate = () => {
    if (!course) return;
    
    // Create a sample certificate content
    const certificateContent = `
# Certificate of Completion

This certifies that

**${user?.user_metadata?.full_name || 'Student'}**

has successfully completed the course

## ${course.title}

Issued on: ${new Date().toLocaleDateString()}
    `;
    
    // Create a blob and trigger download
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${course.title.replace(/\s+/g, '-').toLowerCase()}-certificate.md`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    
    toast.success("Certificate downloaded");
  };
  
  const handleSaveCourseContent = () => {
    if (!course) return;
    
    // Create content for download
    const courseContent = `
# ${course.title}

${course.description || ''}

## Course Content

${course.content || 'Content not available for offline viewing.'}
    `;
    
    // Create a blob and trigger download
    const blob = new Blob([courseContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${course.title.replace(/\s+/g, '-').toLowerCase()}-content.md`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    
    toast.success("Course content saved to your device");
  };
  
  if (loading) {
    return <CourseLoadingSkeleton />;
  }
  
  if (!course) {
    return <CourseErrorState />;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link to="/learning-hub">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Hub
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <Button 
              variant="outline" 
              onClick={handleSaveCourseContent}
            >
              <Download className="mr-2 h-4 w-4" />
              Save for Offline
            </Button>
          </div>
          
          <CourseTabs
            course={course}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onProgressUpdate={handleUpdateProgress}
            courseResources={courseResources}
            courseId={courseId || ''}
          />
        </div>
        
        <div className="col-span-1 order-first lg:order-last">
          <CourseSidebar 
            course={course} 
            progress={userProgress} 
            onMarkComplete={() => handleUpdateProgress(100)}
            onTabChange={setActiveTab}
            onDownloadCertificate={userProgress === 100 ? handleDownloadCertificate : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInterface;
