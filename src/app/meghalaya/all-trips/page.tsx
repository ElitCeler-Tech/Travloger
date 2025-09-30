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

const meghalayaTrips: TripCard[] = [
  // Custom Trips (10)
  {
    id: 'custom-1',
    title: 'Meghalaya Living Root Bridges',
    description: 'Explore the unique living root bridges and pristine nature of Meghalaya',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 18999,
    category: 'custom',
    route: 'Shillong → Cherrapunjee → Living Root Bridges',
    trending: true
  },
  {
    id: 'custom-2',
    title: 'Meghalaya Waterfall Paradise',
    description: 'Discover the stunning waterfalls and cascades of Meghalaya',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 15999,
    category: 'custom',
    route: 'Shillong → Nohkalikai → Seven Sisters Falls'
  },
  {
    id: 'custom-3',
    title: 'Meghalaya Cave Exploration',
    description: 'Adventure through the mysterious caves and underground rivers of Meghalaya',
    image: '/cards/3.jpg',
    nights: 6,
    days: 7,
    price: 22999,
    category: 'custom',
    route: 'Shillong → Mawsmai Cave → Krem Liat Prah'
  },
  {
    id: 'custom-4',
    title: 'Meghalaya Cultural Heritage',
    description: 'Immerse yourself in the rich tribal culture and traditions of Meghalaya',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 19999,
    category: 'custom',
    route: 'Shillong → Tribal Villages → Cultural Sites'
  },
  {
    id: 'custom-5',
    title: 'Meghalaya Photography Tour',
    description: 'Capture the breathtaking landscapes and vibrant culture of Meghalaya',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 24999,
    category: 'custom',
    route: 'Shillong → Photography Spots → Scenic Views'
  },
  {
    id: 'custom-6',
    title: 'Meghalaya Dawki River Adventure',
    description: 'Experience the crystal clear waters of Dawki River and Umngot',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 17999,
    category: 'custom',
    route: 'Shillong → Dawki → Umngot River'
  },
  {
    id: 'custom-7',
    title: 'Meghalaya Monsoon Special',
    description: 'Experience Meghalaya during monsoon with lush greenery and waterfalls',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 20999,
    category: 'custom',
    route: 'Shillong → Monsoon Magic → Waterfall Views'
  },
  {
    id: 'custom-8',
    title: 'Meghalaya Trekking Adventure',
    description: 'Trek through the beautiful hills and valleys of Meghalaya',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 23999,
    category: 'custom',
    route: 'Shillong → Trekking Routes → Mountain Trails'
  },
  {
    id: 'custom-9',
    title: 'Meghalaya Luxury Experience',
    description: 'Premium Meghalaya tour with luxury accommodations and exclusive experiences',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 29999,
    category: 'custom',
    route: 'Shillong → Luxury Stays → Premium Services'
  },
  {
    id: 'custom-10',
    title: 'Complete Meghalaya Experience',
    description: 'Comprehensive Meghalaya exploration covering all major attractions',
    image: '/cards/1.jpg',
    nights: 7,
    days: 8,
    price: 27999,
    category: 'custom',
    route: 'Shillong → Cherrapunjee → Dawki → Caves'
  },
  // Group Departures (8)
  {
    id: 'group-1',
    title: 'Meghalaya Group Adventure',
    description: 'Join fellow travelers for an unforgettable Meghalaya group experience',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 16999,
    category: 'group',
    route: 'Shillong → Cherrapunjee → Living Root Bridges'
  },
  {
    id: 'group-2',
    title: 'Meghalaya Waterfall Group Tour',
    description: 'Group exploration of Meghalaya\'s stunning waterfalls and cascades',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 14999,
    category: 'group',
    route: 'Shillong → Nohkalikai → Seven Sisters Falls'
  },
  {
    id: 'group-3',
    title: 'Meghalaya Cave Group Tour',
    description: 'Group adventure through the mysterious caves of Meghalaya',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 18999,
    category: 'group',
    route: 'Shillong → Mawsmai Cave → Krem Liat Prah'
  },
  {
    id: 'group-4',
    title: 'Meghalaya Cultural Group Tour',
    description: 'Group cultural immersion in Meghalaya\'s tribal traditions',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 17999,
    category: 'group',
    route: 'Shillong → Tribal Villages → Cultural Sites'
  },
  {
    id: 'group-5',
    title: 'Meghalaya Photography Group Tour',
    description: 'Photography-focused group tour capturing Meghalaya\'s beauty',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 21999,
    category: 'group',
    route: 'Shillong → Photography Spots → Scenic Views'
  },
  {
    id: 'group-6',
    title: 'Meghalaya Dawki Group Tour',
    description: 'Group adventure exploring Dawki River and crystal clear waters',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 15999,
    category: 'group',
    route: 'Shillong → Dawki → Umngot River'
  },
  {
    id: 'group-7',
    title: 'Meghalaya Monsoon Group Tour',
    description: 'Group monsoon experience in lush green Meghalaya',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 18999,
    category: 'group',
    route: 'Shillong → Monsoon Magic → Waterfall Views'
  },
  {
    id: 'group-8',
    title: 'Meghalaya Trekking Group Tour',
    description: 'Group trekking adventure through Meghalaya\'s beautiful trails',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 20999,
    category: 'group',
    route: 'Shillong → Trekking Routes → Mountain Trails'
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

const MeghalayaAllTripsPage = () => {
  const [activeTab, setActiveTab] = useState<'custom' | 'group'>('custom');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripCard | null>(null);

  // Get current trips based on active tab
  const currentTrips = meghalayaTrips.filter(trip => trip.category === activeTab);

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
    <div className="min-h-screen bg-gray-50">
      <div className={mobileFirst.container('xl')}>
        {/* Page Header */}
        <div className="py-16 md:py-20">
          <div className="text-center mb-8 md:mb-12">
            <h1 className={cn(
              "font-bold text-gray-900 mb-4 font-heading",
              mobileFirst.text('h1')
            )}>
              All Meghalaya{' '}
              <span className="text-[#134956]">Trip Packages</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Discover all our Meghalaya adventures - from custom journeys to group departures
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
                  Custom Trip ({meghalayaTrips.filter(t => t.category === 'custom').length})
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
                  Group Departure ({meghalayaTrips.filter(t => t.category === 'group').length})
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

export default MeghalayaAllTripsPage; 