"use client";

import { useState } from "react";
import { DownloadSimple, ShareNetwork, DotsThreeVertical } from "@phosphor-icons/react";
import { usePwaInstall } from "./pwa-install-provider";

/*
  On-demand "Install app" trigger for the nav bar (desktop links + mobile menu).

  Renders nothing when the app is already installed or the browser has no
  install path at all, so it never shows a dead action.

  Behavior on click:
    - Native prompt available (Chromium): fire it — true one-tap install.
    - Otherwise: toggle a branded popover with the correct manual steps for
      the user's browser (iOS Share sheet, Android menu, desktop address bar).
*/

interface InstallButtonProps {
  className?: string;
  /** Called after a native prompt resolves (e.g. to close a mobile menu). */
  onDone?: () => void;
}

export function InstallButton({ className = "", onDone }: InstallButtonProps) {
  const { canInstall, isInstalled, platform, promptInstall } = usePwaInstall();
  const [hintOpen, setHintOpen] = useState(false);

  // Already installed, or a browser with no install path — nothing to offer.
  if (isInstalled || platform === "unsupported") return null;

  async function handleClick() {
    if (canInstall) {
      await promptInstall();
      onDone?.();
      return;
    }
    // No native prompt yet — show manual instructions.
    setHintOpen((v) => !v);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 font-semibold tracking-tight text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors ${className}`}
      >
        <DownloadSimple size={16} weight="bold" />
        Install app
      </button>

      {hintOpen && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-lg p-3 z-50">
          <InstallInstructions platform={platform} />
        </div>
      )}
    </div>
  );
}

/*
  Per-browser manual install steps. Kept here (and reused by the banner) so the
  wording stays consistent everywhere the fallback appears.
*/
export function InstallInstructions({
  platform,
}: {
  platform: "ios-safari" | "android" | "desktop" | "unsupported";
}) {
  const text = "text-[12px] leading-snug text-[var(--color-text-primary)]";

  if (platform === "ios-safari") {
    return (
      <p className={text}>
        Tap{" "}
        <ShareNetwork
          size={13}
          weight="bold"
          className="inline-block align-[-2px] text-[var(--color-accent)]"
        />{" "}
        <span className="font-semibold">Share</span>, then{" "}
        <span className="font-semibold">Add to Home Screen</span>.
      </p>
    );
  }

  if (platform === "android") {
    return (
      <p className={text}>
        Open the browser menu{" "}
        <DotsThreeVertical
          size={14}
          weight="bold"
          className="inline-block align-[-3px] text-[var(--color-accent)]"
        />{" "}
        and tap <span className="font-semibold">Install app</span> (or{" "}
        <span className="font-semibold">Add to Home screen</span>).
      </p>
    );
  }

  // desktop (Chromium)
  return (
    <p className={text}>
      Click the install icon{" "}
      <DownloadSimple
        size={13}
        weight="bold"
        className="inline-block align-[-2px] text-[var(--color-accent)]"
      />{" "}
      in the address bar, or use the browser menu &rarr;{" "}
      <span className="font-semibold">Install G sa Marikina</span>.
    </p>
  );
}
