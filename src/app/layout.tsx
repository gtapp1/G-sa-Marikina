import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "G sa Marikina — Discover Local Food",
  description:
    "Discover the best food spots in Marikina City. From home-baked cookies to hidden street food gems. Reviews, photos, and directions.",
  openGraph: {
    title: "G sa Marikina — Discover Local Food",
    description:
      "Discover the best food spots in Marikina City. Reviews, photos, and directions for every local food business.",
    siteName: "G sa Marikina",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="antialiased pb-[56px] md:pb-0">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
