"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/map", label: "Map", icon: "🗺️" },
  { href: "/categories", label: "Categories", icon: "🍽️" },
  { href: "/about", label: "About", icon: "ℹ️" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: top bar */}
      <header className="hidden md:block sticky top-0 z-50 bg-[var(--color-background)]/95 backdrop-blur border-b border-[var(--color-border)]">
        <nav className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-lg font-extrabold text-[var(--color-primary-text)]"
          >
            G sa Marikina
          </Link>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-colors ${
                    active
                      ? "text-[var(--color-primary-text)] bg-[var(--color-surface)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary-text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile: bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-xs font-medium transition-colors ${
                active
                  ? "text-[var(--color-primary-text)]"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
