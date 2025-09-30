/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import { cn } from '@/lib/utils';
import LazyLoad from '@/components/ui/LazyLoad';

// Import USP icons
import snapGoIcon from '../../../public/usp/snap&go.svg';
import hassleFreeIcon from '../../../public/usp/hasslefree.svg';
import switchOutIcon from '../../../public/usp/switchout.svg';
import localIcon from '../../../public/usp/local.svg';


interface USPItem {
  id: string;
  icon: any;
  title: string;
  description: string;
}

const uspItems: USPItem[] = [
  {
    id: '1',
    icon: snapGoIcon,
    title: 'Snap & Go',
    description: 'Photographer onboard - memories included! Every moment captured professionally.',
  },
  {
    id: '2',
    icon: hassleFreeIcon,
    title: 'End-to-End Handling',
    description: 'From bookings to boarding, we handle everything. Just pack your bags and get ready for adventure.',
  },
  {
    id: '3',
    icon: switchOutIcon,
    title: 'No Switch-Outs',
    description: 'What you see is what you get. No hidden surprises or last-minute changes to your itinerary.',
  },
  {
    id: '4',
    icon: localIcon,
    title: 'Locally Curated',
    description: 'Stays we\'ve slept in, not Googled. Every stay is personally tested and approved by our team.',
  },

];

type USPContent = {
  heading?: string
  subheading?: string
  items?: { id: string; icon?: any; iconUrl?: string; title: string; description: string }[]
}

const USP: React.FC<{ content?: USPContent }> = ({ content }) => {
  const { setRef } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  // Merge CMS content with original structure, keeping original icons
  const displayItems = uspItems.map((originalItem, index) => {
    const cmsItem = content?.items?.[index];
    return {
      ...originalItem,
      title: cmsItem?.title || originalItem.title,
      description: cmsItem?.description || originalItem.description,
      // Always keep the original icon, ignore iconUrl from CMS
    };
  });

  return (
    
    <section className="relative py-12 md:py-16 bg-gradient-to-br from-teal-100 to-blue-100 overflow-hidden" ref={setRef}>
      {/* Top Wavy Design */}
      <div className="absolute top-0 left-0 w-full">
  <svg
    className="w-full h-16 md:h-20 text-white"
    viewBox="0 0 1440 120"
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      d="M0,60 C240,30 480,90 720,60 C960,30 1200,90 1440,60 L1440,0 L0,0 Z"
      fill="currentColor"
    />
  </svg>
</div>

      <div className={cn(mobileFirst.container('xl'), 'relative z-10')}>
        {/* Section Header */}
        <LazyLoad animationType="fade" delay={0.2}>
          <div className="text-center mb-8 md:mb-12 mt-2">
            <h2 className={cn(
              "font-bold text-gray-900 mb-4 font-heading",
              mobileFirst.text('h1')
            )}>
              {content?.heading || 'Why Travloger is trusted by thousands?'}{' '}
            </h2>
            {content?.subheading && (
              <p className="text-gray-700 font-bold md:text-lg max-w-2xl mx-auto font-body leading-relaxed">
                {content.subheading}
              </p>
            )}
          </div>
        </LazyLoad>

        {/* USP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {displayItems.map((item: any, index: number) => (
            <LazyLoad key={item.id} animationType="slide" delay={0.1 * index}>
              <motion.div
                className="bg-white rounded-xl p-3 md:p-5 shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Icon Container */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center">
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={28}
                        height={28}
                        className="w-7 h-7 md:w-8 md:h-8"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-md md:text-lg font-bold text-black font-subheading mb-1">
                      {item.title}
                    </h3>
                                          <p className="text-gray-600 text-sm md:text-base leading-normal font-body">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </LazyLoad>
          ))}
        </div>

        {/* Bottom CTA */}
        <LazyLoad animationType="fade" delay={0.8}>
          <div className="text-center mt-8 md:mt-12">
            <motion.p 
              className="text-gray-700 text-base md:text-lg font-medium"
              whileHover={{ scale: 1.02 }}
            >
              Ready to experience Kashmir like never before?
            </motion.p>
          </div>
        </LazyLoad>
      </div>

      {/* Bottom Wavy Design */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-16 md:h-20 text-white"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default USP; 