import React from 'react';
import { fetchCityContent } from '@/app/lib/cityContent';
import LocationAllTripsListing, { TripCard } from '@/components/sections/LocationAllTripsListing';

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

export const dynamic = 'force-dynamic';

export default async function GokarnaAllTripsPage() {
  const content = await fetchCityContent('gokarna');

  return (
    <LocationAllTripsListing
      locationName="Gokarna"
      defaultTrips={gokarnaTrips}
      content={content}
    />
  );
} 