import NextDynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import FloatingActionBar from '@/components/ui/FloatingActionBar';
import { ScrollProgress } from '@/components/ui/ScrollIndicators';
import { fetchCityContent } from '@/app/lib/cityContent'

// Dynamically import below-the-fold components for better performance
const CompanyLogos = NextDynamic(() => import('@/components/sections/CompanyLogos'), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
});

const TripOptions = NextDynamic(() => import('@/components/sections/TripOptions'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const UnfilteredReviews = NextDynamic(() => import('@/components/sections/UnfilteredReviews'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const GroupCTA = NextDynamic(() => import('@/components/sections/GroupCTA'), {
  loading: () => <div className="h-96 bg-orange-400 animate-pulse" />
});

// const Features = NextDynamic(() => import('@/components/sections/Features'), {
//   loading: () => <div className="h-80 bg-white animate-pulse" />
// });

const Accommodation = NextDynamic(() => import('@/components/sections/Accommodation'), {
  loading: () => <div className="h-screen bg-gray-50 animate-pulse" />
});

const TripHighlights = NextDynamic(() => import('@/components/sections/TripHighlights'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const USP = NextDynamic(() => import('@/components/sections/USP'), {
  loading: () => <div className="h-96 bg-teal-50 animate-pulse" />
});

const FAQ = NextDynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export const dynamic = 'force-dynamic'

export default async function KashmirPage() {
  const content = await fetchCityContent('kashmir')
  return (
    <>
      <ScrollProgress />
      <Header content={content?.header || undefined} />
      <Hero content={content?.hero || undefined} />
      <TripOptions content={content?.tripOptions || undefined} />
      <UnfilteredReviews content={content?.reviews || undefined} />
      <Accommodation />
      <USP content={content?.usp || undefined} />
      <TripHighlights content={content?.tripHighlights || undefined} />
      <GroupCTA content={content?.groupCta || undefined} />
      <CompanyLogos content={content?.brands || undefined} />
      <FAQ content={content?.faq || undefined} />
      <Footer />
      <FloatingActionBar />
    </> 
  );
}
