
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Calendar, BarChart3, CheckCircle, BookOpen, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

interface CourseSidebarProps {
  course: any;
  progress: number;
  onMarkComplete: () => void;
  onTabChange?: (tab: string) => void; // Add the optional onTabChange prop
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course, progress, onMarkComplete, onTabChange }) => {
  const isCompleted = progress === 100;
  
  const handleCertificateClick = () => {
    // In a real application, this would generate or display the certificate
    toast({
      title: "Certificate Generated",
      description: "Your certificate has been generated and added to your profile.",
      variant: "default",
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-lg font-medium">Your Progress</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">
                {progress}% complete
              </span>
              {isCompleted && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              )}
            </div>
            <Progress value={progress} className="h-2" />
            
            {!isCompleted && (
              <Button 
                className="w-full mt-2" 
                onClick={onMarkComplete}
              >
                Mark as Complete
              </Button>
            )}
            
            {isCompleted && (
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={handleCertificateClick}
              >
                <Award className="mr-2 h-4 w-4" />
                Get Certificate
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Course Info Card */}
      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-lg font-medium">Course Information</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              Duration
            </div>
            <span className="font-medium">{course.duration} minutes</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
              Difficulty
            </div>
            <Badge variant="secondary">
              {course.difficulty}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              Category
            </div>
            <Badge>
              {course.category}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Last Updated
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(course.updated_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="pt-4">
          <div className="w-full">
            <h4 className="text-sm font-medium mb-2">Share this course</h4>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Copy Link
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseSidebar;
