import NextDynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import { fetchCityContent } from '@/app/lib/cityContent'
import Footer from '@/components/layout/Footer';
import LadakhHero from '@/components/sections/LadakhHero';
import FloatingActionBar from '@/components/ui/FloatingActionBar';
import { ScrollProgress } from '@/components/ui/ScrollIndicators';

// Dynamically import below-the-fold components for better performance
const CompanyLogos = NextDynamic(() => import('@/components/sections/CompanyLogos'), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
});

const LadakhTripOptions = NextDynamic(() => import('@/components/sections/LadakhTripOptions'), {
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

const LadakhTripHighlights = NextDynamic(() => import('@/components/sections/LadakhTripHighlights'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const USP = NextDynamic(() => import('@/components/sections/USP'), {
  loading: () => <div className="h-96 bg-teal-50 animate-pulse" />
});

const LadakhFAQ = NextDynamic(() => import('@/components/sections/LadakhFAQ'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export const dynamic = 'force-dynamic'

export default async function LadakhPage() {
  const content = await fetchCityContent('ladakh')
  return (
    <>
      <ScrollProgress />
      <Header content={content?.header || undefined} />
      <LadakhHero content={content?.hero || undefined} />
      <LadakhTripOptions content={content?.tripOptions || undefined} />
      <UnfilteredReviews content={content?.reviews || undefined} />
      <Accommodation />
      <USP content={content?.usp || undefined} />
      <LadakhTripHighlights content={content?.tripHighlights || undefined} />
      <GroupCTA content={content?.groupCta || undefined} />
      <CompanyLogos content={content?.brands || undefined} />
      <LadakhFAQ content={content?.faq || undefined} />
      <Footer />
      <FloatingActionBar />
    </> 
  );
}