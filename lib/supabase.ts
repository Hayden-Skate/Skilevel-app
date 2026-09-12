import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient(accessToken?: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !publishableKey) return null;
  return createClient(url, publishableKey, accessToken ? { accessToken: async () => accessToken } : undefined);
}

export const STORAGE_BUCKETS = { profilePhotos: 'profile-photos', skiVideos: 'ski-videos' } as const;
