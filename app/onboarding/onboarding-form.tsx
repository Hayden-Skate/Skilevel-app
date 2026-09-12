'use client';

import { useSession, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

export default function OnboardingForm() {
  const { user, isLoaded } = useUser();
  const { session } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [role, setRole] = useState('parent');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || !session) return;
    setSaving(true); setError('');
    const data = new FormData(event.currentTarget);
    try {
      const token = await session.getToken();
      const supabase = getSupabaseClient(token ?? undefined);
      if (!supabase) throw new Error('The database connection is not configured.');
      const accountRole = role === 'instructor' ? 'instructor' : 'student_parent';
      const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress;
      if (!email) throw new Error('Your account needs an email address.');
      const { data: account, error: accountError } = await supabase.from('users').upsert(
        { clerk_user_id: user.id, email, role: accountRole }, { onConflict: 'clerk_user_id' },
      ).select('id').single();
      if (accountError) throw accountError;
      if (role === 'instructor') {
        const { error: instructorError } = await supabase.from('instructors').upsert(
          { user_id: account.id, display_name: `${data.get('firstName')} ${data.get('lastName')}`.trim() }, { onConflict: 'user_id' },
        );
        if (instructorError) throw instructorError;
      } else {
        const { count, error: countError } = await supabase.from('students').select('id', { count: 'exact', head: true }).eq('owner_user_id', account.id);
        if (countError) throw countError;
        if (!count) {
          const { error: studentError } = await supabase.from('students').insert({
            owner_user_id: account.id, name: String(data.get('studentName') ?? ''), age: Number(data.get('age')),
            sport: String(data.get('sport') ?? 'ski'), years_experience: Number(data.get('yearsExperience') || 0),
            home_mountain: String(data.get('homeMountain') ?? '') || null, self_rated_level: String(data.get('selfRatedLevel') ?? ''),
          });
          if (studentError) throw studentError;
        }
      }
      await user.update({ firstName: String(data.get('firstName') ?? ''), lastName: String(data.get('lastName') ?? ''), unsafeMetadata: { ...user.unsafeMetadata, accountRole: role } });
      await user.reload(); router.replace('/dashboard'); router.refresh();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : typeof caught === 'object' && caught && 'message' in caught ? String(caught.message) : 'We could not save your account. Please try again.';
      setError(message); setSaving(false);
    }
  }

  if (!isLoaded) return <div className="rounded-3xl bg-white p-8">Loading your account…</div>;
  const input = 'mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 font-normal';
  return <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(17,54,60,.08)] sm:p-8">
    <p className="text-sm font-bold text-teal-700">FIRST-TIME SETUP</p><h1 className="mt-2 text-3xl font-black tracking-tight">Set up your SkiLevel account</h1><p className="mt-2 text-slate-600">Start with your account details, then add the first skier or snowboarder you manage.</p>
    <div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold">Your first name<input name="firstName" defaultValue={user?.firstName ?? ''} required className={input} /></label><label className="text-sm font-bold">Your last name<input name="lastName" defaultValue={user?.lastName ?? ''} required className={input} /></label></div>
    <fieldset className="mt-6"><legend className="text-sm font-bold">Account type</legend><div className="mt-2 grid gap-2 sm:grid-cols-3">{[['student','Student'],['parent','Parent'],['instructor','Instructor']].map(([value,label]) => <button type="button" key={value} onClick={() => setRole(value)} className={`min-h-12 rounded-xl border px-3 font-bold ${role === value ? 'border-[#123c43] bg-[#123c43] text-white' : 'border-slate-300'}`}>{label}</button>)}</div></fieldset>
    {role !== 'instructor' && <div className="mt-7 border-t border-slate-200 pt-6"><h2 className="text-xl font-black">{role === 'parent' ? 'First child' : 'Your student profile'}</h2><p className="mt-1 text-sm text-slate-500">You can add and switch between more children later.</p><div className="mt-4 grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold sm:col-span-2">Student name<input name="studentName" required className={input} /></label><label className="text-sm font-bold">Age<input name="age" type="number" min="2" max="120" required className={input} /></label><label className="text-sm font-bold">Sport<select name="sport" className={`${input} bg-white`}><option value="ski">Ski</option><option value="snowboard">Snowboard</option></select></label><label className="text-sm font-bold">Years of experience<input name="yearsExperience" type="number" min="0" max="100" required className={input} /></label><label className="text-sm font-bold">Home mountain<input name="homeMountain" className={input} /></label><label className="text-sm font-bold sm:col-span-2">Self-rated level<select name="selfRatedLevel" className={`${input} bg-white`}><option>Beginner</option><option>Intermediate</option><option>Advanced intermediate</option><option>Advanced</option><option>Expert</option></select></label></div></div>}
    {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
    <button disabled={saving} className="mt-8 min-h-14 w-full rounded-xl bg-[#d9f26e] font-black text-[#123c43] disabled:opacity-60">{saving ? 'Saving…' : 'Create my SkiLevel'}</button>
  </form>;
}
