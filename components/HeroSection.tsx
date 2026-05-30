import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HeroCarousel from "./HeroCarousel";
import ProductMarquee from "./ProductMarquee";

export default async function HeroSection() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error || !products || products.length === 0) {
    return null;
  }

  const availableProducts = products.filter(
    (product) => product.status === "Tersedia",
  ).length;

  const brandNames = Array.from(
    new Set(products.map((product) => product.brand)),
  );

  const heroStats = [
    [`${availableProducts}+`, "Produk tersedia"],
    [`${brandNames.length} Brand`, "Pilihan populer"],
    ["Fast", "Konsultasi WhatsApp"],
  ];

  const carouselProducts = products.slice(0, 5);

  return (
    <section className="relative isolate overflow-hidden  px-4 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24">
      {/* ── Background layers (updated: lebih subtle & modern) ── */}

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(244,124,32,0.12)_0%,rgba(255,255,255,0)_40%),linear-gradient(225deg,rgba(56,189,248,0.10)_0%,rgba(255,255,255,0)_36%),linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#eef6ff_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.28] [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-white to-transparent" />

      <div className="hero-section-grid w-full">
        {/* ════ LEFT ════ */}
        <div className="min-w-0 max-w-7xl ">
          {/* Badge */}
          <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-orange-200 bg-orange-50/90 px-4 py-2 text-xs font-bold text-orange-800 shadow-sm backdrop-blur-xl sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#f47c20] shadow-[0_0_0_4px_rgba(244,124,32,0.15)]" />
            <span className="truncate">
              Smart catalog · laptop bekas siap pakai
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-5 max-w-[22rem] text-[2rem] font-black leading-[1.06] tracking-tight text-slate-950 sm:max-w-3xl sm:text-5xl md:text-[3.5rem]">
            Pilih laptop bekas dengan tampilan rapi, detail jelas, dan proses
            cepat.
          </h1>

          {/* Subheadline */}
          <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-7 text-slate-500 sm:max-w-xl md:text-lg">
            Laptopku Store menata katalog seperti dashboard modern: foto produk
            terlihat fokus, spesifikasi mudah dibandingkan, dan pembeli bisa
            langsung lanjut konsultasi tanpa bingung.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <Link
              href="/products"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full bg-[#b95410] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(185,84,16,0.30)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9a430c]"
            >
              Lihat Laptop{" "}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
            <Link
              href="#trust"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:text-[#b95410]"
            >
              Kenapa pilih kami?
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 grid max-w-[22rem] gap-3 sm:max-w-2xl sm:grid-cols-3">
            {heroStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
              >
                <strong className="block text-2xl font-black tracking-tight text-slate-950">
                  {value}
                </strong>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ════ RIGHT ════ */}
        <div className="hero-visual-panel hero-visual-stage relative min-w-0 max-w-[22rem] sm:max-w-none">
          <div className="hero-animated-glow" aria-hidden="true" />

          {/* Orbit card — slide dari kiri */}
          <div
            className="hero-orbit-card hero-orbit-card-primary anim-slide-left"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="hero-orbit-dot" />
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-slate-500">
                QC tersedia
              </p>
              <p className="mt-1 text-sm font-black text-slate-900">
                Baterai, keyboard, port
              </p>
            </div>
          </div>

          {/* Product Showcase Card — slide dari bawah */}
          <HeroCarousel products={carouselProducts} />
        </div>

        <ProductMarquee products={products} />
      </div>
    </section>
  );
}
