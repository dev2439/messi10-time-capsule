"use client";

import type { RefObject } from "react";
import { QRCodeSVG } from "qrcode.react";
import { SITE } from "@/lib/site";
import { excerpt, formatDate } from "@/lib/format";
import type { GalleryMemory } from "@/lib/types";

export function PassportCard({
  memory,
  cardRef,
}: {
  memory: GalleryMemory;
  cardRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden text-[var(--ink)]"
      style={{
        width: 420,
        minHeight: 630,
        background:
          "radial-gradient(circle at top, rgba(116,172,223,0.16), transparent 34%), linear-gradient(180deg, #10182a, #070b14 48%, #05070c)",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "url(/images/passport-leather.png)", backgroundSize: "cover" }}
      />
      <div className="absolute inset-3 border border-[rgba(212,175,55,0.45)]" />
      <div className="absolute inset-5 border border-[rgba(212,175,55,0.18)]" />

      <div className="relative flex h-full min-h-[630px] flex-col px-8 py-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.42em] text-[var(--gold)]">DIGITAL COLLECTIBLE</p>
            <p className="font-serif mt-2 text-3xl tracking-[0.18em]">MESSI PASSPORT</p>
          </div>
          <img src="/images/crest-10.png" alt="" className="h-16 w-16 object-contain" />
        </div>

        <div className="gold-line my-6" />

        <p className="text-[10px] tracking-[0.32em] text-[var(--muted)]">BEARER</p>
        <p className="font-serif mt-1 text-[2.05rem] leading-tight">{memory.name}</p>
        <p className="mt-2 text-xs tracking-[0.2em] uppercase text-[var(--celeste)]">{memory.location}</p>

        <div className="mt-8 grid grid-cols-2 gap-5">
          <div>
            <p className="text-[10px] tracking-[0.28em] text-[var(--muted)]">TRIBUTE ID</p>
            <p className="mt-1 text-lg text-[var(--gold-2)]">{memory.tribute_id}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.28em] text-[var(--muted)]">ISSUED</p>
            <p className="mt-1 text-sm">{formatDate(memory.submitted_at)}</p>
          </div>
        </div>

        <div className="mt-7 flex-1">
          <p className="text-[10px] tracking-[0.28em] text-[var(--muted)]">EXCERPT</p>
          <p className="font-serif mt-2 text-lg leading-8">“{excerpt(memory.message, 160)}”</p>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="max-w-[210px]">
            <p className="text-[9px] leading-4 tracking-[0.04em] text-[var(--muted)]">{SITE.disclaimer}</p>
            <p className="mt-2 text-[10px] tracking-[0.22em] text-[var(--gold)]">{SITE.domain}</p>
          </div>
          <div className="bg-[var(--ink)] p-1.5">
            <QRCodeSVG value={SITE.url} size={78} bgColor="#f6f1e7" fgColor="#070b14" />
          </div>
        </div>
      </div>
    </div>
  );
}
