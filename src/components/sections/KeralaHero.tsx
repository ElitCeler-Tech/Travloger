'use client';

import React from 'react';
import Hero from './Hero';

interface HeroContent {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string;
  mobileBackgroundImageUrl?: string;
  mobileVideoUrl?: string;
  desktopVideoUrl?: string;
  ctaText?: string;
  ctaSecondaryText?: string;
  whatsappPhone?: string;
  whatsappMessage?: string;
  trustIndicators?: {
    google: { rating: string; label: string };
    payLater: { rating: string; label: string };
    instagram: { rating: string; label: string; url?: string };
  };
}

const defaultKeralaContent: HeroContent = {
  title: "Two Ways To Explore Kerala",
  subtitle: "One Story to Remember.",
  backgroundImageUrl: '/hero-bg.png',
  whatsappPhone: '+919876543210',
  whatsappMessage: 'Hi! I am interested in Kerala tour packages. Can you help me plan my trip?',
  ctaText: 'Plan on WhatsApp',
  ctaSecondaryText: 'Get My Itinerary',
  trustIndicators: {
    google: { rating: '4.9', label: 'Ratings' },
    payLater: { rating: 'Pay Later', label: 'Flexible' },
    instagram: { rating: '5K+', label: 'Followers' }
  }
};

const KeralaHero = React.memo(({ content }: { content?: HeroContent }) => {
  return <Hero content={content} defaultContent={defaultKeralaContent} />;
});

KeralaHero.displayName = 'KeralaHero';

export default KeralaHero;