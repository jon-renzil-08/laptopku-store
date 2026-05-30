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
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  const productList = products ?? [];

  const totalProducts = productList.length;
  const readyProducts = productList.filter((item) => item.status === "Tersedia");
  const soldProducts = productList.filter((item) => item.status === "Sold");

  const newProductsThisMonth = productList.filter(
    (item) => item.created_at && new Date(item.created_at) >= new Date(startOfMonth),
  );

  const soldThisMonth = productList.filter(
    (item) =>
      item.status === "Sold" &&
      item.sold_at &&
      new Date(item.sold_at) >= new Date(startOfMonth),
  );

  const monthlyRevenue = soldThisMonth.reduce(
    (total, item) => total + Number(item.price ?? 0),
    0,
  );

  const inventoryValue = readyProducts.reduce(
    (total, item) => total + Number(item.price ?? 0),
    0,
  );

  const brands = Array.from(new Set(productList.map((item) => item.brand))).filter(Boolean);

  const stats = [
    {
      label: "Laptop Masuk Bulan Ini",
      value: newProductsThisMonth.length,
      desc: "Produk baru ditambahkan",
    },
    {
      label: "Penjualan Bulan Ini",
      value: soldThisMonth.length,
      desc: formatPrice(monthlyRevenue),
    },
    {
      label: "Produk Tersedia",
      value: readyProducts.length,
      desc: "Siap dijual",
    },
    {
      label: "Nilai Stok Tersedia",
      value: formatPrice(inventoryValue),
      desc: "Estimasi inventory",
    },
    {
      label: "Total Produk",
      value: totalProducts,
      desc: "Semua data laptop",
    },
    {
      label: "Brand Aktif",
      value: brands.length,
      desc: brands.slice(0, 3).join(", ") || "Belum ada brand",
    },
  ];

  const recentProducts = productList.slice(0, 6);

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-orange-400">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">
            Overview Laptopku Store
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Pantau stok masuk, penjualan bulan ini, nilai inventory, dan produk terbaru.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-full bg-[#b95410] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/40 transition hover:-translate-y-0.5 hover:bg-[#9a430c]"
        >
          Add Product
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl"
          >
            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            <h2 className="mt-3 text-3xl font-black text-white">{stat.value}</h2>
            <p className="mt-2 text-sm text-slate-500">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/10 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div>
              <h2 className="text-xl font-black text-white">Produk Terbaru</h2>
              <p className="mt-1 text-sm text-slate-400">
                Laptop terbaru yang masuk ke inventory.
              </p>
            </div>

            <Link
              href="/admin/products/new"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 md:inline-flex"
            >
              Tambah
            </Link>
          </div>

          <div className="divide-y divide-white/10">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-white/[0.03] md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-24 overflow-hidden rounded-2xl bg-slate-800">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                     
                       sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-white">{product.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {product.brand} • {product.ram} • {product.storage}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      product.status === "Sold"
                        ? "bg-red-500/10 text-red-300"
                        : "bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    {product.status ?? "Tersedia"}
                  </span>

                  <p className="font-black text-orange-300">
                    {formatPrice(product.price)}
                  </p>

                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/10"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
          <h2 className="text-xl font-black text-white">Ringkasan Cepat</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-emerald-500/10 p-4">
              <p className="text-sm text-emerald-300">Tersedia Rate</p>
              <p className="mt-2 text-2xl font-black text-white">
                {totalProducts > 0
                  ? Math.round((readyProducts.length / totalProducts) * 100)
                  : 0}
                %
              </p>
            </div>

            <div className="rounded-2xl bg-orange-500/10 p-4">
              <p className="text-sm text-orange-300">Sold Rate</p>
              <p className="mt-2 text-2xl font-black text-white">
                {totalProducts > 0
                  ? Math.round((soldProducts.length / totalProducts) * 100)
                  : 0}
                %
              </p>
            </div>

            <div className="rounded-2xl bg-sky-500/10 p-4">
              <p className="text-sm text-sky-300">Brand Terdaftar</p>
              <p className="mt-2 text-sm font-semibold text-white">
                {brands.join(", ") || "Belum ada brand"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}