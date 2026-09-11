import type { Photo } from "@/lib/photos";

export function PhotoFrame({
  photo,
  className = "",
  sizes = "100vw",
}: {
  photo: Photo;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={`relative overflow-hidden border border-[var(--line)] ${className}`}>
      <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" sizes={sizes} />
      <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-[0.62rem] tracking-[0.22em] uppercase text-[var(--gold-2)]">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

export function PhotoMosaic({ photos }: { photos: Photo[] }) {
  return (
    <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
      {photos.map((photo, index) => (
        <PhotoFrame
          key={photo.src}
          photo={photo}
          className={`mb-3 break-inside-avoid ${index % 5 === 0 ? "aspect-[4/5]" : index % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}
        />
      ))}
    </div>
  );
}

export function PhotoStrip({ photos }: { photos: Photo[] }) {
  const loop = [...photos, ...photos];
  return (
    <div className="overflow-hidden border-y border-[var(--line)]">
      <div className="film-strip flex w-max gap-3 py-3">
        {loop.map((photo, index) => (
          <img
            key={`${photo.src}-${index}`}
            src={photo.src}
            alt={photo.alt}
            className="h-40 w-64 shrink-0 object-cover md:h-52 md:w-80"
          />
        ))}
      </div>
    </div>
  );
}
