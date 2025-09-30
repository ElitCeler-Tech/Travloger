import NextDynamic from 'next/dynamic';
import { fetchCityContent } from '@/app/lib/cityContent'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HyderabadHero from '@/components/sections/HyderabadHero';
import FloatingActionBar from '@/components/ui/FloatingActionBar';
import { ScrollProgress } from '@/components/ui/ScrollIndicators';

// Dynamically import below-the-fold components for better performance
const CompanyLogos = NextDynamic(() => import('@/components/sections/CompanyLogos'), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
});

const HyderabadTripOptions = NextDynamic(() => import('@/components/sections/HyderabadTripOptions'), {
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

const HyderabadTripHighlights = NextDynamic(() => import('@/components/sections/HyderabadTripHighlights'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const USP = NextDynamic(() => import('@/components/sections/USP'), {
  loading: () => <div className="h-96 bg-teal-50 animate-pulse" />
});

const HyderabadFAQ = NextDynamic(() => import('@/components/sections/HyderabadFAQ'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export const dynamic = 'force-dynamic'

export default async function HyderabadPage() {
  const content = await fetchCityContent('hyderabad')
  console.log('HyderabadPage - Content received:', content);
  console.log('HyderabadPage - Header content:', content?.header);
  return (
    <>
      <ScrollProgress />
      <Header content={content?.header || undefined} />
      <HyderabadHero content={content?.hero || undefined} />
      <HyderabadTripOptions content={content?.tripOptions || undefined} />
      <UnfilteredReviews content={content?.reviews || undefined} />
      <Accommodation />
      <USP content={content?.usp || undefined} />
      <HyderabadTripHighlights content={content?.tripHighlights || undefined} />
      <GroupCTA content={content?.groupCta || undefined} />
      <CompanyLogos content={content?.brands || undefined} />
      <HyderabadFAQ content={content?.faq || undefined} />
      <Footer />
      <FloatingActionBar />
    </> 
  );
}
