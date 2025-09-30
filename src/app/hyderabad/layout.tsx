import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hyderabad Tour Packages - Custom & Group Tours | Travlogers',
  description: 'Explore Hyderabad with our curated tour packages. Choose from custom trips or group departures covering heritage sites, food tours, tech parks, and cultural experiences. Book your Hyderabad adventure today!',
  keywords: 'Hyderabad tour packages, Charminar, Golconda Fort, Hyderabad heritage, Hyderabad group tours, Hyderabad custom trips, Hyderabad travel, Hyderabad tourism',
  openGraph: {
    title: 'Hyderabad Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Hyderabad with our curated tour packages. Choose from custom trips or group departures covering heritage sites, food tours, tech parks, and cultural experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyderabad Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Hyderabad with our curated tour packages. Choose from custom trips or group departures covering heritage sites, food tours, tech parks, and cultural experiences.',
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
    canonical: 'https://travlogers.com/hyderabad',
  },
};

export default function HyderabadLayout({
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
