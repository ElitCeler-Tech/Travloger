import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travloger - Discover Ladakh's Mystical Beauty",
  description: "Experience the breathtaking beauty of Ladakh with our expertly curated travel packages. From snow-capped mountains to ancient monasteries, discover the land of high passes.",
  keywords: ["Ladakh travel", "Ladakh tourism", "Ladakh packages", "India travel", "mountain tourism", "Pangong Lake", "Leh", "Khardungla Pass", "Nubra Valley"],
  authors: [{ name: "Travloger" }],
  creator: "Travloger",
  publisher: "Travloger",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Travloger - Discover Ladakh's Mystical Beauty",
    description: "Experience the breathtaking beauty of Ladakh with our expertly curated travel packages.",
    url: "https://travloger.com/ladakh",
    siteName: "Travloger",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travloger - Discover Ladakh's Mystical Beauty",
    description: "Experience the breathtaking beauty of Ladakh with our expertly curated travel packages.",
    creator: "@travloger",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LadakhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}