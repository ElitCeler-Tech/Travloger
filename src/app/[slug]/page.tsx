import NextDynamic from 'next/dynamic';
import { fetchCityContent } from '@/app/lib/cityContent';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import FloatingActionBar from '@/components/ui/FloatingActionBar';
import { ScrollProgress } from '@/components/ui/ScrollIndicators';
import { notFound } from 'next/navigation';

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

export const dynamic = 'force-dynamic';

// Hardcoded city routes take priority in Next.js, so this only catches new/unknown slugs
const KNOWN_CITIES = ['kashmir', 'ladakh', 'gokarna', 'kerala', 'meghalaya', 'mysore', 'singapore', 'hyderabad', 'bengaluru', 'manali'];

export default async function DynamicCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Skip known cities (they have their own routes with city-specific components)
  if (KNOWN_CITIES.includes(slug)) {
    notFound();
  }

  const content = await fetchCityContent(slug);

  // If no content exists for this slug, show 404
  if (!content || (!content.hero && !content.header && !content.tripOptions)) {
    notFound();
  }

  return (
    <>
      <ScrollProgress />
      <Header content={content?.header || undefined} />
      <Hero content={content?.hero || undefined} />
      <TripOptions content={content?.tripOptions ? { ...content.tripOptions, highlightText: content.tripOptions.highlightText || content.hero?.highlightText } : undefined} />
      <UnfilteredReviews content={content?.reviews || undefined} />
      <Accommodation content={content?.accommodation || undefined} />
      <USP content={content?.usp || undefined} />
      <TripHighlights content={content?.tripHighlights || undefined} />
      <GroupCTA content={content?.groupCta || undefined} />
      <CompanyLogos content={content?.brands || undefined} />
      <FAQ content={content?.faq || undefined} />
      <Footer />
      <FloatingActionBar content={content || undefined} />
    </>
  );
}
