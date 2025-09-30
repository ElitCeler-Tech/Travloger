import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gokarna Tour Packages - Custom & Group Tours | Travlogers',
  description: 'Explore Gokarna with our curated tour packages. Choose from custom trips or group departures covering beaches, temples, adventure activities, and spiritual experiences. Book your Gokarna adventure today!',
  keywords: 'Gokarna tour packages, Gokarna beaches, Om Beach, Mahabaleshwar Temple, Yana Caves, Dandeli adventure, Gokarna group tours, Gokarna custom trips, Gokarna travel, Gokarna tourism',
  openGraph: {
    title: 'Gokarna Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Gokarna with our curated tour packages. Choose from custom trips or group departures covering beaches, temples, adventure activities, and spiritual experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gokarna Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Gokarna with our curated tour packages. Choose from custom trips or group departures covering beaches, temples, adventure activities, and spiritual experiences.',
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
    canonical: 'https://travlogers.com/gokarna',
  },
};

export default function GokarnaLayout({
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