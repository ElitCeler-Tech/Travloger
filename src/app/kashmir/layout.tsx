import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kashmir Trip Packages | Travloger",
  description: "Explore Kashmir with Travloger - customized trip packages, local expertise, and hassle-free travel experiences.",
};

export default function KashmirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

