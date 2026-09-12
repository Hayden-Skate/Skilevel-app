import { ArrowRight, Check, MountainSnow, ShieldCheck, Smartphone, UsersRound } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f7f8] text-[#102a2e]">
      <header className="bg-[#123c43] text-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-[-.03em]">
            <span className="grid size-9 place-items-center rounded-xl bg-[#d9f26e] text-[#123c43]"><MountainSnow className="size-5" /></span>
            SkiLevel
          </a>
          <a href="/sign-in" className="flex min-h-11 items-center rounded-xl border border-white/20 px-4 text-sm font-bold hover:bg-white/10">Sign in</a>
        </div>
      </header>

      <section className="relative bg-[#123c43] pb-24 pt-14 text-white sm:pb-32 sm:pt-24">
        <div className="absolute inset-0 opacity-[.08] [background-image:radial-gradient(circle_at_20%_10%,white_0,transparent_32%),linear-gradient(145deg,transparent_55%,white_55%,transparent_56%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="mb-4 font-bold text-[#d9f26e]">YOUR EXPERIENCE. READY FOR ANY MOUNTAIN.</p>
            <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl">Spend less time explaining. More time skiing.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">SkiLevel gives your next instructor a clear picture of where you have ridden, what feels comfortable, and what you are ready to learn next.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/sign-in" className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#d9f26e] px-6 font-black text-[#123c43] hover:bg-[#e5fa8d]">Create your SkiLevel <ArrowRight className="size-5" /></a>
              <a href="/share/alex-morgan-vt" className="flex min-h-14 items-center justify-center rounded-xl border border-white/20 px-6 font-bold hover:bg-white/10">View sample profile</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-[#102a2e] shadow-2xl sm:p-6">
            <div className="flex items-center gap-4"><div className="grid size-14 place-items-center rounded-2xl bg-[#e7eff0] text-lg font-black">AM</div><div><p className="text-sm font-semibold text-slate-500">Skier profile</p><p className="text-xl font-black">Alex Morgan</p></div><span className="ml-auto rounded-full bg-[#d9f26e] px-3 py-1 text-xs font-black">3.8 / 5</span></div>
            <div className="my-6 h-px bg-slate-200" />
            <p className="text-sm font-semibold text-slate-500">Instructor summary</p><p className="mt-1 text-xl font-black">Blue skier moving into blacks</p>
            <div className="mt-5 space-y-3">{['Strong speed control', 'Confident parallel turns', 'Developing mogul technique'].map((item) => <p key={item} className="flex items-center gap-2 text-sm font-semibold"><span className="grid size-6 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check className="size-3.5" /></span>{item}</p>)}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-6xl gap-4 px-4 pb-20 sm:grid-cols-3 sm:px-6">
        {[
          [Smartphone, 'Built for lesson day', 'A fast, outdoor-friendly view instructors can understand in under 30 seconds.'],
          [UsersRound, 'Student and instructor history', 'Terrain confidence, completed trails, lesson notes, and next steps in one place.'],
          [ShieldCheck, 'Shared on your terms', 'Keep records protected while sharing a focused profile with an instructor.'],
        ].map(([Icon, title, copy]) => {
          const CardIcon = Icon as typeof Smartphone;
          return <article key={title as string} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,54,60,.06)]"><span className="grid size-11 place-items-center rounded-xl bg-[#d9f26e]"><CardIcon className="size-5" /></span><h2 className="mt-5 text-lg font-black">{title as string}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{copy as string}</p></article>;
        })}
      </section>
    </main>
  );
}
