import type { Metadata } from 'next';
import { fetchCityContent } from '@/app/lib/cityContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const content = await fetchCityContent(slug);
  const title = content?.hero?.title || `Travloger - Discover ${name}`;
  const description = content?.hero?.subtitle || `Explore ${name} with expertly curated travel packages from Travloger.`;

  return {
    title,
    description,
    openGraph: { title, description, url: `https://campaign.travloger.in/${slug}`, siteName: 'Travloger', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
