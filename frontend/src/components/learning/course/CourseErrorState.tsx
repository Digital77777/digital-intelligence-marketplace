
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const CourseErrorState: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
      <p className="text-muted-foreground mb-4">
        The course you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <a href="/learning-hub">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Hub
        </a>
      </Button>
    </div>
  );
};

export default CourseErrorState;
