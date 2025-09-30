import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"], // Regular, Medium, Semi Bold, Bold, Extra Bold, Black
});

export const metadata: Metadata = {
  title: "Travloger - Discover Kashmir's Hidden Gems",
  description: "Experience the breathtaking beauty of Kashmir with our expertly curated travel packages. From pristine lakes to snow-capped mountains, discover the paradise on earth.",
  keywords: ["Kashmir travel", "Kashmir tourism", "Kashmir packages", "India travel", "mountain tourism", "Dal Lake", "Srinagar", "Gulmarg"],
  authors: [{ name: "Travloger" }],
  creator: "Travloger",
  publisher: "Travloger",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Travloger - Discover Kashmir's Hidden Gems",
    description: "Experience the breathtaking beauty of Kashmir with our expertly curated travel packages.",
    url: "https://travloger.com",
    siteName: "Travloger",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travloger - Discover Kashmir's Hidden Gems",
    description: "Experience the breathtaking beauty of Kashmir with our expertly curated travel packages.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${urbanist.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
