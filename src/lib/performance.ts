'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  connectionType?: string;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const measurePerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        
        // Get memory info if available (Chrome only)
        const memoryUsage = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize;
        
        // Get connection info if available
        const connectionType = (navigator as unknown as { connection?: { effectiveType: string } }).connection?.effectiveType;
        
        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          memoryUsage,
          connectionType
        });
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  return metrics;
};

export const useImageLoadOptimization = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  }, []);

  const handleImageError = useCallback((src: string) => {
    setFailedImages(prev => new Set(prev).add(src));
  }, []);

  const isImageLoaded = useCallback((src: string) => loadedImages.has(src), [loadedImages]);
  const hasImageFailed = useCallback((src: string) => failedImages.has(src), [failedImages]);

  return {
    handleImageLoad,
    handleImageError,
    isImageLoaded,
    hasImageFailed,
    loadedCount: loadedImages.size,
    failedCount: failedImages.size
  };
};

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return isVisible;
};

// Debounced callback hook for expensive operations
export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

// Throttled callback hook for scroll/resize events
export const useThrottle = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args: Parameters<T>) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// Memory leak prevention for component cleanup
export const useComponentCleanup = () => {
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const listenersRef = useRef<Array<{ element: EventTarget; event: string; handler: EventListener; options?: boolean | AddEventListenerOptions }>>([]);

  const addTimeout = useCallback((timeout: NodeJS.Timeout) => {
    timeoutsRef.current.add(timeout);
    return timeout;
  }, []);

  const addInterval = useCallback((interval: NodeJS.Timeout) => {
    intervalsRef.current.add(interval);
    return interval;
  }, []);

  const addEventListener = useCallback((
    element: EventTarget,
    event: string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => {
    element.addEventListener(event, handler, options);
    listenersRef.current.push({ element, event, handler, options });
  }, []);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    const intervals = intervalsRef.current;
    const listeners = listenersRef.current;

    return () => {
      // Clear timeouts
      timeouts.forEach(timeout => clearTimeout(timeout));
      timeouts.clear();

      // Clear intervals
      intervals.forEach(interval => clearInterval(interval));
      intervals.clear();

      // Remove event listeners
      listeners.forEach(({ element, event, handler, options }) => {
        element.removeEventListener(event, handler, options);
      });
      listeners.length = 0;
    };
  }, []);

  return { addTimeout, addInterval, addEventListener };
};

// Optimized image preloader
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = (srcs: string[]): Promise<PromiseSettledResult<void>[]> => {
  return Promise.allSettled(srcs.map(preloadImage));
};

// Performance monitoring utilities
export const measureRenderTime = (componentName: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(`${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
    };
  }
  
  return () => {};
};

// Bundle analyzer helper
export const getBundleSize = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    return resourceEntries.reduce((total, entry) => {
      if (entry.name.includes('.js') || entry.name.includes('.css')) {
        return total + (entry.transferSize || 0);
      }
      return total;
    }, 0);
  }
  
  return 0;
};
