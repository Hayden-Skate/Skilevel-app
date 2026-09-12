# SkiLevel

A mobile-first, portable skier and snowboarder ability profile for students, parents, and instructors.

## Local setup

1. Copy `.env.example` to `.env.local` and add Clerk and Supabase project credentials.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create private Supabase Storage buckets named `profile-photos` and `ski-videos`.
4. Configure Clerk's Supabase integration/JWT template so the Clerk `sub` claim can be matched to `users.clerk_user_id`, then add ownership policies for each table.
5. Run `npm run dev`.

The app displays representative mock data when credentials are absent. `lib/supabase.ts` is the persistence boundary, `lib/trail-provider.ts` is the future trail API boundary, and `lib/skilevel.ts` contains the replaceable MVP scoring rule.

## Trail data

Manual mountain and trail entry is the MVP fallback. When a trail-data provider is selected, set `TRAIL_DATA_API_URL` and `TRAIL_DATA_API_KEY`, then adapt the response mapping in `lib/trail-provider.ts`. The database preserves `source` and `external_id` fields so provider data can coexist with manual entries.

## Video

Videos belong in the private `ski-videos` bucket. Store searchable metadata in `ski_videos` and issue short-lived signed playback URLs from trusted server-side code.
