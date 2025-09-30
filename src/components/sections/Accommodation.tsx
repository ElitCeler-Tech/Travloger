'use client';

import React from 'react';
// import { motion } from 'framer-motion';
// import { staggerContainer, staggerItem } from '@/lib/animations';
import { useIntersectionObserver, useReducedMotion } from '@/lib/hooks';
import { Compare } from '@/components/ui/compare';
import { cn } from '@/lib/utils';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import stockImg from '../../../public/slider/stock.png';
import realImg from '../../../public/slider/real.png';

const Accommodation = React.memo(() => {

  const { setRef: setHeaderRef, isInView: isHeaderVisible } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="accommodation" className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div 
          ref={setHeaderRef}
          className={`text-center mb-8 md:mb-12 transition-all duration-1000 ease-out ${
            isHeaderVisible && !prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : prefersReducedMotion
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className={cn(
            "font-bold text-gray-900 mb-4 font-heading",
            mobileFirst.text('h1')
          )}>
            What You See Is <span className='text-[#134956]'>Where You&apos;ll Stay. Literally.</span>
          </h2>
        </div>

        {/* Comparison Slider */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <Compare
            firstImage={stockImg}
            secondImage={realImg}
            className="h-[210px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-full rounded-md md:rounded-2xl shadow-lg"
            slideMode="drag"
            showHandlebar={true}
            initialSliderPercentage={50}
          />
        </div>
      </div>
    </section>
  );
});

Accommodation.displayName = 'Accommodation';

export default Accommodation;
