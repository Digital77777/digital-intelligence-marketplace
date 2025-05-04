
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, MessageSquare, FileText } from 'lucide-react';
import { Course } from '@/utils/courseService';
import CourseContent from '../CourseContent';
import CourseDiscussion from '../CourseDiscussion';
import CourseResources from '../CourseResources';

interface CourseTabsProps {
  course: Course;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onProgressUpdate: (progress: number) => void;
  courseResources: any[];
  courseId: string;
}

const CourseTabs: React.FC<CourseTabsProps> = ({
  course,
  activeTab,
  setActiveTab,
  onProgressUpdate,
  courseResources,
  courseId,
}) => {
  return (
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
              onProgressUpdate={onProgressUpdate} 
              course={course}
            />
          </TabsContent>
          
          <TabsContent value="discussion" className="p-6">
            <CourseDiscussion courseId={courseId} />
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
  );
};

export default CourseTabs;
