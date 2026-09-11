import { supabase } from "./supabase";
import type { GalleryMemory, GalleryStats } from "./types";

export async function getApprovedMemories(): Promise<GalleryMemory[]> {
  const { data, error } = await supabase
    .from("memories")
    .select("name, location, message, favourite_moment, tribute_id, submitted_at")
    .eq("status", "approved")
    .order("submitted_at", { ascending: false });

  if (error || !data) return [];
  return data.filter((row) => Boolean(row.tribute_id)) as GalleryMemory[];
}

export async function getMemoryByTributeId(tributeId: string) {
  const { data } = await supabase
    .from("memories")
    .select("name, location, message, favourite_moment, tribute_id, submitted_at")
    .eq("status", "approved")
    .eq("tribute_id", tributeId.toUpperCase())
    .maybeSingle();

  return data as GalleryMemory | null;
}

export async function getGalleryStats(): Promise<GalleryStats> {
  const { data, error } = await supabase.rpc("gallery_stats");
  if (error || !data) return { approved: 0, locations: 0 };
  return data as GalleryStats;
}
