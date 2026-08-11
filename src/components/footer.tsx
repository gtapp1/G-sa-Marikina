import Link from "next/link";
import { MapPin } from "@phosphor-icons/react/dist/ssr";

const EXPLORE = [
  { href: "/search", label: "Search" },
  { href: "/map", label: "Map" },
  { href: "/categories", label: "Categories" },
  { href: "/near-me", label: "Near me" },
  { href: "/collections", label: "Collections" },
];

const BUSINESS = [
  { href: "/for-businesses/new", label: "List your spot" },
  { href: "/dashboard", label: "Your spots" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--color-border)] bg-[var(--color-surface)]/60">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        {/* Brand */}
        <div className="col-span-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <MapPin size={16} weight="fill" />
            </span>
            <span className="font-[family-name:var(--font-heading)] text-lg font-extrabold tracking-tight text-[var(--color-text-primary)]">
              G sa Marikina
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-secondary)]">
            A local food directory for Marikina City. Home bakers, milk tea
            shops, karinderyas, and street eats — all in one place.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Explore
          </h3>
          <ul className="mt-3 space-y-2">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-primary-text)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For businesses */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            For businesses
          </h3>
          <ul className="mt-3 space-y-2">
            {BUSINESS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-primary-text)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-[var(--color-text-secondary)] sm:flex-row">
          <span>© {new Date().getFullYear()} G sa Marikina</span>
          <span>Made for the Marikina food community.</span>
        </div>
      </div>
    </footer>
  );
}
