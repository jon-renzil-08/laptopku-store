import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl w-full items-center justify-center px-4 py-16">
      <section className="w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white/75 p-10 text-center shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
        {/* Emot gede */}
        <span className="text-7xl">🔍</span>

        {/* Badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f47c20]" />
          <span className="text-xs font-bold text-[#b95410]">
            404 — Halaman Tidak Ditemukan
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 md:text-5xl">
          Aduh, nyasar nih! 😅
        </h1>

        {/* Deskripsi */}
        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-500">
          Halaman yang kamu cari mungkin sudah dipindahkan, dihapus, atau
          URL-nya salah. Tenang, kita bisa balik lagi! 👇
        </p>

        {/* Divider */}
        <div className="mx-auto mt-8 w-16 border-t border-slate-200" />

        {/* Tips */}
        <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
          {[
            { icon: "🏠", text: "Balik ke homepage" },
            { icon: "🔎", text: "Cek URL-nya lagi" },
            { icon: "💬", text: "Hubungi admin" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm font-semibold text-slate-600">
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full bg-[#b95410] px-7 py-3 text-sm font-bold text-white shadow-[0_16px_36px_rgba(185,84,16,0.28)] transition hover:-translate-y-0.5 hover:bg-[#9a430c]"
          >
            🏠 Kembali ke Homepage
          </Link>

          <Link
            href="/products"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-[#b95410]"
          >
            🛍️ Lihat Katalog
          </Link>
        </div>
      </section>
    </main>
  );
}
