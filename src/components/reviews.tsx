"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Star } from "@phosphor-icons/react";
import { StarRating } from "./star-rating";

interface ReviewItem {
  id: string;
  rating: number;
  body: string;
  createdAt: string;
  authorName: string | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Reviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`);
      const data = await res.json();
      setReviews(data.reviews ?? []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (rating < 1) {
      setError("Please pick a star rating.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, rating, body }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Could not post your review.");
        return;
      }
      setRating(0);
      setBody("");
      await load();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-10">
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)] mb-4">
        Reviews
      </h2>

      {/* Write a review */}
      <SignedIn>
        <form
          onSubmit={submit}
          className="mb-8 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
        >
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Your rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                aria-checked={rating === n}
                role="radio"
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(n)}
                className="p-0.5"
              >
                <Star
                  size={26}
                  weight={(hover || rating) >= n ? "fill" : "regular"}
                  color={
                    (hover || rating) >= n
                      ? "var(--color-primary)"
                      : "var(--color-border)"
                  }
                />
              </button>
            ))}
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What did you order? How was it?"
            rows={3}
            maxLength={2000}
            className="mt-3 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none"
          />
          {error && (
            <p className="mt-2 text-sm text-[var(--color-error)]">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 inline-flex items-center rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
          >
            {submitting ? "Posting…" : "Post review"}
          </button>
        </form>
      </SignedIn>

      <SignedOut>
        <div className="mb-8 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-secondary)]">
          <SignInButton mode="modal">
            <button className="font-semibold text-[var(--color-primary-text)] hover:underline">
              Sign in
            </button>
          </SignInButton>{" "}
          to leave a review.
        </div>
      </SignedOut>

      {/* Review list */}
      {loading ? (
        <p className="text-sm text-[var(--color-text-secondary)]">
          Loading reviews…
        </p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-[var(--color-text-secondary)]">
          No reviews yet. Be the first to share what you ordered.
        </p>
      ) : (
        <ul className="space-y-5">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="border-b border-[var(--color-border)] pb-5 last:border-0"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {r.authorName || "Marikeño"}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {formatDate(r.createdAt)}
                </span>
              </div>
              <div className="mt-1">
                <StarRating rating={r.rating} size={14} />
              </div>
              {r.body && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-primary)]">
                  {r.body}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
