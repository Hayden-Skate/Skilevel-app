'use client';

import { MountainSnow, Plus, Share2, SlidersHorizontal, UserRound } from 'lucide-react';
import { UserButton, useSession, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import type { StudentProfile } from '@/lib/student-profile';

export default function AccountDashboard() {
  const { user, isLoaded } = useUser(); const { session } = useSession(); const router = useRouter();
  const [students, setStudents] = useState<StudentProfile[]>([]); const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const role = user?.unsafeMetadata?.accountRole as string | undefined;

  useEffect(() => {
    if (isLoaded && user && (!user.firstName || !role)) router.replace('/onboarding');
  }, [isLoaded, user, role, router]);
  useEffect(() => {
    if (!user || !session || !role || role === 'instructor') { if (role === 'instructor') setLoading(false); return; }
    let active = true;
    async function loadStudents() {
      try {
        const token = await session!.getToken(); const supabase = getSupabaseClient(token ?? undefined);
        if (!supabase) throw new Error('The database connection is not configured.');
        const { data: account, error: accountError } = await supabase.from('users').select('id').eq('clerk_user_id', user!.id).single();
        if (accountError) throw accountError;
        const { data, error: studentError } = await supabase.from('students').select('id,name,age,sport,years_experience,home_mountain,self_rated_level,share_slug').eq('owner_user_id', account.id).order('created_at');
        if (studentError) throw studentError;
        if (active) { const profiles = (data ?? []) as StudentProfile[]; setStudents(profiles); setSelectedId(current => current || profiles[0]?.id || ''); }
      } catch (caught) {
        const message = caught instanceof Error ? caught.message : typeof caught === 'object' && caught && 'message' in caught ? String(caught.message) : 'Could not load student profiles.';
        if (active) setError(message);
      }
      finally { if (active) setLoading(false); }
    }
    loadStudents(); return () => { active = false; };
  }, [user, session, role]);

  if (!isLoaded || !user || !user.firstName || !role) return <main className="grid min-h-screen place-items-center bg-[#eef3f4]">Preparing your profile…</main>;
  const profile = students.find(student => student.id === selectedId) ?? students[0];
  const displayName = role === 'instructor' ? user.fullName ?? user.firstName : profile?.name ?? 'Student profile';
  const initials = displayName.split(' ').map(part => part[0]).slice(0,2).join('').toUpperCase();

  return <main className="min-h-screen bg-[#eef3f4] pb-20 text-[#102a2e]">
    <header className="bg-[#123c43] text-white"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"><Link href="/dashboard" className="flex items-center gap-2 text-lg font-black"><span className="grid size-9 place-items-center rounded-xl bg-[#d9f26e] text-[#123c43]"><MountainSnow className="size-5" /></span>SkiLevel</Link><div className="flex items-center gap-3"><span className="hidden text-sm font-bold sm:inline">{user.firstName}</span><UserButton /></div></div></header>
    <section className="bg-[#123c43] pb-20 pt-8 text-white"><div className="mx-auto max-w-6xl px-4 sm:px-6"><p className="text-sm font-bold text-[#d9f26e]">{role === 'instructor' ? 'INSTRUCTOR ACCOUNT' : role === 'parent' ? 'FAMILY DASHBOARD' : 'YOUR SKILEVEL'}</p><h1 className="mt-2 text-4xl font-black tracking-tight">Welcome, {user.firstName}.</h1><p className="mt-2 text-white/65">{role === 'parent' ? 'Choose a child to see and update their SkiLevel.' : 'Only records connected to your account appear here.'}</p></div></section>
    <div className="mx-auto -mt-12 max-w-6xl px-4 sm:px-6">
      {role !== 'instructor' && <section className="mb-5 rounded-2xl border border-white/20 bg-white p-3 shadow-[0_12px_40px_rgba(17,54,60,.08)]"><div className="flex gap-2 overflow-x-auto pb-1">{students.map(student => <button key={student.id} onClick={() => setSelectedId(student.id)} className={`min-h-12 shrink-0 rounded-xl px-5 font-bold ${student.id === profile?.id ? 'bg-[#123c43] text-white' : 'bg-[#f0f4f4] text-[#123c43]'}`}>{student.name}</button>)}<Link href="/students/new" className="flex min-h-12 shrink-0 items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-5 font-bold"><Plus className="size-4" /> Add another child</Link></div></section>}
      {loading ? <section className="rounded-3xl bg-white p-8">Loading student profiles…</section> : error ? <section className="rounded-3xl bg-white p-8 text-red-700"><h2 className="font-black">We could not load this account</h2><p className="mt-2 text-sm">{error}</p></section> : role !== 'instructor' && !profile ? <section className="rounded-3xl bg-white p-8 text-center"><h2 className="text-2xl font-black">Add your first student</h2><p className="mt-2 text-slate-500">Create a separate profile for each child.</p><Link href="/students/new" className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-[#123c43] px-6 font-bold text-white">Add student</Link></section> : <div className="grid gap-5 lg:grid-cols-[1.35fr_.85fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(17,54,60,.08)]"><div className="flex items-center gap-4"><div className="grid size-16 place-items-center rounded-2xl bg-[#d9f26e] text-xl font-black">{initials}</div><div><p className="text-sm font-semibold text-slate-500">{profile?.sport ? `${profile.sport === 'ski' ? 'Skier' : 'Snowboarder'} profile` : 'Account profile'}</p><h2 className="text-2xl font-black">{displayName}{profile?.age ? `, ${profile.age}` : ''}</h2><p className="text-sm text-slate-500">{profile?.home_mountain || 'No home mountain added'}</p></div></div>
          {role !== 'instructor' && <><div className="my-7 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl bg-[#f4f7f8] py-5 text-center"><div><strong className="block text-2xl">—</strong><span className="text-xs font-bold text-slate-500">SkiLevel</span></div><div><strong className="block text-2xl">{profile?.years_experience ?? 0}</strong><span className="text-xs font-bold text-slate-500">Years</span></div><div><strong className="block text-2xl">0</strong><span className="text-xs font-bold text-slate-500">Mountains</span></div></div><div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center"><SlidersHorizontal className="mx-auto size-7 text-teal-700" /><h3 className="mt-3 font-black">Rate {profile?.name}&apos;s terrain confidence</h3><p className="mt-1 text-sm text-slate-500">Their SkiLevel will appear after the first terrain ratings.</p><button className="mt-4 min-h-11 rounded-xl bg-[#123c43] px-5 font-bold text-white">Start ratings</button></div></>}
        </section>
        <div className="grid gap-5"><section className="rounded-3xl bg-[#d9f26e] p-6"><UserRound className="size-6" /><h2 className="mt-4 text-xl font-black">{role === 'instructor' ? 'Instructor workspace' : `${profile?.name}'s profile`}</h2><p className="mt-2 text-sm leading-6 opacity-75">Mountain visits, instructor notes, videos, and sharing remain separate for this student.</p>{role !== 'instructor' && <Link href="/students/new" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#123c43] font-bold text-white"><Plus className="size-4" /> Add another child</Link>}</section>{role !== 'instructor' && <section className="rounded-3xl bg-white p-6"><h2 className="text-xl font-black">Mountain history</h2><p className="mt-2 text-sm text-slate-500">No mountain visits yet.</p><button className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#123c43] font-bold text-white"><Plus className="size-5" /> Add first visit</button><button className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 font-bold"><Share2 className="size-5" /> Share profile</button></section>}</div>
      </div>}
    </div>
  </main>;
}
