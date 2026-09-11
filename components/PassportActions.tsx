"use client";

import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { PassportCard } from "./PassportCard";
import { SocialShare } from "./SocialShare";
import type { GalleryMemory } from "@/lib/types";

export function PassportActions({ memory }: { memory: GalleryMemory }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  async function download() {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#070b14",
      });
      const link = document.createElement("a");
      link.download = `${memory.tribute_id}-messi-passport.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <PassportCard memory={memory} cardRef={cardRef} />
      </div>
      <div className="flex w-full max-w-[420px] flex-col items-center gap-4">
        <button type="button" className="btn-gold" onClick={download} disabled={saving}>
          {saving ? "Preparing PNG…" : "Download passport PNG"}
        </button>
        <SocialShare tributeId={memory.tribute_id} name={memory.name} />
      </div>
    </div>
  );
}
