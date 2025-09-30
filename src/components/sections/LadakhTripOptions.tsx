'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import ItineraryModal from '../ui/ItineraryModal';
import { Button } from '../ui/Button';
import { useIntersectionObserver } from '@/lib/hooks';
import LazyLoad from '@/components/ui/LazyLoad';
import { mobileFirst } from '@/lib/mobile-first-patterns';

interface TripCard {
  id: string;
  title: string;
  description: string;
  image: string;
  nights: number;
  days: number;
  price: number;
  category: 'custom' | 'group';
  route?: string;
  trending?: boolean;
}

interface TripOptionsContent {
  heading?: string;
  subheading?: string;
  customTrips?: TripCard[];
  groupTrips?: TripCard[];
}

interface LadakhTripOptionsProps {
  content?: TripOptionsContent;
}

const defaultLadakhTrips: TripCard[] = [
  // Custom Trips (10)
  {
    id: 'custom-1',
    title: 'Ladakh Mountain Adventure',
    description: 'Explore the mystical landscapes of Ladakh with monasteries and high passes',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 24999,
    category: 'custom',
    route: 'Leh → Khardungla → Nubra Valley',
    trending: true
  },
  {
    id: 'custom-2',
    title: 'Pangong Lake Expedition',
    description: 'Journey to the stunning Pangong Lake and experience Ladakh\'s beauty',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 19999,
    category: 'custom',
    route: 'Leh → Changla Pass → Pangong'
  },
  {
    id: 'custom-3',
    title: 'Monastery Circuit Tour',
    description: 'Discover ancient monasteries and spiritual heritage of Ladakh',
    image: '/cards/3.jpg',
    nights: 3,
    days: 4,
    price: 16999,
    category: 'custom',
    route: 'Leh → Thiksey → Hemis → Shey'
  },
  {
    id: 'custom-4',
    title: 'Complete Ladakh Experience',
    description: 'Comprehensive Ladakh exploration covering all major attractions',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 29999,
    category: 'custom',
    route: 'Leh → Nubra → Pangong → Monasteries'
  },
  {
    id: 'custom-5',
    title: 'Nubra Valley Discovery',
    description: 'Explore the beautiful Nubra Valley with its sand dunes and monasteries',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 21999,
    category: 'custom',
    route: 'Leh → Khardungla → Diskit → Hunder'
  },
  {
    id: 'custom-6',
    title: 'Ladakh Photography Tour',
    description: 'Capture the stunning landscapes and cultural heritage of Ladakh',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 25999,
    category: 'custom',
    route: 'Leh → Pangong → Nubra → Monasteries'
  },
  {
    id: 'custom-7',
    title: 'High Altitude Adventure',
    description: 'Experience the thrill of high-altitude passes and mountain vistas',
    image: '/cards/1.jpg',
    nights: 7,
    days: 8,
    price: 34999,
    category: 'custom',
    route: 'Leh → Khardungla → Changla → Tanglangla'
  },
  {
    id: 'custom-8',
    title: 'Ladakh Cultural Heritage',
    description: 'Immerse yourself in Ladakh\'s rich cultural and spiritual traditions',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'custom',
    route: 'Leh → Alchi → Lamayuru → Basgo'
  },
  {
    id: 'custom-9',
    title: 'Ladakh Wildlife Safari',
    description: 'Discover the unique wildlife and natural beauty of Ladakh',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 22999,
    category: 'custom',
    route: 'Leh → Hemis → Tso Kar → Tso Moriri'
  },
  {
    id: 'custom-10',
    title: 'Ladakh Luxury Experience',
    description: 'Premium Ladakh tour with luxury accommodations and exclusive experiences',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 44999,
    category: 'custom',
    route: 'Leh → Pangong → Nubra → Luxury Stays'
  },
  // Group Departures (8)
  {
    id: 'group-1',
    title: 'Ladakh Group Adventure',
    description: 'Join fellow travelers for an unforgettable Ladakh group experience',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 21999,
    category: 'group',
    route: 'Leh → Khardungla → Nubra Valley'
  },
  {
    id: 'group-2',
    title: 'High Altitude Ladakh Trek',
    description: 'Group trekking adventure through Ladakh\'s high-altitude trails',
    image: '/cards/2.jpg',
    nights: 7,
    days: 8,
    price: 32999,
    category: 'group',
    route: 'Leh → Markha Valley → Stok Kangri'
  },
  {
    id: 'group-3',
    title: 'Winter Ladakh Special',
    description: 'Experience Ladakh in winter with frozen lakes and snow-covered peaks',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 24999,
    category: 'group',
    route: 'Leh → Frozen Pangong → Monasteries'
  },
  {
    id: 'group-4',
    title: 'Ladakh Photography Group Tour',
    description: 'Photography-focused group tour capturing Ladakh\'s stunning landscapes',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 27999,
    category: 'group',
    route: 'Leh → Nubra → Pangong → Monasteries'
  },
  {
    id: 'group-5',
    title: 'Ladakh Monastery Group Tour',
    description: 'Group exploration of Ladakh\'s ancient monasteries and spiritual sites',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 19999,
    category: 'group',
    route: 'Leh → Thiksey → Hemis → Alchi → Lamayuru'
  },
  {
    id: 'group-6',
    title: 'Ladakh Lakes Group Expedition',
    description: 'Group adventure to Ladakh\'s pristine high-altitude lakes',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 23999,
    category: 'group',
    route: 'Leh → Pangong → Tso Kar → Tso Moriri'
  },
  {
    id: 'group-7',
    title: 'Ladakh Cultural Group Tour',
    description: 'Group cultural immersion in Ladakh\'s traditions and heritage',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'group',
    route: 'Leh → Local Villages → Monasteries → Festivals'
  },
  {
    id: 'group-8',
    title: 'Ladakh Adventure Group Tour',
    description: 'Thrilling group adventure through Ladakh\'s challenging terrains',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 28999,
    category: 'group',
    route: 'Leh → Khardungla → Nubra → Pangong → High Passes'
  }
];

