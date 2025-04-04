
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  BookOpen, 
  Award,
  CheckCircle, 
  BarChart,
  Download
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CourseSidebarProps {
  course: {
    title: string;
    description: string;
    category: string;
    difficulty: string;
    duration: number;
    image_url?: string;
    created_at: string;
  };
  progress: number;
  onMarkComplete: () => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  course,
  progress,
  onMarkComplete
}) => {
  return (
    <div className="space-y-6">
      {/* Course image */}
      <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
        {course.image_url ? (
          <img 
            src={course.image_url} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-primary/5">
            <BookOpen className="h-12 w-12 text-primary/40" />
          </div>
        )}
      </div>
      
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        {progress < 100 ? (
          <Button 
            onClick={onMarkComplete}
            variant="outline" 
            size="sm"
            className="w-full mt-2"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete
          </Button>
        ) : (
          <Badge variant="secondary" className="w-full flex items-center justify-center mt-2 py-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
            <CheckCircle className="mr-2 h-4 w-4" /> Completed
          </Badge>
        )}
      </div>
      
      {/* Course details */}
      <div className="space-y-4 border-t border-b py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              Duration
            </div>
            <div className="font-medium">{course.duration} mins</div>
          </div>
          <div>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Added
            </div>
            <div className="font-medium">
              {formatDistanceToNow(new Date(course.created_at), { addSuffix: true })}
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <BarChart className="h-3.5 w-3.5 mr-1.5" />
            Difficulty
          </div>
          <Badge variant="outline" className="bg-muted/50">
            {course.difficulty}
          </Badge>
        </div>
        
        <div>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            Category
          </div>
          <Badge variant="outline" className="bg-muted/50">
            {course.category}
          </Badge>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm" className="w-full">
          <Download className="mr-2 h-4 w-4" /> Download Materials
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <Award className="mr-2 h-4 w-4" /> View Certificate
        </Button>
      </div>
    </div>
  );
};

export default CourseSidebar;
