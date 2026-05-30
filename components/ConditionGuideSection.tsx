const conditionLevels = [
  {
    label: "Mulus",
    description:
      "Tampilan fisik sangat rapi, bekas pemakaian minim, dan cocok untuk pembeli yang mengutamakan estetika.",
  },
  {
    label: "Normal",
    description:
      "Fungsi utama berjalan baik dengan tanda pemakaian wajar, cocok untuk kebutuhan produktif harian.",
  },
  {
    label: "Minus Ringan",
    description:
      "Ada catatan pemakaian kecil yang perlu diketahui pembeli, tetapi performa tetap layak digunakan.",
  },
];

const inspectionPoints = [
  "Keyboard, trackpad, kamera, speaker",
  "Layar, engsel, port, dan koneksi Wi-Fi",
  "Kesehatan baterai dan adaptor charger",
  "Storage, RAM, suhu, dan performa dasar",
];

export default function ConditionGuideSection() {
  return (
    <section id="kondisi" className="mx-auto max-w-7xl w-full px-4 py-16 sm:py-20">
      <div className="rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span className="text-sm font-bold text-[#b95410]">
              Panduan kondisi
            </span>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
              Label kondisi dibuat supaya pembeli paham ekspektasi produk.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Laptop bekas perlu informasi kondisi yang mudah dipahami. Gunakan
              label ini sebagai patokan awal, lalu konfirmasi detailnya ke admin
              sebelum membeli.
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-slate-900/10 bg-slate-950 p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                Poin pengecekan
              </p>
              <div className="mt-4 grid gap-3">
                {inspectionPoints.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-white/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f47c20]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {conditionLevels.map((condition) => (
              <article
                key={condition.label}
                className="rounded-[1.5rem] border border-slate-900/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">
                      {condition.label}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      {condition.description}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#b95410]">
                    Kondisi produk
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