// Clean Card Container replacing the old stamp border
const StampBorder = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      'relative w-full min-h-[400px] bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-100',
      'transition-all duration-300 hover:shadow-[0_14px_35px_rgba(0,0,0,0.12)]',
      className
    )}
  >
    <div className="relative z-10 p-6 sm:p-6 md:p-7 lg:p-8 h-full w-full">
      {children}
    </div>
  </div>
);

const LadakhTripOptions = React.memo(({ content }: LadakhTripOptionsProps) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'group'>('custom');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripCard | null>(null);

  // Merge CMS content with defaults
  const tripsData = React.useMemo(() => {
    // Debug logging to see what content we're receiving
    console.log('LadakhTripOptions - Content received:', content);
    
    // If no content at all, use defaults
    if (!content) {
      console.log('LadakhTripOptions - No content, using defaults');
      return defaultLadakhTrips;
    }
    
    // Extract trips from the nested tripOptions structure
    const customTrips = content.customTrips;
    const groupTrips = content.groupTrips;
    
    // Check if we have valid custom trips from CMS
    const hasCustomTrips = customTrips && Array.isArray(customTrips) && customTrips.length > 0;
    // Check if we have valid group trips from CMS  
    const hasGroupTrips = groupTrips && Array.isArray(groupTrips) && groupTrips.length > 0;
    
    console.log('LadakhTripOptions - Has custom trips:', hasCustomTrips, 'Has group trips:', hasGroupTrips);
    
    // If neither custom nor group trips exist in CMS, use defaults
    if (!hasCustomTrips && !hasGroupTrips) {
      console.log('LadakhTripOptions - No valid trips in CMS, using defaults');
      return defaultLadakhTrips;
    }
    
    // Combine custom and group trips from CMS, or use defaults for missing ones
    const finalCustomTrips = hasCustomTrips ? customTrips : defaultLadakhTrips.filter(trip => trip.category === 'custom');
    const finalGroupTrips = hasGroupTrips ? groupTrips : defaultLadakhTrips.filter(trip => trip.category === 'group');
    
    const combinedTrips = [...finalCustomTrips, ...finalGroupTrips];
    console.log('LadakhTripOptions - Final trips count:', combinedTrips.length);
    
    return combinedTrips;
  }, [content]);

  
  // Unified carousel for both types
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps'
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Animation hooks
  const { setRef } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  // Get current trips based on active tab
  const currentTrips = tripsData.filter(trip => trip.category === activeTab);

  // Carousel navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  // Carousel select handler
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Initialize carousel
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Reset carousel when tab changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      setSelectedIndex(0);
    }
  }, [activeTab, emblaApi]);

  // Handle tab switch
  const handleTabSwitch = (tab: 'custom' | 'group') => {
    setActiveTab(tab);
  };

    // Modern Trip Card Component with Stamp Border
  const TripCard = ({ trip }: { trip: TripCard }) => (
    <StampBorder 
      className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
    >
    <motion.div 
        className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Trip Image */}
        <div className="relative h-48 sm:h-52 md:h-56 m-1 overflow-hidden rounded-lg mb-4">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 shadow-sm">
          <span className="text-xs font-bold text-gray-900 tracking-wide">
            {trip.nights}N • {trip.days}D
          </span>
        </div>

          {/* Trending Badge */}
          {trip.trending && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-full px-3 shadow-sm">
              <span className="text-xs font-bold tracking-wide">TRENDING</span>
            </div>
          )}

        {/* Category Badge */}
        {/* <div className="absolute bottom-4 left-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase",
            trip.category === 'custom' 
              ? "bg-blue-500/90 text-white" 
              : "bg-green-500/90 text-white"
          )}>
            {trip.category === 'custom' ? 'Customizable' : 'Group Tour'}
          </span>
        </div> */}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          {/* Route */}
          {trip.route && (
            <div className="mb-3">
              <div className="inline-block bg-gray-100 rounded-lg px-3 py-1.5">
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate block max-w-full">
                  {trip.route}
                </span>
              </div>
            </div>
          )}

        {/* Title */}
        <h3 className={cn(
                            "font-bold text-gray-900 leading-tight mb-1 ml-1 font-heading group-hover:text-[#134956] transition-colors duration-300",
          mobileFirst.text('h3')
        )}>
            {trip.title}
          </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-2 ml-1 line-clamp-2">
          {trip.description}
        </p>

                {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4 ml-1">
          {[
            { name: 'Sightseeing', hasIcon: false, included: true, icon: '' },
            { name: 'Transfers', hasIcon: false, included: true, icon: '' },
            { name: 'Meals', hasIcon: false, included: true, icon: '' },
            { name: 'Stay', hasIcon: false, included: true, icon: '' },
            { name: 'Trip Assistance', hasIcon: false, included: true, icon: '' },
            { name: 'Flights', hasIcon: true, included: false, icon: '/tripOptions/travel.svg' }
          ].map((feature) => (
            <span
              key={feature.name}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {feature.hasIcon ? (
                <Image
                  src={feature.icon}
                  alt={feature.name}
                  width={14}
                  height={14}
                  className="flex-shrink-0"
                  style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(118%) contrast(119%)' }}
                />
              ) : (
                <svg 
                  className="w-3 h-3 flex-shrink-0 text-green-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
              {feature.name}
              {!feature.included && (
                <span className="ml-1 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                  Additional
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between ml-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Starting from</p>
                                <p className="text-2xl font-bold text-[#134956] font-price">
              ₹{trip.price.toLocaleString()}
            </p>
            </div>
            
            <Button 
              onClick={() => {
                setSelectedTrip(trip);
              setIsModalOpen(true);
            }}
            className={cn(
              "bg-[#134956] hover:bg-[#0f3b4c] text-white font-semibold",
              "rounded-full px-11 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl",
              "text-sm sm:text-base"
            )}
          >
            Explore
            </Button>
          </div>
        </div>
      </motion.div>
    </StampBorder>
  );

  return (
    <section id="packages" className="py-16 md:py-20 bg-gray-50" ref={setRef}>
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
                  How Do You Want To{' '}
                  <span className="text-[#134956]">Explore Ladakh</span>?
                </>
              )}
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              {content?.subheading || "Choose your perfect Ladakh adventure - customize your own journey or join our group departures"}
            </p>
          </div>
        </LazyLoad>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="relative bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <div className="flex">
              <button
                onClick={() => handleTabSwitch('custom')}
                className={cn(
                  "relative px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-[#134956]/20 focus:ring-offset-2",
                  activeTab === 'custom'
                    ? "bg-[#134956] text-white shadow-md"
                    : "text-gray-700 hover:text-[#134956]"
                )}
              >
                Custom Trip
              </button>
              <button
                onClick={() => handleTabSwitch('group')}
                className={cn(
                  "relative px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-[#134956]/20 focus:ring-offset-2",
                  activeTab === 'group'
                    ? "bg-[#134956] text-white shadow-md"
                    : "text-gray-700 hover:text-[#134956]"
                )}
              >
                Group Departure
              </button>
            </div>
          </div>
        </div>

        {/* Trip Cards Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Desktop Carousel */}
            <div className="hidden md:block">
            <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-6">
                    {currentTrips.map((trip) => (
                    <div 
                      key={trip.id} 
                        className="flex-none w-80 lg:w-96"
                    >
                        <TripCard trip={trip} />
                    </div>
                  ))}
                </div>
              </div>

                {/* Navigation Arrows */}
                {currentTrips.length > 2 && (
                <>
                  <button
                      onClick={scrollPrev}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:bg-[#134956] hover:scale-110 group"
                      aria-label="Previous trip"
                    >
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                      onClick={scrollNext}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:bg-[#134956] hover:scale-110 group"
                      aria-label="Next trip"
                    >
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

                {/* Indicators */}
                {scrollSnaps.length > 1 && (
                  <div className="flex justify-center mt-8 gap-2">
                    {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                        onClick={() => scrollTo(index)}
                      className={cn(
                          'w-2 h-2 rounded-full transition-all duration-300',
                          index === selectedIndex ? 'bg-[#134956] w-6' : 'bg-gray-300 hover:bg-gray-400'
                      )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

            {/* Mobile Grid */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentTrips.slice(0, 4).map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>

              {currentTrips.length > 4 && (
                <div className="text-center mt-8">
                  <a
                    href="/ladakh/all-trips"
                    className="inline-block bg-[#134956] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0f3b4c] transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    View All {currentTrips.length} Trips
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modals */}
        {isModalOpen && (
          <ItineraryModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            trip={selectedTrip} 
          />
        )}


      </div>
    </section>
  );
});

LadakhTripOptions.displayName = 'LadakhTripOptions';

export default LadakhTripOptions;