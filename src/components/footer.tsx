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
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-16">
        <div className="flex flex-wrap gap-x-20 gap-y-10">

          {/* Brand — G! badge matching navbar */}
          <div className="max-w-[300px]">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="inline-block bg-[var(--color-accent-red)] text-white text-[18px] font-extrabold px-3.5 py-2.5 leading-none tracking-tight group-hover:opacity-90 transition-opacity">
                G!
              </span>
              <span className="text-[16px] font-bold tracking-tight text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                sa Marikina
              </span>
            </Link>
            <p className="mt-4 text-[14px] tracking-tight text-[var(--color-text-primary)] leading-relaxed">
              A local food directory for Marikina City — helping small food
              businesses get found.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-[12px] font-bold text-[var(--color-text-secondary)] tracking-[0.05em] uppercase mb-4">
              Discover
            </h4>
            <ul className="space-y-2.5">
              {DISCOVER.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[12px] font-bold text-[var(--color-text-secondary)] tracking-[0.05em] uppercase mb-4">
              Info
            </h4>
            <ul className="space-y-2.5">
              {INFO.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-[12px] tracking-tight text-[var(--color-text-primary)]">
            &copy; {new Date().getFullYear()} G sa Marikina
          </span>
          <span className="text-[12px] tracking-tight text-[var(--color-text-primary)]">
            Made for the Marikina food community.
          </span>
        </div>
      </div>
    </footer>
  );
}
