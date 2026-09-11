import type { Metadata } from "next";
import { PhotoFrame } from "@/components/PhotoGrid";
import { ShareForm } from "@/components/ShareForm";
import { PHOTOS } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Share your memory",
  description: "Leave a Messi memory in the digital time capsule. Every message is reviewed by a person.",
};

export default function SharePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="kicker">For the greatest to ever play</p>
          <h1 className="font-serif mt-4 text-5xl md:text-6xl">Write it while it still feels like yesterday.</h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[var(--muted)]">
            A name. A place. A few lines only you could write. If the memory is approved, your Messi
            Passport is generated automatically — a collectible you can download and share.
          </p>
          <ul className="mt-10 space-y-4 text-sm text-[var(--muted)]">
            <li>No hate speech. No abuse. No impersonation.</li>
            <li>Publication is never guaranteed.</li>
            <li>Passports are issued only after human approval.</li>
          </ul>
          <div className="mt-10 grid grid-cols-2 gap-3">
            <PhotoFrame photo={PHOTOS.sit} className="col-span-2 aspect-[16/9]" />
            <PhotoFrame photo={PHOTOS.rain} className="aspect-[4/3]" />
            <PhotoFrame photo={PHOTOS.celebration} className="aspect-[4/3]" />
            <PhotoFrame photo={PHOTOS.kid} className="aspect-[4/3]" />
            <PhotoFrame photo={PHOTOS.street} className="aspect-[4/3]" />
          </div>
        </div>
        <ShareForm />
      </div>
    </div>
  );
}
