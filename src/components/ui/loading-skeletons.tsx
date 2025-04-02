
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const ForumCardSkeleton = () => (
  <div className="border rounded-lg p-6 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div>
        <Skeleton className="h-7 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-9 w-32" />
    </div>
    <div className="mt-6">
      {Array(3).fill(0).map((_, j) => (
        <div key={j} className="py-3 border-b last:border-0 flex justify-between items-center">
          <div>
            <Skeleton className="h-5 w-56 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  </div>
);

export const TopicFormSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-32 w-full" />
    <div className="flex justify-end space-x-2">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  </div>
);

export const ProfileCardSkeleton = () => (
  <div className="border rounded-lg p-4 shadow-sm animate-pulse">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div>
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export const CardSkeleton = ({ lines = 3 }: { lines?: number }) => (
  <div className="border rounded-lg p-4 shadow-sm animate-pulse">
    <Skeleton className="h-6 w-3/4 mb-4" />
    <div className="space-y-2">
      {Array(lines).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  </div>
);
