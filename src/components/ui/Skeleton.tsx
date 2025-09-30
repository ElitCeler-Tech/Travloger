'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text' | 'card';
  rows?: number;
}

const Skeleton = React.memo<SkeletonProps>(({ 
  className,
  variant = 'default',
  rows = 1
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
  
  const variantClasses = {
    default: 'rounded h-4',
    circular: 'rounded-full aspect-square',
    text: 'rounded h-4',
    card: 'rounded-lg h-48'
  };

  if (variant === 'text' && rows > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              index === rows - 1 ? 'w-3/4' : 'w-full'
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
