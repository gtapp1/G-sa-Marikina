import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — G sa Marikina",
  description: "Terms of service for using G sa Marikina.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[720px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Last updated: August 2026
      </p>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-[var(--color-text-primary)]">

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            1. What G sa Marikina is
          </h2>
          <p>
            G sa Marikina is a local food directory for Marikina City,
            Philippines. It lets consumers browse and review local food
            businesses, and lets business owners submit their spots for
            inclusion in the directory. The platform is free to use.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            2. Who can use it
          </h2>
          <p>
            Anyone can browse the directory without an account. Creating an
            account lets you leave reviews and submit a business listing. By
            using this platform, you agree to these terms. If you are under 13,
            you may not create an account.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            3. Accounts
          </h2>
          <p>
            Accounts are managed through Clerk. You are responsible for keeping
            your login credentials secure. You may not share your account or
            create accounts to abuse the platform (for example, to post fake
            reviews).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            4. Reviews
          </h2>
          <p>
            Reviews must be based on a genuine personal experience at the
            business. You agree not to post false, misleading, or defamatory
            content. Businesses may not post reviews of their own spots or
            competitors. We reserve the right to remove reviews that violate
            these rules without notice.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            5. Business listings
          </h2>
          <p>
            Any food business based in Marikina City or nearby areas may submit
            a listing. Submissions are reviewed before going live. By
            submitting a listing, you confirm that the information is accurate
            and that you have the right to represent that business. We may
            reject or remove listings at our discretion.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            6. Your content
          </h2>
          <p>
            By posting a review or submitting a listing, you grant G sa
            Marikina a non-exclusive, royalty-free license to display that
            content on the platform. You keep ownership of what you write and
            upload. We will not sell your content to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            7. What we do not allow
          </h2>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Fake, incentivized, or retaliatory reviews</li>
            <li>Spam, repeated identical posts, or automated submissions</li>
            <li>Content that is obscene, harassing, or threatening</li>
            <li>
              Impersonating another person or business
            </li>
            <li>
              Using the platform to collect personal data from other users
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            8. Availability
          </h2>
          <p>
            G sa Marikina is provided as-is. We do not guarantee uninterrupted
            availability and may take the platform down for maintenance at any
            time. We are not liable for losses resulting from downtime.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            9. Limitation of liability
          </h2>
          <p>
            Information on G sa Marikina is provided by users and the platform
            operator. We do not verify every listing or review and are not
            responsible for the accuracy of user-submitted content. Any
            transaction you make with a listed business is between you and that
            business.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            10. Changes to these terms
          </h2>
          <p>
            We may update these terms as the platform evolves. Continued use
            of G sa Marikina after a change is posted means you accept the
            updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            11. Governing law
          </h2>
          <p>
            These terms are governed by the laws of the Republic of the
            Philippines.
          </p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
        <Link href="/privacy" className="hover:text-[var(--color-primary-text)]">Privacy Policy</Link>
        <Link href="/guidelines" className="hover:text-[var(--color-primary-text)]">Community Guidelines</Link>
      </div>
    </main>
  );
}
