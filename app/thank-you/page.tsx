"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PassportActions } from "@/components/PassportActions";
import { supabase } from "@/lib/supabase";
import type { GalleryMemory, Submission } from "@/lib/types";

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouInner />
    </Suspense>
  );
}

function ThankYouInner() {
  const token = useSearchParams().get("token");
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    if (!token) return;
    let alive = true;

    async function load() {
      const { data } = await supabase.rpc("get_submission", { p_token: token });
      if (alive) setSubmission(data as Submission);
    }

    void load();
    const timer = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [token]);

  if (!token) {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
        <h1 className="font-serif text-5xl">We could not find that tribute.</h1>
        <Link href="/share" className="btn-gold mt-8 sm:!w-auto">
          Share a memory
        </Link>
      </div>
    );
  }

  if (!submission?.ok) {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
        <p className="kicker">Sealed</p>
        <h1 className="font-serif mt-4 text-5xl">Looking for your memory…</h1>
      </div>
    );
  }

  if (submission.status === "approved" && submission.tribute_id) {
    const memory: GalleryMemory = {
      name: submission.name || "",
      location: submission.location || "",
      message: submission.message || "",
      favourite_moment: submission.favourite_moment || null,
      tribute_id: submission.tribute_id,
      submitted_at: submission.submitted_at || new Date().toISOString(),
    };

    return (
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
        <p className="kicker">Approved</p>
        <h1 className="font-serif mt-4 text-5xl md:text-6xl">Your Messi Passport is ready.</h1>
        <p className="mt-5 max-w-xl text-[var(--muted)]">
          Tribute ID {memory.tribute_id}. Download it, keep it, share it with the world.
        </p>
        <div className="mt-12">
          <PassportActions memory={memory} />
        </div>
      </div>
    );
  }

  if (submission.status === "rejected") {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
        <p className="kicker">Reviewed</p>
        <h1 className="font-serif mt-4 text-5xl">This memory was not published.</h1>
        <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
          Thank you for writing. Publication is never guaranteed. You are welcome to send another
          tribute that follows the house rules.
        </p>
        <Link href="/rules" className="btn-ghost mt-8 sm:!w-auto">
          Read the guidelines
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <p className="kicker">Under review</p>
      <h1 className="font-serif mt-4 text-5xl md:text-6xl">Your memory is in the capsule.</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
        Thank you, {submission.name}. A person will read your words. If it is approved, this page
        will reveal your Messi Passport automatically. Keep the link.
      </p>
      <p className="mt-8 text-xs tracking-[0.2em] uppercase text-[var(--gold)]">Awaiting rigorous human review</p>
    </div>
  );
}
