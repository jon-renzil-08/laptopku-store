import type { Metadata } from "next";
import ProductCatalog from "@/components/ProductCatalog";
import WhatsAppGeneral from "@/components/WhatsAppGeneral";

export const metadata: Metadata = {
  title: " Laptop Bekas - Laptopku Store",
  description:
    "Lihat  laptop bekas berkualitas dengan spesifikasi jelas, kondisi transparan, dan harga terbaik.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: " Laptop Bekas - Laptopku Store",
    description:
      "Bandingkan laptop bekas siap pakai berdasarkan spesifikasi, kondisi, status stok, dan harga.",
    url: "/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
      <section className="max-w-3xl">
        <span className="text-sm font-bold text-[#b95410]">
          Laptop Bekas Berkualitas, Harga Terjangkau
        </span>

        <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
          Pilih laptop bekas sesuai kebutuhanmu.
        </h1>

        <p className="mt-5 leading-8 text-slate-600">
          Semua produk ditampilkan dengan detail spesifikasi, status stok,
          kondisi laptop, dan harga agar pembeli lebih mudah membandingkan.
        </p>
      </section>

      <section className="mt-10 grid gap-4 rounded-[1.75rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-xl md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-black text-slate-950">
            Bingung pilih spesifikasi?
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Kirim budget dan kebutuhanmu. Admin bisa bantu pilihkan opsi yang
            paling masuk akal dari laptop yang kamu inginkan.
          </p>
        </div>
        <WhatsAppGeneral className="w-full md:w-auto" />
      </section>

      <ProductCatalog  />
    </main>
  );
}
