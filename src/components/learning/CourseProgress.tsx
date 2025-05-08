
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';

interface CourseProgressProps {
  progress: number;
  estimatedTimeMinutes?: number;
  completed?: boolean;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ 
  progress, 
  estimatedTimeMinutes,
  completed = false
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {progress}% complete
        </span>
        <div className="flex items-center gap-2">
          {estimatedTimeMinutes && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {estimatedTimeMinutes} min
            </div>
          )}
          
          {completed && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
              <CheckCircle className="mr-1 h-3 w-3" />
              Completed
            </Badge>
          )}
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default CourseProgress;
