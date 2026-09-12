'use client';
import { SignIn } from '@clerk/nextjs';
import { MountainSnow } from 'lucide-react';

export default function SignInPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return <main className="grid min-h-screen place-items-center bg-[#123c43] px-4 py-10"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><a href="/" className="mb-7 flex items-center gap-2 text-xl font-black"><span className="grid size-10 place-items-center rounded-xl bg-[#d9f26e]"><MountainSnow className="size-5" /></span>SkiLevel</a>{configured ? <SignIn routing="hash" /> : <div><h1 className="text-2xl font-black">Sign in to SkiLevel</h1><p className="mt-2 leading-6 text-slate-600">Clerk is wired and ready. Add the project keys to activate secure student, parent, and instructor accounts.</p><div className="mt-6 grid gap-3"><button className="min-h-12 rounded-xl bg-[#123c43] font-bold text-white">Student or parent</button><button className="min-h-12 rounded-xl border border-slate-200 font-bold">Instructor</button></div><p className="mt-5 text-xs text-slate-500">Preview mode · Authentication activates when environment keys are provided.</p></div>}</div></main>;
}
