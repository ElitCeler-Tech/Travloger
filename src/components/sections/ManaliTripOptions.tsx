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
  features?: {
    name: string;
    icon?: 'default' | 'flights' | 'bus' | 'train';
    included: boolean;
  }[];
}

const manaliTrips: TripCard[] = [
  // Custom Trips (10)
  {
    id: 'custom-1',
    title: 'Manali Adventure Paradise',
    description: 'Experience the thrill of adventure sports and breathtaking mountain views in Manali',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'custom',
    route: 'Manali → Solang Valley → Rohtang Pass → Adventure Sports',
    trending: true,
    detailedItinerary: {
      subtitle: 'Complete Adventure Experience',
      briefItinerary: [
        {
          day: 1,
          title: 'Manali Arrival & Local Sightseeing',
          description: 'Arrive in Manali and explore the beautiful Hidimba Temple and Manu Temple'
        },
        {
          day: 2,
          title: 'Solang Valley Adventure',
          description: 'Experience thrilling adventure sports like paragliding, zorbing, and skiing'
        },
        {
          day: 3,
          title: 'Rohtang Pass & Snow Point',
          description: 'Visit the famous Rohtang Pass and enjoy snow activities at Snow Point'
        },
        {
          day: 4,
          title: 'Manikaran & Kasol',
          description: 'Explore the spiritual Manikaran Sahib and the hippie town of Kasol'
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Check out and depart with unforgettable memories'
        }
      ],
      keyAttractions: [
        'Hidimba Temple - Ancient cave temple',
        'Solang Valley - Adventure sports hub',
        'Rohtang Pass - High altitude mountain pass',
        'Manikaran Sahib - Sacred hot springs',
        'Kasol - Hippie paradise',
        'Vashisht Temple - Natural hot water springs'
      ],
      inclusions: ['Sightseeing', 'Transfers', 'Meals', 'Stay', 'Trip Assistance']
    }
  },
  {
    id: 'custom-2',
    title: 'Manali Romantic Getaway',
    description: 'Perfect romantic escape with cozy stays and scenic mountain views',
    image: '/cards/2.jpg',
    nights: 3,
    days: 4,
    price: 15999,
    category: 'custom',
    route: 'Manali → Romantic Stays → Scenic Views → Couple Activities'
  },
  {
    id: 'custom-3',
    title: 'Manali Family Fun',
    description: 'Family-friendly Manali tour with activities for all age groups',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 17999,
    category: 'custom',
    route: 'Manali → Family Activities → Safe Adventures → Comfortable Stays'
  },
  {
    id: 'custom-4',
    title: 'Complete Manali Experience',
    description: 'Comprehensive Manali tour covering adventure, culture, and natural beauty',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 22999,
    category: 'custom',
    route: 'Manali → Adventure → Culture → Nature → Relaxation'
  },
  {
    id: 'custom-5',
    title: 'Manali Photography Tour',
    description: 'Capture the stunning landscapes and mountain beauty of Manali',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 19999,
    category: 'custom',
    route: 'Manali → Scenic Spots → Mountain Views → Cultural Photography'
  },
  {
    id: 'custom-6',
    title: 'Manali Spiritual Journey',
    description: 'Explore the spiritual side of Manali with temple visits and meditation',
    image: '/cards/3.jpg',
    nights: 3,
    days: 4,
    price: 14999,
    category: 'custom',
    route: 'Manali → Temples → Meditation → Spiritual Sites'
  },
  {
    id: 'custom-7',
    title: 'Manali Trekking Adventure',
    description: 'Experience the thrill of trekking in the beautiful mountains of Manali',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 21999,
    category: 'custom',
    route: 'Manali → Trekking Trails → Mountain Peaks → Camping'
  },
  {
    id: 'custom-8',
    title: 'Manali Luxury Experience',
    description: 'Premium Manali tour with luxury accommodations and exclusive experiences',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 29999,
    category: 'custom',
    route: 'Luxury Hotels → Fine Dining → Exclusive Access → Premium Services'
  },
  {
    id: 'custom-9',
    title: 'Manali Weekend Escape',
    description: 'Perfect weekend getaway to explore the best of Manali',
    image: '/cards/3.jpg',
    nights: 2,
    days: 3,
    price: 12999,
    category: 'custom',
    route: 'Manali → Adventure → Relaxation → Scenic Views'
  },
  {
    id: 'custom-10',
    title: 'Manali Honeymoon Special',
    description: 'Romantic honeymoon package with special surprises and intimate experiences',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 24999,
    category: 'custom',
    route: 'Romantic Stays → Couple Activities → Special Surprises → Intimate Experiences'
  },
  // Group Departures (8)
  {
    id: 'group-1',
    title: 'Manali Group Adventure',
    description: 'Join fellow travelers for an unforgettable Manali adventure experience',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 16999,
    category: 'group',
    route: 'Manali → Solang Valley → Rohtang Pass → Group Activities'
  },
  {
    id: 'group-2',
    title: 'Manali Group Trekking',
    description: 'Group trekking experience in the beautiful mountains of Manali',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 19999,
    category: 'group',
    route: 'Manali → Trekking Trails → Mountain Peaks → Group Camping'
  },
  {
    id: 'group-3',
    title: 'Manali Group Cultural Tour',
    description: 'Group cultural immersion in Manali\'s rich traditions and heritage',
    image: '/cards/3.jpg',
    nights: 3,
    days: 4,
    price: 13999,
    category: 'group',
    route: 'Temples → Cultural Sites → Traditional Arts → Local Experiences'
  },
  {
    id: 'group-4',
    title: 'Manali Group Photography Tour',
    description: 'Photography-focused group tour capturing Manali\'s stunning landscapes',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 17999,
    category: 'group',
    route: 'Scenic Spots → Mountain Views → Cultural Photography → Group Sessions'
  },
  {
    id: 'group-5',
    title: 'Manali Group Adventure Sports',
    description: 'Group adventure sports experience in Manali\'s famous adventure hubs',
    image: '/cards/2.jpg',
    nights: 3,
    days: 4,
    price: 15999,
    category: 'group',
    route: 'Solang Valley → Adventure Sports → Group Activities → Thrilling Experiences'
  },
  {
    id: 'group-6',
    title: 'Manali Group Weekend Tour',
    description: 'Group weekend getaway exploring the best of Manali',
    image: '/cards/3.jpg',
    nights: 2,
    days: 3,
    price: 11999,
    category: 'group',
    route: 'Manali → Adventure → Relaxation → Group Fun'
  },
  {
    id: 'group-7',
    title: 'Manali Group Spiritual Tour',
    description: 'Group spiritual journey exploring Manali\'s sacred sites and temples',
    image: '/cards/1.jpg',
    nights: 3,
    days: 4,
    price: 14999,
    category: 'group',
    route: 'Temples → Spiritual Sites → Meditation → Group Healing'
  },
  {
    id: 'group-8',
    title: 'Manali Complete Group Tour',
    description: 'Comprehensive group tour covering all aspects of Manali',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 20999,
    category: 'group',
    route: 'Adventure → Culture → Nature → Relaxation → Group Activities'
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

const ManaliTripOptions = React.memo(({ content }: { content?: TripOptionsContent }) => {
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
  const customTrips = content?.customTrips || manaliTrips.filter(trip => trip.category === 'custom');
  const groupTrips = content?.groupTrips || manaliTrips.filter(trip => trip.category === 'group');
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
            {(trip.features && trip.features.length > 0 ? trip.features : [
              { name: 'Sightseeing', icon: 'default', included: true },
              { name: 'Transfers', icon: 'default', included: true },
              { name: 'Meals', icon: 'default', included: true },
              { name: 'Stay', icon: 'default', included: true },
              { name: 'Trip Assistance', icon: 'default', included: true },
              { name: 'Flights', icon: 'flights', included: false }
            ] as const).map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-700 rounded-full text-[11px] font-semibold border border-gray-100 shadow-sm transition-all duration-200 hover:bg-gray-100"
              >
                {feature.included ? (
                  <svg className="w-3 h-3 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <>
                    {feature.icon === 'flights' && (
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1.1.1-1.5.5l-.3.3c-.4.4-.5 1-.3 1.5L9 12l-3.3 3.3-2 .4c-.5.1-.9.5-1 1l-.2.2c-.1.5.1 1.1.5 1.5l.6.6c.4.4 1 .5 1.5.5l.2-.2c.5-.1.9-.5 1-1l.4-2L12 15l3.5 6.3c.3.5.8.7 1.3.7.2 0 .4 0 .6-.1l.3-.3c.4-.4.5-1 .3-1.5z" />
                      </svg>
                    )}
                    {feature.icon === 'bus' && (
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="8" width="16" height="12" rx="2" />
                        <path d="M6 20v2" />
                        <path d="M18 20v2" />
                        <path d="M4 14h16" />
                        <path d="M8 8V4c0-1.1.9-2 2-2h4a2 2 0 012 2v4" />
                      </svg>
                    )}
                    {feature.icon === 'train' && (
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="3" width="16" height="15" rx="2" />
                        <path d="M4 11h16" />
                        <path d="M8 18l-3 3" />
                        <path d="M16 18l3 3" />
                        <circle cx="8" cy="15" r="1" />
                        <circle cx="16" cy="15" r="1" />
                      </svg>
                    )}
                    {(!feature.icon || feature.icon === 'default') && (
                      <svg className="w-3 h-3 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3" />
                      </svg>
                    )}
                  </>
                )}
                {feature.name}
                {!feature.included && (
                  <span className="ml-1 px-1.5 py-0.5 bg-orange-500 text-white text-[9px] font-bold rounded uppercase tracking-tighter shadow-sm">
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
                  <span className="text-[#134956]">Explore Manali</span>?
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
                    href="/manali/all-trips"
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

ManaliTripOptions.displayName = 'ManaliTripOptions';

export default ManaliTripOptions;
