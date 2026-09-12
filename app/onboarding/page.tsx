import { MountainSnow } from 'lucide-react';
import OnboardingForm from './onboarding-form';

export default function OnboardingPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return <main className="min-h-screen bg-[#eef3f4] px-4 py-8 text-[#102a2e]"><div className="mx-auto max-w-2xl"><a href="/" className="mb-8 flex items-center gap-2 text-xl font-black"><span className="grid size-10 place-items-center rounded-xl bg-[#d9f26e]"><MountainSnow className="size-5" /></span>SkiLevel</a>{configured ? <OnboardingForm /> : <div className="rounded-3xl bg-white p-7"><h1 className="text-2xl font-black">Account setup</h1><p className="mt-2 text-slate-600">Clerk production configuration is required to complete this profile.</p></div>}</div></main>;
}
