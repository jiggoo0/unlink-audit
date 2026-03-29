import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// 🛡️ Validation: Only warn but don't crash the entire module initialization
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.error(
      "[SUPABASE_ERROR] Missing Supabase Configuration. Please check your environment variables.",
    );
  }
}

// 🛡️ Public Client (For RLS restricted access)
export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key",
);
