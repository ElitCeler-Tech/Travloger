import NextDynamic from 'next/dynamic';
import { fetchCityContent } from '@/app/lib/cityContent'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MysoreHero from '@/components/sections/MysoreHero';
import FloatingActionBar from '@/components/ui/FloatingActionBar';
import { ScrollProgress } from '@/components/ui/ScrollIndicators';

// Dynamically import below-the-fold components for better performance
const CompanyLogos = NextDynamic(() => import('@/components/sections/CompanyLogos'), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
});

const MysoreTripOptions = NextDynamic(() => import('@/components/sections/MysoreTripOptions'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const UnfilteredReviews = NextDynamic(() => import('@/components/sections/UnfilteredReviews'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const GroupCTA = NextDynamic(() => import('@/components/sections/GroupCTA'), {
  loading: () => <div className="h-96 bg-orange-400 animate-pulse" />
});

const Accommodation = NextDynamic(() => import('@/components/sections/Accommodation'), {
  loading: () => <div className="h-screen bg-gray-50 animate-pulse" />
});

const MysoreTripHighlights = NextDynamic(() => import('@/components/sections/MysoreTripHighlights'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const USP = NextDynamic(() => import('@/components/sections/USP'), {
  loading: () => <div className="h-96 bg-teal-50 animate-pulse" />
});

const MysoreFAQ = NextDynamic(() => import('@/components/sections/MysoreFAQ'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export const dynamic = 'force-dynamic'

export default async function MysorePage() {
  const content = await fetchCityContent('mysore')
  return (
    <>
      <ScrollProgress />
      <Header content={content?.header || undefined} />
      <MysoreHero content={content?.hero || undefined} />
      <MysoreTripOptions content={content?.tripOptions ? { ...content.tripOptions, highlightText: content.tripOptions.highlightText || content.hero?.highlightText } : undefined} />
      <UnfilteredReviews content={content?.reviews || undefined} />
      <Accommodation />
      <USP content={content?.usp || undefined} />
      <MysoreTripHighlights content={content?.tripHighlights || undefined} />
      <GroupCTA content={content?.groupCta || undefined} />
      <CompanyLogos content={content?.brands || undefined} />
      <MysoreFAQ content={content?.faq || undefined} />
      <Footer content={content?.contact ? { socialLinks: { twitter: content.contact.twitterUrl, facebook: content.contact.facebookUrl, instagram: content.contact.instagramUrl, youtube: content.contact.youtubeUrl }, contactPhone: content.contact.phone, contactEmail: content.contact.email, contactAddress: content.contact.address, footerLocations: content.contact.footerLocations } : undefined} />
      <FloatingActionBar content={content || undefined} />
    </>
  );
} 