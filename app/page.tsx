import Link from "next/link";
import { MemoryCard } from "@/components/MemoryCard";
import { PhotoFrame, PhotoMosaic, PhotoStrip } from "@/components/PhotoGrid";
import { getApprovedMemories, getGalleryStats } from "@/lib/data";
import { PHOTOS, STORY_PHOTOS, STRIP_PHOTOS } from "@/lib/photos";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const chapters = [
  { n: "01", title: "Rosario", copy: "A boy, a ball, a city that still hears the first kick.", photo: PHOTOS.rosario },
  { n: "10", title: "The Number", copy: "Not a shirt. A language spoken on every continent.", photo: PHOTOS.dribble },
  { n: "22", title: "The Final", copy: "A night when the planet held its breath together.", photo: PHOTOS.finalNight },
];

const steps = [
  { n: "01", title: "Write", text: "Leave your name, your city, and the memory only you can tell.", photo: PHOTOS.locker },
  { n: "02", title: "Human review", text: "Nothing is published automatically. Every line is read.", photo: PHOTOS.kid },
  { n: "03", title: "Receive your passport", text: "If approved, a unique Messi Passport is issued for you to keep and share.", photo: PHOTOS.goldenBall },
];

export default async function HomePage() {
  const [memories, stats] = await Promise.all([getApprovedMemories(), getGalleryStats()]);
  const featured = memories.slice(0, 3);

  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0 scale-105"
          style={{
            backgroundImage: "url(/images/messi-dribble.png)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/25 via-[#070b14]/50 to-[#070b14]" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{ backgroundImage: "url(/images/gold-bokeh.png)", backgroundSize: "cover" }}
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32">
          <p className="kicker rise">A digital time capsule · {SITE.domain}</p>
          <h1 className="font-serif mt-6 max-w-4xl text-5xl leading-[0.92] md:text-7xl lg:text-8xl">
            From Rosario
            <span className="gold-text"> to every corner of the planet.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--ink)]/85 md:text-xl">
            {SITE.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:w-auto sm:max-w-none">
            <Link href="/share" className="btn-gold sm:!w-auto">
              Share your memory
            </Link>
            <Link href="/gallery" className="btn-ghost sm:!w-auto">
              Enter the gallery
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            <Stat label="Memories" value={String(stats.approved).padStart(3, "0")} />
            <Stat label="Places" value={String(stats.locations).padStart(2, "0")} />
            <Stat label="The number" value="10" />
          </div>
        </div>
      </section>

      <PhotoStrip photos={STRIP_PHOTOS} />

      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="kicker">Why this exists</p>
            <h2 className="font-serif mt-4 text-4xl md:text-5xl">A gift, not a campaign.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
              This project is emotional. Millions of us grew up watching him. Like them, he inspired a
              life. This is not just another website. It is a place for fans to say thank you — quietly,
              beautifully, and forever.
            </p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--muted)]">{SITE.disclaimer}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PhotoFrame photo={PHOTOS.portrait} className="aspect-[3/4]" />
            <div className="grid gap-3">
              <PhotoFrame photo={PHOTOS.sky} className="aspect-square" />
              <PhotoFrame photo={PHOTOS.football} className="aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          {chapters.map((chapter) => (
            <div key={chapter.n} className="relative min-h-[420px] overflow-hidden">
              <img src={chapter.photo.src} alt={chapter.photo.alt} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/55 to-black/20" />
              <div className="relative flex h-full flex-col justify-end px-8 py-12">
                <p className="font-serif text-5xl gold-text">{chapter.n}</p>
                <h3 className="mt-6 font-serif text-3xl">{chapter.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--gold-2)]/90">{chapter.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="kicker">A life in pictures</p>
        <h2 className="font-serif mt-4 max-w-3xl text-4xl md:text-5xl">From a dusty street to every floodlit night.</h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          Original artwork created for this tribute — Messi, the ball, the stadiums, the living rooms.
        </p>
        <div className="mt-12">
          <PhotoMosaic photos={STORY_PHOTOS} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <p className="kicker">How the capsule works</p>
        <h2 className="font-serif mt-4 max-w-3xl text-4xl md:text-5xl">Three quiet steps. One lasting tribute.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="frame overflow-hidden">
              <img src={step.photo.src} alt={step.photo.alt} className="h-44 w-full object-cover" />
              <div className="p-7">
                <p className="text-[var(--gold)] tracking-[0.3em] text-xs">{step.n}</p>
                <h3 className="font-serif mt-4 text-3xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "url(/images/world-dots.png)", backgroundSize: "cover" }}
        />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker">Latest from the wall</p>
              <h2 className="font-serif mt-4 text-4xl md:text-5xl">Fans, from everywhere.</h2>
            </div>
            <Link href="/gallery" className="btn-ghost sm:!w-auto">
              Full gallery
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featured.map((memory) => (
              <MemoryCard key={memory.tribute_id} memory={memory} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-28">
        <div className="relative overflow-hidden border border-[var(--line)]">
          <img src={PHOTOS.trophy.src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#070b14]/85 to-[#070b14]/40" />
          <div className="relative px-6 py-14 md:px-16">
            <p className="kicker">The Messi Passport</p>
            <h2 className="font-serif mt-4 max-w-3xl text-4xl md:text-6xl">A premium digital collectible for every approved tribute.</h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Name, unique Tribute ID, date, a short excerpt, a QR back to {SITE.domain}, and the
              non-affiliation disclaimer — designed as something fans will be proud to share.
            </p>
            <Link href="/share" className="btn-gold mt-10 sm:!w-auto">
              Begin your tribute
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-serif text-3xl md:text-4xl gold-text">{value}</p>
      <p className="mt-1 text-[0.62rem] tracking-[0.22em] uppercase text-[var(--muted)]">{label}</p>
    </div>
  );
}
