import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: "400",
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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#F97316",
          colorBackground: "#292524",
          colorText: "#FAFAF9",
          colorInputBackground: "#1C1917",
          colorInputText: "#FAFAF9",
        },
      }}
    >
      <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
        <body>
          <NavBar />
          <div className="min-h-screen pt-16 md:pt-20 pb-20 md:pb-0">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
