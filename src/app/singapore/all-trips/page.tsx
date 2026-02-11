import React from 'react';
import { fetchCityContent } from '@/app/lib/cityContent';
import LocationAllTripsListing, { TripCard } from '@/components/sections/LocationAllTripsListing';

const singaporeTrips: TripCard[] = [
  // Custom Trips (10)
  {
    id: 'custom-1',
    title: '5-Day Singapore Tour: Explore Universal & More',
    description: 'Experience Universal Studios thrill rides, Gardens by the Bay, Marina Bay skyline, and Sentosa attractions',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 29999,
    category: 'custom',
    route: 'Changi Airport → Universal → Sentosa → Marina Bay',
    trending: true
  },
  {
    id: 'custom-2',
    title: '6 Days Singapore Trip: Best Vacation for All Ages',
    description: 'Perfect family vacation with Night Safari adventure, Universal Studios, and Gardens by the Bay',
    image: '/cards/2.jpg',
    nights: 5,
    days: 6,
    price: 35999,
    category: 'custom',
    route: 'Changi Airport → Universal  → Night Safari → Sentosa'
  },
  {
    id: 'custom-3',
    title: '7-Day Singapore Malaysia Tour',
    description: 'Multi-country highlights featuring Universal Studios, Petronas Towers, and Batu Caves',
    image: '/cards/3.jpg',
    nights: 6,
    days: 7,
    price: 44999,
    category: 'custom',
    route: 'Kuala Lumpur → Petronas Towers → Batu Caves'
  },
  {
    id: 'custom-4',
    title: '7-Day Singapore Package with Genting Dream Cruise',
    description: 'Luxury cruise experience combined with Sentosa and Marina Bay exploration',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 54999,
    category: 'custom',
    route: 'Genting Dream Cruise → Sentosa → Marina Bay'
  },
  {
    id: 'custom-5',
    title: 'Singapore with Bintan Island – Honeymoon Tour',
    description: 'Romantic beach stay on Bintan Island with candlelight dinners and spa sessions',
    image: '/cards/2.jpg',
    nights: 7,
    days: 8,
    price: 49999,
    category: 'custom',
    route: 'Bintan Island → Marina Bay → Night Safari'
  },
  {
    id: 'custom-6',
    title: 'Cruising into Romance: Couple Special Singapore',
    description: 'Couple-exclusive itinerary with cruise under starlit sea and Gardens by the Bay',
    image: '/cards/3.jpg',
    nights: 6,
    days: 7,
    price: 47999,
    category: 'custom',
    route: 'Genting Dream Cruise → Gardens by the Bay → Night Safari'
  },
  {
    id: 'custom-7',
    title: 'Best of Singapore in 5 Days',
    description: 'All top attractions in a short span - efficient, compact sightseeing for first-timers',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 27999,
    category: 'custom',
    route: ' Universal Studios → Gardens by Bay → Sentosa'
  },
  {
    id: 'custom-8',
    title: 'Singapore with Bintan Island Discovery',
    description: 'Island hop to Bintan via ferry with Sentosa thrill and Safari nights',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 42999,
    category: 'custom',
    route: ' Bintan Island → Night Safari → Sentosa → Universal'
  },
  {
    id: 'custom-9',
    title: 'Singapore Photography Tour',
    description: 'Capture stunning cityscapes, Gardens by the Bay, and Marina Bay Sands',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 32999,
    category: 'custom',
    route: ' Marina-Bay → Gardens by Bay → Sentosa → Photo Spots'
  },
  {
    id: 'custom-10',
    title: 'Singapore Luxury Experience',
    description: 'Premium Singapore tour with luxury accommodations and exclusive experiences',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 59999,
    category: 'custom',
    route: ' Luxury Hotels → Premium Attractions → Exclusive Tours'
  },
  // Group Departures (8)
  {
    id: 'group-1',
    title: 'Singapore Group Adventure',
    description: 'Join fellow travelers for an unforgettable Singapore group experience',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 25999,
    category: 'group',
    route: ' Universal Studios → Sentosa → Marina Bay'
  },
  {
    id: 'group-2',
    title: 'Singapore Universal Studios Group Tour',
    description: 'Group exploration of Universal Studios and Sentosa Island attractions',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 22999,
    category: 'group',
    route: ' Universal Studios → Sentosa → Adventure Cove'
  },
  {
    id: 'group-3',
    title: 'Singapore Night Safari Group Tour',
    description: 'Experience Singapore\'s famous Night Safari with group adventure',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 21999,
    category: 'group',
    route: ' Night Safari → River Wonders → City Tour'
  },
  {
    id: 'group-4',
    title: 'Singapore Gardens by the Bay Group Tour',
    description: 'Group exploration of Gardens by the Bay and Singapore Flyer',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 20999,
    category: 'group',
    route: ' Gardens by the Bay → Singapore Flyer → Marina Bay'
  },
  {
    id: 'group-5',
    title: 'Singapore Sentosa Group Tour',
    description: 'Group beach vacation exploring Sentosa Island and its attractions',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 23999,
    category: 'group',
    route: ' Sentosa Island → Cable Car → Madame Tussauds'
  },
  {
    id: 'group-6',
    title: 'Singapore Cultural Group Tour',
    description: 'Group cultural immersion in Singapore\'s traditions and heritage',
    image: '/cards/3.jpg',
    nights: 5,
    days: 6,
    price: 24999,
    category: 'group',
    route: ' Chinatown → Little India → Kampong Glam → Cultural Sites'
  },
  {
    id: 'group-7',
    title: 'Singapore Shopping Group Tour',
    description: 'Group shopping adventure through Singapore\'s famous malls and markets',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 19999,
    category: 'group',
    route: ' Orchard Road → Marina Bay Sands → Bugis Street'
  },
  {
    id: 'group-8',
    title: 'Singapore Complete Group Tour',
    description: 'Comprehensive group tour covering all major Singapore attractions',
    image: '/cards/2.jpg',
    nights: 6,
    days: 7,
    price: 32999,
    category: 'group',
    route: ' Universal Studios → Sentosa → Gardens by Bay → Night Safari'
  }
];

export const dynamic = 'force-dynamic';

export default async function SingaporeAllTripsPage() {
  const content = await fetchCityContent('singapore');

  return (
    <LocationAllTripsListing
      locationName="Singapore"
      defaultTrips={singaporeTrips}
      content={content}
    />
  );
} 