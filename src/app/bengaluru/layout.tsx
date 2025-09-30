import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bengaluru Tour Packages - Custom & Group Tours | Travlogers',
  description: 'Explore Bengaluru with our curated tour packages. Choose from custom trips or group departures covering gardens, tech parks, cultural sites, and heritage experiences. Book your Bengaluru adventure today!',
  keywords: 'Bengaluru tour packages, Lalbagh, Cubbon Park, Bengaluru gardens, Bengaluru group tours, Bengaluru custom trips, Bengaluru travel, Bengaluru tourism',
  openGraph: {
    title: 'Bengaluru Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Bengaluru with our curated tour packages. Choose from custom trips or group departures covering gardens, tech parks, cultural sites, and heritage experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bengaluru Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Bengaluru with our curated tour packages. Choose from custom trips or group departures covering gardens, tech parks, cultural sites, and heritage experiences.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://travlogers.com/bengaluru',
  },
};

export default function BengaluruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
