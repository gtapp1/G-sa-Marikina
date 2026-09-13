import type { MetadataRoute } from "next";

/*
  Web App Manifest — Next.js native convention.
  Served at /manifest.webmanifest with correct headers, no plugin needed.

  Icons: raster PNGs (192/512 + maskable) drive Chromium install eligibility
  and the installed icon; an SVG is kept for browsers that prefer it.
  Regenerate the PNGs from the SVGs with: npm run icons
*/
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "G sa Marikina — Local Food Directory",
    short_name: "G sa Marikina",
    description:
      "Discover Marikina food spots: home bakers, milk tea shops, karinderyas, and street eats.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFFBF5",
    theme_color: "#E8590C",
    categories: ["food", "lifestyle", "shopping"],
    lang: "en",
    dir: "ltr",
    // Lets getInstalledRelatedApps() recognize THIS PWA as installed, so the
    // "Install app" trigger can hide even in a regular browser tab (Chromium).
    prefer_related_applications: false,
    related_applications: [
      {
        platform: "webapp",
        url: "/manifest.webmanifest",
      },
    ],
    icons: [
      // Raster PNGs first: Chromium uses these for install eligibility and
      // the installed app/home-screen icon.
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      // Scalable SVG for browsers that prefer it.
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
