
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import CourseSidebar from './CourseSidebar';
import CourseTabs from './course/CourseTabs';
import CourseLoadingSkeleton from './course/CourseLoadingSkeleton';
import CourseErrorState from './course/CourseErrorState';
import { useCourseData } from '@/hooks/useCourseData';
import { updateUserProgress } from '@/utils/courseService';

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
    
    try {
      setUserProgress(progress);
      
      if (user) {
        const success = await updateUserProgress(user.id, course.id, progress);
        if (!success) {
          throw new Error("Failed to update progress");
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast("Failed to update progress");
    }
  };
  
  if (loading) {
    return <CourseLoadingSkeleton />;
  }
  
  if (!course) {
    return <CourseErrorState />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
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
        />
      </div>
    </div>
  );
};

export default CourseInterface;
