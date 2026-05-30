"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

type Product = {
  id: string;
  slug: string;
  name: string;
  image_url: string;
  price: number;
  brand: string;
  ram: string;
};

type Props = {
  products: Product[];
};

export default function ProductMarquee({ products }: Props) {
  const items = [...products];

  return (
    <div className="relative mx-auto mt-32 max-w-7xl overflow-hidden rounded-[2rem] border border-transparent bg-transparent p-3 ">
      {/* Fade kiri */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white/80 to-transparent" />
      {/* Fade kanan */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white/80 to-transparent" />

      <div className="marquee-track flex gap-5 sm:gap-6">
        {items.map((product, index) => (
          <Link
            key={`${product.id}-${index}`}
            href={`/products/${product.slug}`}
            prefetch={false}
            className="group relative w-64 shrink-0 overflow-visible rounded-3xl border border-white/40 bg-white/70 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-2xl"
          >
            {/* Price Floating */}
            <div className="absolute right-4 top-4 z-50 overflow-hidden rounded-2xl bg-white/90 px-3 py-1.5 text-xs font-black text-[#b95410] shadow-lg backdrop-blur-md animate-[floatPrice_3s_ease-in-out_infinite]">
              <span className="relative z-10">
                {formatPrice(product.price)}
              </span>
              <span className="absolute inset-y-0 -left-8 w-6 rotate-12 animate-[shine_2.8s_ease-in-out_infinite] bg-white/40" />
            </div>

            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden rounded-t-3xl bg-slate-100 sm:h-48">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="64px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="space-y-2 p-4">
              <p className="line-clamp-2 text-sm font-bold leading-snug text-slate-900">
                {product.name}
              </p>

              <p className="text-xs font-medium text-slate-500">
                {product.brand} • {product.ram}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
