import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manali Tour Packages - Custom & Group Tours | Travlogers',
  description: 'Explore Manali with our curated tour packages. Choose from custom trips or group departures covering adventure sports, mountain views, trekking, and cultural experiences. Book your Manali adventure today!',
  keywords: 'Manali tour packages, Solang Valley, Rohtang Pass, Manali adventure, Manali group tours, Manali custom trips, Manali travel, Manali tourism',
  openGraph: {
    title: 'Manali Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Manali with our curated tour packages. Choose from custom trips or group departures covering adventure sports, mountain views, trekking, and cultural experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manali Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Manali with our curated tour packages. Choose from custom trips or group departures covering adventure sports, mountain views, trekking, and cultural experiences.',
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
    canonical: 'https://travlogers.com/manali',
  },
};

export default function ManaliLayout({
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
