'use client';

import { ArrowLeft, MountainSnow } from 'lucide-react';
import { useSession, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export default function NewStudentForm() {
  const { user } = useUser(); const { session } = useSession(); const router = useRouter();
  const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  const input = 'mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 font-normal';
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!user || !session) return; setSaving(true); setError('');
    const data = new FormData(event.currentTarget);
    try {
      const token = await session.getToken(); const supabase = getSupabaseClient(token ?? undefined);
      if (!supabase) throw new Error('The database connection is not configured.');
      const { data: account, error: accountError } = await supabase.from('users').select('id').eq('clerk_user_id', user.id).single();
      if (accountError) throw accountError;
      const { error: studentError } = await supabase.from('students').insert({
        owner_user_id: account.id, name: String(data.get('name') ?? ''), age: Number(data.get('age')),
        sport: String(data.get('sport') ?? 'ski'), years_experience: Number(data.get('yearsExperience') || 0),
        home_mountain: String(data.get('homeMountain') ?? '') || null, self_rated_level: String(data.get('selfRatedLevel') ?? ''),
      });
      if (studentError) throw studentError;
      router.push('/dashboard'); router.refresh();
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'We could not add this student.'); setSaving(false); }
  }
  return <main className="min-h-screen bg-[#eef3f4] px-4 py-8 text-[#102a2e] sm:py-12"><div className="mx-auto max-w-2xl"><Link href="/dashboard" className="mb-5 inline-flex items-center gap-2 font-bold text-teal-800"><ArrowLeft className="size-4" /> Back to dashboard</Link><form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(17,54,60,.08)] sm:p-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[#d9f26e]"><MountainSnow /></span><div><p className="text-sm font-bold text-teal-700">FAMILY PROFILE</p><h1 className="text-3xl font-black">Add another child</h1></div></div><p className="mt-3 text-slate-600">Each child gets an independent SkiLevel, mountain history, instructor notes, videos, and share link.</p><div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold sm:col-span-2">Student name<input name="name" required className={input} /></label><label className="text-sm font-bold">Age<input name="age" type="number" min="2" max="120" required className={input} /></label><label className="text-sm font-bold">Sport<select name="sport" className={`${input} bg-white`}><option value="ski">Ski</option><option value="snowboard">Snowboard</option></select></label><label className="text-sm font-bold">Years of experience<input name="yearsExperience" type="number" min="0" max="100" required className={input} /></label><label className="text-sm font-bold">Home mountain<input name="homeMountain" className={input} /></label><label className="text-sm font-bold sm:col-span-2">Self-rated level<select name="selfRatedLevel" className={`${input} bg-white`}><option>Beginner</option><option>Intermediate</option><option>Advanced intermediate</option><option>Advanced</option><option>Expert</option></select></label></div>{error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}<button disabled={saving} className="mt-7 min-h-14 w-full rounded-xl bg-[#123c43] font-black text-white disabled:opacity-60">{saving ? 'Adding student…' : 'Add student profile'}</button></form></div></main>;
}
