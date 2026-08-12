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
  if (!parsed.success) notFound();

  const category = CATEGORY_LABELS[parsed.data];
  const filtered = listings.filter((l) => l.category === parsed.data);

  return (
    <main className="px-4 md:px-6 pt-8 pb-16 max-w-[1200px] mx-auto">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-[12px] font-semibold tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
      >
        ← All categories
      </Link>

      <div className="mt-5 flex items-center gap-3">
        <span className="text-[var(--color-accent)]">
          <CategoryIcon category={parsed.data} size={26} weight="fill" />
        </span>
        <h1 className="text-[26px] md:text-[32px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
          {category.label}
        </h1>
        <span className="text-[12px] font-semibold tracking-tight text-[var(--color-text-primary)] ml-1">
          {filtered.length} {filtered.length === 1 ? "spot" : "spots"}
        </span>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <span className="text-[var(--color-text-primary)] opacity-30 block mb-4">
            <CategoryIcon category={parsed.data} size={52} weight="light" />
          </span>
          <h2 className="text-[16px] font-bold text-[var(--color-text-secondary)] tracking-tight">
            No {category.label.toLowerCase()} spots listed yet
          </h2>
          <p className="mt-2 text-[13px] tracking-tight text-[var(--color-text-primary)]">
            Check back soon, or{" "}
            <Link href="/categories" className="font-semibold text-[var(--color-accent)] hover:underline">
              browse another category
            </Link>.
          </p>
        </div>
      )}
    </main>
  );
}
