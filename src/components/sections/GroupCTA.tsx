'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useIntersectionObserver } from '@/lib/hooks';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import { cn } from '@/lib/utils';
import LazyLoad from '@/components/ui/LazyLoad';
import GroupFormModal from './GroupFormModal';
import groupBg from '../../../public/group.jpg';

type GroupCTAContent = {
  heading?: string
  subtext?: string
  buttonLabel?: string
  backgroundImageUrl?: string
}

const GroupCTA = React.memo(({ content }: { content?: GroupCTAContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setRef } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section 
        ref={setRef}
        className="md:py-6 bg-gray-50"
      >
        <div className={cn(mobileFirst.container('xl'))}>
          <LazyLoad animationType="fade" delay={0.2}>
            <div className="max-w-4xl mx-auto">
              {/* Main Card */}
              <motion.div
                className="relative bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900 rounded-lg overflow-hidden shadow-2xl"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-50 scale-x-[-1]">
                  <Image
                    src={content?.backgroundImageUrl || groupBg}
                    alt="Group of friends enjoying adventures"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    placeholder={content?.backgroundImageUrl ? undefined : 'blur'}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 md:p-6 flex items-center min-h-[210px]">
                  {/* Text Content */}
                  <div className="flex-1 max-w-md text-left">
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight font-heading">
                      {content?.heading || 'Travelling with 8 or more ?'}
                      {content?.subtext && (
                        <span className="text-white block sm:inline text-sm md:text-md font-normal font-cta">{content.subtext}</span>
                      )}
                    </h2>
                    
            

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleOpenModal}
                        size="lg"
                        className="bg-teal-900 text-white border border-white hover:bg-gray-100 font-bold px-5 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-cta"
                      >
                        {content?.buttonLabel || 'Plan my trip'}
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements */}
           
              </motion.div>
            </div>
          </LazyLoad>
        </div>
      </section>

      {/* Modal */}
      <GroupFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
});

GroupCTA.displayName = 'GroupCTA';

export default GroupCTA; 