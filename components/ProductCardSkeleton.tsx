
import React from 'react';
import Skeleton from './Skeleton';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100/50 p-4 md:p-5 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full flex flex-col rounded-none">
      {/* Image Skeleton */}
      <Skeleton className="aspect-square w-full rounded-none" />
      
      {/* Info Badges Skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-4 w-12 rounded-none" />
        <Skeleton className="h-4 w-20 rounded-none" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-full rounded-none" />
        <Skeleton className="h-5 w-3/4 rounded-none" />
      </div>

      {/* Coins Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-none" />
        <Skeleton className="h-4 w-24 rounded-none" />
      </div>

      {/* Pricing and Buttons Skeleton */}
      <div className="mt-auto space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24 rounded-none" />
          <Skeleton className="h-6 w-16 rounded-none" />
        </div>
        <div className="flex gap-2 md:gap-3">
          <Skeleton className="h-12 md:h-14 flex-1 rounded-none" />
          <Skeleton className="h-12 md:h-14 w-12 md:w-16 rounded-none" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
