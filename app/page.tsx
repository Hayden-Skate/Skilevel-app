'use client';

import { ArrowUpRight, ChevronRight, CircleUserRound, MapPin, MountainSnow, Plus, Share2, Snowflake } from 'lucide-react';
import { useState } from 'react';

const abilities = [
  { label: 'Greens', value: 5, color: 'bg-emerald-500' },
  { label: 'Blues', value: 4, color: 'bg-sky-500' },
  { label: 'Blacks', value: 3, color: 'bg-zinc-900' },
  { label: 'Moguls', value: 2, color: 'bg-violet-500' },
  { label: 'Trees', value: 3, color: 'bg-teal-600' },
];

export default function Home() {
  const [shared, setShared] = useState(false);
  return (
    <main className="min-h-screen bg-[#f4f7f8] text-[#102a2e]">
      <header className="border-b border-white/10 bg-[#123c43] text-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-[-.03em]"><span className="grid size-9 place-items-center rounded-xl bg-[#d9f26e] text-[#123c43]"><MountainSnow className="size-5" /></span>SkiLevel</a>
          <a href="/sign-in" className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold"><CircleUserRound className="size-5" /><span className="hidden sm:inline">Alex Morgan</span></a>
        </div>
      </header>
      <section className="bg-[#123c43] pb-20 pt-8 text-white sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#d9f26e]"><Snowflake className="size-4" /> 2025–26 season profile</p><h1 className="text-4xl font-black tracking-[-.045em] sm:text-5xl">Ready for the next run.</h1><p className="mt-3 max-w-xl text-base leading-7 text-white/70">A clear record of experience, confidence, and progress—ready for any instructor, at any mountain.</p></div>
          <button onClick={async () => { await navigator.clipboard?.writeText(`${window.location.origin}/share/alex-morgan-vt`); setShared(true); }} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d9f26e] px-5 font-bold text-[#123c43] hover:bg-[#e5fa8d] sm:w-auto"><Share2 className="size-5" /> {shared ? 'Link copied' : 'Share profile'}</button>
        </div></div>
      </section>
      <div className="mx-auto -mt-12 grid max-w-6xl gap-5 px-4 pb-24 sm:px-6 lg:grid-cols-[1.45fr_.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(17,54,60,.08)] sm:p-7">
          <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-4"><div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e7eff0] text-lg font-extrabold">AM</div><div><p className="text-sm font-semibold text-slate-500">Skier profile</p><h2 className="text-2xl font-extrabold tracking-tight">Alex Morgan, 14</h2><p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="size-4" /> Stowe, Vermont</p></div></div><button aria-label="Open student profile" className="grid size-11 shrink-0 place-items-center rounded-full bg-slate-100"><ChevronRight className="size-5" /></button></div>
          <div className="my-7 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl bg-[#f4f7f8] px-2 py-5 text-center"><div><strong className="block text-2xl font-black">3.8</strong><span className="text-xs font-semibold text-slate-500">SkiLevel</span></div><div><strong className="block text-2xl font-black">6</strong><span className="text-xs font-semibold text-slate-500">Years</span></div><div><strong className="block text-2xl font-black">4</strong><span className="text-xs font-semibold text-slate-500">Mountains</span></div></div>
          <div className="mb-5 flex items-end justify-between gap-3"><div><p className="text-sm font-semibold text-slate-500">Terrain confidence</p><h3 className="text-lg font-extrabold">Strong on groomed blues</h3></div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">Developing moguls</span></div>
          <div className="space-y-4">{abilities.map((ability) => <div key={ability.label} className="grid grid-cols-[64px_1fr_22px] items-center gap-3"><span className="text-sm font-semibold">{ability.label}</span><div className="flex gap-1.5" aria-label={`${ability.label}: ${ability.value} of 5`}>{[1,2,3,4,5].map((step) => <span key={step} className={`h-2.5 flex-1 rounded-full ${step <= ability.value ? ability.color : 'bg-slate-200'}`} />)}</div><strong className="text-sm">{ability.value}</strong></div>)}</div>
          <button className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 font-bold hover:bg-slate-50">Update terrain ratings <ArrowUpRight className="size-4" /></button>
        </section>
        <div className="grid gap-5">
          <section className="rounded-3xl bg-[#d9f26e] p-6"><p className="text-sm font-bold opacity-70">Instructor snapshot</p><h2 className="mt-2 text-2xl font-black tracking-tight">Blue skier moving into blacks</h2><p className="mt-3 text-sm leading-6 opacity-80">Confident parallel turns on groomed blues. Working on pole timing, variable snow, and a quieter upper body.</p><a href="/instructor/alex-morgan" className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#123c43] px-4 font-bold text-white">Open quick view <ChevronRight className="size-4" /></a></section>
          <section className="rounded-3xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-slate-500">Most recent</p><h2 className="text-xl font-extrabold">Stowe Mountain</h2></div><span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">Comfortable</span></div><div className="mt-5 border-l-2 border-slate-200 pl-4"><p className="text-sm font-bold">Lord • Blue square</p><p className="mt-1 text-sm text-slate-500">Jan 18, 2026 · Smooth carving all the way down.</p></div><button className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#123c43] font-bold text-white"><Plus className="size-5" /> Add mountain visit</button></section>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 px-4 py-2 backdrop-blur lg:hidden"><div className="mx-auto grid max-w-sm grid-cols-3 text-center text-xs font-bold text-slate-500"><a className="rounded-xl bg-slate-100 px-3 py-2 text-[#123c43]" href="/">Profile</a><button>History</button><button>Settings</button></div></nav>
    </main>
  );
}
