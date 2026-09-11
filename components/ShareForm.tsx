"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { MOMENT_SUGGESTIONS } from "@/lib/site";
import { rpcError } from "@/lib/format";
import { supabase } from "@/lib/supabase";

export function ShareForm() {
  const router = useRouter();
  const startedAt = useMemo(() => new Date().toISOString(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const { error: rpcErr, data } = await supabase.rpc("submit_memory", {
      p_name: String(form.get("name") || ""),
      p_location: String(form.get("location") || ""),
      p_message: String(form.get("message") || ""),
      p_favourite_moment: String(form.get("favourite_moment") || ""),
      p_honeypot: String(form.get("company") || ""),
      p_started_at: startedAt,
      p_messi_number: String(form.get("messi_number") || ""),
    });

    setLoading(false);

    if (rpcErr) {
      setError(rpcError(rpcErr));
      return;
    }

    const payload = (typeof data === "string" ? JSON.parse(data) : data) as {
      access_token?: string;
    };
    const token = payload?.access_token;
    if (!token) {
      setError("Your memory was received, but we could not open the confirmation page.");
      return;
    }

    router.push(`/thank-you?token=${token}`);
  }

  return (
    <form onSubmit={onSubmit} className="frame p-6 md:p-10">
      <p className="kicker">Tribute application</p>
      <h2 className="font-serif mt-3 text-3xl md:text-4xl">Share your memory</h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
        Write from the heart. Every message is reviewed by a person before it enters the capsule or
        receives a Messi Passport.
      </p>

      <div className="gold-line my-8" />

      <label className="block">
        <span className="kicker">01 · Your name</span>
        <input className="field mt-2" name="name" required minLength={2} maxLength={80} placeholder="As you wish it to appear" />
      </label>

      <label className="mt-8 block">
        <span className="kicker">02 · Location</span>
        <input className="field mt-2" name="location" required minLength={2} maxLength={80} placeholder="City, country" />
      </label>

      <label className="mt-8 block">
        <span className="kicker">03 · Your message</span>
        <textarea
          className="field mt-2"
          name="message"
          required
          minLength={20}
          maxLength={800}
          placeholder="What did Messi mean to you?"
        />
      </label>

      <label className="mt-8 block">
        <span className="kicker">04 · Favourite Messi moment · optional</span>
        <input
          className="field mt-2"
          name="favourite_moment"
          maxLength={200}
          list="moments"
          placeholder="World Cup 2022, a goal, a night you remember"
        />
        <datalist id="moments">
          {MOMENT_SUGGESTIONS.map((moment) => (
            <option key={moment} value={moment} />
          ))}
        </datalist>
      </label>

      <label className="mt-8 block">
        <span className="kicker">05 · Fan question · what number did Messi wear?</span>
        <input className="field mt-2" name="messi_number" required placeholder="The answer every fan knows" />
      </label>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p className="mt-6 border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm text-red-200">{error}</p>
      )}

      <button type="submit" disabled={loading} className="btn-gold mt-10">
        {loading ? "Sealing your memory…" : "Place in the capsule"}
      </button>
    </form>
  );
}
