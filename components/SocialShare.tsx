"use client";

import { SITE } from "@/lib/site";

export function SocialShare({ tributeId, name }: { tributeId: string; name: string }) {
  const page = `${SITE.url}/passport/${tributeId}`;
  const text = `I received Messi Passport ${tributeId}. A fan tribute for the greatest to ever play.`;

  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(page)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(page)}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${text} ${page}`)}`;

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({
        title: `Messi Passport · ${tributeId}`,
        text: `${name} · ${text}`,
        url: page,
      });
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a className="btn-ghost !w-auto" href={twitter} target="_blank" rel="noreferrer">
        Share on X
      </a>
      <a className="btn-ghost !w-auto" href={facebook} target="_blank" rel="noreferrer">
        Facebook
      </a>
      <a className="btn-ghost !w-auto" href={whatsapp} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      {"share" in (typeof navigator === "undefined" ? {} : navigator) && (
        <button type="button" className="btn-ghost !w-auto" onClick={nativeShare}>
          More
        </button>
      )}
    </div>
  );
}
