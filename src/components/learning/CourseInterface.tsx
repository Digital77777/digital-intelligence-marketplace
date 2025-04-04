import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  FileText, 
  MessageSquare, 
  Play,
  Download,
  Clock,
  Users,
  Star,
  Calendar
} from 'lucide-react';
import CourseSidebar from './CourseSidebar';
import CourseContent from './CourseContent';
import CourseDiscussion from './CourseDiscussion';
import CourseResources from './CourseResources';

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: string;
  duration: number;
  image_url?: string;
  required_tier: string;
  created_at: string;
}

interface UserProgress {
  id: string;
  completion_percent: number;
  last_accessed: string;
}

const CourseInterface = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const { currentTier, upgradePrompt } = useTier();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
      if (user) {
        fetchUserProgress();
      }
    }
  }, [courseId, user]);

  const fetchCourseDetails = async () => {
    setIsLoading(true);
    try {
      // First try learning_content table
      let { data, error } = await supabase
        .from('learning_content')
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (error || !data) {
        // If not found, try courses table
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();
          
        if (courseError) throw courseError;
        data = courseData;
      }
      
      // Ensure data.id is a string since that's what our interface expects
      if (data && typeof data.id === 'number') {
        data.id = String(data.id);
      }
      
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Could not load course details");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    if (!user || !courseId) return;
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();
        
      if (error) throw error;
      
      if (data) {
        setUserProgress(data);
      }
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };
  
  const updateProgress = async (percent: number) => {
    if (!user || !courseId) return;
    
    try {
      if (userProgress) {
        // Update existing progress
        await supabase
          .from('user_progress')
          .update({ 
            completion_percent: percent,
            last_accessed: new Date().toISOString()
          })
          .eq('id', userProgress.id);
      } else {
        // Create new progress record
        await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            course_id: courseId,
            completion_percent: percent,
            last_accessed: new Date().toISOString()
          });
      }
      
      // Update local state
      setUserProgress(prev => ({
        ...prev || { id: 'temp-id', last_accessed: new Date().toISOString() },
        completion_percent: percent
      }));
      
      if (percent === 100) {
        toast.success("Course completed! 🎉");
      } else {
        toast.success("Progress updated");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Failed to update progress");
    }
  };
  
  const canAccessCourse = () => {
    if (!course) return false;
    
    switch (course.required_tier) {
      case 'freemium':
        return true;
      case 'basic':
        return currentTier === 'basic' || currentTier === 'pro';
      case 'pro':
        return currentTier === 'pro';
      default:
        return false;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/learning-hub')}>Return to Learning Hub</Button>
      </div>
    );
  }

  if (!canAccessCourse()) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 border rounded-lg bg-muted/20 text-center">
        <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          This course requires {course.required_tier} tier access. 
          Please upgrade your subscription to access this content.
        </p>
        <Button onClick={() => upgradePrompt(course.required_tier as any)}>
          Upgrade to {course.required_tier.charAt(0).toUpperCase() + course.required_tier.slice(1)}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar with course info */}
      <div className="md:w-1/4">
        <CourseSidebar
          course={course}
          progress={userProgress?.completion_percent || 0}
          onMarkComplete={() => updateProgress(100)}
        />
      </div>
      
      {/* Main content area */}
      <div className="md:w-3/4">
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="content" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Content</span>
                </TabsTrigger>
                <TabsTrigger value="discussion" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Discussion</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Exercises</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <CourseContent 
                  content={course.content} 
                  onProgressUpdate={updateProgress}
                />
              </TabsContent>
              
              <TabsContent value="discussion">
                <CourseDiscussion courseId={courseId || ''} />
              </TabsContent>
              
              <TabsContent value="resources">
                <CourseResources courseCategory={course.category} courseDifficulty={course.difficulty} />
              </TabsContent>
              
              <TabsContent value="notes">
                <div className="p-6 text-center border rounded-lg bg-muted/20">
                  <Play className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Practical Exercises</h3>
                  <p className="text-muted-foreground mb-4">
                    Apply what you've learned with hands-on exercises and projects.
                  </p>
                  <Button>Start Exercises</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseInterface;
