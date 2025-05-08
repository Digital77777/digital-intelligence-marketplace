
import React from 'react';
import CourseCard from './CourseCard';
import { BookOpen } from 'lucide-react';

interface CourseGridProps {
  courses: Array<{
    id: string | number;
    title: string;
    description: string | null;
    category: string;
    difficulty: string;
    duration: number;
    image_url?: string | null;
    required_tier?: string;
    certification_available?: boolean;
    instructor?: string;
    lesson_count?: number;
  }>;
  userProgress?: Record<string | number, number>;
  completedCourses?: Set<string | number>;
  isLoading?: boolean;
  onMarkComplete?: (id: string | number) => void;
  emptyMessage?: string;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  userProgress = {},
  completedCourses = new Set(),
  isLoading = false,
  onMarkComplete,
  emptyMessage = "We couldn't find any courses matching your criteria."
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-[380px] bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    );
  }
  
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No courses found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          progress={userProgress[course.id] || 0}
          isCompleted={completedCourses.has(course.id)}
          onMarkComplete={onMarkComplete}
        />
      ))}
    </div>
  );
};

export default CourseGrid;
