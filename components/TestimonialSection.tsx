const testimonials = [
  {
    name: "Raka",
    role: "Mahasiswa",
    message:
      "Laptopnya sesuai deskripsi, admin responsif, dan proses pembelian cepat.",
  },
  {
    name: "Dina",
    role: "Freelancer",
    message:
      "Saya dibantu pilih laptop sesuai budget. Kondisinya masih bagus dan siap pakai.",
  },
  {
    name: "Bayu",
    role: "Karyawan",
    message:
      "Spesifikasi jelas, harga masuk akal, dan bisa tanya detail lewat WhatsApp.",
  },
];

export default function TestimonialSection() {
  return (
    <section className="mx-auto max-w-7xl w-full px-4 py-16 sm:py-20">
      <div className="max-w-2xl">
        <span className="text-sm font-bold text-[#b95410]">Testimoni</span>

        <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
          Dipercaya pembeli untuk kebutuhan kerja, kuliah, dan bisnis.
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-[1.75rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl"
          >
            <div className="flex gap-1 text-[#b95410]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>*</span>
              ))}
            </div>

            <p className="mt-5 leading-7 text-slate-700">
              &quot;{item.message}&quot;
            </p>

            <div className="mt-6 border-t border-slate-900/10 pt-5">
              <h3 className="font-black text-slate-950">{item.name}</h3>
              <p className="text-sm text-slate-500">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
