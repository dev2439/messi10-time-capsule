"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { formatDate, rpcError } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import type { Memory } from "@/lib/types";

const STORAGE_KEY = "messi10-admin";

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"pending" | "all">("pending");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      void load(saved, "pending");
    }
  }, []);

  async function load(secret: string, status: "pending" | "all") {
    setLoading(true);
    setError("");
    const { data, error: rpcErr } = await supabase.rpc("admin_list_memories", {
      p_password: secret,
      p_status: status === "all" ? null : status,
    });
    setLoading(false);
    if (rpcErr) {
      setAuthed(false);
      sessionStorage.removeItem(STORAGE_KEY);
      setError(rpcError(rpcErr));
      return;
    }
    setAuthed(true);
    sessionStorage.setItem(STORAGE_KEY, secret);
    setMemories((data || []) as Memory[]);
  }

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    await load(password, filter);
  }

  async function review(id: string, action: "approve" | "reject") {
    setNotice("");
    const { data, error: rpcErr } = await supabase.rpc("admin_review_memory", {
      p_password: password,
      p_id: id,
      p_action: action,
    });
    if (rpcErr) {
      setError(rpcError(rpcErr));
      return;
    }
    if (action === "approve" && data?.tribute_id) {
      setNotice(`Passport generated for ${data.tribute_id}.`);
    } else {
      setNotice("Memory rejected and kept off the gallery.");
    }
    await load(password, filter);
  }

  const pendingCount = useMemo(
    () => memories.filter((m) => m.status === "pending").length,
    [memories],
  );

  if (!authed) {
    return (
      <form onSubmit={onLogin} className="frame mx-auto max-w-md p-8">
        <p className="kicker">Moderation</p>
        <h1 className="font-serif mt-3 text-4xl">Enter quietly</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          Approve or reject memories before they go live and before a passport is issued.
        </p>
        <input
          className="field mt-8"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          required
        />
        {error && <p className="mt-4 text-sm text-red-200">{error}</p>}
        <button className="btn-gold mt-8" type="submit" disabled={loading}>
          {loading ? "Checking…" : "Open the panel"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="kicker">Human review</p>
          <h1 className="font-serif mt-3 text-4xl md:text-5xl">Time capsule desk</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">{pendingCount} awaiting a decision</p>
        </div>
        <div className="flex gap-3">
          <button
            className={filter === "pending" ? "btn-gold !w-auto" : "btn-ghost !w-auto"}
            onClick={() => {
              setFilter("pending");
              void load(password, "pending");
            }}
          >
            Pending
          </button>
          <button
            className={filter === "all" ? "btn-gold !w-auto" : "btn-ghost !w-auto"}
            onClick={() => {
              setFilter("all");
              void load(password, "all");
            }}
          >
            All
          </button>
        </div>
      </div>

      {notice && (
        <p className="mt-6 border border-[var(--line)] bg-[rgba(212,175,55,0.08)] px-4 py-3 text-sm text-[var(--gold-2)]">
          {notice}
        </p>
      )}
      {error && <p className="mt-4 text-sm text-red-200">{error}</p>}

      <div className="mt-10 grid gap-5">
        {memories.length === 0 && (
          <div className="frame p-10 text-center text-[var(--muted)]">No memories in this view.</div>
        )}
        {memories.map((memory) => (
          <article key={memory.id} className="frame p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-serif text-2xl">{memory.name}</p>
                <p className="mt-1 text-xs tracking-[0.18em] uppercase text-[var(--muted)]">
                  {memory.location} · {formatDate(memory.submitted_at)}
                </p>
              </div>
              <span className="stamp">{memory.status}</span>
            </div>
            <p className="mt-5 leading-7">“{memory.message}”</p>
            {memory.favourite_moment && (
              <p className="mt-4 text-xs tracking-[0.16em] uppercase text-[var(--celeste)]">
                {memory.favourite_moment}
              </p>
            )}
            {memory.status === "pending" ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="btn-gold !w-auto" onClick={() => review(memory.id, "approve")}>
                  Approve & issue passport
                </button>
                <button className="btn-ghost !w-auto" onClick={() => review(memory.id, "reject")}>
                  Reject
                </button>
              </div>
            ) : (
              memory.tribute_id && (
                <Link href={`/passport/${memory.tribute_id}`} className="mt-6 inline-block text-[var(--gold)]">
                  Open {memory.tribute_id}
                </Link>
              )
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
