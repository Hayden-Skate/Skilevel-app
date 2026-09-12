'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function OnboardingForm() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [role, setRole] = useState('student');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!user) return; setSaving(true);
    const data = new FormData(event.currentTarget);
    await user.update({ firstName: String(data.get('firstName') ?? ''), lastName: String(data.get('lastName') ?? ''), unsafeMetadata: { accountRole: role, studentProfile: role === 'instructor' ? null : { name: String(data.get('studentName') ?? ''), age: Number(data.get('age') || 0), sport: String(data.get('sport') ?? 'ski'), yearsExperience: Number(data.get('yearsExperience') || 0), homeMountain: String(data.get('homeMountain') ?? ''), selfRatedLevel: String(data.get('selfRatedLevel') ?? '') } } });
    await user.reload(); router.replace('/dashboard');
  }
  if (!isLoaded) return <div className="rounded-3xl bg-white p-8">Loading your account…</div>;
  const input = 'mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 font-normal';
  return <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(17,54,60,.08)] sm:p-8"><p className="text-sm font-bold text-teal-700">FIRST-TIME SETUP</p><h1 className="mt-2 text-3xl font-black tracking-tight">Tell us who you are</h1><p className="mt-2 text-slate-600">This takes about a minute and gives your account the right starting profile.</p>
    <div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold">First name<input name="firstName" defaultValue={user?.firstName ?? ''} required className={input} /></label><label className="text-sm font-bold">Last name<input name="lastName" defaultValue={user?.lastName ?? ''} required className={input} /></label></div>
    <fieldset className="mt-6"><legend className="text-sm font-bold">Account type</legend><div className="mt-2 grid gap-2 sm:grid-cols-3">{[['student','Student'],['parent','Parent'],['instructor','Instructor']].map(([value,label]) => <button type="button" key={value} onClick={() => setRole(value)} className={`min-h-12 rounded-xl border px-3 font-bold ${role === value ? 'border-[#123c43] bg-[#123c43] text-white' : 'border-slate-300'}`}>{label}</button>)}</div></fieldset>
    {role !== 'instructor' && <div className="mt-7 border-t border-slate-200 pt-6"><h2 className="text-xl font-black">Student profile</h2><div className="mt-4 grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold sm:col-span-2">Student name<input name="studentName" required className={input} /></label><label className="text-sm font-bold">Age<input name="age" type="number" min="2" max="120" required className={input} /></label><label className="text-sm font-bold">Sport<select name="sport" className={`${input} bg-white`}><option value="ski">Ski</option><option value="snowboard">Snowboard</option></select></label><label className="text-sm font-bold">Years of experience<input name="yearsExperience" type="number" min="0" max="100" required className={input} /></label><label className="text-sm font-bold">Home mountain<input name="homeMountain" className={input} /></label><label className="text-sm font-bold sm:col-span-2">Self-rated level<select name="selfRatedLevel" className={`${input} bg-white`}><option>Beginner</option><option>Intermediate</option><option>Advanced intermediate</option><option>Advanced</option><option>Expert</option></select></label></div></div>}
    <button disabled={saving} className="mt-8 min-h-14 w-full rounded-xl bg-[#d9f26e] font-black text-[#123c43] disabled:opacity-60">{saving ? 'Saving…' : 'Create my SkiLevel'}</button>
  </form>;
}
