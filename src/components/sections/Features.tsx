'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useIntersectionObserver, useReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import LazyLoad from '@/components/ui/LazyLoad';
import Skeleton from '@/components/ui/Skeleton';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = React.memo<{ feature: Feature; index: number }>(({ feature, index }) => {
  const prefersReducedMotion = useReducedMotion();

  const FeatureCardContent = (
    <div className="text-center group cursor-pointer transform transition-all duration-500 ease-out hover:-translate-y-2">
      {/* Feature Icon Circle */}
      <div className="relative w-48 h-48 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-6 md:mb-8 transition-all duration-300">
        {/* Background Circle with Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#134956] to-[#0f3d47] rounded-full transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#134956]/30"></div>
        
        {/* Animated Ring Effect */}
        <div className="absolute inset-0 rounded-full border-2 border-[#134956]/20 transition-all duration-500 group-hover:border-[#134956]/40 group-hover:scale-125"></div>
        
        {/* Icon Container */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <div className="w-32 h-32 md:w-28 md:h-28 lg:w-32 lg:h-32 relative transition-all duration-300 group-hover:scale-110">
            <LazyLoad
              fallback={
                <Skeleton variant="circular" className="w-full h-full" />
              }
              animationType="scale"
              delay={index * 0.1}
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                fill
                className="object-contain filter transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-lg"
                priority={index < 3}
              />
            </LazyLoad>
          </div>
        </div>
      </div>

      {/* Feature Content */}
      <div className="space-y-3 md:space-y-4 transition-all duration-300 group-hover:scale-105">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 font-heading transition-all duration-300 group-hover:text-[#134956] group-hover:scale-105">
          {feature.title}
        </h3>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-gray-700 group-hover:transform group-hover:scale-105 font-body">
          {feature.description}
        </p>
      </div>

      {/* Subtle Bottom Border Animation */}
      <div className="mt-6 mx-auto w-0 h-0.5 bg-gradient-to-r from-[#134956] to-[#0f3d47] transition-all duration-500 group-hover:w-20"></div>
    </div>
  );

  if (prefersReducedMotion) {
    return FeatureCardContent;
  }

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      {FeatureCardContent}
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

const Features = React.memo(() => {
  const { isInView, setRef } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  const prefersReducedMotion = useReducedMotion();

  const features: Feature[] = [
    {
      id: '1',
      title: 'Hassle Free',
      description: 'From Booking To Boarding—Your Trip, Minus The Drama.',
      icon: '/features/hassle-free.png'
    },
    {
      id: '2',
      title: 'Snap & Go',
      description: 'You Explore, We Capture The Vibe—No Posing, Just Moments.',
      icon: '/features/snap-go.png'
    },
    {
      id: '3',
      title: 'Local Expertise',
      description: 'Ditch The Tourist Traps—Our Local Pros Show You The Real Deal.',
      icon: '/features/local-expertise.png'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" ref={setRef}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <LazyLoad
          animationType="fade"
          fallback={
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              <Skeleton variant="text" className="h-8 w-64 mx-auto" />
            </div>
          }
        >
          <div className="text-center mb-8 md:mb-12">
            <h2 className={cn(
              "font-bold text-gray-900 mb-4 font-heading",
              mobileFirst.text('h1')
            )}>
              Why <span className='text-[#134956]'>Choose Us</span>?
            </h2>
          </div>
        </LazyLoad>

        {/* Features Grid */}
        {!prefersReducedMotion ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <FeatureCard 
                key={feature.id} 
                feature={feature} 
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard 
                key={feature.id} 
                feature={feature} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;
