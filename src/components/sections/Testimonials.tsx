'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Testimonial } from '@/types';
import { useIntersectionObserver, useReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { mobileFirst } from '@/lib/mobile-first-patterns';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Arjun Patel',
    location: 'Mumbai, India',
    rating: 5,
    comment: 'It felt less like a tour and more like a well-edited memory.',
    image: '/testimonials/pfp.png',
    tripTitle: 'Kashmir Valley Adventure',
    backgroundImage: '/testimonials/1.png' // Add background image
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Delhi, India',
    rating: 5,
    comment: 'The most breathtaking experience of my life. Kashmir exceeded all expectations!',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tripTitle: 'Gulmarg Winter Special',
    backgroundImage: '/testimonials/2.png' // Add different background
  },
  {
    id: '3',
    name: 'Rahul Singh',
    location: 'Bangalore, India',
    rating: 5,
    comment: 'Perfect blend of adventure and tranquility. The local guides were exceptional.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    tripTitle: 'Srinagar Cultural Tour',
    backgroundImage: '/highlights/3.png' // Different scenic image
  },
  {
    id: '4',
    name: 'Ananya Gupta',
    location: 'Pune, India',
    rating: 5,
    comment: 'Every moment was magical. From Dal Lake to snow-capped mountains, pure paradise.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    tripTitle: 'Kashmir Complete Package',
    backgroundImage: '/highlights/4.png' // Another scenic image
  }
];

const TestimonialCard: React.FC<{ 
  testimonial: Testimonial; 
  isActive: boolean;
  position: 'left' | 'center' | 'right' | 'hidden';
}> = React.memo(({ testimonial, position }) => {
  const getCardStyles = () => {
    const baseStyles = "relative w-full transition-all duration-700 ease-out";
    
    switch (position) {
      case 'center':
        return `${baseStyles} opacity-100 scale-100 z-20`;
      case 'left':
      case 'right':
        return `${baseStyles} opacity-0 scale-90 z-10`;
      default:
        return `${baseStyles} opacity-0 scale-85 z-0`;
    }
  };

  const getCardSize = () => {
    if (position === 'center') {
      return "max-w-4xl lg:max-w-5xl";
    }
    return "max-w-3xl lg:max-w-4xl";
  };

  return (
    <div className={`${getCardStyles()} ${getCardSize()} mx-auto mb-12 sm:mb-16 md:mb-24`}>
      {/* Background scenic image */}
      <div className="relative h-48 xs:h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden mx-2 sm:mx-4">
        <Image
          src={testimonial.backgroundImage || "/testimonials/2.png"}
          alt="Kashmir landscape"
          fill
          className="object-cover"
          sizes="(max-width: 480px) 95vw, (max-width: 768px) 85vw, (max-width: 1200px) 75vw, 1000px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      
      {/* Floating testimonial card */}
      <div className="absolute -bottom-6 xs:-bottom-8 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl max-w-[260px] xs:max-w-sm sm:max-w-md md:max-w-lg w-full mx-3 sm:mx-4">
        {/* Profile picture */}
        <div className="absolute -top-3 xs:-top-4 sm:-top-6 lg:-top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 sm:border-3 border-white shadow-lg">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="pt-2 xs:pt-3 sm:pt-4 lg:pt-6 text-center font-body">
          <blockquote className="text-gray-800 text-xs xs:text-sm sm:text-base md:text-lg font-medium leading-relaxed px-1 sm:px-2">
            &ldquo;{testimonial.comment}&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Intersection observers for animations
  const { setRef: setHeaderRef, isInView: isHeaderVisible } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const { setRef: setCarouselRef, isInView: isCarouselVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 50);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 50);
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 50);
  }, [currentIndex, isTransitioning]);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, [isTransitioning]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  // Get position of each card relative to current
  const getCardPosition = (index: number): 'left' | 'center' | 'right' | 'hidden' => {
    const diff = (index - currentIndex + testimonials.length) % testimonials.length;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === testimonials.length - 1) {
      return diff === 1 ? 'right' : 'left';
    }
    return 'hidden';
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header */}
        <div 
          ref={setHeaderRef}
          className={`text-center mb-12 sm:mb-16 font-body transition-all duration-1000 ease-out ${
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
            They Came. They Saw. They <span className='text-[#134956]'>DM&apos;d Us Later</span>.
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 font-body">
            Real stories from travelers who experienced the magic of Kashmir with us
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          ref={setCarouselRef}
          className={`relative max-w-7xl mx-auto transition-all duration-1000 ease-out ${
            isCarouselVisible && !prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : prefersReducedMotion
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="hidden sm:block absolute left-2 md:left-4 lg:left-8 top-[40%] transform -translate-y-1/2 z-30 bg-black/80 hover:bg-black rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="hidden sm:block absolute right-2 md:right-4 lg:right-8 top-[40%] transform -translate-y-1/2 z-30 bg-black/80 hover:bg-black rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Cards Container */}
          <div 
            className="relative h-[420px] sm:h-[480px] md:h-[520px] lg:h-[580px] xl:h-[640px] overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={carouselRef}
            style={{ touchAction: 'pan-y pinch-zoom' }}
          >
            {/* All cards positioned absolutely for smooth transitions */}
            <div className="absolute inset-0 flex items-center justify-center">
              {testimonials.map((testimonial, index) => {
                const position = getCardPosition(index);
                let translateX = '0%';
                
                if (position === 'left') translateX = '-85%';
                if (position === 'right') translateX = '85%';
                if (position === 'hidden') translateX = index < currentIndex ? '-150%' : '150%';
                
                return (
                  <div
                    key={testimonial.id}
                    className="absolute w-full flex justify-center"
                    style={{
                      transform: `translateX(${translateX})`,
                      transition: isTransitioning ? 'none' : 'all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)',
                      pointerEvents: position === 'center' ? 'auto' : 'none'
                    }}
                  >
                    <TestimonialCard 
                      testimonial={testimonial} 
                      isActive={position === 'center'}
                      position={position}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-4 xs:mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`h-1.5 xs:h-2 rounded-full transition-all duration-500 ease-out transform hover:scale-110 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#134956] focus:ring-offset-2 ${
                  index === currentIndex 
                    ? 'w-5 xs:w-6 sm:w-8 bg-[#134956]' 
                    : 'w-3 xs:w-4 sm:w-6 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;