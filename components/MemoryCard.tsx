import Link from "next/link";
import { formatDate } from "@/lib/format";
import { photoForId } from "@/lib/photos";
import type { GalleryMemory } from "@/lib/types";

export function MemoryCard({ memory }: { memory: GalleryMemory }) {
  const photo = photoForId(memory.tribute_id);

  return (
    <article className="frame overflow-hidden flex flex-col min-h-[420px]">
      <div className="relative h-44 overflow-hidden">
        <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
        <span className="stamp absolute right-4 top-4">{memory.tribute_id}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div>
          <p className="font-serif text-2xl">{memory.name}</p>
          <p className="mt-1 text-xs tracking-[0.18em] uppercase text-[var(--muted)]">{memory.location}</p>
        </div>
        <p className="mt-5 flex-1 text-[0.95rem] leading-7 text-[var(--ink)]/90">“{memory.message}”</p>
        {memory.favourite_moment && (
          <p className="mt-4 text-xs tracking-[0.16em] uppercase text-[var(--celeste)]">
            Favourite moment · {memory.favourite_moment}
          </p>
        )}
        <div className="mt-6 flex items-center justify-between text-xs text-[var(--muted)]">
          <span>{formatDate(memory.submitted_at)}</span>
          <Link href={`/passport/${memory.tribute_id}`} className="tracking-[0.18em] uppercase text-[var(--gold)]">
            Passport
          </Link>
        </div>
      </div>
    </article>
  );
}
