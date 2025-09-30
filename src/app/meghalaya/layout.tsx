import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meghalaya Tour Packages - Custom & Group Tours | Travlogers',
  description: 'Explore Meghalaya with our curated tour packages. Choose from custom trips or group departures covering living root bridges, waterfalls, caves, and cultural experiences. Book your Meghalaya adventure today!',
  keywords: 'Meghalaya tour packages, living root bridges, Nohkalikai Falls, Dawki River, Meghalaya group tours, Meghalaya custom trips, Meghalaya travel, Meghalaya tourism, Cherrapunjee, Shillong',
  openGraph: {
    title: 'Meghalaya Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Meghalaya with our curated tour packages. Choose from custom trips or group departures covering living root bridges, waterfalls, caves, and cultural experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meghalaya Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Meghalaya with our curated tour packages. Choose from custom trips or group departures covering living root bridges, waterfalls, caves, and cultural experiences.',
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
    canonical: 'https://travlogers.com/meghalaya',
  },
};

export default function MeghalayaLayout({
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