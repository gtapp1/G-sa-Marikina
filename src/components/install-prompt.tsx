"use client";

import { useEffect, useState } from "react";
import { DownloadSimple, X } from "@phosphor-icons/react";
import { usePwaInstall } from "./pwa-install-provider";
import { InstallInstructions } from "./install-button";

/*
  Auto-surfacing install banner, styled to the Warm Market system.

  Install detection is owned by PwaInstallProvider — this component only
  decides whether to show the banner and remembers dismissal so it doesn't nag.

  When a native prompt is available (Chromium) it offers a one-tap Install.
  Otherwise it shows the correct manual steps for the user's browser, reusing
  the shared InstallInstructions so wording stays consistent with the nav/footer.
*/

const DISMISS_KEY = "gsm-install-dismissed";

export function InstallPrompt() {
  const { canInstall, isInstalled, platform, promptInstall } = usePwaInstall();
  const [dismissed, setDismissed] = useState(true); // assume dismissed until we read storage

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  // Show for anything with an install path (native prompt or manual steps),
  // but never when installed or on a browser that can't install at all.
  const hasManualPath = platform !== "unsupported";
  const visible = !dismissed && !isInstalled && (canInstall || hasManualPath);
  if (!visible) return null;

  function dismiss() {
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, "1");
  }

  async function install() {
    const outcome = await promptInstall();
    if (outcome === "accepted") {
      setDismissed(true);
      localStorage.setItem(DISMISS_KEY, "1");
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Install G sa Marikina"
      className="fixed z-50 bottom-5 left-5 right-5 md:right-auto w-auto md:w-[360px] bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-2xl overflow-hidden"
    >
      <div className="flex items-start gap-3 p-4">
        {/* G! brand badge */}
        <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-[var(--radius-sm)] bg-[var(--color-accent-red)] text-white text-[20px] font-extrabold leading-none tracking-tight">
          G!
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold tracking-tight text-[var(--color-text-secondary)]">
            Install G sa Marikina
          </p>

          {canInstall ? (
            <>
              <p className="mt-1 text-[12px] leading-snug text-[var(--color-text-primary)]">
                Add it to your home screen for one-tap access to local food finds.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={install}
                  className="inline-flex items-center gap-1.5 px-4 h-9 rounded-[var(--radius-sm)] bg-[var(--color-accent)] text-white text-[13px] font-bold tracking-tight hover:bg-[var(--color-accent-hover)] transition-colors"
                >
                  <DownloadSimple size={15} weight="bold" />
                  Install
                </button>
                <button
                  onClick={dismiss}
                  className="px-3 h-9 rounded-[var(--radius-sm)] text-[13px] font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors"
                >
                  Not now
                </button>
              </div>
            </>
          ) : (
            <div className="mt-1">
              <InstallInstructions platform={platform} />
            </div>
          )}
        </div>

        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          className="p-1 -mr-1 -mt-1 shrink-0 text-[var(--color-text-primary)] hover:opacity-70 transition-opacity"
        >
          <X size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
