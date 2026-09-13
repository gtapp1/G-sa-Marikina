/*
  G sa Marikina — service worker (Path A, hand-written, no build step).

  Scope of offline support:
    - Installable PWA (paired with manifest.webmanifest).
    - Offline fallback: navigations while offline serve /offline.html.
    - Static brand assets (icons, offline page) are precached.

  Strategy:
    - Navigations: network-first, fall back to cache, then /offline.html.
      Keeps content fresh when online; never traps users on a stale shell.
    - Same-origin static assets: cache-first with background refresh.
    - Cross-origin (Cloudinary, map tiles, Clerk, APIs): left to the network,
      untouched. We don't cache auth or third-party responses.

  Bump CACHE_VERSION to force clients onto a new cache generation.
*/

const CACHE_VERSION = "gsm-v1";
const PRECACHE = `${CACHE_VERSION}-precache`;
const RUNTIME = `${CACHE_VERSION}-runtime`;

const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/icon.svg",
  "/icon-maskable.svg",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET; let the browser deal with POST/PUT/etc. (reviews, auth).
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never intercept cross-origin requests (Cloudinary images, OSM tiles,
  // Clerk, Supabase). Let them hit the network directly.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first with offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(RUNTIME);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(request);
          return cached || (await caches.match(OFFLINE_URL));
        }
      })()
    );
    return;
  }

  // Same-origin static assets: cache-first, refresh in the background.
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            caches.open(RUNTIME).then((cache) => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => undefined);
      return cached || (await network) || Response.error();
    })()
  );
});
