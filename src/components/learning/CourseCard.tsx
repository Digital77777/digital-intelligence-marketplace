
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseProgress from './CourseProgress';
import { useTier } from '@/context/TierContext';

interface CourseCardProps {
  course: {
    id: string | number;
    title: string;
    description: string | null;
    category: string;
    difficulty: string;
    duration: number;
    image_url?: string | null;
    required_tier?: string;
  };
  progress?: number;
  isCompleted?: boolean;
  onMarkComplete?: (id: string | number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  progress = 0, 
  isCompleted = false,
  onMarkComplete
}) => {
  const { currentTier, upgradePrompt } = useTier();
  
  const isCourseLocked = () => {
    if (!course.required_tier) return false;
    if (course.required_tier === 'freemium') return false;
    if (currentTier === 'pro') return false;
    if (course.required_tier === 'basic' && currentTier === 'basic') return false;
    return true;
  };
  
  const locked = isCourseLocked();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-40 bg-gray-800">
        {course.image_url ? (
          <img 
            src={course.image_url} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-800 to-gray-900">
            <BookOpen className="h-12 w-12 text-white opacity-50" />
          </div>
        )}
        {locked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="h-6 w-6 text-white opacity-70" />
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow p-4">
        <h3 className="font-medium mb-2 line-clamp-1">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {course.description}
        </p>
        {progress > 0 && (
          <CourseProgress 
            progress={progress} 
            completed={isCompleted}
            estimatedTimeMinutes={course.duration}
          />
        )}
      </CardContent>
      
      <CardFooter className="border-t p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{course.category}</Badge>
          {course.difficulty && (
            <Badge variant="outline">{course.difficulty}</Badge>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          <Clock className="h-3 w-3 mr-1 inline-block" /> {course.duration} min
        </div>
      </CardFooter>
      
      {locked ? (
        <div className="p-4 pt-0">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => upgradePrompt(course.required_tier as any)}
          >
            <Lock className="mr-2 h-4 w-4" /> Upgrade to Access
          </Button>
        </div>
      ) : (
        <div className="p-4 pt-0 flex gap-2">
          {onMarkComplete && !isCompleted && (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onMarkComplete(course.id)}
            >
              Mark Complete
            </Button>
          )}
          <Button 
            className="flex-1" 
            asChild
          >
            <Link to={`/learning/${course.id}`}>
              {progress > 0 && !isCompleted ? 'Continue' : 'Start'}
            </Link>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CourseCard;
