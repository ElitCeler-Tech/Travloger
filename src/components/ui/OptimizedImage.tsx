'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useImageLoadOptimization } from '@/lib/performance';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: React.ReactNode;
  showLoadingPlaceholder?: boolean;
  loadingClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  onLoadComplete?: () => void;
  onLoadError?: () => void;
}

const OptimizedImage = React.memo<OptimizedImageProps>(({
  src,
  alt,
  className,
  fallback,
  showLoadingPlaceholder = true,
  loadingClassName = 'animate-pulse bg-gray-200',
  errorClassName = 'bg-gray-100 flex items-center justify-center text-gray-400',
  containerClassName,
  onLoadComplete,
  onLoadError,
  priority = false,
  ...props
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const { handleImageLoad, handleImageError, isImageLoaded, hasImageFailed } = useImageLoadOptimization();

  const srcString = useMemo(() => {
    if (typeof src === 'string') return src;
    if (typeof src === 'object' && 'src' in src) return src.src;
    return '';
  }, [src]);

  const handleLoad = useCallback(() => {
    setImageState('loaded');
    handleImageLoad(srcString);
    onLoadComplete?.();
  }, [srcString, handleImageLoad, onLoadComplete]);

  const handleError = useCallback(() => {
    setImageState('error');
    handleImageError(srcString);
    onLoadError?.();
  }, [srcString, handleImageError, onLoadError]);

  // Memoize image sizes based on common responsive patterns
  const optimizedSizes = useMemo(() => {
    if (props.sizes) return props.sizes;
    
    // Default responsive sizes for better performance
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }, [props.sizes]);

  // Determine if image should be eagerly loaded
  const shouldLoadEagerly = useMemo(() => {
    return priority || isImageLoaded(srcString);
  }, [priority, isImageLoaded, srcString]);

  const LoadingPlaceholder = React.memo(() => (
    <div 
      className={cn(
        'absolute inset-0 flex items-center justify-center',
        loadingClassName
      )}
      aria-label="Loading image"
    >
      <svg 
        className="w-8 h-8 text-gray-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
    </div>
  ));

  const ErrorPlaceholder = React.memo(() => (
    <div 
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center',
        errorClassName
      )}
      role="img"
      aria-label={`Failed to load image: ${alt}`}
    >
      <svg 
        className="w-8 h-8 mb-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
        />
      </svg>
      <span className="text-xs text-center px-2">Image unavailable</span>
    </div>
  ));

  LoadingPlaceholder.displayName = 'LoadingPlaceholder';
  ErrorPlaceholder.displayName = 'ErrorPlaceholder';

  if (hasImageFailed(srcString) && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Loading state */}
      {showLoadingPlaceholder && imageState === 'loading' && <LoadingPlaceholder />}
      
      {/* Error state */}
      {imageState === 'error' && !fallback && <ErrorPlaceholder />}

      {/* Actual image */}
      {imageState !== 'error' && (
        <Image
          src={src}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            imageState === 'loaded' ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          priority={shouldLoadEagerly}
          sizes={optimizedSizes}
          {...props}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
