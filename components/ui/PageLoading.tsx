export default function PageLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/60 p-8 shadow-2xl shadow-slate-200/40 backdrop-blur-2xl">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-100/40 via-white to-slate-100" />

        <div className="mb-10 space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="h-12 w-72 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-4 w-full max-w-xl animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 shadow-lg backdrop-blur-xl"
            >
              <div className="h-56 animate-pulse bg-slate-200" />

              <div className="space-y-4 p-5">
                <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-200" />
                <div className="h-8 w-32 animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}