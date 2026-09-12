'use client';
import { MountainSnow, Plus, Share2, SlidersHorizontal, UserRound } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type StudentProfile = { name?: string; age?: number; sport?: string; yearsExperience?: number; homeMountain?: string; selfRatedLevel?: string };

export default function AccountDashboard() {
  const { user, isLoaded } = useUser(); const router = useRouter();
  const role = user?.unsafeMetadata?.accountRole as string | undefined;
  const profile = user?.unsafeMetadata?.studentProfile as StudentProfile | undefined;
  useEffect(() => { if (isLoaded && user && (!user.firstName || !role)) router.replace('/onboarding'); }, [isLoaded, user, role, router]);
  if (!isLoaded || !user || !user.firstName || !role) return <main className="grid min-h-screen place-items-center bg-[#eef3f4]">Preparing your profile…</main>;
  const displayName = role === 'instructor' ? user.fullName ?? user.firstName : profile?.name || user.fullName || user.firstName;
  const initials = displayName.split(' ').map(part => part[0]).slice(0,2).join('').toUpperCase();
  return <main className="min-h-screen bg-[#eef3f4] pb-20 text-[#102a2e]">
    <header className="bg-[#123c43] text-white"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"><a href="/dashboard" className="flex items-center gap-2 text-lg font-black"><span className="grid size-9 place-items-center rounded-xl bg-[#d9f26e] text-[#123c43]"><MountainSnow className="size-5" /></span>SkiLevel</a><div className="flex items-center gap-3"><span className="hidden text-sm font-bold sm:inline">{user.firstName}</span><UserButton /></div></div></header>
    <section className="bg-[#123c43] pb-20 pt-8 text-white"><div className="mx-auto max-w-6xl px-4 sm:px-6"><p className="text-sm font-bold text-[#d9f26e]">{role === 'instructor' ? 'INSTRUCTOR ACCOUNT' : 'YOUR SKILEVEL'}</p><h1 className="mt-2 text-4xl font-black tracking-tight">Welcome, {user.firstName}.</h1><p className="mt-2 text-white/65">Your account is personal. Only records connected to you will appear here.</p></div></section>
    <div className="mx-auto -mt-12 grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.35fr_.85fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(17,54,60,.08)]"><div className="flex items-center gap-4"><div className="grid size-16 place-items-center rounded-2xl bg-[#d9f26e] text-xl font-black">{initials}</div><div><p className="text-sm font-semibold text-slate-500">{profile?.sport ? `${profile.sport === 'ski' ? 'Skier' : 'Snowboarder'} profile` : 'Account profile'}</p><h2 className="text-2xl font-black">{displayName}{profile?.age ? `, ${profile.age}` : ''}</h2><p className="text-sm text-slate-500">{profile?.homeMountain || 'No home mountain added'}</p></div></div>
        {role !== 'instructor' && <><div className="my-7 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl bg-[#f4f7f8] py-5 text-center"><div><strong className="block text-2xl">—</strong><span className="text-xs font-bold text-slate-500">SkiLevel</span></div><div><strong className="block text-2xl">{profile?.yearsExperience ?? 0}</strong><span className="text-xs font-bold text-slate-500">Years</span></div><div><strong className="block text-2xl">0</strong><span className="text-xs font-bold text-slate-500">Mountains</span></div></div><div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center"><SlidersHorizontal className="mx-auto size-7 text-teal-700" /><h3 className="mt-3 font-black">Rate your terrain confidence</h3><p className="mt-1 text-sm text-slate-500">Your SkiLevel will appear after your first terrain ratings.</p><button className="mt-4 min-h-11 rounded-xl bg-[#123c43] px-5 font-bold text-white">Start ratings</button></div></>}
      </section>
      <div className="grid gap-5"><section className="rounded-3xl bg-[#d9f26e] p-6"><UserRound className="size-6" /><h2 className="mt-4 text-xl font-black">{role === 'instructor' ? 'Instructor workspace' : 'This profile is yours'}</h2><p className="mt-2 text-sm leading-6 opacity-75">Sample records are no longer mixed with authenticated accounts. Your activity will build here as you use SkiLevel.</p><a href="/onboarding" className="mt-5 flex min-h-11 items-center justify-center rounded-xl bg-[#123c43] font-bold text-white">Edit account details</a></section>{role !== 'instructor' && <section className="rounded-3xl bg-white p-6"><h2 className="text-xl font-black">Mountain history</h2><p className="mt-2 text-sm text-slate-500">No mountain visits yet.</p><button className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#123c43] font-bold text-white"><Plus className="size-5" /> Add first visit</button><button className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 font-bold"><Share2 className="size-5" /> Share profile</button></section>}</div>
    </div>
  </main>;
}
