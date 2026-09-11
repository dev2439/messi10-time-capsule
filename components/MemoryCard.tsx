import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { GalleryMemory } from "@/lib/types";

export function MemoryCard({ memory }: { memory: GalleryMemory }) {
  return (
    <article className="frame p-6 md:p-7 flex flex-col min-h-[320px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-2xl">{memory.name}</p>
          <p className="mt-1 text-xs tracking-[0.18em] uppercase text-[var(--muted)]">{memory.location}</p>
        </div>
        <span className="stamp">{memory.tribute_id}</span>
      </div>
      <p className="mt-6 flex-1 text-[0.95rem] leading-7 text-[var(--ink)]/90">“{memory.message}”</p>
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
    </article>
  );
}
