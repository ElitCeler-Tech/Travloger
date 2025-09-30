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

const keralaTrips: TripCard[] = [
  // Custom Trips (10)
  {
    id: 'custom-1',
    title: 'Kerala Backwaters Bliss',
    description: 'Experience the serene backwaters of Kerala with traditional houseboat stays',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'custom',
    route: 'Kochi → Alleppey → Kumarakom',
    trending: true,
    detailedItinerary: {
      subtitle: 'Complete Travel Experience',
      briefItinerary: [
        {
          day: 1,
          title: 'Srinagar Arrival & Sightseeing',
          description: 'Arrive in Srinagar and explore the beautiful Mughal Gardens and Dal Lake'
        },
        {
          day: 2,
          title: 'Day Trip to Sonmarg – The Meadow of Gold',
          description: 'Visit the stunning meadows and glaciers of Sonmarg'
        },
        {
          day: 3,
          title: 'Day Trip to Gulmarg – The Meadow of Flowers',
          description: 'Experience the famous Gondola ride and enjoy the alpine meadows'
        },
        {
          day: 4,
          title: 'Day Trip to Doodhpathri & Houseboat Stay',
          description: 'Explore the beautiful meadows of Doodhpathri and stay in a traditional houseboat'
        },
        {
          day: 5,
          title: 'Srinagar to Pahalgam – Legendary countryside',
          description: 'Travel to Pahalgam and explore the legendary valleys and countryside'
        }
      ],
      keyAttractions: [
        'Mughal Gardens, Dal Lake',
        'Thajiwas Glacier & Zojila Pass in Sonmarg',
        'Gondola ride at Gulmarg (Asia\'s highest cable car)',
        'Doodhpathri meadows & pine forests',
        'Aru, Betaab & Chandanwari valleys in Pahalgam',
        'Boutique houseboat stay in Srinagar'
      ],
      inclusions: ['Sightseeing', 'Transfers', 'Meals', 'Stay', 'Trip Assistance']
    }
  },
  {
    id: 'custom-2',
    title: 'Munnar Hill Station Escape',
    description: 'Discover the tea gardens and misty mountains of Munnar',
    image: '/cards/2.jpg',
    nights: 3,
    days: 4,
    price: 15999,
    category: 'custom',
    route: 'Kochi → Munnar → Tea Gardens'
  },
  {
    id: 'custom-3',
    title: 'Kerala Ayurveda Retreat',
    description: 'Rejuvenate your mind and body with authentic Ayurvedic treatments',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 22999,
    category: 'custom',
    route: 'Kochi → Alleppey → Ayurveda Centers'
  },
  {
    id: 'custom-4',
    title: 'Complete Kerala Experience',
    description: 'Comprehensive Kerala exploration covering backwaters, hills, and beaches',
    image: '/cards/1.jpg',
    nights: 7,
    days: 8,
    price: 29999,
    category: 'custom',
    route: 'Kochi → Munnar → Alleppey → Kovalam'
  },
  {
    id: 'custom-5',
    title: 'Kerala Beach Paradise',
    description: 'Relax on pristine beaches and enjoy coastal Kerala culture',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 19999,
    category: 'custom',
    route: 'Kochi → Kovalam → Varkala → Beaches'
  },
  {
    id: 'custom-6',
    title: 'Kerala Wildlife Safari',
    description: 'Explore the rich biodiversity of Kerala\'s national parks and wildlife sanctuaries',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 21999,
    category: 'custom',
    route: 'Kochi → Periyar → Wayanad → Wildlife'
  },
  {
    id: 'custom-7',
    title: 'Kerala Cultural Heritage',
    description: 'Immerse yourself in Kerala\'s rich cultural traditions and historical sites',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 24999,
    category: 'custom',
    route: 'Kochi → Fort Kochi → Temples → Cultural Sites'
  },
  {
    id: 'custom-8',
    title: 'Kerala Spice Trail',
    description: 'Journey through Kerala\'s spice plantations and learn about traditional spices',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'custom',
    route: 'Kochi → Thekkady → Spice Plantations'
  },
  {
    id: 'custom-9',
    title: 'Kerala Photography Tour',
    description: 'Capture the stunning landscapes and vibrant culture of Kerala',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 23999,
    category: 'custom',
    route: 'Kochi → Munnar → Alleppey → Photography Spots'
  },
  {
    id: 'custom-10',
    title: 'Kerala Luxury Experience',
    description: 'Premium Kerala tour with luxury accommodations and exclusive experiences',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 39999,
    category: 'custom',
    route: 'Kochi → Luxury Houseboats → Premium Stays'
  },
  // Group Departures (8)
  {
    id: 'group-1',
    title: 'Kerala Group Adventure',
    description: 'Join fellow travelers for an unforgettable Kerala group experience',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 17999,
    category: 'group',
    route: 'Kochi → Munnar → Alleppey → Backwaters'
  },
  {
    id: 'group-2',
    title: 'Kerala Backwaters Group Tour',
    description: 'Group exploration of Kerala\'s famous backwaters and houseboat experience',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 15999,
    category: 'group',
    route: 'Kochi → Alleppey → Kumarakom → Houseboats'
  },
  {
    id: 'group-3',
    title: 'Kerala Monsoon Special',
    description: 'Experience Kerala during monsoon with lush greenery and fewer crowds',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 19999,
    category: 'group',
    route: 'Kochi → Munnar → Alleppey → Monsoon Magic'
  },
  {
    id: 'group-4',
    title: 'Kerala Photography Group Tour',
    description: 'Photography-focused group tour capturing Kerala\'s stunning landscapes',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 22999,
    category: 'group',
    route: 'Kochi → Munnar → Alleppey → Photography'
  },
  {
    id: 'group-5',
    title: 'Kerala Ayurveda Group Tour',
    description: 'Group wellness retreat with authentic Ayurvedic treatments and therapies',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 20999,
    category: 'group',
    route: 'Kochi → Ayurveda Centers → Wellness Retreats'
  },
  {
    id: 'group-6',
    title: 'Kerala Beach Group Tour',
    description: 'Group beach vacation exploring Kerala\'s beautiful coastline',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 17999,
    category: 'group',
    route: 'Kochi → Kovalam → Varkala → Beach Life'
  },
  {
    id: 'group-7',
    title: 'Kerala Cultural Group Tour',
    description: 'Group cultural immersion in Kerala\'s traditions and heritage',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 19999,
    category: 'group',
    route: 'Kochi → Cultural Sites → Traditional Arts → Festivals'
  },
  {
    id: 'group-8',
    title: 'Kerala Wildlife Group Tour',
    description: 'Group wildlife adventure through Kerala\'s national parks',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 21999,
    category: 'group',
    route: 'Kochi → Periyar → Wayanad → Wildlife Safari'
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

const KeralaTripOptions = React.memo(({ content }: { content?: TripOptionsContent }) => {
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
  const customTrips = content?.customTrips || keralaTrips.filter(trip => trip.category === 'custom');
  const groupTrips = content?.groupTrips || keralaTrips.filter(trip => trip.category === 'group');
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
                  <span className="text-[#134956]">Explore Kerala</span>?
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
                    href="/kerala/all-trips"
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

KeralaTripOptions.displayName = 'KeralaTripOptions';

export default KeralaTripOptions;