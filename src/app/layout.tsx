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
  title: "G sa Marikina | Local Food Directory",
  description:
    "A directory of Marikina food spots: home bakers, milk tea shops, karinderyas, and street eats.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

/*
  Build-safe Clerk key: real key from env when present (local + Vercel),
  syntactically valid dummy when absent so prerendering never crashes the build.
  Auth only works when the real key is set — this just prevents build failures.
*/
const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_ZHVtbXktYnVpbGQuY2xlcmsuYWNjb3VudHMuZGV2JA==";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{ variables: { colorPrimary: "#E8590C" } }}
    >
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
