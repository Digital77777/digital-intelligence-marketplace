
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Calendar, 
  BarChart3, 
  CheckCircle, 
  BookOpen, 
  Award,
  Download,
  Share2,
  FileText,
  MessageCircle
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface CourseSidebarProps {
  course: any;
  progress: number;
  onMarkComplete: () => void;
  onTabChange?: (tab: string) => void;
  onDownloadCertificate?: () => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ 
  course, 
  progress, 
  onMarkComplete, 
  onTabChange,
  onDownloadCertificate
}) => {
  const isCompleted = progress === 100;
  
  const handleShareCourse = () => {
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `Check out this course: ${course.title}`,
        url
      }).catch(err => {
        console.error('Error sharing:', err);
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Course link copied to clipboard");
    }).catch(err => {
      console.error('Could not copy text: ', err);
      toast.error("Failed to copy link");
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
            
            {isCompleted && onDownloadCertificate && (
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={onDownloadCertificate}
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
          <div className="w-full space-y-4">
            <h4 className="text-sm font-medium mb-2">Quick Access</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-start"
                onClick={() => onTabChange && onTabChange('content')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Content
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-start"
                onClick={() => onTabChange && onTabChange('resources')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Resources
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-start"
                onClick={() => onTabChange && onTabChange('discussion')}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Discussion
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-start"
                onClick={handleShareCourse}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseSidebar;
