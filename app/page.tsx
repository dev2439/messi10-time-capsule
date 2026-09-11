import Link from "next/link";
import { MemoryCard } from "@/components/MemoryCard";
import { getApprovedMemories, getGalleryStats } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const chapters = [
  { n: "01", title: "Rosario", copy: "A boy, a ball, a city that still hears the first kick." },
  { n: "10", title: "The Number", copy: "Not a shirt. A language spoken on every continent." },
  { n: "22", title: "The Final", copy: "A night when the planet held its breath together." },
];

const steps = [
  { n: "01", title: "Write", text: "Leave your name, your city, and the memory only you can tell." },
  { n: "02", title: "Human review", text: "Nothing is published automatically. Every line is read." },
  { n: "03", title: "Receive your passport", text: "If approved, a unique Messi Passport is issued for you to keep and share." },
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
            backgroundImage: "url(/images/hero-stadium.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/30 via-[#070b14]/45 to-[#070b14]" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
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

      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
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
          <div className="relative">
            <img
              src="/images/number-10-silhouette.png"
              alt="A footballer wearing number 10 walking toward the lights"
              className="w-full border border-[var(--line)] object-cover"
            />
            <span className="stamp absolute right-6 top-6">No. 10</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl gap-px bg-[var(--line)] md:grid-cols-3">
          {chapters.map((chapter) => (
            <div key={chapter.n} className="bg-[var(--navy)] px-8 py-12">
              <p className="font-serif text-5xl gold-text">{chapter.n}</p>
              <h3 className="mt-6 font-serif text-3xl">{chapter.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{chapter.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="kicker">How the capsule works</p>
        <h2 className="font-serif mt-4 max-w-3xl text-4xl md:text-5xl">Three quiet steps. One lasting tribute.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="frame p-7">
              <p className="text-[var(--gold)] tracking-[0.3em] text-xs">{step.n}</p>
              <h3 className="font-serif mt-4 text-3xl">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0 opacity-25"
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

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="frame relative overflow-hidden px-6 py-14 md:px-16">
          <img
            src="/images/crest-10.png"
            alt=""
            className="pointer-events-none absolute -right-8 -top-10 h-56 w-56 opacity-20"
          />
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
