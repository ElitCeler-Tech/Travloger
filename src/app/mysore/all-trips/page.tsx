import React from 'react';
import { fetchCityContent } from '@/app/lib/cityContent';
import LocationAllTripsListing, { TripCard } from '@/components/sections/LocationAllTripsListing';

const mysoreTrips: TripCard[] = [
  // Custom Trips (10)
  {
    id: 'custom-1',
    title: 'Mysore Palace Heritage',
    description: 'Explore the magnificent Mysore Palace and royal heritage of the city',
    image: '/cards/1.jpg',
    nights: 3,
    days: 4,
    price: 12999,
    category: 'custom',
    route: 'Mysore → Palace → Heritage Sites',
    trending: true
  },
  {
    id: 'custom-2',
    title: 'Mysore Coorg Coffee Trail',
    description: 'Discover the aromatic coffee estates and plantations of Coorg',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 16999,
    category: 'custom',
    route: 'Mysore → Coorg → Coffee Estates'
  },
  {
    id: 'custom-3',
    title: 'Mysore Ooty Hill Station',
    description: 'Experience the cool climate and scenic beauty of Ooty hills',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 17999,
    category: 'custom',
    route: 'Mysore → Ooty → Nilgiri Hills'
  },
  {
    id: 'custom-4',
    title: 'Mysore Wayanad Adventure',
    description: 'Adventure through the lush forests and wildlife of Wayanad',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 19999,
    category: 'custom',
    route: 'Mysore → Wayanad → Wildlife Sanctuaries'
  },
  {
    id: 'custom-5',
    title: 'Mysore Cultural Experience',
    description: 'Immerse yourself in the rich culture and traditions of Mysore',
    image: '/cards/2.jpg',
    nights: 3,
    days: 4,
    price: 14999,
    category: 'custom',
    route: 'Mysore → Cultural Sites → Traditional Arts'
  },
  {
    id: 'custom-6',
    title: 'Mysore Photography Tour',
    description: 'Capture the architectural beauty and landscapes of Mysore region',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'custom',
    route: 'Mysore → Photography Spots → Scenic Views'
  },
  {
    id: 'custom-7',
    title: 'Mysore Luxury Palace Tour',
    description: 'Premium Mysore experience with luxury accommodations and royal treatment',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 24999,
    category: 'custom',
    route: 'Mysore → Luxury Stays → Premium Services'
  },
  {
    id: 'custom-8',
    title: 'Mysore Wildlife Safari',
    description: 'Explore the diverse wildlife and national parks around Mysore',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 18999,
    category: 'custom',
    route: 'Mysore → Wildlife Parks → Safari Experience'
  },
  {
    id: 'custom-9',
    title: 'Mysore Temple Trail',
    description: 'Visit the ancient temples and spiritual sites of Mysore region',
    image: '/cards/3.jpg',
    nights: 3,
    days: 4,
    price: 15999,
    category: 'custom',
    route: 'Mysore → Temples → Spiritual Sites'
  },
  {
    id: 'custom-10',
    title: 'Complete Mysore Experience',
    description: 'Comprehensive Mysore exploration covering palaces, hills, and culture',
    image: '/cards/1.jpg',
    nights: 6,
    days: 7,
    price: 22999,
    category: 'custom',
    route: 'Mysore → Coorg → Ooty → Heritage Sites'
  },
  // Group Departures (8)
  {
    id: 'group-1',
    title: 'Mysore Group Heritage Tour',
    description: 'Join fellow travelers for an unforgettable Mysore heritage experience',
    image: '/cards/1.jpg',
    nights: 3,
    days: 4,
    price: 11999,
    category: 'group',
    route: 'Mysore → Palace → Heritage Sites'
  },
  {
    id: 'group-2',
    title: 'Mysore Coorg Group Tour',
    description: 'Group exploration of Coorg\'s coffee estates and plantations',
    image: '/cards/2.jpg',
    nights: 4,
    days: 5,
    price: 15999,
    category: 'group',
    route: 'Mysore → Coorg → Coffee Estates'
  },
  {
    id: 'group-3',
    title: 'Mysore Ooty Group Tour',
    description: 'Group hill station experience in the beautiful Ooty',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 16999,
    category: 'group',
    route: 'Mysore → Ooty → Nilgiri Hills'
  },
  {
    id: 'group-4',
    title: 'Mysore Wayanad Group Adventure',
    description: 'Group adventure through the forests and wildlife of Wayanad',
    image: '/cards/1.jpg',
    nights: 5,
    days: 6,
    price: 18999,
    category: 'group',
    route: 'Mysore → Wayanad → Wildlife Sanctuaries'
  },
  {
    id: 'group-5',
    title: 'Mysore Cultural Group Tour',
    description: 'Group cultural immersion in Mysore\'s traditions and heritage',
    image: '/cards/2.jpg',
    nights: 3,
    days: 4,
    price: 13999,
    category: 'group',
    route: 'Mysore → Cultural Sites → Traditional Arts'
  },
  {
    id: 'group-6',
    title: 'Mysore Photography Group Tour',
    description: 'Photography-focused group tour capturing Mysore\'s beauty',
    image: '/cards/3.jpg',
    nights: 4,
    days: 5,
    price: 17999,
    category: 'group',
    route: 'Mysore → Photography Spots → Scenic Views'
  },
  {
    id: 'group-7',
    title: 'Mysore Wildlife Group Tour',
    description: 'Group wildlife adventure exploring Mysore\'s national parks',
    image: '/cards/1.jpg',
    nights: 4,
    days: 5,
    price: 17999,
    category: 'group',
    route: 'Mysore → Wildlife Parks → Safari Experience'
  },
  {
    id: 'group-8',
    title: 'Mysore Temple Group Tour',
    description: 'Group spiritual journey through Mysore\'s ancient temples',
    image: '/cards/2.jpg',
    nights: 3,
    days: 4,
    price: 14999,
    category: 'group',
    route: 'Mysore → Temples → Spiritual Sites'
  }
];

export const dynamic = 'force-dynamic';

export default async function MysoreAllTripsPage() {
  const content = await fetchCityContent('mysore');

  return (
    <LocationAllTripsListing
      locationName="Mysore"
      defaultTrips={mysoreTrips}
      content={content}
    />
  );
} 