import { createBrowserClient } from "@supabase/ssr";
import { validateSupabaseEnv } from "@/lib/utils";

export function createClient() {
  const { url, key } = validateSupabaseEnv();
  return createBrowserClient(url, key);
}

