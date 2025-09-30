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
}

const bengaluruTrips: TripCard[] = [
  // Custom Trips (10)
  {
    id: 'custom-1',
    title: 'Bengaluru Garden City Tour',
    description: 'Explore the beautiful gardens and parks that make Bengaluru the Garden City of India',
    image: '/cards/1.jpg',
    nights: 3,
    days: 4,
    price: 13999,
    category: 'custom',
    route: 'Lalbagh → Cubbon Park → Bannerghatta → Nandi Hills',
    trending: true,
    detailedItinerary: {
      subtitle: 'Complete Garden City Experience',
      briefItinerary: [
        {
          day: 1,
          title: 'Bengaluru Arrival & Lalbagh Botanical Garden',
          description: 'Arrive in Bengaluru and explore the famous Lalbagh Botanical Garden'
        },
        {
          day: 2,
          title: 'Cubbon Park & Vidhana Soudha',
          description: 'Visit the beautiful Cubbon Park and the magnificent Vidhana Soudha'
        },
        {
          day: 3,
          title: 'Bannerghatta National Park & Nandi Hills',
          description: 'Experience wildlife at Bannerghatta and enjoy the scenic Nandi Hills'
        },
        {
          day: 4,
          title: 'Tech Parks & Departure',
          description: 'Explore the modern tech parks and innovation centers before departure'
        }
      ],
      keyAttractions: [
        'Lalbagh Botanical Garden - 240-acre botanical paradise',
        'Cubbon Park - Green lung of the city',
        'Bannerghatta National Park - Wildlife sanctuary',
        'Nandi Hills - Scenic hill station',
        'Vidhana Soudha - State legislature building',
        'Tech Parks - Modern innovation centers'
      ],
      inclusions: ['Sightseeing', 'Transfers', 'Meals', 'Stay', 'Trip Assistance']
    }
  },
  {
    id: 'custom-2',
    title: 'Bengaluru Tech Hub Experience',
    description: 'Discover the Silicon Valley of India with its tech parks and innovation centers',
    image: '/cards/2.jpg',
    nights: 2,
    days: 3,
    price: 11999,
    category: 'custom',
    route: 'HITEC City → Electronic City → Tech Parks → Startups'
  },
  {
    id: 'custom-3',
    title: 'Bengaluru Food & Culture Trail',
    description: 'Savor the diverse cuisine and experience the rich culture of Bengaluru',
    image: '/cards/3.jpg',
    nights: 3,
    days: 4,
    price: 12999,
    category: 'custom',
    route: 'Local Cuisine → Street Food → Cultural Sites → Traditional Arts'
  },
  {
    id: 'custom-4',
    title: 'Complete Bengaluru Experience',
    description: 'Comprehensive Bengaluru tour covering gardens, tech, culture, and heritage',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 19999,
    category: 'custom',
    route: 'Gardens → Tech → Culture → Heritage → Food'
  },
  {
    id: 'custom-5',
    title: 'Bengaluru Heritage Walk',
    description: 'Explore the historical monuments and heritage sites of Bengaluru',
    image: '/cards/2.jpg',
    nights: 2,
    days: 3,
    price: 10999,
    category: 'custom',
    route: 'Tipu Sultan Palace → Bangalore Palace → Fort → Museums'
  },
  {
    id: 'custom-6',
    title: 'Bengaluru Photography Tour',
    description: 'Capture the beauty of Bengaluru through its gardens, architecture, and culture',
    image: '/cards/3.jpg',
    nights: 3,
    days: 4,
    price: 14999,
    category: 'custom',
    route: 'Gardens → Architecture → Culture → Street Life → Landmarks'
  },
  {
    id: 'custom-7',
    title: 'Bengaluru Shopping Spree',
    description: 'Shop for silk, handicrafts, and traditional items in Bengaluru\'s famous markets',
    image: '/cards/1.jpg',
    nights: 2,
    days: 3,
    price: 9999,
    category: 'custom',
    route: 'Commercial Street → Chickpet → Silk → Handicrafts → Electronics'
  },
  {
    id: 'custom-8',
    title: 'Bengaluru Luxury Experience',
    description: 'Premium Bengaluru tour with luxury accommodations and exclusive experiences',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 29999,
    category: 'custom',
    route: 'Luxury Hotels → Fine Dining → Exclusive Access → Premium Services'
  },
  {
    id: 'custom-9',
    title: 'Bengaluru Weekend Getaway',
    description: 'Perfect weekend escape to explore the best of Bengaluru',
    image: '/cards/3.jpg',
    nights: 2,
    days: 3,
    price: 11999,
    category: 'custom',
    route: 'Gardens → Food → Shopping → Relaxation'
  },
  {
    id: 'custom-10',
    title: 'Bengaluru Business & Pleasure',
    description: 'Combine business meetings with leisure activities in Bengaluru',
    image: '/cards/1.jpg',
    nights: 3,
    days: 4,
    price: 16999,
    category: 'custom',
    route: 'Business Centers → Gardens → Networking → Cultural Events'
  },
  // Group Departures (8)
  {
    id: 'group-1',
    title: 'Bengaluru Group Garden Tour',
    description: 'Join fellow travelers for an unforgettable Bengaluru garden experience',
    image: '/cards/1.jpg',
    nights: 3,
    days: 4,
    price: 12999,
    category: 'group',
    route: 'Lalbagh → Cubbon Park → Bannerghatta → Nandi Hills'
  },
  {
    id: 'group-2',
    title: 'Bengaluru Tech Group Tour',
    description: 'Group exploration of Bengaluru\'s famous tech parks and innovation centers',
    image: '/cards/2.jpg',
    nights: 2,
    days: 3,
    price: 10999,
    category: 'group',
    route: 'HITEC City → Electronic City → Tech Parks → Startups'
  },
  {
    id: 'group-3',
    title: 'Bengaluru Cultural Group Tour',
    description: 'Group cultural immersion in Bengaluru\'s rich traditions and heritage',
    image: '/cards/3.jpg',
    nights: 3,
    days: 4,
    price: 11999,
    category: 'group',
    route: 'Museums → Art Galleries → Cultural Sites → Traditional Arts'
  },
  {
    id: 'group-4',
    title: 'Bengaluru Photography Group Tour',
    description: 'Photography-focused group tour capturing Bengaluru\'s stunning gardens and architecture',
    image: '/cards/1.jpg',
    nights: 3,
    days: 4,
    price: 13999,
    category: 'group',
    route: 'Gardens → Architecture → Culture → Street Photography'
  },
  {
    id: 'group-5',
    title: 'Bengaluru Food Group Tour',
    description: 'Group food experience exploring Bengaluru\'s diverse cuisine',
    image: '/cards/2.jpg',
    nights: 2,
    days: 3,
    price: 9999,
    category: 'group',
    route: 'Local Cuisine → Street Food → Traditional Dishes → Food Markets'
  },
  {
    id: 'group-6',
    title: 'Bengaluru Weekend Group Tour',
    description: 'Group weekend getaway exploring the best of Bengaluru',
    image: '/cards/3.jpg',
    nights: 2,
    days: 3,
    price: 10999,
    category: 'group',
    route: 'Gardens → Food → Shopping → Relaxation'
  },
  {
    id: 'group-7',
    title: 'Bengaluru Heritage Group Tour',
    description: 'Group exploration of Bengaluru\'s historical monuments and heritage sites',
    image: '/cards/1.jpg',
    nights: 2,
    days: 3,
    price: 11999,
    category: 'group',
    route: 'Tipu Sultan Palace → Bangalore Palace → Fort → Museums'
  },
  {
    id: 'group-8',
    title: 'Bengaluru Complete Group Tour',
    description: 'Comprehensive group tour covering all aspects of Bengaluru',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 17999,
    category: 'group',
    route: 'Gardens → Tech → Culture → Heritage → Food → Shopping'
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

type TripOptionsContent = {
  heading?: string
  subheading?: string
  customLabel?: string
  groupLabel?: string
  customTrips?: TripCard[]
  groupTrips?: TripCard[]
}

const BengaluruTripOptions = React.memo(({ content }: { content?: TripOptionsContent }) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'group'>('custom');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripCard | null>(null);

  
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
  const customTrips = content?.customTrips || bengaluruTrips.filter(trip => trip.category === 'custom');
  const groupTrips = content?.groupTrips || bengaluruTrips.filter(trip => trip.category === 'group');
  const currentTrips = activeTab === 'custom' ? customTrips : groupTrips;

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
                  <span className="text-[#134956]">Explore Bengaluru</span>?
                </>
              )}
            </h2>
            {content?.subheading && (
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                {content.subheading}
              </p>
            )}
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
                {content?.customLabel || 'Custom Trip'}
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
                {content?.groupLabel || 'Group Departure'}
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
                    href="/bengaluru/all-trips"
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

BengaluruTripOptions.displayName = 'BengaluruTripOptions';

export default BengaluruTripOptions;
