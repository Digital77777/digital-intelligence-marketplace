
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import CourseContent from './CourseContent';
import CourseDiscussion from './CourseDiscussion';
import CourseResources from './CourseResources';
import CourseSidebar from './CourseSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';

const CourseInterface = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState<string>('content');
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();
  const { user } = useUser();

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!courseId) return;

        // Fetch course data
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (courseError) throw courseError;
        if (!courseData) throw new Error('Course not found');

        setCourse(courseData);
        
        // Fetch user progress if logged in
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('course_id', courseId)
            .eq('user_id', user.id)
            .single();

          if (!progressError && progressData) {
            setProgress(progressData.completion_percent || 0);
          } else {
            setProgress(0);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        toast({
          title: "Error loading course",
          description: "There was a problem loading the course content.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, user]);

  const handleMarkComplete = async () => {
    if (!user || !course) return;
    
    try {
      // Update progress to 100%
      const newProgress = 100;
      
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          completion_percent: newProgress,
          last_accessed: new Date().toISOString()
        }, {
          onConflict: 'user_id,course_id'
        });

      if (error) throw error;
      
      // Update local state
      setProgress(newProgress);
      
      toast({
        title: "Progress Updated",
        description: "Course marked as complete!",
        variant: "default",
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error updating progress",
        description: "There was a problem saving your progress.",
        variant: "destructive",
      });
    }
  };

  const goBack = () => navigate('/learning-hub');

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading course...</div>;
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Course not found</h2>
        <Button onClick={goBack}>Go back to Learning Hub</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={goBack} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Hub
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground mt-2">{course.description}</p>
          </div>
          
          <Separator />
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <CourseContent course={course} />
            </TabsContent>
            
            <TabsContent value="discussion">
              <CourseDiscussion courseId={courseId || ''} />
            </TabsContent>
            
            <TabsContent value="resources">
              <CourseResources course={course} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <CourseSidebar 
            course={course}
            progress={progress}
            onMarkComplete={handleMarkComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInterface;
