import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: "url(/images/world-dots.png)", backgroundSize: "cover" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Independent fan tribute</p>
            <p className="font-serif mt-3 text-4xl gold-text">MESSI 10</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">{SITE.disclaimer}</p>
          </div>
          <div className="flex flex-col gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-[var(--muted)]">
            <Link href="/share" className="hover:text-[var(--gold)]">
              Share a memory
            </Link>
            <Link href="/gallery" className="hover:text-[var(--gold)]">
              Tribute gallery
            </Link>
            <Link href="/rules" className="hover:text-[var(--gold)]">
              Rules & guidelines
            </Link>
            <Link href="/admin" className="hover:text-[var(--gold)]">
              Moderation
            </Link>
          </div>
        </div>
        <div className="gold-line my-10" />
        <div className="flex flex-col gap-3 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.domain}</p>
          <p>
            Official builder{" "}
            <a href={SITE.builder.url} className="text-[var(--gold)] hover:underline" target="_blank" rel="noreferrer">
              {SITE.builder.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
