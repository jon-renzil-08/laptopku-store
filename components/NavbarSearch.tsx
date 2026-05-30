"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/formatPrice";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  slug: string;
  image_url: string;
  processor: string;
  ram: string;
  storage: string;
};

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const keyword = query.trim();
  
  const timeout = setTimeout(async () => {
  if (keyword.length < 2) {
    setProducts([]);
    return;
  }

    setLoading(true);

    const response = await fetch(
      `/api/search?q=${encodeURIComponent(keyword)}`,
    );
    const data = await response.json();

    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, keyword.length >= 2 ? 300 : 0);

  return () => clearTimeout(timeout);
}, [query]);

  return (
    <div className="relative w-full md:flex-1 md:max-w-xl ">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari laptop, brand, processor..."
          className="h-11 w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {query.trim().length >= 2 && (
        <div className="absolute left-0 top-[calc(100%+0.75rem)] z-50 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
          {loading ? (
            <p className="p-4 text-sm text-slate-500">
              Sedang mencari laptop...
            </p>
          ) : products.length === 0 ? (
            <div className="p-4 text-center">
              <span className="text-6xl">😢</span>

              <h2 className="mt-4 text-base font-black text-slate-950">
                Hai Sobat <span className="text-xl">👋</span>
                Produk tidak ditemukan
              </h2>
              <p className="mt-2  text-sm text-slate-500">
                Coba ubah kata pencarian atau pilih filter yang berbeda.
              </p>
            </div>
          ) : (
            <div className="max-h-[26rem] overflow-y-auto p-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setQuery("")}
                  className="flex items-center justify-between gap-3 rounded-2xl p-3 transition hover:bg-orange-50"
                >
                  {/* Gambar */}
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info produk */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {product.brand} • {product.processor} • {product.ram}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#b95410]">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  {/* Lihat Detail */}
                  <span className="shrink-0 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-[#b95410] transition group-hover:bg-orange-100">
                    Lihat Detail →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
