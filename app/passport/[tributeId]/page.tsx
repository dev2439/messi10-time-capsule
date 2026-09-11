import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PassportActions } from "@/components/PassportActions";
import { getMemoryByTributeId } from "@/lib/data";
import { PHOTOS } from "@/lib/photos";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tributeId: string }>;
}): Promise<Metadata> {
  const { tributeId } = await params;
  const memory = await getMemoryByTributeId(tributeId);
  if (!memory) return { title: "Passport" };
  return {
    title: `${memory.tribute_id} · ${memory.name}`,
    description: `Messi Passport for ${memory.name} from ${memory.location}.`,
    openGraph: {
      title: `Messi Passport ${memory.tribute_id}`,
      description: `${memory.name} · ${memory.location}`,
      url: `${SITE.url}/passport/${memory.tribute_id}`,
    },
  };
}

export default async function PassportPage({
  params,
}: {
  params: Promise<{ tributeId: string }>;
}) {
  const { tributeId } = await params;
  const memory = await getMemoryByTributeId(tributeId);
  if (!memory) notFound();

  return (
    <div className="relative pb-24 pt-32">
      <img
        src={PHOTOS.campNou.src}
        alt=""
        className="pointer-events-none absolute inset-0 h-[420px] w-full object-cover opacity-25"
      />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#070b14]/40 to-[#070b14]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="kicker">Issued collectible</p>
            <h1 className="font-serif mt-4 text-5xl md:text-6xl">{memory.tribute_id}</h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[var(--muted)]">
              {memory.name}, {memory.location}. A Messi Passport created after human approval — ready to
              download and share.
            </p>
          </div>
          <PassportActions memory={memory} />
        </div>
      </div>
    </div>
  );
}
