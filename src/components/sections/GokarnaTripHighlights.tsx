'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import type { StaticImageData } from 'next/image';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import { useIntersectionObserver } from '@/lib/hooks';
import LazyLoad from '@/components/ui/LazyLoad';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import highlight1 from '../../../public/highlights/1.png';
import highlight2 from '../../../public/highlights/2.png';
import highlight3 from '../../../public/highlights/3.png';

interface HighlightImage {
  id: string;
  src: string | StaticImageData;
  alt: string;
}

interface TripHighlightsContent {
  heading?: string;
  subheading?: string;
  highlights?: HighlightImage[];
}

interface GokarnaTripHighlightsProps {
  content?: TripHighlightsContent;
}

const defaultGokarnaHighlights: HighlightImage[] = [
  { 
    id: '1', 
    src: highlight1, 
    alt: 'Om Beach - Gokarna\'s Most Famous Beach'
  },
  { 
    id: '2', 
    src: highlight2, 
    alt: 'Mahabaleshwar Temple - Ancient Shiva Temple'
  },
  { 
    id: '3', 
    src: highlight3, 
    alt: 'Yana Caves - Mystical Rock Formations'
  },
  { 
    id: '4', 
    src: highlight1, 
    alt: 'Murudeshwar Temple - Second Tallest Shiva Statue'
  },
  { 
    id: '5', 
    src: highlight2, 
    alt: 'Dandeli Wildlife Sanctuary - Adventure Hub'
  },
  { 
    id: '6', 
    src: highlight3, 
    alt: 'Vibhuti Falls - Scenic Waterfall'
  },
];

const GokarnaTripHighlights = ({ content }: GokarnaTripHighlightsProps) => {
  const swiperRef = useRef<SwiperType>(null);
  const { setRef } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  const [isMobile, setIsMobile] = useState(false);

  // Merge CMS content with defaults
  const highlightsData = React.useMemo(() => {
    if (!content?.highlights || content.highlights.length === 0) {
      return defaultGokarnaHighlights;
    }
    
    // Smart merging: combine default items with CMS items
    return defaultGokarnaHighlights.map(defaultItem => {
      const cmsItem = content.highlights?.find((item: HighlightImage) => item.id === defaultItem.id);
      return cmsItem || defaultItem;
    });
  }, [content?.highlights]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="highlights" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white" ref={setRef}>
      <div className={mobileFirst.container('xl')}>
        {/* Section Header */}
        <LazyLoad animationType="fade" delay={0.2}>
          <div className="text-center mb-8 md:mb-12">
            <h2 className={cn(
              "font-bold text-gray-900 mb-4 font-heading",
              mobileFirst.text('h1')
            )}>
              {content?.heading || (
                <>
                  Discover Gokarna&apos;s{' '}
                  <span className="text-[#134956]">Hidden Gems</span>
                </>
              )}
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              {content?.subheading || "Experience the most breathtaking destinations that make Gokarna truly magical"}
            </p>
          </div>
        </LazyLoad>

        {/* Coverflow Carousel */}
        <LazyLoad animationType="scale" delay={0.3}>
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => {
                (swiperRef as React.MutableRefObject<SwiperType | null>).current = swiper;
              }}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: isMobile ? 30 : 50,
                stretch: 0,
                depth: isMobile ? 100 : 150,
                modifier: isMobile ? 1 : 1.2,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              loop={true}
              initialSlide={2}
              spaceBetween={isMobile ? 20 : 30}
              breakpoints={{
                320: {
                  spaceBetween: 15,
                    coverflowEffect: {
                      rotate: 45,
                      depth: 250,
                      modifier: 1.2,
                  }
                },
                640: {
                  spaceBetween: 20,
                  coverflowEffect: {
                    rotate: 35,
                    depth: 100,
                    modifier: 1,
                  }
                },
                768: {
                  spaceBetween: 25,
                  coverflowEffect: {
                    rotate: 45,
                    depth: 120,
                    modifier: 1.1,
                  }
                },
                1024: {
                  spaceBetween: 30,
                  coverflowEffect: {
                    rotate: 50,
                    depth: 150,
                    modifier: 1.2,
                  }
                }
              }}
            >
              {highlightsData.map((slide, index) => (
                <SwiperSlide
                  key={slide.id}
                  className="!w-[280px] !h-[380px] sm:!w-[320px] sm:!h-[420px] md:!w-[360px] md:!h-[460px] lg:!w-[400px] lg:!h-[500px]"
                >
                  <motion.div 
                    className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group"
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
                      quality={95}
                      priority={index < 3}
                      placeholder="blur"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >

                      </motion.div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </LazyLoad>
      </div>

      {/* Custom Styles for Coverflow Effect */}
      <style jsx>{`
        :global(.mySwiper) {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
        }
        
        :global(.swiper-slide) {
          background-position: center;
          background-size: cover;
          border-radius: 16px;
          overflow: hidden;
        }
        
        :global(.swiper-slide img) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        :global(.swiper-pagination-bullet) {
          background: #134956;
          opacity: 0.5;
        }
        
        :global(.swiper-pagination-bullet-active) {
          opacity: 1;
          background: #134956;
        }
      `}</style>
    </section>
  );
};

export default GokarnaTripHighlights; 