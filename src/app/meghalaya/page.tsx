import NextDynamic from 'next/dynamic';
import { fetchCityContent } from '@/app/lib/cityContent'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MeghalayaHero from '@/components/sections/MeghalayaHero';
import FloatingActionBar from '@/components/ui/FloatingActionBar';
import { ScrollProgress } from '@/components/ui/ScrollIndicators';

// Dynamically import below-the-fold components for better performance
const CompanyLogos = NextDynamic(() => import('@/components/sections/CompanyLogos'), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
});

const MeghalayaTripOptions = NextDynamic(() => import('@/components/sections/MeghalayaTripOptions'), {
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

const MeghalayaTripHighlights = NextDynamic(() => import('@/components/sections/MeghalayaTripHighlights'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const USP = NextDynamic(() => import('@/components/sections/USP'), {
  loading: () => <div className="h-96 bg-teal-50 animate-pulse" />
});

const MeghalayaFAQ = NextDynamic(() => import('@/components/sections/MeghalayaFAQ'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export const dynamic = 'force-dynamic'

export default async function MeghalayaPage() {
  const content = await fetchCityContent('meghalaya')
  return (
    <>
      <ScrollProgress />
      <Header content={content?.header || undefined} />
      <MeghalayaHero content={content?.hero || undefined} />
      <MeghalayaTripOptions content={content?.tripOptions || undefined} />
      <UnfilteredReviews content={content?.reviews || undefined} />
      <Accommodation />
      <USP content={content?.usp || undefined} />
      <MeghalayaTripHighlights content={content?.tripHighlights || undefined} />
      <GroupCTA content={content?.groupCta || undefined} />
      <CompanyLogos content={content?.brands || undefined} />
      <MeghalayaFAQ content={content?.faq || undefined} />
      <Footer />
      <FloatingActionBar />
    </> 
  );
} 