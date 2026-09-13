"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/*
  Shared PWA-install state.

  One place owns the non-standard `beforeinstallprompt` event so the banner,
  the nav bar, and the footer can all trigger the same native install flow,
  read the same availability signal, and show the same manual fallback.

  Cross-browser reality:
    - Chrome / Edge / Android: fire `beforeinstallprompt`. We capture it and
      replay it from promptInstall() — a true one-tap install.
    - iOS Safari, Firefox, other browsers: no such event. Install is manual,
      and the steps differ per browser. We expose `platform` so callers can
      show the right instructions instead of a dead button.
*/

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Which manual-install instructions to show when there's no native prompt. */
export type InstallPlatform =
  | "ios-safari" // Share -> Add to Home Screen
  | "android" // browser menu -> Install app / Add to Home screen
  | "desktop" // address-bar install icon (Chromium) or menu
  | "unsupported"; // e.g. Firefox desktop — no install path

interface PwaInstallContextValue {
  /** True when the browser offered a native install prompt we can replay. */
  canInstall: boolean;
  /** True once the app is running installed (standalone). */
  isInstalled: boolean;
  /** Best guess at the platform, used to pick manual instructions. */
  platform: InstallPlatform;
  /** Replays the native prompt. Resolves to the user's outcome (or null). */
  promptInstall: () => Promise<"accepted" | "dismissed" | null>;
}

const PwaInstallContext = createContext<PwaInstallContextValue | null>(null);

function detectStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function detectPlatform(): InstallPlatform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;

  if (/iphone|ipad|ipod/i.test(ua)) return "ios-safari";
  if (/android/i.test(ua)) return "android";
  // Firefox desktop has no install path; call it out so we can hide the button.
  if (/firefox/i.test(ua) && !/mobile/i.test(ua)) return "unsupported";
  return "desktop";
}

export function PwaInstallProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<InstallPlatform>("desktop");

  useEffect(() => {
    setIsInstalled(detectStandalone());
    setPlatform(detectPlatform());

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // suppress the default mini-infobar; we drive the UI
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return null;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // A prompt can only be used once; drop it after use.
    setDeferredPrompt(null);
    return outcome;
  }, [deferredPrompt]);

  const value = useMemo<PwaInstallContextValue>(
    () => ({
      canInstall: deferredPrompt !== null && !isInstalled,
      isInstalled,
      platform,
      promptInstall,
    }),
    [deferredPrompt, isInstalled, platform, promptInstall]
  );

  return (
    <PwaInstallContext.Provider value={value}>
      {children}
    </PwaInstallContext.Provider>
  );
}

export function usePwaInstall() {
  const ctx = useContext(PwaInstallContext);
  if (!ctx) {
    throw new Error("usePwaInstall must be used within a PwaInstallProvider");
  }
  return ctx;
}
