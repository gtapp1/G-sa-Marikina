import Link from "next/link";

const DISCOVER = [
  { href: "/search", label: "Nearby Spots" },
  { href: "/collections", label: "Guides" },
  { href: "/categories", label: "Categories" },
  { href: "/map", label: "Map" },
  { href: "/near-me", label: "Near Me" },
];

const INFO = [
  { href: "/about", label: "About" },
  { href: "/for-businesses/new", label: "List Your Spot" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Footer() {
  return (
    <footer className="hidden md:block border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)]">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          {/* Brand */}
          <div className="max-w-[240px]">
            <Link href="/">
              <span className="inline-block bg-[var(--color-surface-strong)] text-white text-[10px] font-bold px-2 py-1 rounded-[var(--radius-xs)] tracking-wider uppercase">
                G sa Marikina
              </span>
            </Link>
            <p className="mt-3 text-[var(--font-size-sm)] text-[var(--color-text-primary)] leading-relaxed">
              A local food directory for Marikina City — helping small food businesses get found.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-[var(--font-size-sm)] font-bold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
              Discover
            </h4>
            <ul className="space-y-1.5">
              {DISCOVER.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--font-size-sm)] text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[var(--font-size-sm)] font-bold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
              Info
            </h4>
            <ul className="space-y-1.5">
              {INFO.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--font-size-sm)] text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-[var(--color-border)] text-[var(--font-size-xs)] text-[var(--color-text-primary)]">
          &copy; {new Date().getFullYear()} G sa Marikina
        </div>
      </div>
    </footer>
  );
}
