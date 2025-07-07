import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, BarChart2 } from 'lucide-react';

const CourseDetails = ({ course }: any) => {
  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
          <Badge variant="outline">{course.category}</Badge>
        </div>
        <p className="text-muted-foreground">{course.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{course.lessons} Lessons</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{course.duration} hours</span>
          </div>
          <div className="flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{course.difficulty}</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">About this course</h3>
          <p className="text-base">
            This course provides a comprehensive overview of {course.title}. 
            You will learn about various concepts and gain hands-on experience.
          </p>
        </div>
        <Button className="mt-6 w-full">Start Course</Button>
      </CardContent>
    </Card>
  );
};

export default CourseDetails;
