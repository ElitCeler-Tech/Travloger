'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ItineraryModal from '@/components/ui/ItineraryModal';
import { Button } from '@/components/ui/Button';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import FloatingActionBar from '@/components/ui/FloatingActionBar';

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

const gokarnaTrips: TripCard[] = [
    // Custom Trips
    {
      id: 'custom-1',
      title: '3 Days 2 Nights - Gokarna Dandeli',
      description: 'Experience the perfect blend of jungle adventure and beach relaxation',
      image: '/cards/1.jpg',
      nights: 2,
      days: 3,
      price: 15999,
      category: 'custom',
      route: 'Hubli → Jungle → Gokarna → Murudeshwar → Hubli',
      trending: true,
    },
    {
      id: 'custom-2',
      title: '3 Days 2 Nights - Gokarna',
      description: 'Explore the spiritual and coastal beauty of Gokarna',
      image: '/cards/2.jpg',
      nights: 2,
      days: 3,
      price: 12999,
      category: 'custom',
      route: 'Hubli → Gokarna → Murudeshwar → Hubli',
    },
    {
      id: 'custom-3',
      title: '4 Days 3 Nights - Gokarna Dandeli',
      description: 'Extended adventure with jungle and beach experiences',
      image: '/cards/3.jpg',
      nights: 3,
      days: 4,
      price: 19999,
      category: 'custom',
      route: 'Hubli → Dandeli → Gokarna → Murudeshwar → Hubli',
   
    },
    {
      id: 'custom-4',
      title: '6 Days 5 Nights - Gokarna',
      description: 'Comprehensive tour from Goa to Gokarna with Dandeli adventure',
      image: '/cards/1.jpg',
      nights: 5,
      days: 6,
      price: 29999,
      category: 'custom',
      route: 'Goa → Gokarna → Murudeshwar → Dandeli → Hubli',

    },
    {
      id: 'custom-5',
      title: '4 Days 3 Nights - Gokarna with Udupi',
      description: 'Spiritual journey combining Gokarna temples with Udupi heritage',
      image: '/cards/2.jpg',
      nights: 3,
      days: 4,
      price: 17999,
      category: 'custom',
      route: 'Hubli → Gokarna → Murudeshwar → Udupi → Hubli/Udupi',

    },
    {
      id: 'custom-6',
      title: '5 Days 4 Nights Gokarna Dandeli with Udupi',
      description: 'Ultimate adventure combining jungle, beaches, and spiritual sites',
      image: '/cards/3.jpg',
      nights: 4,
      days: 5,
      price: 24999,
      category: 'custom',
      route: 'Hubli → Dandeli → Gokarna → Murudeshwar → Udupi → Hubli/Udupi',

    },
    {
      id: 'custom-7',
      title: '5 Days 4 Nights - Gokarna Goa',
      description: 'Perfect blend of Goa beaches and Gokarna spirituality',
      image: '/cards/1.jpg',
      nights: 4,
      days: 5,
      price: 22999,
      category: 'custom',
      route: 'Goa → Gokarna → Murudeshwar → Hubli',

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

const GokarnaAllTripsPage = () => {
  const [activeTab, setActiveTab] = useState<'custom' | 'group'>('custom');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripCard | null>(null);

  // Get current trips based on active tab
  const currentTrips = gokarnaTrips.filter(trip => trip.category === activeTab);

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
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          {/* Route */}
          {trip.route && (
            <div className="mb-3">
              <div className="inline-block bg-gray-100 rounded-lg px-3 py-1max-w-full">
                <span className="text-xs sm:text-sm font-medium text-gray-700  leading-tight">
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
    <div className="min-h-screen bg-gray-50">
      <div className={mobileFirst.container('xl')}>
        {/* Page Header */}
        <div className="py-16 md:py-20">
          <div className="text-center mb-8 md:mb-12">
            <h1 className={cn(
              "font-bold text-gray-900 mb-4 font-heading",
              mobileFirst.text('h1')
            )}>
              All Gokarna{' '}
              <span className="text-[#134956]">Trip Packages</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Discover all our Gokarna adventures - from custom journeys to group departures
            </p>
          </div>

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
                  Custom Trip ({gokarnaTrips.filter(t => t.category === 'custom').length})
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
                  Group Departure ({gokarnaTrips.filter(t => t.category === 'group').length})
                </button>
              </div>
            </div>
          </div>

          {/* Trip Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {currentTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ItineraryModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            trip={selectedTrip} 
          />
        )}
      </div>
      
      {/* Floating Action Bar */}
      <FloatingActionBar />
    </div>
  );
};

export default GokarnaAllTripsPage; 