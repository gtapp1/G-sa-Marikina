import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

/* DM Sans — geometric bold sans, similar weight/feel to Beatrice */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "700"],
});

const dmSansBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "G sa Marikina — Local Food Directory",
  description:
    "A directory of Marikina food spots: home bakers, milk tea shops, karinderyas, and street eats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#F97316" } }}>
      <html lang="en" className={`${dmSans.variable} ${dmSansBody.variable}`}>
        <body>
          <NavBar />
          <div className="pt-14 md:pt-[60px] pb-14 md:pb-0">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
