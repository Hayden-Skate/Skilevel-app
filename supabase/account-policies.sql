-- Run after schema.sql. These policies connect Clerk's JWT `sub` to SkiLevel ownership.
create policy "Users can view their own account" on public.users for select to authenticated
using (clerk_user_id = (select auth.jwt()->>'sub'));
create policy "Users can create their own account" on public.users for insert to authenticated
with check (clerk_user_id = (select auth.jwt()->>'sub'));
create policy "Users can update their own account" on public.users for update to authenticated
using (clerk_user_id = (select auth.jwt()->>'sub')) with check (clerk_user_id = (select auth.jwt()->>'sub'));

create policy "Parents can view their students" on public.students for select to authenticated
using (owner_user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')));
create policy "Parents can add students" on public.students for insert to authenticated
with check (owner_user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')));
create policy "Parents can update their students" on public.students for update to authenticated
using (owner_user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')))
with check (owner_user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')));
create policy "Parents can remove their students" on public.students for delete to authenticated
using (owner_user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')));

create policy "Instructors can view their own record" on public.instructors for select to authenticated
using (user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')));
create policy "Instructors can create their own record" on public.instructors for insert to authenticated
with check (user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')));
create policy "Instructors can update their own record" on public.instructors for update to authenticated
using (user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')))
with check (user_id in (select id from public.users where clerk_user_id = (select auth.jwt()->>'sub')));
