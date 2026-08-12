import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — G sa Marikina",
  description: "How G sa Marikina handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[720px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Last updated: August 2026
      </p>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-[var(--color-text-primary)]">

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            1. What we collect
          </h2>
          <p>When you use G sa Marikina, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Account information</strong> — your email address and
              display name, provided when you sign up through Clerk.
            </li>
            <li>
              <strong>Content you submit</strong> — reviews you write, business
              listings you submit, and photos you upload.
            </li>
            <li>
              <strong>Usage data</strong> — pages visited and time spent,
              collected by Vercel Analytics. This is anonymized and does not
              identify individuals.
            </li>
            <li>
              <strong>Location data</strong> — if you use the "Near me"
              feature, your browser requests your GPS coordinates. This is
              processed in your browser only and never stored on our servers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            2. How we use it
          </h2>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>To display your reviews and listings on the platform</li>
            <li>
              To send you notifications when someone reviews your listed
              business (when this feature is enabled)
            </li>
            <li>To improve the directory and fix issues</li>
            <li>To prevent abuse (fake reviews, spam submissions)</li>
          </ul>
          <p className="mt-3">
            We do not sell your data. We do not use it for advertising.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            3. Third-party services
          </h2>
          <p>G sa Marikina uses the following services:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Clerk</strong> — authentication. Clerk stores your email
              and login credentials on their servers. See{" "}
              <a
                href="https://clerk.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary-text)] hover:underline"
              >
                Clerk's privacy policy ↗
              </a>
              .
            </li>
            <li>
              <strong>Supabase</strong> — database. Your account data, reviews,
              and listing submissions are stored in a Supabase Postgres
              database. See{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary-text)] hover:underline"
              >
                Supabase's privacy policy ↗
              </a>
              .
            </li>
            <li>
              <strong>Cloudinary</strong> — image storage. Photos you upload
              are stored on Cloudinary's CDN.
            </li>
            <li>
              <strong>Vercel</strong> — hosting and anonymized analytics.
            </li>
            <li>
              <strong>OpenStreetMap</strong> — map tiles. The map page fetches
              tiles from OpenStreetMap servers. Your IP address may be logged
              by them as part of standard web requests.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            4. Data retention
          </h2>
          <p>
            Your account and content remain on the platform until you delete
            your account. Deleting your account removes your personal
            information. Reviews you have written will be anonymized (your name
            removed) rather than deleted, to preserve the usefulness of the
            directory.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            5. Your rights
          </h2>
          <p>
            Under the Philippine Data Privacy Act of 2012 (Republic Act 10173),
            you have the right to access, correct, and request deletion of your
            personal data. To exercise these rights, contact us through the
            platform's About page.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            6. Cookies
          </h2>
          <p>
            G sa Marikina uses cookies only for authentication (managed by
            Clerk) and your theme preference (stored in localStorage). We do
            not use tracking cookies or third-party advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            7. Children
          </h2>
          <p>
            G sa Marikina is not directed at children under 13. We do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            8. Changes
          </h2>
          <p>
            We may update this policy as the platform grows. Material changes
            will be noted on this page with an updated date.
          </p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
        <Link href="/terms" className="hover:text-[var(--color-primary-text)]">Terms of Service</Link>
        <Link href="/guidelines" className="hover:text-[var(--color-primary-text)]">Community Guidelines</Link>
      </div>
    </main>
  );
}
