import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { supabase } from "@/lib/supabase";

export default async function ProductPreviewSection() {
  const { data: previewProducts, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error || !previewProducts || previewProducts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl w-full px-4 py-16 sm:py-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="text-sm font-bold text-[#b95410]">
            Produk pilihan
          </span>

          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">
            Laptop bekas siap pakai untuk kebutuhan produktif.
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            Pilihan teratas dengan spesifikasi ringkas, foto produk, status
            stok, dan harga yang mudah dibandingkan.
          </p>
        </div>

        <Link
          href="/products"
          prefetch={false}
          className="w-fit rounded-full border border-slate-900/10 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
        >
          Lihat Semua Laptop Tersedia
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {previewProducts.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/75 shadow-xl shadow-slate-200/70 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200"
          >
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <Image
                src={product.image_url}
                alt={product.name}
                
                width={900}
                height={600}
                loading="eager"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className=" object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-xl">
                {product.brand}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#b95410]">
                  {product.condition}
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  {product.status}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-black text-slate-950">
                {product.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {product.processor} - {product.ram} - {product.storage}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <strong className="text-lg text-[#b95410]">
                  {formatPrice(product.price)}
                </strong>

                <Link
                  href={`/products/${product.slug}`}
                  prefetch={false}
                  className="rounded-full border border-slate-900/10 px-4 py-2 text-sm font-bold text-slate-900 transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#b95410]"
                >
                  Detail
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
