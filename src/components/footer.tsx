import Link from "next/link";

const LINKS = [
  { href: "/search", label: "Search" },
  { href: "/map", label: "Map" },
  { href: "/categories", label: "Categories" },
  { href: "/collections", label: "Guides" },
  { href: "/near-me", label: "Near me" },
  { href: "/about", label: "About" },
  { href: "/for-businesses/new", label: "List your spot" },
];

export function Footer() {
  return (
    <footer className="hidden md:block border-t border-[var(--border)] mt-20">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-[var(--accent)] font-bold text-lg">G</span>
              <span className="text-sm font-semibold text-[var(--text)] tracking-tight">
                sa Marikina
              </span>
            </Link>
            <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
              A local food directory for Marikina City.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] text-xs text-[var(--text-dim)]">
          &copy; {new Date().getFullYear()} G sa Marikina
        </div>
      </div>
    </footer>
  );
}
