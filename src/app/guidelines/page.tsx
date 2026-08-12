import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Guidelines — G sa Marikina",
  description:
    "How to write helpful reviews and submit accurate business listings on G sa Marikina.",
};

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[720px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        Community Guidelines
      </h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Last updated: August 2026
      </p>

      <p className="mt-6 text-base leading-relaxed text-[var(--color-text-primary)]">
        G sa Marikina works because people share honest experiences. These
        guidelines explain what that looks like in practice.
      </p>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-[var(--color-text-primary)]">

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            Writing a good review
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Write from personal experience.</strong> Only review a
              business you have actually visited or ordered from. A review from
              someone who has been there is worth more than ten opinions from
              people who haven't.
            </li>
            <li>
              <strong>Be specific.</strong> "The ube crinkles were soft with a
              perfect crackle on top" is useful. "Good food" is not. Mention
              what you ordered, what stood out, and anything worth knowing
              before someone visits.
            </li>
            <li>
              <strong>Be honest, not harsh.</strong> Criticism is fine and
              helpful. Personal attacks on the owner or staff are not.
            </li>
            <li>
              <strong>Stay relevant.</strong> Reviews should be about the food
              and the experience at that specific spot.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            What we remove
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Fake reviews</strong> — reviews written by the business
              owner, their friends or family (without disclosure), or paid
              reviewers.
            </li>
            <li>
              <strong>Retaliatory reviews</strong> — written in response to
              a negative interaction unrelated to the food (e.g., a dispute
              over a refund).
            </li>
            <li>
              <strong>Promotional content</strong> — reviews that read like
              advertisements, or that were exchanged for free food or
              discounts without disclosure.
            </li>
            <li>
              <strong>Off-topic content</strong> — reviews that complain about
              things outside the business's control (weather, traffic, delivery
              app issues not caused by the business).
            </li>
            <li>
              <strong>Harassment or personal attacks</strong> — content that
              targets the owner, staff, or other reviewers personally.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            Submitting a business
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Only submit real businesses.</strong> The business must
              actually exist and be operating in Marikina City or nearby.
            </li>
            <li>
              <strong>Provide accurate contact information.</strong> Incorrect
              phone numbers or Facebook links waste people's time.
            </li>
            <li>
              <strong>Submit businesses you represent.</strong> If you're
              submitting someone else's business, get their permission first.
            </li>
            <li>
              <strong>Submissions are reviewed.</strong> Your spot will not
              appear publicly until it has been checked. This keeps the
              directory trustworthy.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            Reporting a problem
          </h2>
          <p>
            If you see a review or listing that violates these guidelines, use
            the Report button. We review every report. If something needs
            immediate attention, reach us through the About page.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3">
            Consequences
          </h2>
          <p>
            Content that violates these guidelines will be removed. Repeated
            violations may result in your account being suspended. The goal is
            a directory that Marikina food lovers can trust — enforcement is
            in service of that, not against anyone personally.
          </p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
        <Link href="/terms" className="hover:text-[var(--color-primary-text)]">Terms of Service</Link>
        <Link href="/privacy" className="hover:text-[var(--color-primary-text)]">Privacy Policy</Link>
      </div>
    </main>
  );
}
