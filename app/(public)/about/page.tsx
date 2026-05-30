import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Laptopku Store",
  description:
    "Tentang Laptopku Store, toko jual beli laptop bekas berkualitas dengan spesifikasi transparan dan konsultasi cepat.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About - Laptopku Store",
    description:
      "Kenali Laptopku Store, katalog laptop bekas yang menampilkan spesifikasi, kondisi, status stok, dan harga secara transparan.",
    url: "/about",
    type: "website",
  },
};

const values = [
  {
    title: "Transparan",
    description: "Spesifikasi dan kondisi laptop ditampilkan dengan jelas.",
  },
  {
    title: "Responsif",
    description: "Pembeli bisa langsung bertanya lewat WhatsApp.",
  },
  {
    title: "Profesional",
    description: "Website dibuat rapi agar bisnis terlihat lebih terpercaya.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl w-full px-4 py-14 sm:py-16">
      <section className="max-w-3xl">
        <span className="text-sm font-bold text-[#b95410]">
          About Laptopku Store Alva
        </span>

        <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
          Membantu pembeli menemukan laptop bekas yang aman dan sesuai
          kebutuhan.
        </h1>

        <p className="mt-5 leading-8 text-slate-600">
          Laptopku Store dibuat untuk menampilkan katalog laptop bekas secara
          lebih profesional, transparan, dan mudah dipahami. Setiap produk
          memiliki informasi spesifikasi, kondisi, status stok, dan harga agar
          pembeli lebih percaya sebelum menghubungi admin.
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {values.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl"
          >
            <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
