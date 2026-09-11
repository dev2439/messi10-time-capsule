import type { Metadata } from "next";
import { MemoryCard } from "@/components/MemoryCard";
import { PhotoStrip } from "@/components/PhotoGrid";
import { getApprovedMemories } from "@/lib/data";
import { STRIP_PHOTOS } from "@/lib/photos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tribute gallery",
  description: "A wall of approved Messi memories from fans around the world. Newest first.",
};

export default async function GalleryPage() {
  const memories = await getApprovedMemories();

  return (
    <div className="pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-5">
        <p className="kicker">The wall</p>
        <h1 className="font-serif mt-4 max-w-3xl text-5xl md:text-6xl">Approved memories, newest first.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          Every card on this wall has been read by a person. Each one carries a Tribute ID and a
          downloadable Messi Passport.
        </p>
      </div>

      <div className="mt-10">
        <PhotoStrip photos={STRIP_PHOTOS} />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        {memories.length === 0 ? (
          <div className="frame mt-14 p-12 text-center text-[var(--muted)]">
            The capsule is waiting for its first approved memory.
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {memories.map((memory) => (
              <MemoryCard key={memory.tribute_id} memory={memory} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
