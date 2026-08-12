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
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-16 pb-10">

        {/* Massive G! logo — hero of the footer */}
        <div className="mb-14">
          <Link href="/" className="inline-flex items-end gap-5 group">
            <span className="inline-block bg-[var(--color-accent-red)] text-white font-extrabold leading-none tracking-tight group-hover:opacity-90 transition-opacity"
              style={{ fontSize: "80px", padding: "16px 28px" }}>
              G!
            </span>
            <span className="text-[28px] md:text-[36px] font-bold tracking-tight text-[var(--color-text-secondary)] pb-3 group-hover:text-[var(--color-accent)] transition-colors">
              sa Marikina
            </span>
          </Link>
          <p className="mt-6 text-[15px] tracking-tight text-[var(--color-text-primary)] leading-relaxed max-w-sm">
            A local food directory for Marikina City — helping small food
            businesses get found.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex flex-wrap gap-x-24 gap-y-10 border-t border-[var(--color-border)] pt-10">
          {/* Discover */}
          <div>
            <h4 className="text-[11px] font-bold text-[var(--color-text-secondary)] tracking-[0.08em] uppercase mb-5">
              Discover
            </h4>
            <ul className="space-y-3">
              {DISCOVER.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[11px] font-bold text-[var(--color-text-secondary)] tracking-[0.08em] uppercase mb-5">
              Info
            </h4>
            <ul className="space-y-3">
              {INFO.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[13px] tracking-tight text-[var(--color-text-primary)]">
            &copy; {new Date().getFullYear()} G sa Marikina
          </span>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="text-[13px] tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-[13px] tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
              Privacy
            </Link>
            <Link href="/guidelines" className="text-[13px] tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
              Guidelines
            </Link>
          </div>
          <span className="text-[13px] tracking-tight text-[var(--color-text-primary)]">
            Made for the Marikina food community.
          </span>
        </div>

      </div>
    </footer>
  );
}
