import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { PwaRegister } from "@/components/pwa-register";
import { InstallPrompt } from "@/components/install-prompt";
import { PwaInstallProvider } from "@/components/pwa-install-provider";

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

/*
  metadataBase makes relative OG/Twitter image URLs resolve to absolute ones,
  which social scrapers require. Resolution order:
    1. NEXT_PUBLIC_SITE_URL   — set this to the real domain (best).
    2. VERCEL_PROJECT_PRODUCTION_URL — auto-provided by Vercel, so previews and
       prod never fall back to localhost even if step 1 is unset.
    3. http://localhost:3000  — local dev only.
*/
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const SITE_TITLE = "G sa Marikina | Local Food Directory";
const SITE_DESCRIPTION =
  "A directory of Marikina food spots: home bakers, milk tea shops, karinderyas, and street eats.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  applicationName: "G sa Marikina",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "G sa Marikina",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "G sa Marikina",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_PH",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "G sa Marikina — local food directory for Marikina City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

// Next.js 16: themeColor / viewport live in the viewport export, not metadata.
export const viewport: Viewport = {
  themeColor: "#E8590C",
  width: "device-width",
  initialScale: 1,
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
          <PwaInstallProvider>
            <NavBar />
            <div className="pt-16 md:pt-20">
              {children}
            </div>
            <Footer />
            <ChatWidget />
            <InstallPrompt />
            <PwaRegister />
          </PwaInstallProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
