
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CourseLoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-0">
            <div className="border-b p-4 flex space-x-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 order-first lg:order-last">
        <Card className="p-4">
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourseLoadingSkeleton;
