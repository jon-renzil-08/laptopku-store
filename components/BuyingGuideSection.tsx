import Link from "next/link";
import WhatsAppGeneral from "@/components/WhatsAppGeneral";

const buyingSteps = [
  {
    title: "Ceritakan kebutuhan",
    description:
      "Sampaikan budget, aplikasi yang dipakai, ukuran layar, dan kebutuhan kerja atau kuliah.",
  },
  {
    title: "Cek stok dan kondisi",
    description:
      "Pilih produk tersedia, lalu konfirmasi kondisi fisik, performa, baterai, dan kelengkapan.",
  },
  {
    title: "Bandingkan opsi terbaik",
    description:
      "Admin bisa bantu bandingkan beberapa laptop agar spesifikasi dan harga paling masuk akal.",
  },
  {
    title: "Deal dan atur transaksi",
    description:
      "Lanjutkan pembelian setelah stok, harga, garansi, pengiriman, atau pickup sudah jelas.",
  },
];

const checkoutChecks = [
  "Status produk masih Tersedia",
  "Kondisi sesuai label produk",
  "Charger dan kelengkapan dikonfirmasi",
  "Garansi atau masa cek sudah jelas",
];

export default function BuyingGuideSection() {
  return (
    <section id="panduan" className="mx-auto max-w-7xl w-full px-4 py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start">
        <div>
          <span className="text-sm font-bold text-[#b95410]">
            Panduan pembelian
          </span>

          <h2 className="mt-3 max-w-3xl text-3xl font-black text-slate-950 md:text-4xl">
            Alur beli laptop bekas dibuat jelas dari tanya kebutuhan sampai
            transaksi.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Pembeli laptop bekas biasanya butuh kepastian sebelum transfer atau
            datang ke toko. Karena itu alurnya dibuat sederhana, transparan, dan
            mudah dikonfirmasi lewat WhatsApp.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {buyingSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.5rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-50 text-sm font-black text-[#b95410]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-black text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Checklist sebelum deal
          </p>
          <h3 className="mt-3 text-2xl font-black text-slate-950">
            Pastikan poin penting ini sudah jelas.
          </h3>

          <div className="mt-6 grid gap-3">
            {checkoutChecks.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white px-4 py-3"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f47c20]" />
                <span className="text-sm font-semibold text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <WhatsAppGeneral className="w-full" />
            <Link
              href="/products"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50 hover:text-[#b95410]"
            >
              Cek Laptop Tersedia
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
