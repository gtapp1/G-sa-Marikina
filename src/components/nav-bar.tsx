"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
      {/* Desktop: floating capsule nav */}
      <header className="hidden md:block fixed inset-x-0 top-4 z-50 px-6">
        <nav className="mx-auto flex max-w-[1040px] items-center justify-between gap-6 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 py-2 pl-5 pr-2.5 shadow-[var(--shadow-hover)] backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <MapPin size={16} weight="fill" />
            </span>
            <span className="font-[family-name:var(--font-heading)] text-base font-extrabold tracking-tight text-[var(--color-text-primary)]">
              G sa Marikina
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <SignedOut>
              <Link
                href="/sign-in"
                className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/for-businesses/new"
                className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                List your spot
              </Link>
              <UserButton
                appearance={{ variables: { colorPrimary: "#F97316" } }}
              />
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Mobile: floating capsule top bar (wordmark + theme + auth) */}
      <header className="md:hidden fixed inset-x-3 top-3 z-40 flex items-center justify-between gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 py-2 pl-4 pr-2 shadow-[var(--shadow-hover)] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
            <MapPin size={14} weight="fill" />
          </span>
          <span className="font-[family-name:var(--font-heading)] text-base font-extrabold tracking-tight text-[var(--color-text-primary)]">
            G sa Marikina
          </span>
        </Link>
        <div className="flex items-center gap-1.5">
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-full bg-[var(--color-primary)] px-3.5 py-1.5 text-xs font-semibold text-white"
            >
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{ variables: { colorPrimary: "#F97316" } }} />
          </SignedIn>
        </div>
      </header>

      {/* Mobile: floating dock */}
      <nav className="md:hidden fixed inset-x-3 bottom-3 z-50 flex items-stretch gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-1.5 shadow-[0_6px_24px_rgba(61,44,30,0.16)] backdrop-blur-md">
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
