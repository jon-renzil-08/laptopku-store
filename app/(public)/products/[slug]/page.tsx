import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { formatPrice } from "@/lib/formatPrice";
import { supabase } from "@/lib/supabase";
import StickyBar from "@/components/StickyBar";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getRelatedProducts(currentSlug: string, brand: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("brand", brand)
    .neq("slug", currentSlug)
    .limit(1);

  return data ?? [];
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan - Laptopku Store",
    };
  }

  const title = `${product.name} - Laptopku Store`;
  const description = `${product.name} bekas dengan ${product.processor}, RAM ${product.ram}, storage ${product.storage}, kondisi ${product.condition}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/products/${product.slug}`,
      type: "website",
      images: [
        {
          url: product.image_url,
          width: 1200,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image_url],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.slug, product.brand);

  const productUrl = `https://laptopkustore.com/products/${product.slug}`;
  const productImageUrl = product.image_url;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    description: product.description,
    image: productImageUrl,
    sku: product.slug,
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IDR",
      availability:
        product.status === "Ready"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: productUrl,
    },
  };

  const buyerChecks = [
    {
      label: "Kondisi fisik",
      value: `${product.condition} - minta foto atau video tambahan bila perlu.`,
    },
    {
      label: "Kelengkapan",
      value: "Konfirmasi charger, dus, nota, dan bonus yang termasuk.",
    },
    {
      label: "Baterai",
      value: "Tanyakan kesehatan baterai dan estimasi pemakaian normal.",
    },
    {
      label: "Garansi",
      value: "Pastikan masa garansi atau masa cek sebelum transaksi.",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl w-full px-4 py-14 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* ── Breadcrumb (visual only, no new data) ── */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-400">
        <Link
          href="/"
          className="transition hover:text-slate-700"
        >
          Beranda
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
        <Link
          href="/products"
          className="transition hover:text-slate-700"
        >
          Katalog
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
        <span className="line-clamp-1 font-medium text-slate-700">{product.name}</span>
      </nav>

      {/* ── Hero ── */}
      <section className="mt-2 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">

        {/* Gambar — styling lebih premium */}
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-3 shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
            <Image
              src={product.image_url}
              alt={product.name}
              width={1000}
              height={700}
              preload
              quality={82}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-[360px] w-full object-cover sm:h-[460px]"
            />
            {/* Status overlay badge di atas gambar */}
            <div className="absolute left-4 top-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${
                  product.status === "Ready"
                    ? "bg-emerald-500/90 text-white"
                    : "bg-red-500/90 text-white"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    product.status === "Ready" ? "bg-white" : "bg-white"
                  }`}
                />
                {product.status}
              </span>
            </div>
          </div>

          {/* Trust badges di bawah gambar */}
          <div className="mt-3 flex flex-wrap gap-2 px-1 pb-1">
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              Garansi toko 14 hari
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><circle cx="12" cy="8" r="6"/><polyline points="10 6 12 8 16 4"/><path d="M9 14l-3 7 6-2 6 2-3-7"/></svg>
              Kondisi terverifikasi
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Pengiriman ke seluruh Indonesia
            </div>
          </div>
        </div>

        {/* Info produk */}
        <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl shadow-slate-200/80 backdrop-blur-xl sm:p-8">

          {/* Badges — hapus status karena sudah di overlay gambar */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-[#b95410]">
              {product.brand}
            </span>
            <span className="rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              {product.condition}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-black text-slate-950 md:text-4xl leading-tight">
            {product.name}
          </h1>

          {/* Harga */}
          <p className="mt-4 text-3xl font-black text-[#b95410]">
            {formatPrice(product.price)}
          </p>

          {/* Deskripsi */}
          <p className="mt-5 leading-8 text-slate-500 text-sm">{product.description}</p>

          {/* CTA */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
           <WhatsAppButton
  productName={product.name}
  productUrl={`https://laptopku.store/products/${product.slug}`}
/>

            <Link
              href="/products"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50 hover:text-[#b95410]"
            >
              Bandingkan produk
            </Link>
          </div>

          {/* Divider */}
          <div className="mt-7 border-t border-slate-100" />

          {/* Spesifikasi — styling lebih bold */}
          <section className="mt-6" aria-labelledby="spesifikasi-heading">
            <h2
              id="spesifikasi-heading"
              className="text-sm font-bold uppercase tracking-widest text-slate-400"
            >
              Spesifikasi utama
            </h2>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <SpecItem label="Processor" value={product.processor} />
              <SpecItem label="RAM" value={product.ram} />
              <SpecItem label="Storage" value={product.storage} />
              <SpecItem label="Display" value={product.display} />
            </div>
          </section>
        </div>
      </section>

      {/* ── Buyer Checklist + CTA Dark ── */}
      <section
        className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]"
        aria-labelledby="buyer-checklist-heading"
      >
        <div className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl sm:p-8">
          <span className="text-sm font-bold text-[#b95410]">
            Checklist pembeli
          </span>
          <h2
            id="buyer-checklist-heading"
            className="mt-3 text-2xl font-black text-slate-950 md:text-3xl"
          >
            Hal penting yang sebaiknya dikonfirmasi sebelum deal.
          </h2>

          {/* Checklist grid — tiap item punya icon centang */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {buyerChecks.map((item) => (
              <article
                key={item.label}
                className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4"
              >
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h3 className="font-black text-slate-950">{item.label}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    {item.value}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/80 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200/80 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
            Butuh kepastian?
          </p>
          <h2 className="mt-3 text-2xl font-black leading-snug">
            Minta rekomendasi atau foto tambahan via WhatsApp.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Sebutkan nama produk, budget, dan kebutuhan pemakaian agar admin
            bisa memberi jawaban yang lebih tepat.
          </p>
          <div className="mt-6">
            <WhatsAppButton
              productName={product.name}
              className="w-full shadow-none"
            />
          </div>
        </aside>
      </section>

      {/* ── Produk Serupa — dipindah ke luar grid, warna diseragamkan ── */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-1 w-10 rounded-full bg-[#b95410]" />
            <h2 className="text-2xl font-bold text-slate-800">
              Produk Serupa
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                prefetch={false}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden bg-slate-50">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col flex-1 p-4 gap-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#b95410]">
                    {item.brand}
                  </p>
                  <h3 className="font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#b95410] transition-colors duration-200">
                    {item.name}
                  </h3>
                  <div className="mt-auto pt-3">
                    <p className="text-lg font-bold text-slate-900">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Sticky Bottom Bar — mobile only ── */}
      <StickyBar productName={product.name} price={formatPrice(product.price)} />
    </main>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <strong className="mt-1 block text-slate-950">{value}</strong>
    </div>
  );
}
