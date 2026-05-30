"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  status: string;
  image_url: string;
};

// 1. Removed formatPrice from Props interface
type Props = {
  products: Product[];
};

const statusStyles: Record<string, string> = {
  Tersedia: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Terjual:  "bg-orange-50 text-[#b95410] border border-orange-200",
  Reserved: "bg-blue-50 text-blue-700 border border-blue-200",
};

// 2. Local formatter function replacing the prop
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

// 3. Removed formatPrice from the destructured arguments
export default function ProductsClient({ products }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "Semua" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Search & Filter bar */}
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama atau brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#b95410]/40 focus:ring-2 focus:ring-[#b95410]/10 sm:w-64"
          />
        </div>

        <div className="flex gap-2">
          {["Semua", "Tersedia", "Terjual", "Reserved"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={[
                "rounded-full px-4 py-2 text-xs font-bold transition",
                statusFilter === s
                  ? "bg-[#b95410] text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="font-bold text-slate-700">
            {search ? "Produk tidak ditemukan" : "Belum ada produk"}
          </p>
          <p className="text-sm text-slate-400">
            {search ? `Tidak ada hasil untuk "${search}"` : "Tambah produk pertamamu sekarang"}
          </p>
          {!search && (
            <Link
              href="/admin/products/new"
              className="mt-2 rounded-full bg-[#b95410] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              Add Product
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="group text-sm transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{product.name}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{product.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {product.brand}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-900">
                    {formatPrice(product.price)}
                  </td>

                  <td className="px-6 py-4">
                    <span className={[
                      "rounded-full px-3 py-1 text-xs font-bold",
                      statusStyles[product.status] ?? "bg-slate-100 text-slate-600 border border-slate-200",
                    ].join(" ")}>
                      {product.status ?? "—"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-100"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer count */}
          <div className="border-t border-slate-100 px-6 py-3">
            <p className="text-xs text-slate-400">
              Menampilkan <span className="font-bold text-slate-600">{filtered.length}</span> dari{" "}
              <span className="font-bold text-slate-600">{products.length}</span> produk
            </p>
          </div>
        </div>
      )}
    </div>
  );
}