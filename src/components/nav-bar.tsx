"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  House,
  MagnifyingGlass,
  MapTrifold,
  SquaresFour,
  Info,
  MapPin,
} from "@phosphor-icons/react";

type NavIcon = ComponentType<{ size?: number; weight?: "regular" | "fill" }>;

const NAV_ITEMS: { href: string; label: string; icon: NavIcon }[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/search", label: "Search", icon: MagnifyingGlass },
  { href: "/map", label: "Map", icon: MapTrifold },
  { href: "/categories", label: "Browse", icon: SquaresFour },
  { href: "/about", label: "About", icon: Info },
];

export function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop: top bar with located wordmark + accent-underline links */}
      <header className="hidden md:block sticky top-0 z-50 h-16 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur">
        <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <MapPin size={16} weight="fill" />
            </span>
            <span className="font-[family-name:var(--font-heading)] text-lg font-extrabold tracking-tight text-[var(--color-text-primary)]">
              G sa Marikina
            </span>
          </Link>

          <div className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 text-sm font-semibold transition-colors ${
                    active
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[var(--color-primary)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile: floating dock */}
      <nav className="md:hidden fixed inset-x-3 bottom-3 z-50 flex items-stretch gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-1.5 shadow-[0_6px_24px_rgba(61,44,30,0.16)] backdrop-blur">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-semibold transition-colors ${
                active
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              <Icon size={20} weight={active ? "fill" : "regular"} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
