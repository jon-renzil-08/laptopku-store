export const dynamic = "force-dynamic";
export const revalidate = 0;

import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/formatPrice";

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-red-100 bg-red-50">
        <p className="text-sm font-semibold text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  const productList = products ?? [];
  const totalProducts = productList.length;
  const readyProducts = productList.filter((item) => item.status === "Tersedia");
  const soldProducts  = productList.filter((item) => item.status === "Terjual");

  const newProductsThisMonth = productList.filter(
    (item) => item.created_at && new Date(item.created_at) >= new Date(startOfMonth),
  );

  const soldThisMonth = productList.filter(
    (item) => item.status === "Terjual" && item.sold_at &&
      new Date(item.sold_at) >= new Date(startOfMonth),
  );

  const monthlyRevenue  = soldThisMonth.reduce((t, i) => t + Number(i.price ?? 0), 0);
  const inventoryValue  = readyProducts.reduce((t, i) => t + Number(i.price ?? 0), 0);
  const brands          = Array.from(new Set(productList.map((i) => i.brand))).filter(Boolean);
  const recentProducts  = productList.slice(0, 6);

  const stats = [
    {
      label: "Laptop Masuk Bulan Ini",
      value: newProductsThisMonth.length,
      desc:  "Produk baru ditambahkan",
      accent: false,
      icon: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      label: "Penjualan Bulan Ini",
      value: soldThisMonth.length,
      desc:  formatPrice(monthlyRevenue),
      accent: true,
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    },
    {
      label: "Produk Tersedia",
      value: readyProducts.length,
      desc:  "Siap dijual",
      accent: false,
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Nilai Stok Tersedia",
      value: formatPrice(inventoryValue),
      desc:  "Estimasi inventory",
      accent: false,
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Total Produk",
      value: totalProducts,
      desc:  "Semua data laptop",
      accent: false,
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    },
    {
      label: "Brand Aktif",
      value: brands.length,
      desc:  brands.slice(0, 3).join(", ") || "Belum ada brand",
      accent: false,
      icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    },
  ];

  return (
    <section className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#b95410]">
            Admin Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            Overview Laptopku Store
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#b95410] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:brightness-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Produk
        </Link>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-5 shadow-sm ${
              stat.accent
                ? "bg-[#b95410] text-white"
                : "border border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${stat.accent ? "text-orange-100" : "text-slate-400"}`}>
                  {stat.label}
                </p>
                <p className={`mt-2 text-3xl font-black ${stat.accent ? "text-white" : "text-slate-900"}`}>
                  {stat.value}
                </p>
                <p className={`mt-1 text-xs ${stat.accent ? "text-orange-100" : "text-slate-400"}`}>
                  {stat.desc}
                </p>
              </div>
              <div className={`rounded-xl p-2.5 ${stat.accent ? "bg-white/20" : "bg-slate-100"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${stat.accent ? "text-white" : "text-slate-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Grid ── */}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">

        {/* Produk Terbaru */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-black text-slate-900">Produk Terbaru</h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Laptop terbaru yang masuk ke inventory
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-[#b95410] hover:underline"
            >
              Lihat semua →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentProducts.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <p className="text-sm font-semibold text-slate-400">Belum ada produk</p>
                <Link href="/admin/products/new" className="text-xs font-bold text-[#b95410] hover:underline">
                  Tambah sekarang →
                </Link>
              </div>
            ) : recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-4 p-4 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{product.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {product.brand} · {product.ram} · {product.storage}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    product.status === "Terjual"
                      ? "bg-orange-50 text-[#b95410] border border-orange-200"
                      : product.status === "Reserved"
                      ? "bg-slate-100 text-slate-600 border border-slate-200"
                      : "bg-teal-50 text-teal-700 border border-teal-200"
                  }`}>
                    {product.status ?? "Tersedia"}
                  </span>

                  <p className="font-black text-[#b95410]">
                    {formatPrice(product.price)}
                  </p>

                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan Cepat */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-black text-slate-900">Ringkasan Cepat</h2>

          <div className="mt-5 space-y-4">

            {/* Tersedia Rate */}
            <div className="rounded-2xl bg-teal-50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-600">
                Tersedia Rate
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">
                {totalProducts > 0 ? Math.round((readyProducts.length / totalProducts) * 100) : 0}%
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-teal-100">
                <div
                  className="h-1.5 rounded-full bg-teal-500 transition-all duration-700"
                  style={{ width: totalProducts > 0 ? `${(readyProducts.length / totalProducts) * 100}%` : "0%" }}
                />
              </div>
            </div>

            {/* Terjual Rate */}
            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#b95410]">
                Terjual Rate
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">
                {totalProducts > 0 ? Math.round((soldProducts.length / totalProducts) * 100) : 0}%
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-orange-100">
                <div
                  className="h-1.5 rounded-full bg-[#b95410] transition-all duration-700"
                  style={{ width: totalProducts > 0 ? `${(soldProducts.length / totalProducts) * 100}%` : "0%" }}
                />
              </div>
            </div>

            {/* Brand */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Brand Terdaftar
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {brands.length === 0 ? (
                  <p className="text-sm text-slate-400">Belum ada brand</p>
                ) : brands.map((b) => (
                  <span key={String(b)} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {String(b)}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}