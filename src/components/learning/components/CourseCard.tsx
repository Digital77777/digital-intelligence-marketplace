
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Users, GraduationCap } from 'lucide-react';
import { CuratedCourse } from '../types/course';

interface CourseCardProps {
  course: CuratedCourse;
  onWatchCourse: (course: CuratedCourse) => void;
  onViewChannel: (url: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onWatchCourse,
  onViewChannel
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 rounded-full p-3">
              <Play className="h-6 w-6 text-gray-900" />
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {course.duration}
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary">{course.skillLevel}</Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{course.category}</Badge>
          {course.institution && (
            <div className="flex items-center text-xs text-muted-foreground">
              <GraduationCap className="h-3 w-3 mr-1" />
              {course.institution}
            </div>
          )}
        </div>
        <CardTitle className="text-sm line-clamp-2 leading-tight">
          {course.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-2">
          by {course.instructor}
        </p>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {course.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex gap-2">
        <Button 
          className="flex-1" 
          onClick={() => onWatchCourse(course)}
        >
          <Play className="mr-2 h-4 w-4" />
          Watch Course
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewChannel(course.channelUrl)}
        >
          <Users className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
