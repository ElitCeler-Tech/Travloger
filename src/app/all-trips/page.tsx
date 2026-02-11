import React from 'react';
import { fetchCityContent } from '@/app/lib/cityContent';
import LocationAllTripsListing, { TripCard } from '@/components/sections/LocationAllTripsListing';

const kashmirTrips: TripCard[] = [
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
    trending: true
  },
  {
    id: 'custom-2',
    title: 'Golden Meadows Experience',
    description: 'Experience golden meadows and snow-capped peaks',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 22999,
    category: 'custom',
    route: 'Srinagar → Sonamarg → Gulmarg'
  },
  {
    id: 'custom-3',
    title: 'Valley Paradise Circuit',
    description: 'Discover pristine beauty of Kashmir valleys',
    image: '/cards/3.jpg',
    nights: 3,
    days: 4,
    price: 16999,
    category: 'custom',
    route: 'Srinagar → Pahalgam → Betaab'
  },
  {
    id: 'custom-4',
    title: 'Complete Kashmir Adventure',
    description: 'A comprehensive Kashmir exploration experience',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'custom',
    route: 'Srinagar → Gulmarg → Pahalgam'
  },
  {
    id: 'custom-5',
    title: 'Kashmir Photography Tour',
    description: 'Capture the stunning landscapes and vibrant culture of Kashmir',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 23999,
    category: 'custom',
    route: 'Srinagar → Photography Spots → Scenic Views'
  },
  {
    id: 'custom-6',
    title: 'Kashmir Luxury Experience',
    description: 'Premium Kashmir tour with luxury accommodations and exclusive experiences',
    image: '/cards/3.jpg',
    nights: 6,
    days: 7,
    price: 39999,
    category: 'custom',
    route: 'Srinagar → Luxury Houseboats → Premium Stays'
  },
  {
    id: 'custom-7',
    title: 'Kashmir Cultural Heritage',
    description: 'Immerse yourself in Kashmir\'s rich cultural traditions and historical sites',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 24999,
    category: 'custom',
    route: 'Srinagar → Cultural Sites → Traditional Arts'
  },
  {
    id: 'custom-8',
    title: 'Kashmir Winter Special',
    description: 'Experience Kashmir in winter with snow-covered landscapes',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 26999,
    category: 'custom',
    route: 'Srinagar → Winter Activities → Snow Views'
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
    route: 'Srinagar → Gulmarg → Pahalgam'
  },
  {
    id: 'group-2',
    title: 'High Altitude Expedition',
    description: 'Join our group expedition to high-altitude Kashmir',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 25999,
    category: 'group',
    route: 'Srinagar → Sonamarg → Leh'
  },
  {
    id: 'group-3',
    title: 'Winter Special Group Tour',
    description: 'Experience Kashmir in winter with fellow travelers',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 19999,
    category: 'group',
    route: 'Srinagar → Gulmarg → Pahalgam'
  },
  {
    id: 'group-4',
    title: 'Adventure Group Experience',
    description: 'Adventure activities with a group in Kashmir',
    image: '/cards/1.jpg',
    nights: 7,
    days: 8,
    price: 29999,
    category: 'group',
    route: 'Srinagar → Gulmarg → Pahalgam'
  },
  {
    id: 'group-5',
    title: 'Kashmir Photography Group Tour',
    description: 'Photography-focused group tour capturing Kashmir\'s stunning landscapes',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 22999,
    category: 'group',
    route: 'Srinagar → Photography Spots → Scenic Views'
  },
  {
    id: 'group-6',
    title: 'Kashmir Cultural Group Tour',
    description: 'Group cultural immersion in Kashmir\'s traditions and heritage',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 19999,
    category: 'group',
    route: 'Srinagar → Cultural Sites → Traditional Arts'
  }
];

export const dynamic = 'force-dynamic';

export default async function KashmirAllTripsPage() {
  const content = await fetchCityContent('kashmir');

  return (
    <LocationAllTripsListing
      locationName="Kashmir"
      defaultTrips={kashmirTrips}
      content={content}
    />
  );
} 