"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { MARIKINA_BARANGAYS } from "@/data/barangays";

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-[var(--color-border)]">
      <nav className="mx-auto flex max-w-[1400px] items-center h-16 md:h-20 px-5 md:px-10 gap-4 md:gap-7">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="inline-block bg-[var(--color-accent-red)] text-white text-[22px] font-extrabold px-4 py-2.5 leading-none tracking-tight">
            G!
          </span>
        </Link>

        {/* City dropdown */}
        <div className="hidden md:block relative group">
          <button className="flex items-center gap-1.5 text-[15px] font-extrabold text-[var(--color-text-secondary)] tracking-tight hover:text-[var(--color-accent)] transition-colors duration-[var(--motion-fast)]">
            Marikina City
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 transition-transform duration-[var(--motion-fast)] group-hover:rotate-180">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dropdown panel */}
          <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[var(--color-border)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-[var(--motion-fast)] z-50 max-h-[360px] overflow-y-auto">
            <div className="px-4 py-2.5 border-b border-[var(--color-border)] sticky top-0 bg-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-primary)]">
                Barangays
              </p>
            </div>
            {MARIKINA_BARANGAYS.map((brgy) => (
              <Link
                key={brgy}
                href={`/search?barangay=${encodeURIComponent(brgy)}`}
                className="flex items-center gap-2 px-4 py-2 text-[13px] tracking-tight text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-colors"
              >
                {brgy}
              </Link>
            ))}
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center flex-1 max-w-[420px]">
          <div className="flex items-center gap-3 w-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2.5 hover:border-[var(--color-border-strong)] transition-colors duration-[var(--motion-fast)]">
            <MagnifyingGlass size={17} weight="bold" className="shrink-0 text-[var(--color-text-primary)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search restaurants, dishes, etc."
              className="w-full bg-transparent outline-none text-[14px] tracking-tight text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-primary)]"
            />
          </div>
        </form>

        {/* Right links */}
        <div className="hidden md:flex items-center gap-7 ml-auto text-[14px] font-semibold tracking-tight">
          <Link
            href="/map"
            className={`transition-colors duration-[var(--motion-fast)] ${
              pathname.startsWith("/map") ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
            }`}
          >
            Map
          </Link>
          <Link
            href="/categories"
            className={`transition-colors duration-[var(--motion-fast)] ${
              pathname.startsWith("/categories") ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
            }`}
          >
            Browse
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
              className="border border-[var(--color-accent-red)] px-4 py-2 text-[14px] font-bold tracking-tight text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)] hover:text-white transition-all duration-[var(--motion-fast)]"
            >
              Log in
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/for-businesses/new" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
              List a spot
            </Link>
            <Link href="/admin" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
              Admin
            </Link>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile login */}
        <div className="md:hidden ml-auto">
          <SignedOut>
            <Link href="/sign-in" className="text-[13px] font-bold tracking-tight text-[var(--color-accent-red)]">
              Log in
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
