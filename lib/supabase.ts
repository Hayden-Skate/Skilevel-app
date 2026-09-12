import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient(accessToken?: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
    auth: { persistSession: false },
  });
}

export const STORAGE_BUCKETS = { profilePhotos: 'profile-photos', skiVideos: 'ski-videos' } as const;
