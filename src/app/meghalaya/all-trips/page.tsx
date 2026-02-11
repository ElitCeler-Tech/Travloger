import React from 'react';
import { fetchCityContent } from '@/app/lib/cityContent';
import LocationAllTripsListing, { TripCard } from '@/components/sections/LocationAllTripsListing';

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

export const dynamic = 'force-dynamic';

export default async function MeghalayaAllTripsPage() {
  const content = await fetchCityContent('meghalaya');

  return (
    <LocationAllTripsListing
      locationName="Meghalaya"
      defaultTrips={meghalayaTrips}
      content={content}
    />
  );
} 