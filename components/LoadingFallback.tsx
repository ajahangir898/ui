
import React from 'react';
import Skeleton from './Skeleton.tsx';

const LoadingFallback: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4">
      <Skeleton className="w-full h-64 md:h-96 rounded-none" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
        <div className="md:col-span-8 space-y-4">
          <Skeleton className="h-12 w-3/4 rounded-none" />
          <Skeleton className="h-40 w-full rounded-none" />
        </div>
        <div className="md:col-span-4">
          <Skeleton className="h-64 w-full rounded-none" />
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;
