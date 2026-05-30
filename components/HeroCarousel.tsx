"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { formatPrice } from "@/lib/formatPrice";

type Product = {
  id: string;
  slug: string;
  name: string;
  image_url: string;
  price: number;
  status: string;
  processor: string;
  ram: string;
  storage: string;
};

type Props = {
  products: Product[];
};

export default function HeroCarousel({ products }: Props) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // ✅ goTo didefinisikan dulu sebelum goNext
  const goTo = useCallback((index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }, [animating, current]);

  // ✅ goNext pakai useCallback, depend on goTo dan products.length
  const goNext = useCallback(() => {
    goTo((current + 1) % products.length);
  }, [goTo, current, products.length]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + products.length) % products.length);
  }, [goTo, current, products.length]);

  // Auto slide setiap 4 detik
  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [ goNext]);
  const product = products[current];
  const productSpecs: [string, string][] = [
    ["Processor", product.processor],
    ["RAM", product.ram],
    ["Storage", product.storage],
  ];

  return (
    <div className="relative z-[4] overflow-hidden rounded-2xl border border-white/90 bg-white/85 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
      {/* Window bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-900/8 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
          Catalog cockpit
        </p>
      </div>

      {/* Image area */}
      <Link
        href={`/products/${product.slug}`}
        prefetch={false}
        className="group block bg-slate-950"
      >
        <div className="hero-product-frame relative aspect-[1.08/1] overflow-hidden bg-slate-100 sm:aspect-[1.35/1]">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority
            unoptimized
            quality={75}
            sizes="(max-width: 1024px) 100vw, 520px"
            className={`hero-product-image object-cover transition-all duration-300 group-hover:scale-105 ${
              animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          />
          <div className="hero-image-grid" aria-hidden="true" />
          <div className="hero-scan-line" aria-hidden="true" />
          <div className="hero-corner hero-corner-tl" aria-hidden="true" />
          <div className="hero-corner hero-corner-br" aria-hidden="true" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />

          {/* Badges */}
          <div className="absolute left-4 top-4 z-[4] rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-slate-900 shadow-sm backdrop-blur-xl">
            {product.status}
          </div>
          <div className="absolute right-4 top-4 z-[4] hidden rounded-full border border-green-400/40 bg-green-500/20 px-3 py-1.5 text-xs font-black text-green-300 shadow-sm backdrop-blur-xl sm:inline-flex">
            ✓ QC checked
          </div>

          {/* Product info overlay */}
          <div
            className={`absolute inset-x-4 bottom-4 z-[4] transition-all duration-300 ${
              animating
                ? "opacity-0 translate-y-3"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                  Produk highlight
                </p>
                <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                  {product.name}
                </h2>
              </div>
              <strong className="max-w-full shrink-0 rounded-full bg-white px-4 py-1.5 text-sm font-black text-slate-950 shadow-sm animate-[floatPrice_3s_ease-in-out_infinite]">
                <span className="relative z-10">
                  {formatPrice(product.price)}
                </span>
                <span className="absolute inset-y-0 -left-8 w-6 rotate-12 animate-[shine_2.8s_ease-in-out_infinite] bg-white/40" />
              </strong>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Siap pakai", "Foto asli", "Spek lengkap"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.68rem] font-bold text-white backdrop-blur-xl"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={(e) => {
              e.preventDefault();
              goPrev();
            }}
            className="absolute left-3 top-1/2 z-[5] -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-xl transition hover:bg-white/40"
            aria-label="Produk sebelumnya"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              goNext();
            }}
            className="absolute right-3 top-1/2 z-[5] -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-xl transition hover:bg-white/40"
            aria-label="Produk berikutnya"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M9 18l6-6-6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </Link>

      {/* Specs grid */}
      <div className="p-4 sm:p-5">
        <div
          className={`grid gap-3 sm:grid-cols-3 transition-all duration-300 ${
            animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {productSpecs.map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-100 bg-slate-50 p-3"
            >
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? "w-6 h-2 bg-[#b95410]"
                  : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Produk ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
