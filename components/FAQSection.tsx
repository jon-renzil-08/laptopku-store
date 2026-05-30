const faqs = [
  {
    question: "Apakah laptop ready semua?",
    answer:
      "Status produk bisa dilihat di setiap card. Jika tertulis Ready berarti stok tersedia, jika Sold berarti sudah terjual.",
  },
  {
    question: "Apakah bisa tanya kondisi detail lewat WhatsApp?",
    answer:
      "Bisa. Pembeli bisa langsung chat admin untuk memastikan kondisi, kelengkapan, dan stok terbaru.",
  },
  {
    question: "Apakah laptop bergaransi?",
    answer:
      "Garansi bisa berbeda untuk setiap produk. Silakan tanyakan langsung ke admin sebelum membeli.",
  },
  {
    question: "Apa saja yang dicek sebelum laptop dijual?",
    answer:
      "Pembeli bisa mengonfirmasi pengecekan layar, keyboard, trackpad, port, Wi-Fi, speaker, baterai, storage, dan kelengkapan charger.",
  },
  {
    question: "Apakah bisa booking produk dulu?",
    answer:
      "Bisa ditanyakan ke admin. Booking biasanya perlu konfirmasi stok, keseriusan pembelian, dan aturan batas waktu yang disepakati.",
  },
  {
    question: "Apakah bisa dikirim atau ambil langsung?",
    answer:
      "Opsi pengiriman atau ambil langsung bisa dikonfirmasi lewat WhatsApp sesuai lokasi, jadwal, dan kesepakatan transaksi.",
  },
  {
    question: "Bisa dibantu pilih laptop sesuai kebutuhan?",
    answer:
      "Bisa. Beri tahu kebutuhan, budget, dan aplikasi yang dipakai agar admin bisa memberi rekomendasi yang paling sesuai.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-7xl w-full px-4 py-16 sm:py-20">
      <div className="max-w-2xl">
        <span className="text-sm font-bold text-[#b95410]">FAQ Pembeli</span>

        <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
          Pertanyaan yang sering ditanyakan sebelum membeli.
        </h2>
      </div>

      <div className="mt-10 grid gap-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-[1.5rem] border border-white/80 bg-white/75 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-black text-slate-950">
              {faq.question}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#b95410] transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
