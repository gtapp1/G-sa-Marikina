"use client";

import { useState } from "react";
import { ShareNetwork, Check } from "@phosphor-icons/react";

interface ShareButtonProps {
  title: string;
  slug: string;
}

export function ShareButton({ title, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/${slug}`
        : `https://gsamarikina.com/${slug}`;

    // Web Share API (mobile native share sheet)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | G sa Marikina`,
          url,
        });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    // Desktop fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — no-op
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold rounded-[var(--radius-sm)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-text)] transition-colors text-sm"
      aria-label={`Share ${title}`}
    >
      {copied ? (
        <>
          <Check size={18} weight="bold" /> Link copied!
        </>
      ) : (
        <>
          <ShareNetwork size={18} weight="bold" /> Share
        </>
      )}
    </button>
  );
}
