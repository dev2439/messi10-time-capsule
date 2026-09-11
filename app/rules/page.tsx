import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rules & guidelines",
  description: "Moderation rules, publication policy, and the non-affiliation disclaimer for the Messi time capsule.",
};

const rules = [
  {
    title: "No hate speech",
    copy: "No racism, sexism, homophobia, threats, harassment, or attacks on people or communities. Warm rivalry is welcome. Cruelty is not.",
  },
  {
    title: "All messages are moderated",
    copy: "Nothing appears in the gallery automatically. Every submission waits in a private queue until a human reads it.",
  },
  {
    title: "No guaranteed publication",
    copy: "Sending a memory does not entitle it to appear on the site or to receive a passport. The capsule is curated.",
  },
  {
    title: "Rigorous human review",
    copy: "We look for sincerity, respect, and a genuine connection to Messi’s story. Spam, advertising, and impersonation are declined.",
  },
  {
    title: "Passports follow approval",
    copy: "A Messi Passport is generated only after approval. Rejected messages stay off the wall and never receive an ID.",
  },
  {
    title: "Independent tribute",
    copy: "This project is not affiliated with Lionel Messi, FIFA, FC Barcelona, Inter Miami, or any representatives, sponsors, or rights holders.",
  },
];

export default function RulesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32">
      <p className="kicker">House rules</p>
      <h1 className="font-serif mt-4 text-5xl md:text-6xl">A beautiful wall needs a careful door.</h1>
      <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
        This is a fan-built gift. The standard is simple: write as if the person beside you in the
        stadium might read it too.
      </p>

      <div className="mt-12 grid gap-5">
        {rules.map((rule, index) => (
          <article key={rule.title} className="frame p-7">
            <p className="text-xs tracking-[0.3em] text-[var(--gold)]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="font-serif mt-3 text-3xl">{rule.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{rule.copy}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href="/share" className="btn-gold sm:!w-auto">
          I understand — write a memory
        </Link>
        <Link href="/gallery" className="btn-ghost sm:!w-auto">
          Visit the gallery
        </Link>
      </div>
    </div>
  );
}
