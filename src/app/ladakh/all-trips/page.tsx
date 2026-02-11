import React from 'react';
import { fetchCityContent } from '@/app/lib/cityContent';
import LocationAllTripsListing, { TripCard } from '@/components/sections/LocationAllTripsListing';

const ladakhTrips: TripCard[] = [
  // Custom Trips (10)
  {
    id: 'custom-1',
    title: 'Ladakh Adventure Expedition',
    description: 'Experience the rugged beauty of Ladakh with high-altitude adventures',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 29999,
    category: 'custom',
    route: 'Leh → Nubra Valley → Pangong Lake',
    trending: true
  },
  {
    id: 'custom-2',
    title: 'Ladakh Cultural Heritage',
    description: 'Discover the rich Buddhist culture and ancient monasteries of Ladakh',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 24999,
    category: 'custom',
    route: 'Leh → Monasteries → Cultural Sites'
  },
  {
    id: 'custom-3',
    title: 'Ladakh Photography Tour',
    description: 'Capture the stunning landscapes and dramatic scenery of Ladakh',
    image: '/cards/3.jpg',
    nights: 7,
    days: 8,
    price: 32999,
    category: 'custom',
    route: 'Leh → Photography Spots → Scenic Views'
  },
  {
    id: 'custom-4',
    title: 'Ladakh Motorcycle Adventure',
    description: 'Ride through the challenging terrains of Ladakh on a motorcycle',
    image: '/cards/1.jpg',
    nights: 8,
    days: 9,
    price: 39999,
    category: 'custom',
    route: 'Manali → Leh → Khardungla Pass'
  },
  {
    id: 'custom-5',
    title: 'Ladakh Luxury Experience',
    description: 'Premium Ladakh tour with luxury accommodations and exclusive experiences',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 49999,
    category: 'custom',
    route: 'Leh → Luxury Stays → Premium Services'
  },
  {
    id: 'custom-6',
    title: 'Ladakh Wildlife Safari',
    description: 'Explore the unique wildlife and bird species of Ladakh',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 27999,
    category: 'custom',
    route: 'Leh → Wildlife Sanctuaries → Bird Watching'
  },
  {
    id: 'custom-7',
    title: 'Ladakh Trekking Adventure',
    description: 'Trek through the beautiful valleys and mountains of Ladakh',
    image: '/cards/1.jpg',
    nights: 7,
    days: 8,
    price: 35999,
    category: 'custom',
    route: 'Leh → Trekking Routes → Mountain Passes'
  },
  {
    id: 'custom-8',
    title: 'Ladakh Spiritual Journey',
    description: 'Meditation and spiritual retreat in the peaceful monasteries of Ladakh',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 28999,
    category: 'custom',
    route: 'Leh → Monasteries → Meditation Centers'
  },
  {
    id: 'custom-9',
    title: 'Ladakh Winter Special',
    description: 'Experience Ladakh in winter with snow-covered landscapes',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 26999,
    category: 'custom',
    route: 'Leh → Winter Activities → Snow Views'
  },
  {
    id: 'custom-10',
    title: 'Complete Ladakh Experience',
    description: 'Comprehensive Ladakh exploration covering all major attractions',
    image: '/cards/1.jpg',
    nights: 8,
    days: 9,
    price: 44999,
    category: 'custom',
    route: 'Leh → Nubra → Pangong → Monasteries'
  },
  // Group Departures (8)
  {
    id: 'group-1',
    title: 'Ladakh Group Adventure',
    description: 'Join fellow travelers for an unforgettable Ladakh group experience',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 25999,
    category: 'group',
    route: 'Leh → Nubra Valley → Pangong Lake'
  },
  {
    id: 'group-2',
    title: 'Ladakh Photography Group Tour',
    description: 'Photography-focused group tour capturing Ladakh\'s stunning landscapes',
    image: '/cards/2.jpg',
    nights: 7,
    days: 8,
    price: 28999,
    category: 'group',
    route: 'Leh → Photography Spots → Scenic Views'
  },
  {
    id: 'group-3',
    title: 'Ladakh Cultural Group Tour',
    description: 'Group cultural immersion in Ladakh\'s traditions and heritage',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 22999,
    category: 'group',
    route: 'Leh → Monasteries → Cultural Sites'
  },
  {
    id: 'group-4',
    title: 'Ladakh Motorcycle Group Tour',
    description: 'Group motorcycle adventure through Ladakh\'s challenging terrains',
    image: '/cards/1.jpg',
    nights: 8,
    days: 9,
    price: 34999,
    category: 'group',
    route: 'Manali → Leh → Khardungla Pass'
  },
  {
    id: 'group-5',
    title: 'Ladakh Trekking Group Tour',
    description: 'Group trekking adventure through Ladakh\'s beautiful valleys',
    image: '/cards/2.jpg',
    nights: 7,
    days: 8,
    price: 30999,
    category: 'group',
    route: 'Leh → Trekking Routes → Mountain Passes'
  },
  {
    id: 'group-6',
    title: 'Ladakh Winter Group Tour',
    description: 'Group winter experience in snow-covered Ladakh',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 23999,
    category: 'group',
    route: 'Leh → Winter Activities → Snow Views'
  },
  {
    id: 'group-7',
    title: 'Ladakh Spiritual Group Tour',
    description: 'Group spiritual retreat in Ladakh\'s peaceful monasteries',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 24999,
    category: 'group',
    route: 'Leh → Monasteries → Meditation Centers'
  },
  {
    id: 'group-8',
    title: 'Ladakh Wildlife Group Tour',
    description: 'Group wildlife adventure exploring Ladakh\'s unique species',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 23999,
    category: 'group',
    route: 'Leh → Wildlife Sanctuaries → Bird Watching'
  }
];

export const dynamic = 'force-dynamic';

export default async function LadakhAllTripsPage() {
  const content = await fetchCityContent('ladakh');

  return (
    <LocationAllTripsListing
      locationName="Ladakh"
      defaultTrips={ladakhTrips}
      content={content}
    />
  );
} 