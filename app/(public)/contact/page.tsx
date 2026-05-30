import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contact - Laptopku Store",
  description:
    "Hubungi Laptopku Store untuk konsultasi laptop bekas, tanya stok, kondisi produk, dan pembelian via WhatsApp.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact - Laptopku Store",
    description:
      "Chat Laptopku Store untuk tanya stok, kondisi, kelengkapan, dan rekomendasi laptop bekas sesuai kebutuhan.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl w-full px-4 py-14 sm:py-16">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <span className="text-sm font-bold text-[#b95410]">Contact</span>

          <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
            Butuh rekomendasi laptop bekas?
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-slate-600">
            Chat admin untuk tanya stok, kondisi laptop, harga, kelengkapan,
            atau rekomendasi laptop sesuai kebutuhan kerja, kuliah, dan bisnis.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton />
            <Link
              href="/products"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white/80 px-6 py-3 text-sm font-bold text-slate-900 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-orange-50 hover:text-[#b95410]"
            >
              Lihat katalog
            </Link>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
          <h2 className="text-xl font-black text-slate-950">
            Informasi yang bisa ditanyakan
          </h2>
          <ul className="mt-5 divide-y divide-slate-900/10 text-sm font-medium text-slate-600">
            <li className="py-3">Status stok terbaru</li>
            <li className="py-3">Kondisi dan kelengkapan</li>
            <li className="py-3">Rekomendasi sesuai budget</li>
            <li className="py-3">Opsi laptop untuk kerja atau kuliah</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
