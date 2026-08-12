"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  House,
  MagnifyingGlass,
  MapTrifold,
  User,
} from "@phosphor-icons/react";

type NavIcon = ComponentType<{ size?: number; weight?: "regular" | "fill" }>;

const DESKTOP_LINKS = [
  { href: "/map", label: "Map" },
  { href: "/categories", label: "Browse" },
  { href: "/collections", label: "Guides" },
  { href: "/about", label: "About" },
];

const MOBILE_TABS: { href: string; label: string; icon: NavIcon }[] = [
  { href: "/", label: "Discover", icon: House },
  { href: "/search", label: "Search", icon: MagnifyingGlass },
  { href: "/map", label: "Map", icon: MapTrifold },
];

export function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop nav */}
      <header className="hidden md:block fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[var(--accent)] font-bold text-lg">G</span>
            <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-[var(--text)] tracking-tight">
              sa Marikina
            </span>
          </Link>

          {/* Center links */}
          <div className="flex items-center gap-8">
            {DESKTOP_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-150 ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlass size={20} />
            </Link>
            <SignedOut>
              <Link
                href="/sign-in"
                className="rounded-[var(--radius-sm)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/for-businesses/new"
                className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                List a spot
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Mobile bottom tabs */}
      <nav className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-lg">
        <div className="flex items-center justify-around h-16">
          {MOBILE_TABS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 px-4 py-2 text-[11px] font-medium transition-colors ${
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                <Icon size={22} weight={active ? "fill" : "regular"} />
                {item.label}
              </Link>
            );
          })}
          <SignedIn>
            <UserButton
              appearance={{
                elements: { avatarBox: "w-6 h-6" },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className={`flex flex-col items-center gap-1 px-4 py-2 text-[11px] font-medium text-[var(--text-muted)]`}
            >
              <User size={22} />
              Account
            </Link>
          </SignedOut>
        </div>
      </nav>
    </>
  );
}
