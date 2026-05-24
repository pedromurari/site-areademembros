const FALLBACK_SUPABASE_URL = "https://usqiyekfmwwnvkmkdlej.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_jkqjM8k9AMnNgA88DJbENg_4wVGQPYR";

export function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL,
    publishableKey:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      FALLBACK_SUPABASE_PUBLISHABLE_KEY,
  };
}
