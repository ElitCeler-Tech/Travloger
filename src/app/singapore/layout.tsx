import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Singapore Tour Packages - Custom & Group Tours | Travlogers',
  description: 'Explore Singapore with our curated tour packages. Choose from custom trips or group departures covering Universal Studios, Marina Bay Sands, Sentosa Island, and more. Book your Singapore adventure today!',
  keywords: 'Singapore tour packages, Universal Studios Singapore, Marina Bay Sands, Sentosa Island, Singapore group tours, Singapore custom trips, Singapore travel, Singapore tourism',
  openGraph: {
    title: 'Singapore Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Singapore with our curated tour packages. Choose from custom trips or group departures covering Universal Studios, Marina Bay Sands, Sentosa Island, and more.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singapore Tour Packages - Custom & Group Tours | Travlogers',
    description: 'Explore Singapore with our curated tour packages. Choose from custom trips or group departures covering Universal Studios, Marina Bay Sands, Sentosa Island, and more.',
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
    canonical: 'https://travlogers.com/singapore',
  },
};

export default function SingaporeLayout({
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