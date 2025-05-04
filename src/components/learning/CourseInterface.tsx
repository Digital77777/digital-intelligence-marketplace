import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, BookOpen, MessageSquare, FileText, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import CourseSidebar from './CourseSidebar';
import CourseContent from './CourseContent';
import CourseDiscussion from './CourseDiscussion';
import CourseResources from './CourseResources';
import { fetchCourseById, getOrInitUserProgress, updateUserProgress, Course } from '@/utils/courseService';

const CourseInterface = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useUser();
  const { canAccess, upgradePrompt } = useTier();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('content');
  const [courseResources, setCourseResources] = useState<any[]>([]);
  
  useEffect(() => {
    if (!courseId) return;
    
    const loadCourseData = async () => {
      try {
        setLoading(true);
        
        // Fetch course by ID
        const courseData = await fetchCourseById(courseId);
        if (!courseData) {
          toast("Course not found");
          return;
        }
          
        setCourse(courseData);
        
        // Check if user can access this course based on tier
        if (courseData?.required_tier && !canAccess(courseData.required_tier)) {
          toast(`This course requires ${courseData.required_tier} tier access`);
          return;
        }
        
        // Fetch user's progress if logged in
        if (user) {
          const progress = await getOrInitUserProgress(user.id, courseData.id);
          if (progress) {
            setUserProgress(progress.completion_percent || 0);
          }
        }
        
        // Here we would fetch course resources
        // For now, using sample data
        setCourseResources([
          {
            id: '1',
            title: 'Course Syllabus',
            description: 'Complete course outline and learning objectives',
            type: 'pdf',
            url: '#'
          },
          {
            id: '2',
            title: 'Project Repository',
            description: 'Access the GitHub repository with sample code',
            type: 'code',
            url: 'https://github.com/example/course-repo'
          }
        ]);
        
      } catch (err: any) {
        console.error('Error loading course:', err);
        toast('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    
    loadCourseData();
  }, [courseId, user, canAccess]);
  
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
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/learning-hub">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Hub
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
                <TabsTrigger value="content" className="rounded-none data-[state=active]:bg-muted/50">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="discussion" className="rounded-none data-[state=active]:bg-muted/50">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussion
                </TabsTrigger>
                <TabsTrigger value="resources" className="rounded-none data-[state=active]:bg-muted/50">
                  <FileText className="h-4 w-4 mr-2" />
                  Resources
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="p-6">
                <CourseContent 
                  content={course.content} 
                  onProgressUpdate={handleUpdateProgress} 
                  course={course}
                />
              </TabsContent>
              
              <TabsContent value="discussion" className="p-6">
                <CourseDiscussion courseId={courseId || ''} />
              </TabsContent>
              
              <TabsContent value="resources" className="p-6">
                <CourseResources 
                  title={course.title} 
                  resources={courseResources} 
                  course={course}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
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

// Loading skeleton for better UX
const CourseLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-0">
            <div className="border-b p-4 flex space-x-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 order-first lg:order-last">
        <Card className="p-4">
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourseInterface;
