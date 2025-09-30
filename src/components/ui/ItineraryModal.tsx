'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import EnquireModal from './EnquireModal';

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: {
    title: string;
    description: string;
    nights: number;
    days: number;
    price: number;
    detailedItinerary?: {
      subtitle: string;
      briefItinerary: Array<{
        day: number;
        title: string;
        description: string;
      }>;
      keyAttractions: string[];
      inclusions: string[];
    };
  } | null;
}

const ItineraryModal: React.FC<ItineraryModalProps> = ({ isOpen, onClose, trip }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleTalkToExpert = () => {
    setIsEnquireModalOpen(true);
  };

  const handleCloseEnquireModal = () => {
    setIsEnquireModalOpen(false);
  };

  if (!trip) return null;

  const sampleItinerary = [
    {
      day: 1,
      title: "Srinagar Arrival & Sightseeing"
    },
    {
      day: 2,
      title: "Day Trip to Sonmarg – The Meadow of Gold"
    },
    {
      day: 3,
      title: "Day Trip to Gulmarg – The Meadow of Flowers"
    },
    {
      day: 4,
      title: "Day Trip to Doodhpathri & Houseboat Stay"
    },
    {
      day: 5,
      title: "Srinagar to Pahalgam – Legendary countryside"
    },
    {
      day: 6,
      title: "Pahalgam to Srinagar & Goodbyes"
    }
  ];

  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: '100%'
    },
    visible: { 
      opacity: 1,
      y: 0
    },
    exit: { 
      opacity: 0,
      y: '100%'
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              variants={prefersReducedMotion ? undefined : backdropVariants}
              initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
              animate="visible"
              exit="exit"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white rounded-t-2xl shadow-2xl w-full h-[70vh] flex flex-col"
              variants={prefersReducedMotion ? undefined : modalVariants}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
              animate="visible"
              exit="exit"
              transition={{
                duration: 0.4,
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-30 rounded-full p-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Kashmir Background Image */}
              <div className="relative h-32 overflow-hidden rounded-t-2xl flex-shrink-0">
                <Image
                  src="/itenary.jpg"
                  alt="Kashmir landscape"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h2 className="text-white font-bold text-2xl font-heading tracking-wide drop-shadow-lg">
                    {trip.title}
                  </h2>
                  <p className="text-white/80 text-sm font-body mt-1">
                    {trip.detailedItinerary?.subtitle || 'Complete Travel Experience'}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div 
                className="bg-white flex-1 overflow-y-scroll"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#134956 #e5e7eb',
                  height: 'calc(65vh - 128px)', // 65vh minus header height
                  minHeight: '0',
                }}
              >
                <div className="p-4">
                  {/* Brief Itinerary Section */}
                  <div className="mb-5">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 font-heading">Brief <span className='text-[#134956]'>Itinerary</span></h3>
                    </div>

                    {/* Day-wise breakdown */}
                    <div className="space-y-0.5">
                      {(trip.detailedItinerary?.briefItinerary || sampleItinerary.slice(0, trip.days)).map((day, index) => (
                        <div key={day.day} className="flex items-start gap-3 py-0.5 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                          {/* Left side - Day number */}
                          <div className="flex flex-col items-center min-w-[50px]">
                            <div className="text-[#134956] font-bold text-sm">
                              DAY {day.day}
                            </div>
                            {index < (trip.detailedItinerary?.briefItinerary || sampleItinerary.slice(0, trip.days)).length - 1 && (
                              <div className="w-px h-5 bg-gray-300 mt-0.5 border-l-2 border-dotted"></div>
                            )}
                          </div>
                          
                          {/* Right side - Content */}
                          <div className="flex-1">
                            <p className="text-gray-900 font-body leading-relaxed text-sm font-semibold">{day.title}</p>
                            {'description' in day && day.description ? (
                              <p className="text-gray-600 font-body leading-relaxed text-xs mt-1">{(day as { description: string }).description}</p>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Attractions */}
                  <div className="">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-gray-900 font-heading">Key <span className='text-[#134956]'>Attractions</span></h3>
                    </div>
                    <div className="space-y-1.5">
                      {(trip.detailedItinerary?.keyAttractions || [
                        'Mughal Gardens, Dal Lake',
                        'Thajiwas Glacier & Zojila Pass in Sonmarg',
                        'Gondola ride at Gulmarg (Asia\'s highest cable car)',
                        'Doodhpathri meadows & pine forests',
                        'Aru, Betaab & Chandanwari valleys in Pahalgam',
                        'Boutique houseboat stay in Srinagar'
                      ]).map((attraction, index) => (
                        <div key={index} className="flex items-start gap-3 py-1 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                          <div className="w-1.5 h-1.5 bg-[#134956] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 font-body leading-relaxed text-sm">{attraction}</span>
                        </div>
                      ))}
                    </div>
                  </div>

            
                </div>
              </div>

              {/* Talk to an Expert Button - Fixed at bottom */}
              <div className="flex-shrink-0 bg-white border-t-2 border-gray-200 px-4 py-3 shadow-sm">
                <motion.button
                  onClick={handleTalkToExpert}
                  className={cn(
                    "w-full bg-[#134956] hover:bg-[#0f3d47] text-white py-3 font-semibold font-cta text-base rounded-md",
                    "transition-all duration-300 shadow-md hover:shadow-lg"
                  )}
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                >
                  Talk to an Expert
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enquire Modal - Higher z-index to appear above itinerary modal */}
      <EnquireModal 
        isOpen={isEnquireModalOpen} 
        onClose={handleCloseEnquireModal} 
      />
    </>
  );
};

export default ItineraryModal;
