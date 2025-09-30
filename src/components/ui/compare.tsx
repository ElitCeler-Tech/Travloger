"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { StaticImageData } from 'next/image';

interface CompareProps {
  firstImage: string | StaticImageData;
  secondImage: string | StaticImageData;
  firstImageClassName?: string;
  secondImageclassName?: string;
  className?: string;
  slideMode?: "hover" | "click" | "drag";
  showHandlebar?: boolean;
  autoplayDuration?: number;
  initialSliderPercentage?: number;
}

export const Compare = ({
  firstImage,
  secondImage,
  firstImageClassName,
  secondImageclassName,
  className,
  slideMode = "drag",
  showHandlebar = true,
  autoplayDuration = 0,
  initialSliderPercentage = 50,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoplayDuration > 0) {
      const interval = setInterval(() => {
        setSliderXPercent((prev) => {
          const increment = 1;
          if (prev >= 100) {
            return 0;
          }
          return prev + increment;
        });
      }, autoplayDuration);
      return () => clearInterval(interval);
    }
  }, [autoplayDuration]);

  const handleStart = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(true);
    }
  }, [slideMode]);

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        setSliderXPercent(Math.max(0, Math.min(100, percent)));
      }
    },
    [slideMode, isDragging]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleStart();
    },
    [handleStart]
  );

  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        handleStart();
      }
    },
    [handleStart]
  );

  const handleTouchEnd = useCallback(() => handleEnd(), [handleEnd]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={sliderRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        cursor: slideMode === "drag" ? "ew-resize" : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-transparent to-[95%] via-teal-500"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 30,
          }}
          transition={{ duration: 0.0 }}
        >
          <div className="w-full h-full [mask-image:radial-gradient(100px_at_left,white,transparent)]" />
        </motion.div>
      </AnimatePresence>

      {showHandlebar && (
        <div
          className="absolute top-1/2 transform -translate-y-1/2 bg-white z-50 rounded-md shadow-lg flex items-center justify-center w-8 h-8"
          style={{
            left: `calc(${sliderXPercent}% - 16px)`,
            zIndex: 50,
          }}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence>
          <motion.div
            className={cn(
              "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none overflow-hidden",
              firstImageClassName
            )}
            style={{
              clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
            }}
            transition={{ duration: 0.0 }}
          >
            <Image
              alt="Stock accommodation image"
              src={firstImage}
              fill
              className={cn(
                "absolute inset-0 z-20 rounded-2xl flex-shrink-0 w-full h-full select-none object-cover",
                firstImageClassName
              )}
              draggable={false}
              priority
            />
            {/* Stock Image Label */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold font-heading z-30 shadow-lg">
              Stock
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-0 left-0 z-[19] w-full h-full rounded-2xl overflow-hidden">
        <Image
          alt="Real accommodation image"
          src={secondImage}
          fill
          className={cn(
            "absolute inset-0 z-[19] rounded-2xl flex-shrink-0 w-full h-full select-none object-cover",
            secondImageclassName
          )}
          draggable={false}
          priority
        />
        {/* Real Image Label */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold font-heading z-30 shadow-lg">
          Real
        </div>
      </div>

      {/* Drag Indicator */}
      {slideMode === "drag" && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-teal-500 bg-opacity-90 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-semibold font-body z-30 shadow-lg">
          <span className="block sm:hidden">Drag ↔</span>
          <span className="hidden sm:inline">Drag to reveal</span>
        </div>
      )}
    </div>
  );
}; 