import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

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
  title: "G sa Marikina — Local Food Directory",
  description:
    "A directory of Marikina food spots: home bakers, milk tea shops, karinderyas, and street eats. Photos, menus, and directions.",
  openGraph: {
    title: "G sa Marikina — Local Food Directory",
    description:
      "A directory of Marikina food spots: home bakers, milk tea shops, karinderyas, and street eats.",
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
    <ClerkProvider>
      <html
        lang="en"
        className={`${plusJakartaSans.variable} ${inter.variable}`}
      >
        <body className="antialiased pt-20 pb-24 md:pb-0 md:pt-24">
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
