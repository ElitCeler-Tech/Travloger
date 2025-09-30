'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
  delay?: number;
}

const LazyLoad = React.memo<LazyLoadProps>(({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  className = '',
  animationType = 'fade',
  delay = 0
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            setHasTriggered(true);
            observer.unobserve(element);
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  const getAnimationVariants = () => {
    switch (animationType) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'slide':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        };
    }
  };

  const shouldShowContent = isInView || hasTriggered;

  return (
    <div ref={elementRef} className={className}>
      {shouldShowContent ? (
        animationType === 'none' ? (
          children
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants()}
            transition={{
              duration: 0.6,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {children}
          </motion.div>
        )
      ) : (
        fallback || <Skeleton variant="card" className="w-full" />
      )}
    </div>
  );
});

LazyLoad.displayName = 'LazyLoad';

export default LazyLoad;
