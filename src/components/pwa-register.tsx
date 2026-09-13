"use client";

import { useEffect } from "react";

/*
  Registers the service worker (public/sw.js) once the page has loaded.

  - Production: always registers.
  - Dev: off by default (a live SW caches aggressively and fights HMR).
    Set NEXT_PUBLIC_PWA_DEV=true in .env.local to opt in and test the
    real one-tap install flow locally over http://localhost.
  - Registered after `load` so it never competes with first paint.
  - Renders nothing.
*/
export function PwaRegister() {
  useEffect(() => {
    const enabled =
      process.env.NODE_ENV === "production" ||
      process.env.NEXT_PUBLIC_PWA_DEV === "true";
    if (!enabled) return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Service worker registration failed:", error);
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
