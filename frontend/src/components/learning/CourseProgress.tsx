
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Award } from 'lucide-react';

interface CourseProgressProps {
  progress: number;
  estimatedTimeMinutes?: number;
  completed?: boolean;
  showAward?: boolean;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ 
  progress, 
  estimatedTimeMinutes,
  completed = false,
  showAward = false
}) => {
  const getProgressColor = () => {
    if (completed) return "bg-green-500 dark:bg-green-600";
    if (progress > 75) return "bg-blue-500 dark:bg-blue-600";
    if (progress > 50) return "bg-yellow-500 dark:bg-yellow-600";
    if (progress > 25) return "bg-orange-500 dark:bg-orange-600";
    return "bg-primary";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {progress}% complete
        </span>
        <div className="flex items-center gap-2">
          {estimatedTimeMinutes !== undefined && (
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

          {showAward && completed && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
              <Award className="mr-1 h-3 w-3" />
              Certificate
            </Badge>
          )}
        </div>
      </div>
      <Progress 
        value={progress} 
        className="h-2" 
        indicatorClassName={getProgressColor()}
      />
    </div>
  );
};

export default CourseProgress;
