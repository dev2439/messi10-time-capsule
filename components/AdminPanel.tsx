"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { excerpt, formatDateTime, rpcError } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import type { Memory, MemoryStatus } from "@/lib/types";

const STORAGE_KEY = "messi10-admin";
type Filter = "all" | MemoryStatus;

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [notice, setNotice] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      void load(saved);
    }
  }, []);

  async function load(secret: string) {
    setLoading(true);
    setError("");
    const { data, error: rpcErr } = await supabase.rpc("admin_list_memories", {
      p_password: secret,
      p_status: null,
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
    await load(password);
  }

  async function review(id: string, action: "approve" | "reject") {
    setNotice("");
    setError("");
    setBusyId(id);
    const { data, error: rpcErr } = await supabase.rpc("admin_review_memory", {
      p_password: password,
      p_id: id,
      p_action: action,
      p_note: note.trim() || null,
    });
    setBusyId(null);
    if (rpcErr) {
      setError(rpcError(rpcErr));
      return;
    }
    setNote("");
    if (action === "approve" && data?.tribute_id) {
      setNotice(`Approved. Passport issued: ${data.tribute_id}.`);
    } else {
      setNotice("Rejected. The record stays in the archive under Rejected.");
    }
    await load(password);
  }

  async function restore(id: string) {
    setNotice("");
    setError("");
    setBusyId(id);
    const { error: rpcErr } = await supabase.rpc("admin_restore_memory", {
      p_password: password,
      p_id: id,
    });
    setBusyId(null);
    if (rpcErr) {
      setError(rpcError(rpcErr));
      return;
    }
    setNotice("Restored to the pending queue.");
    setFilter("pending");
    await load(password);
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
    setMemories([]);
  }

  const counts = useMemo(() => {
    return {
      all: memories.length,
      pending: memories.filter((m) => m.status === "pending").length,
      approved: memories.filter((m) => m.status === "approved").length,
      rejected: memories.filter((m) => m.status === "rejected").length,
    };
  }, [memories]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const rows = memories.filter((memory) => {
      if (filter !== "all" && memory.status !== filter) return false;
      if (!needle) return true;
      return [memory.name, memory.location, memory.message, memory.favourite_moment, memory.tribute_id, memory.review_note]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle));
    });
    return rows.sort((a, b) => {
      const delta = new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
      return sort === "newest" ? -delta : delta;
    });
  }, [memories, filter, query, sort]);

  function exportCsv() {
    const header = ["Tribute ID", "Status", "Name", "Location", "Message", "Favourite moment", "Submitted", "Reviewed", "Note"];
    const lines = [
      header.join(","),
      ...visible.map((memory) =>
        [
          memory.tribute_id || "",
          memory.status,
          memory.name,
          memory.location,
          memory.message,
          memory.favourite_moment || "",
          memory.submitted_at,
          memory.reviewed_at || "",
          memory.review_note || "",
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `messi10-${filter}-memories.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <form onSubmit={onLogin} className="frame mx-auto max-w-md p-8">
        <p className="kicker">Moderation desk</p>
        <h1 className="font-serif mt-3 text-4xl">Sign in</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          Review every tribute before it is published. Rejected records remain in the archive.
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
          {loading ? "Checking…" : "Open the desk"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="kicker">Human review</p>
          <h1 className="font-serif mt-3 text-4xl md:text-5xl">Time capsule desk</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {counts.pending} pending · {counts.approved} live · {counts.rejected} rejected · {counts.all} total
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-ghost !w-auto" onClick={() => void load(password)} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button className="btn-ghost !w-auto" onClick={exportCsv} disabled={visible.length === 0}>
            Export CSV
          </button>
          <button className="btn-ghost !w-auto" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="All records" value={counts.all} active={filter === "all"} onClick={() => setFilter("all")} />
        <StatCard label="Pending" value={counts.pending} active={filter === "pending"} onClick={() => setFilter("pending")} />
        <StatCard label="Approved" value={counts.approved} active={filter === "approved"} onClick={() => setFilter("approved")} />
        <StatCard label="Rejected" value={counts.rejected} active={filter === "rejected"} onClick={() => setFilter("rejected")} />
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="flex-1">
          <span className="kicker">Search archive</span>
          <input
            className="field mt-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, city, message, Tribute ID…"
          />
        </label>
        <label>
          <span className="kicker">Sort</span>
          <select
            className="field mt-2 min-w-[180px] bg-transparent"
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      {notice && (
        <p className="mt-6 border border-[var(--line)] bg-[rgba(212,175,55,0.08)] px-4 py-3 text-sm text-[var(--gold-2)]">
          {notice}
        </p>
      )}
      {error && <p className="mt-4 text-sm text-red-200">{error}</p>}

      <div className="mt-8 overflow-hidden border border-[var(--line)]">
        <div className="hidden grid-cols-[1.1fr_0.8fr_0.7fr_1.6fr_0.7fr] gap-4 border-b border-[var(--line)] px-5 py-3 text-[0.62rem] tracking-[0.2em] uppercase text-[var(--muted)] lg:grid">
          <span>Fan</span>
          <span>Location</span>
          <span>Submitted</span>
          <span>Message</span>
          <span>Status</span>
        </div>

        {visible.length === 0 && (
          <div className="p-10 text-center text-[var(--muted)]">No records in this view.</div>
        )}

        {visible.map((memory) => {
          const expanded = openId === memory.id;
          return (
            <article key={memory.id} className="border-b border-[var(--line)] last:border-b-0">
              <button
                type="button"
                className="grid w-full gap-2 px-5 py-5 text-left lg:grid-cols-[1.1fr_0.8fr_0.7fr_1.6fr_0.7fr] lg:items-center"
                onClick={() => {
                  setOpenId(expanded ? null : memory.id);
                  setNote("");
                }}
              >
                <div>
                  <p className="font-serif text-xl">{memory.name}</p>
                  {memory.tribute_id && <p className="mt-1 text-xs text-[var(--gold)]">{memory.tribute_id}</p>}
                </div>
                <p className="text-sm text-[var(--muted)]">{memory.location}</p>
                <p className="text-xs text-[var(--muted)]">{formatDateTime(memory.submitted_at)}</p>
                <p className="text-sm leading-6 text-[var(--ink)]/90">{excerpt(memory.message, 90)}</p>
                <span className={`badge w-fit badge-${memory.status}`}>{memory.status}</span>
              </button>

              {expanded && (
                <div className="border-t border-[var(--line)] bg-black/20 px-5 py-6">
                  <p className="text-sm leading-7">“{memory.message}”</p>
                  {memory.favourite_moment && (
                    <p className="mt-4 text-xs tracking-[0.16em] uppercase text-[var(--celeste)]">
                      Favourite moment · {memory.favourite_moment}
                    </p>
                  )}
                  <div className="mt-4 grid gap-2 text-xs text-[var(--muted)] md:grid-cols-3">
                    <p>Submitted {formatDateTime(memory.submitted_at)}</p>
                    <p>Reviewed {memory.reviewed_at ? formatDateTime(memory.reviewed_at) : "—"}</p>
                    <p>ID {memory.tribute_id || "Not issued"}</p>
                  </div>
                  {memory.review_note && (
                    <p className="mt-4 text-sm text-[var(--gold-2)]">Desk note: {memory.review_note}</p>
                  )}

                  {memory.status === "pending" && (
                    <div className="mt-6">
                      <input
                        className="field"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Optional desk note (kept in the archive, not shown publicly)"
                      />
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <button
                          className="btn-gold !w-auto"
                          disabled={busyId === memory.id}
                          onClick={() => void review(memory.id, "approve")}
                        >
                          Approve & issue passport
                        </button>
                        <button
                          className="btn-danger !w-auto"
                          disabled={busyId === memory.id}
                          onClick={() => void review(memory.id, "reject")}
                        >
                          Reject and keep in archive
                        </button>
                      </div>
                    </div>
                  )}

                  {memory.status === "approved" && memory.tribute_id && (
                    <Link href={`/passport/${memory.tribute_id}`} className="btn-gold mt-6 !w-auto">
                      Open passport {memory.tribute_id}
                    </Link>
                  )}

                  {memory.status === "rejected" && (
                    <button
                      className="btn-ghost mt-6 !w-auto"
                      disabled={busyId === memory.id}
                      onClick={() => void restore(memory.id)}
                    >
                      Restore to pending
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`frame p-5 text-left ${active ? "border-[var(--gold)]" : ""}`}
    >
      <p className="kicker">{label}</p>
      <p className="font-serif mt-2 text-4xl gold-text">{String(value).padStart(2, "0")}</p>
    </button>
  );
}
