import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { listings } from "@/data/listings";
import { CATEGORY_LABELS, CategoryEnum } from "@/types/listing";
import { ListingCard } from "@/components/listing-card";
import { CategoryIcon } from "@/components/category-icon";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return CategoryEnum.options.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const parsed = CategoryEnum.safeParse(id);
  if (!parsed.success) return { title: "Not Found" };

  const category = CATEGORY_LABELS[parsed.data];
  return {
    title: `${category.label} in Marikina — G sa Marikina`,
    description: `Discover the best ${category.label.toLowerCase()} spots in Marikina City.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const parsed = CategoryEnum.safeParse(id);

  if (!parsed.success) {
    notFound();
  }

  const category = CATEGORY_LABELS[parsed.data];
  const filtered = listings.filter((l) => l.category === parsed.data);

  return (
    <main className="min-h-screen px-6 pt-6 pb-16 max-w-[1200px] mx-auto">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
      >
        ← All categories
      </Link>

      <h1 className="mt-4 flex items-center gap-2 font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        <span className="text-[var(--color-primary)]">
          <CategoryIcon category={parsed.data} size={28} weight="duotone" />
        </span>
        {category.label}
      </h1>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center text-center">
          <span className="text-[var(--color-primary)]/40 mb-4">
            <CategoryIcon category={parsed.data} size={56} weight="light" />
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)]">
            No {category.label.toLowerCase()} spots listed yet
          </h2>
          <p className="mt-2 text-[var(--color-text-secondary)] max-w-sm mx-auto">
            Check back soon, or browse another category.
          </p>
        </div>
      )}
    </main>
  );
}
