interface PhotoGalleryProps {
  photos: string[];
  name: string;
}

export function PhotoGallery({ photos, name }: PhotoGalleryProps) {
  // Only show the gallery when there is more than one photo
  // (the first photo is already the hero).
  const galleryPhotos = photos.slice(1);

  if (galleryPhotos.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)] mb-3">
        Photos
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {galleryPhotos.map((photo, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-40 aspect-[4/3] bg-[var(--color-border)] rounded-[var(--radius-xs)] overflow-hidden"
          >
            <img
              src={photo}
              alt={`${name} - photo ${i + 2}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
