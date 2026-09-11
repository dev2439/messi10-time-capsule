import { createClient } from "@supabase/supabase-js";
import { SITE } from "./site";

export const supabase = createClient(SITE.supabaseUrl, SITE.supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
