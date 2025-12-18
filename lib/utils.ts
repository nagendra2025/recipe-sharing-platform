import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates that required Supabase environment variables are set
 * @throws Error if environment variables are missing
 */
export function validateSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || url === "https://your-project-id.supabase.co") {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Please set it in your .env.local file.\n" +
        "Get your project URL from: https://supabase.com/dashboard/project/_/settings/api"
    );
  }

  if (!key || key === "your-anon-key-here") {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Please set it in your .env.local file.\n" +
        "Get your anon key from: https://supabase.com/dashboard/project/_/settings/api"
    );
  }

  return { url, key };
}
