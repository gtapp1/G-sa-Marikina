import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

/*
  Sora — geometric, tightly-spaced bold sans. Closest free match to Beatrice
  (Sharp Type). Same low-contrast, geometric construction, tight metrics.
*/
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const soraBody = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "G sa Marikina — Local Food Directory",
  description:
    "A directory of Marikina food spots: home bakers, milk tea shops, karinderyas, and street eats.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#E8590C" } }}>
      <html lang="en" className={`${sora.variable} ${soraBody.variable}`}>
        <body>
          <NavBar />
          <div className="pt-16 md:pt-20">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
