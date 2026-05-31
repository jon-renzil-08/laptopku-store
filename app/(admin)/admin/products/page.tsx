export const dynamic = "force-dynamic";
export const revalidate = 0;
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ProductsClient from "@/components/admin/ProductsClient";

export default async function AdminProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-red-100 bg-red-50">
        <div className="text-center">
          <p className="text-2xl">⚠️</p>
          <p className="mt-2 font-semibold text-red-600">Gagal memuat produk</p>
          <p className="mt-1 text-sm text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const total = products?.length ?? 0;
  const tersedia = products?.filter((p) => p.status === "Tersedia").length ?? 0;
  const terjual = products?.filter((p) => p.status === "Terjual").length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#b95410]">
            Admin Panel
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            Manage Products
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#b95410] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:brightness-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Total
          </p>
          <p className="mt-2 text-3xl font-black text-slate-900">{total}</p>
          <p className="mt-1 text-xs text-slate-400">Semua produk</p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Tersedia
          </p>
          <p className="mt-2 text-3xl font-black text-emerald-700">
            {tersedia}
          </p>
          <p className="mt-1 text-xs text-emerald-500">Siap dijual</p>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b95410]">
            Terjual
          </p>
          <p className="mt-2 text-3xl font-black text-[#b95410]">{terjual}</p>
          <p className="mt-1 text-xs text-orange-400">Sudah laku</p>
        </div>
      </div>

      {/* Table — client component untuk search */}
      <ProductsClient products={products ?? []} />
    </div>
  );
}
