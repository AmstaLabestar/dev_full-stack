export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-24 text-slate-50">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 text-center">
        <span className="text-sm font-medium tracking-[0.3em] text-slate-400 uppercase">
          Portfolio en construction
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Base Next.js initialisee pour un portfolio full-stack de niveau
          production.
        </h1>
        <p className="text-base leading-7 text-slate-300 sm:text-lg">
          Cette premiere iteration pose le socle technique: App Router,
          TypeScript strict, Tailwind CSS, ESLint et Prettier.
        </p>
      </section>
    </main>
  );
}
