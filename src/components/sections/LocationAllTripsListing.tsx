'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ItineraryModal from '@/components/ui/ItineraryModal';
import { Button } from '@/components/ui/Button';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import FloatingActionBar from '@/components/ui/FloatingActionBar';

export interface TripCard {
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
    features?: {
        name: string;
        icon?: 'default' | 'flights' | 'bus' | 'train';
        included: boolean;
    }[];
    detailedItinerary?: {
        subtitle: string;
        headerImage?: string;
        briefItinerary: Array<{
            day: number;
            title: string;
            description: string;
        }>;
        keyAttractions: string[];
        inclusions: string[];
    };
}

export interface CityContent {
    tripOptions?: {
        customTrips?: TripCard[];
        groupTrips?: TripCard[];
    };
}

export interface LocationAllTripsListingProps {
    locationName: string;
    defaultTrips: TripCard[];
    content?: CityContent | null;
}

// Clean Card Container replacing the old stamp border
const StampBorder = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div
        className={cn(
            'relative w-full h-full min-h-[400px] bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-100',
            'transition-all duration-300 hover:shadow-[0_14px_35px_rgba(0,0,0,0.12)]',
            className
        )}
    >
        <div className="relative z-10 p-6 sm:p-6 md:p-7 lg:p-8 h-full w-full">
            {children}
        </div>
    </div>
);

const LocationAllTripsListing = ({ locationName, defaultTrips, content }: LocationAllTripsListingProps) => {
    const [activeTab, setActiveTab] = useState<'custom' | 'group'>('custom');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<TripCard | null>(null);

    // Merge logic: If CMS has trips for a category, use ONLY those. Otherwise fallback to defaults.
    const customTrips = React.useMemo(() => {
        if (content?.tripOptions?.customTrips && content.tripOptions.customTrips.length > 0) {
            return content.tripOptions.customTrips;
        }
        return defaultTrips.filter(t => t.category === 'custom');
    }, [content, defaultTrips]);

    const groupTrips = React.useMemo(() => {
        if (content?.tripOptions?.groupTrips && content.tripOptions.groupTrips.length > 0) {
            return content.tripOptions.groupTrips;
        }
        return defaultTrips.filter(t => t.category === 'group');
    }, [content, defaultTrips]);

    const currentTrips = activeTab === 'custom' ? customTrips : groupTrips;

    // Handle tab switch
    const handleTabSwitch = (tab: 'custom' | 'group') => {
        setActiveTab(tab);
    };

    // Modern Trip Card Component with Stamp Border
    const TripCardComponent = ({ trip }: { trip: TripCard }) => (
        <StampBorder
            className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
        >
            <motion.div
                className="relative h-full flex flex-col"
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
                            </span>
                        ))}
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between ml-2 mt-auto pt-4">
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
                            All {locationName}{' '}
                            <span className="text-[#134956]">Trip Packages</span>
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            Discover all our {locationName} adventures - from custom journeys to group departures
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
                                    Custom Trip ({customTrips.length})
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
                                    Group Departure ({groupTrips.length})
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
                                {currentTrips.map((trip: TripCard) => (
                                    <TripCardComponent key={trip.id} trip={trip} />
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

export default LocationAllTripsListing;
