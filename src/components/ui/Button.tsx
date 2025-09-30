'use client';

import React, { forwardRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'default',
    size = 'md',
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    disabled,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const baseClasses = useMemo(() => 
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-cta',
      []
    );

    const variants = useMemo(() => ({
      default: 'bg-[#134956] text-white hover:bg-[#0f3b4c] focus-visible:ring-[#134956]',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
      outline: 'border-2 border-[#134956] text-[#134956] hover:bg-[#134956] hover:text-white focus-visible:ring-[#134956]',
      ghost: 'text-[#134956] hover:bg-[#134956]/10 focus-visible:ring-[#134956]',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
      link: 'underline-offset-4 hover:underline text-[#134956]'
    }), []);

    const sizes = useMemo(() => ({
      sm: 'h-9 px-3 text-sm rounded-md',
      md: 'h-10 py-2 px-4',
      lg: 'h-11 px-8 rounded-md text-lg',
      icon: 'h-10 w-10'
    }), []);

    const animationClasses = useMemo(() => 
      prefersReducedMotion 
        ? '' 
        : 'transform transition-transform duration-150 hover:scale-105 active:scale-95',
      [prefersReducedMotion]
    );

    const buttonClasses = useMemo(() => 
      cn(
        baseClasses,
        variants[variant],
        sizes[size],
        animationClasses,
        className
      ),
      [baseClasses, variants, variant, sizes, size, animationClasses, className]
    );

    const isDisabled = disabled || isLoading;

    const LoadingSpinner = React.memo(() => (
      <svg
        className="w-4 h-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    ));

    LoadingSpinner.displayName = 'LoadingSpinner';

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={buttonClasses}
        {...props}
      >
        {isLoading && (
          <LoadingSpinner />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span>
          {isLoading ? (loadingText || 'Loading...') : children}
        </span>
        {!isLoading && rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
));

Button.displayName = 'Button';

export { Button };
