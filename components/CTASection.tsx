import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl w-full px-4 py-16 sm:py-20">
      <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/90 via-orange-50/80 to-sky-50/90 p-6 shadow-2xl shadow-slate-200/80 backdrop-blur-xl sm:p-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-[#b95410]">
              Konsultasi gratis
            </span>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
              Masih bingung pilih laptop bekas yang cocok?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Chat admin via WhatsApp untuk tanya stok, kondisi, kelengkapan,
              atau rekomendasi laptop sesuai budget.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <WhatsAppButton className="w-full sm:w-auto" />
            <Link
              href="/products"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Bandingkan katalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
