"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MagnifyingGlass } from "@phosphor-icons/react";

export function NavBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop/tablet nav */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-[var(--color-border)]">
        <nav className="mx-auto flex max-w-[1200px] items-center h-14 md:h-[60px] px-4 md:px-6 gap-3 md:gap-5">
          {/* Logo — red badge like Resy */}
          <Link href="/" className="flex-shrink-0">
            <span className="inline-block bg-[var(--color-accent-red)] text-white text-[10px] font-extrabold px-2 py-1.5 rounded-[var(--radius-xs)] tracking-[0.08em] uppercase leading-none">
              G sa Marikina
            </span>
          </Link>

          {/* City — orange */}
          <span className="hidden md:inline text-[13px] font-semibold text-[var(--color-accent)] tracking-tight">
            Marikina City ›
          </span>

          {/* Search bar */}
          <Link
            href="/search"
            className="flex items-center gap-2 flex-1 max-w-[300px] rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-[7px] text-[13px] tracking-tight text-[var(--color-text-primary)] hover:border-[#BFBFBF] transition-[border-color] duration-[var(--motion-fast)]"
          >
            <MagnifyingGlass size={14} weight="bold" />
            <span>Search spots, dishes…</span>
          </Link>

          {/* Right side links */}
          <div className="hidden md:flex items-center gap-5 ml-auto text-[13px] font-semibold tracking-tight">
            <Link
              href="/map"
              className={`transition-colors duration-[var(--motion-fast)] ${
                pathname.startsWith("/map") ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
              }`}
            >
              Map
            </Link>
            <Link
              href="/collections"
              className={`transition-colors duration-[var(--motion-fast)] ${
                pathname.startsWith("/collections") ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
              }`}
            >
              Guides
            </Link>
            <SignedOut>
              <Link
                href="/sign-in"
                className="rounded-[var(--radius-sm)] border border-[var(--color-accent-red)] px-3 py-1.5 text-[12px] font-bold tracking-tight text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)] hover:text-white transition-all duration-[var(--motion-fast)]"
              >
                Log in
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/for-businesses/new" className="text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors">
                List a spot
              </Link>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile login */}
          <div className="md:hidden ml-auto">
            <SignedOut>
              <Link href="/sign-in" className="text-[12px] font-bold tracking-tight text-[var(--color-accent-red)]">
                Log in
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-[var(--color-border)]">
        <div className="flex items-center justify-around h-14">
          {[
            { href: "/", label: "Home" },
            { href: "/search", label: "Search" },
            { href: "/map", label: "Map" },
            { href: "/categories", label: "Browse" },
          ].map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[10px] font-bold uppercase tracking-[0.05em] transition-colors duration-[var(--motion-fast)] ${
                  active ? "text-[var(--color-accent-red)]" : "text-[var(--color-text-primary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
