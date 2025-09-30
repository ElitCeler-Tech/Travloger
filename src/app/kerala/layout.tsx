import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kerala Tour Packages - Custom & Group Tours | Travlogers',
  description: 'Explore Kerala with our curated tour packages. Choose from custom trips or group departures covering backwaters, tea gardens, beaches, and cultural experiences. Book your Kerala adventure today!',
  keywords: 'Kerala tour packages, Kerala backwaters, Munnar tea gardens, Kerala houseboat, Kerala group tours, Kerala custom trips, Kerala travel, Kerala tourism',
  openGraph: {
    title: 'Kerala Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Kerala with our curated tour packages. Choose from custom trips or group departures covering backwaters, tea gardens, beaches, and cultural experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Kerala with our curated tour packages. Choose from custom trips or group departures covering backwaters, tea gardens, beaches, and cultural experiences.',
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
    canonical: 'https://travlogers.com/kerala',
  },
};

export default function KeralaLayout({
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