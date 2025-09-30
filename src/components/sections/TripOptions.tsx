'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ItineraryModal from '../ui/ItineraryModal';
import { Button } from '../ui/Button';
import LazyLoad from '@/components/ui/LazyLoad';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import { usePackages, Package } from '@/lib/usePackages';

// Use the Package interface from usePackages instead of TripCard
type TripCard = Package;

interface TripOptionsContent {
  heading?: string;
  subheading?: string;
  customTrips?: TripCard[];
  groupTrips?: TripCard[];
}

interface TripOptionsProps {
  content?: TripOptionsContent;
}

// Fallback trips in case API fails
const fallbackTrips: TripCard[] = [
  {
    id: 'custom-1',
    title: 'Kashmir Summer Paradise',
    description: 'A scenic Kashmir circuit through valleys and riverside charm',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'custom',
    route: 'Srinagar → Gulmarg → Pahalgam',
    trending: true,
    destination: 'Kashmir',
    duration: '5 days / 4 nights',
    highlights: ['Scenic valleys', 'Riverside charm'],
    includes: ['Accommodation', 'Meals', 'Transport']
  },
  {
    id: 'group-1',
    title: 'Kashmir Group Adventure',
    description: 'Group adventure through Kashmir with fellow travelers',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 15999,
    category: 'group',
    route: 'Srinagar → Gulmarg → Pahalgam',
    destination: 'Kashmir',
    duration: '5 days / 4 nights',
    highlights: ['Group adventure', 'Fellow travelers'],
    includes: ['Accommodation', 'Meals', 'Transport']
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

// Modern Trip Card Component with Stamp Border
const TripCard = ({ trip, setSelectedTrip, setIsModalOpen }: { 
  trip: TripCard; 
  setSelectedTrip: (trip: TripCard) => void; 
  setIsModalOpen: (open: boolean) => void; 
}) => {
  return (
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
};

const TripOptions = React.memo(({ content }: TripOptionsProps) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'group'>('custom');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripCard | null>(null);

  // Fetch packages from API
  const { packages: customTrips, loading: customLoading, error: customError } = usePackages({ 
    tripType: 'custom' 
  });
  const { packages: groupTrips, loading: groupLoading, error: groupError } = usePackages({ 
    tripType: 'group' 
  });

  // Get current trips based on active tab, prioritizing CMS content
  const currentTrips = React.useMemo(() => {
    if (activeTab === 'custom') {
      // Priority: CMS content > API data > fallback
      if (content?.customTrips && content.customTrips.length > 0) {
        return content.customTrips;
      }
      return customTrips.length > 0 ? customTrips : fallbackTrips.filter(trip => trip.category === 'custom');
    } else {
      // Priority: CMS content > API data > fallback
      if (content?.groupTrips && content.groupTrips.length > 0) {
        return content.groupTrips;
      }
      return groupTrips.length > 0 ? groupTrips : fallbackTrips.filter(trip => trip.category === 'group');
    }
  }, [activeTab, customTrips, groupTrips, content?.customTrips, content?.groupTrips]);

  const isLoading = activeTab === 'custom' ? customLoading : groupLoading;
  const error = activeTab === 'custom' ? customError : groupError;

  // Handle tab switch
  const handleTabSwitch = (tab: 'custom' | 'group') => {
    setActiveTab(tab);
  };

  return (
    <section id="packages" className="py-16 md:py-20 bg-gray-50">
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
                  <span className="text-[#134956]">Explore Kashmir</span>?
                </>
              )}
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              {content?.subheading || "Choose your perfect Kashmir adventure - customize your own journey or join our group departures"}
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
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#134956] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading packages...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Packages</h3>
                <p className="text-gray-600 mb-4">Using fallback content</p>
              </div>
            )}

            {/* Packages Grid - Only show when not loading */}
            {!isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTrips.map((trip) => (
                  <TripCard 
                    key={trip.id} 
                    trip={trip} 
                    setSelectedTrip={setSelectedTrip}
                    setIsModalOpen={setIsModalOpen}
                  />
                ))}
              </div>
            )}
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

TripOptions.displayName = 'TripOptions';

export default TripOptions;
