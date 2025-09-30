import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mysore Tour Packages - Custom & Group Tours | Travlogers',
  description: 'Explore Mysore with our curated tour packages. Choose from custom trips or group departures covering palaces, hill stations, coffee estates, and cultural experiences. Book your Mysore adventure today!',
  keywords: 'Mysore tour packages, Mysore Palace, Coorg coffee estates, Wayanad forests, Ooty hill station, Mysore group tours, Mysore custom trips, Mysore travel, Mysore tourism',
  openGraph: {
    title: 'Mysore Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Mysore with our curated tour packages. Choose from custom trips or group departures covering palaces, hill stations, coffee estates, and cultural experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mysore Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Mysore with our curated tour packages. Choose from custom trips or group departures covering palaces, hill stations, coffee estates, and cultural experiences.',
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
    canonical: 'https://travlogers.com/mysore',
  },
};

export default function MysoreLayout({
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