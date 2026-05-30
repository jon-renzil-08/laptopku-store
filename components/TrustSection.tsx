const trustItems = [
  {
    title: "Spesifikasi Transparan",
    description:
      "Setiap laptop ditampilkan dengan detail RAM, storage, processor, kondisi, dan status produk.",
  },
  {
    title: "Kondisi Dicek",
    description:
      "Produk dicek terlebih dahulu supaya pembeli lebih yakin sebelum bertanya atau membeli.",
  },
  {
    title: "Konsultasi Cepat",
    description:
      "Pembeli bisa langsung chat via WhatsApp untuk tanya stok, nego, atau rekomendasi laptop.",
  },
  {
    title: "Pilihan Sesuai Budget",
    description:
      "Katalog dibuat mudah dibandingkan agar pembeli cepat menemukan opsi yang paling masuk akal.",
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="mx-auto max-w-7xl w-full px-4 py-16 sm:py-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="text-sm font-bold text-[#b95410]">
          Kenapa pilih kami
          </span>

          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
            Beli laptop bekas jadi lebih aman, jelas, dan profesional.
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-7 text-slate-600">
          Kami menjaga alur pembelian tetap sederhana: pilih produk, cek detail,
          lalu konsultasi langsung sebelum transaksi.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item, index) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-sm font-black text-[#b95410]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-5 text-lg font-black text-slate-950">
              {item.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
