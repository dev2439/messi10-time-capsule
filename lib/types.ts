export type MemoryStatus = "pending" | "approved" | "rejected";

export type Memory = {
  id: string;
  name: string;
  location: string;
  message: string;
  favourite_moment: string | null;
  status: MemoryStatus;
  tribute_id: string | null;
  submitted_at: string;
  reviewed_at: string | null;
};

export type GalleryMemory = {
  name: string;
  location: string;
  message: string;
  favourite_moment: string | null;
  tribute_id: string;
  submitted_at: string;
};

export type Submission = {
  ok: boolean;
  id?: string;
  name?: string;
  status?: MemoryStatus;
  tribute_id?: string | null;
  submitted_at?: string;
  message?: string;
  location?: string;
  favourite_moment?: string | null;
};

export type GalleryStats = {
  approved: number;
  locations: number;
};
