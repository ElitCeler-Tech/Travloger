import NextDynamic from 'next/dynamic';
import { fetchCityContent } from '@/app/lib/cityContent'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ManaliHero from '@/components/sections/ManaliHero';
import FloatingActionBar from '@/components/ui/FloatingActionBar';
import { ScrollProgress } from '@/components/ui/ScrollIndicators';

// Dynamically import below-the-fold components for better performance
const CompanyLogos = NextDynamic(() => import('@/components/sections/CompanyLogos'), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
});

const ManaliTripOptions = NextDynamic(() => import('@/components/sections/ManaliTripOptions'), {
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

const ManaliTripHighlights = NextDynamic(() => import('@/components/sections/ManaliTripHighlights'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const USP = NextDynamic(() => import('@/components/sections/USP'), {
  loading: () => <div className="h-96 bg-teal-50 animate-pulse" />
});

const ManaliFAQ = NextDynamic(() => import('@/components/sections/ManaliFAQ'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export const dynamic = 'force-dynamic'

export default async function ManaliPage() {
  const content = await fetchCityContent('manali')
  console.log('ManaliPage - Content received:', content);
  console.log('ManaliPage - Header content:', content?.header);
  return (
    <>
      <ScrollProgress />
      <Header content={content?.header || undefined} />
      <ManaliHero content={content?.hero || undefined} />
      <ManaliTripOptions content={content?.tripOptions || undefined} />
      <UnfilteredReviews content={content?.reviews || undefined} />
      <Accommodation />
      <USP content={content?.usp || undefined} />
      <ManaliTripHighlights content={content?.tripHighlights || undefined} />
      <GroupCTA content={content?.groupCta || undefined} />
      <CompanyLogos content={content?.brands || undefined} />
      <ManaliFAQ content={content?.faq || undefined} />
      <Footer />
      <FloatingActionBar content={content || undefined} />
    </>
  );
}
