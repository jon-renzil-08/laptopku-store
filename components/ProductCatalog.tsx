"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { formatPrice } from "@/lib/formatPrice";
import { supabase } from "@/lib/supabase";

const controlClass =
  "h-12 rounded-full border border-slate-900/10 bg-white px-5  w-full text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100";

export default function ProductCatalog() {
  type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    processor: string;
    ram: string;
    storage: string;
    status: string;
    image_url: string;
    slug: string;
    condition: string;
    display: string;
    description: string;
    whatsapp: string;
    created_at: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [ram, setRam] = useState("All");
  const [processor, setProcessor] = useState("All");
  const [storage, setStorage] = useState("All");
  const [status, setStatus] = useState("All");
  const [maxPrice, setMaxPrice] = useState("All");

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error.message);
        return;
      }

      setProducts(data ?? []);
    }

    getProducts();
  }, []);

  const brands = useMemo(
    () => ["All", ...new Set(products.map((product) => product.brand))],
    [products],
  );
  const rams = useMemo(
    () => ["All", ...new Set(products.map((product) => product.ram))],
    [products],
  );
  const processors = useMemo(
    () => ["All", ...new Set(products.map((product) => product.processor))],
    [products],
  );
  const storages = useMemo(
    () => ["All", ...new Set(products.map((product) => product.storage))],
    [products],
  );
  const statuses = ["All", "Ready", "Sold"];

  const priceRanges = [
    { label: "Semua Harga", value: "All" },
    { label: "Di bawah 6 juta", value: "6000000" },
    { label: "Di bawah 8 juta", value: "8000000" },
    { label: "Di bawah 10 juta", value: "10000000" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchBrand = brand === "All" || product.brand === brand;
      const matchRam = ram === "All" || product.ram === ram;
      const matchProcessor =
        processor === "All" || product.processor === processor;
      const matchStorage = storage === "All" || product.storage === storage;
      const matchStatus = status === "All" || product.status === status;
      const matchPrice =
        maxPrice === "All" || product.price <= Number(maxPrice);

      return (
        matchSearch &&
        matchBrand &&
        matchRam &&
        matchProcessor &&
        matchStorage &&
        matchStatus &&
        matchPrice
      );
    });
  }, [products, search, brand, ram, processor, storage, status, maxPrice]);

  function resetFilters() {
    setSearch("");
    setBrand("All");
    setRam("All");
    setProcessor("All");
    setStorage("All");
    setStatus("All");
    setMaxPrice("All");
  }

  return (
    <div className="mt-10 flex items-start gap-8">
      {/* ══════════════════════════════
        SIDEBAR KIRI — Filter Panel
    ══════════════════════════════ */}
      <aside className="sticky top-14 hidden w-80 shrink-0 self-start lg:block">
        <div className="max-h-[calc(100vh-3rem)] overflow-y-auto rounded-[1.75rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Header sidebar */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-slate-700">
              Filter
            </h2>
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#b95410] transition hover:bg-orange-100"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Search */}
            <div>
              <label className="sr-only" htmlFor="search-products">
                Cari laptop
              </label>
              <input
                id="search-products"
                type="search"
                placeholder="Cari laptop..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className={controlClass}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-900/8" />

            {/* Filter Harga */}
            <div>
              <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                Harga
              </p>
              <FilterSelect
                id="price-filter"
                label="Filter harga"
                value={maxPrice}
                onChange={setMaxPrice}
                options={priceRanges}
              />
            </div>

            {/* Filter Brand */}
            <div>
              <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                Brand
              </p>
              <FilterSelect
                id="brand-filter"
                label="Filter brand"
                value={brand}
                onChange={setBrand}
                options={brands.map((item) => ({
                  label: item === "All" ? "Semua Brand" : item,
                  value: item,
                }))}
              />
            </div>

            {/* Filter RAM */}
            <div>
              <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                RAM
              </p>
              <FilterSelect
                id="ram-filter"
                label="Filter RAM"
                value={ram}
                onChange={setRam}
                options={rams.map((item) => ({
                  label: item === "All" ? "Semua RAM" : item,
                  value: item,
                }))}
              />
            </div>

            {/* Filter Processor */}
            <div>
              <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                Processor
              </p>
              <FilterSelect
                id="processor-filter"
                label="Filter processor"
                value={processor}
                onChange={setProcessor}
                options={processors.map((item) => ({
                  label: item === "All" ? "Semua Processor" : item,
                  value: item,
                }))}
              />
            </div>

            {/* Filter Storage */}
            <div>
              <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                Storage
              </p>
              <FilterSelect
                id="storage-filter"
                label="Filter storage"
                value={storage}
                onChange={setStorage}
                options={storages.map((item) => ({
                  label: item === "All" ? "Semua Storage" : item,
                  value: item,
                }))}
              />
            </div>

            {/* Filter Status */}
            <div>
              <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                Status
              </p>
              <FilterSelect
                id="status-filter"
                label="Filter status"
                value={status}
                onChange={setStatus}
                options={statuses.map((item) => ({
                  label: item === "All" ? "Semua Status" : item,
                  value: item,
                }))}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-900/8" />

            {/* Total produk */}
            <p className="text-xs font-medium text-slate-500">
              Menampilkan{" "}
              <span className="font-bold text-slate-800">
                {filteredProducts.length}
              </span>{" "}
              dari{" "}
              <span className="font-bold text-slate-800">
                {products.length}
              </span>{" "}
              produk
            </p>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════
        KANAN — Product Grid
    ══════════════════════════════ */}
      <div className="min-w-0 flex-1">
        {/* Filter mobile — tampil di atas hanya di layar kecil */}
        <div className="mb-5 lg:hidden">
          <div className="rounded-[1.75rem] border border-white/80 bg-white/75 p-4 shadow-xl shadow-slate-200/70 backdrop-blur-xl">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="search-products-mobile">
                Cari laptop
              </label>
              <input
                id="search-products-mobile"
                type="search"
                placeholder="Cari laptop..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className={`${controlClass} sm:col-span-2`}
              />
              <FilterSelect
                id="price-filter-mobile"
                label="Filter harga"
                value={maxPrice}
                onChange={setMaxPrice}
                options={priceRanges}
              />
              <FilterSelect
                id="brand-filter-mobile"
                label="Filter brand"
                value={brand}
                onChange={setBrand}
                options={brands.map((item) => ({
                  label: item === "All" ? "Semua Brand" : item,
                  value: item,
                }))}
              />
              {/* <FilterSelect
                id="ram-filter-mobile"
                label="Filter RAM"
                value={ram}
                onChange={setRam}
                options={rams.map((item) => ({
                  label: item === "All" ? "Semua RAM" : item,
                  value: item,
                }))}
              />
              <FilterSelect
                id="processor-filter-mobile"
                label="Filter processor"
                value={processor}
                onChange={setProcessor}
                options={processors.map((item) => ({
                  label: item === "All" ? "Semua Processor" : item,
                  value: item,
                }))}
              />
              <FilterSelect
                id="storage-filter-mobile"
                label="Filter storage"
                value={storage}
                onChange={setStorage}
                options={storages.map((item) => ({
                  label: item === "All" ? "Semua Storage" : item,
                  value: item,
                }))}
              />
              <FilterSelect
                id="status-filter-mobile"
                label="Filter status"
                value={status}
                onChange={setStatus}
                options={statuses.map((item) => ({
                  label: item === "All" ? "Semua Status" : item,
                  value: item,
                }))}
              /> */}
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-900/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-600">
                Menampilkan {filteredProducts.length} dari {products.length}{" "}
                produk.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-slate-900/10 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50 hover:text-[#b95410]"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Empty state — notifikasi kecil */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-200 bg-white/60 px-8 py-16 text-center backdrop-blur-xl">
            <span className="text-6xl">😢</span>

            <h2 className="mt-4 text-base font-black text-slate-950">
              Hai Sobat <span className="text-xl">👋</span>
              Produk tidak ditemukan
            </h2>
            <p className="mt-2 max-w-xs text-sm text-slate-500">
              Coba ubah kata pencarian atau pilih filter yang berbeda.
            </p>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 && (
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/75 shadow-xl shadow-slate-200/70 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200"
              >
                <div className="relative overflow-hidden bg-slate-100">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={900}
                    height={600}
                    quality={60}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-xl">
                    {product.brand}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#b95410]">
                      {product.condition}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product.status === "Ready"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-black text-slate-950">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {product.processor} · {product.ram} · {product.storage}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-900/10 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {product.display}
                    </span>
                    <span className="rounded-full border border-slate-900/10 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {product.storage}
                    </span>
                  </div>

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
          </section>
        )}
      </div>
    </div>
  );
}

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
};

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: FilterSelectProps) {
  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${controlClass} w-full`}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
