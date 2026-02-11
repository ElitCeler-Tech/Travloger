import React from 'react';
import { fetchCityContent } from '@/app/lib/cityContent';
import LocationAllTripsListing, { TripCard } from '@/components/sections/LocationAllTripsListing';

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
    trending: true
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

export const dynamic = 'force-dynamic';

export default async function KeralaAllTripsPage() {
  const content = await fetchCityContent('kerala');

  return (
    <LocationAllTripsListing
      locationName="Kerala"
      defaultTrips={keralaTrips}
      content={content}
    />
  );
} 