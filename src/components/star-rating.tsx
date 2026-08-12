interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 13 }: StarRatingProps) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rating ? "var(--color-surface-strong)" : "#E5E5E5"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
