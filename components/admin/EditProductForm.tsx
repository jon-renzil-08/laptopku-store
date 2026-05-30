"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import Spinner from "../ui/Spinner";
import Image from "next/image";

// ── helpers ──────────────────────────────────────────

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function generateUniqueSlugForEdit(baseName: string, currentId: string): Promise<string> {
  const baseSlug = generateSlug(baseName);

  const { data } = await supabase
    .from("products")
    .select("slug, id")
    .ilike("slug", `${baseSlug}%`);

  if (!data || data.length === 0) return baseSlug;

  // Exclude produk yang sedang diedit
  const slugs = data
    .filter((p) => p.id !== currentId)
    .map((p) => p.slug);

  if (!slugs.includes(baseSlug)) return baseSlug;

  let counter = 2;
  let candidateSlug = `${baseSlug}-${counter}`;
  while (slugs.includes(candidateSlug)) {
    counter++;
    candidateSlug = `${baseSlug}-${counter}`;
  }

  return candidateSlug;
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-[#b95410]/40 focus:bg-white focus:ring-2 focus:ring-[#b95410]/10";

const selectCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#b95410]/40 focus:bg-white focus:ring-2 focus:ring-[#b95410]/10 cursor-pointer";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
        {required && <span className="text-[#b95410]">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function SectionHeader({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-slate-100 pb-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-black text-[#b95410]">
        {number}
      </div>
      <div>
        <p className="font-bold text-slate-900">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  processor: string;
  ram: string;
  storage: string;
  condition: string;
  status: string;
  image_url: string;
  whatsapp: string;
  slug: string;
  description: string;
  display: string;
};

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [price, setPrice] = useState(String(product.price));
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setName(val);
    setSlug(generateSlug(val));

   if (debounceRef.current) clearTimeout(debounceRef.current);
   debounceRef.current = setTimeout(async () => {
  if (!val.trim()) return;
  const uniqueSlug = await generateUniqueSlugForEdit(val, product.id); // ← pass product.id
  setSlug(uniqueSlug);
}, 600);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const updatedProduct = {
      name: String(formData.get("name")),
      brand: String(formData.get("brand")),
      price: Number(formData.get("price")),
      processor: String(formData.get("processor")),
      ram: String(formData.get("ram")),
      storage: String(formData.get("storage")),
      condition: String(formData.get("condition")),
      status: String(formData.get("status")),
      image_url: String(formData.get("image_url")),
      whatsapp: String(formData.get("whatsapp")),
      slug,
      description: String(formData.get("description")),
      display: String(formData.get("display")),
    };

    const { error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", product.id);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Produk berhasil diupdate!");
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* ── SECTION 1: Info Umum ── */}
      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader number="1" title="Informasi Umum" desc="Nama produk, brand, harga, dan status ketersediaan." />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Nama Produk" required hint="Slug URL akan otomatis update mengikuti nama">
              <input
                name="name"
                value={name}
                onChange={handleNameChange}
                required
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Brand" required>
            <select name="brand" defaultValue={product.brand} required className={selectCls}>
              {["Lenovo","ASUS","HP","Dell","Acer","Apple","MSI","Samsung","Microsoft","Toshiba","Sony"].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </Field>

          <Field label="Harga (Rp)" required hint="Harga dalam Rupiah, tanpa titik/koma">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
              <input
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min={0}
                className={`${inputCls} pl-10`}
              />
            </div>
            {price && (
              <p className="mt-1 text-xs font-semibold text-[#b95410]">
                {Number(price).toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
              </p>
            )}
          </Field>

          <Field label="Kondisi" required>
            <select name="condition" defaultValue={product.condition} required className={selectCls}>
              <option value="Bekas - Sangat Baik">Bekas - Sangat Baik</option>
              <option value="Bekas - Baik">Bekas - Baik</option>
              <option value="Bekas - Normal">Bekas - Normal</option>
              <option value="Baru">Baru</option>
            </select>
          </Field>

          <Field label="Status" required>
            <select name="status" defaultValue={product.status} required className={selectCls}>
              <option value="Tersedia">Tersedia</option>
              <option value="Terjual">Terjual</option>
              <option value="Reserved">Reserved</option>
            </select>
          </Field>
        </div>
      </div>

      {/* ── SECTION 2: Spesifikasi ── */}
      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader number="2" title="Spesifikasi Teknis" desc="Detail hardware laptop yang akan ditampilkan ke pembeli." />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Processor" required hint="Contoh: Intel Core i7-1165G7">
            <input name="processor" defaultValue={product.processor} required className={inputCls} />
          </Field>

          <Field label="RAM" required>
            <select name="ram" defaultValue={product.ram} required className={selectCls}>
              {["4GB","8GB","16GB","32GB","64GB"].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>

          <Field label="Storage" required>
            <select name="storage" defaultValue={product.storage} required className={selectCls}>
              {["128GB SSD","256GB SSD","512GB SSD","1TB SSD","256GB HDD","500GB HDD","1TB HDD"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field label="Display" required hint="Contoh: 14 inch FHD IPS">
            <input name="display" defaultValue={product.display} required className={inputCls} />
          </Field>
        </div>

        <Field label="Deskripsi Produk" required hint="Ceritakan kondisi, kelengkapan, dan keunggulan produk ini">
          <textarea
            name="description"
            defaultValue={product.description}
            rows={5}
            required
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>

      {/* ── SECTION 3: Foto ── */}
      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader number="3" title="Foto Produk" desc="Kosongkan jika tidak ingin mengganti foto." />

        {/* Preview foto saat ini */}
        {product.image_url && (
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <Image src={product.image_url} alt={product.name} width={96} height={64} unoptimized className="rounded-lg object-cover" />
            <div>
              <p className="text-xs font-bold text-slate-700">Foto saat ini</p>
              <p className="mt-0.5 text-xs text-slate-400">Upload foto baru untuk mengganti</p>
            </div>
          </div>
        )}

        <ImageUpload defaultValue={product.image_url} />
      </div>

      {/* ── SECTION 4: Pengaturan ── */}
      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader number="4" title="Pengaturan & Kontak" desc="Slug URL dan nomor WhatsApp." />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Slug URL" hint="Otomatis update mengikuti nama produk.">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 select-none">
                /products/
              </span>
              <input
                name="slug"
                value={slug}
                readOnly
                className={`${inputCls} pl-24 cursor-not-allowed bg-slate-100 text-slate-400`}
              />
            </div>
          </Field>

          <Field label="Nomor WhatsApp" required hint="Format internasional. Contoh: 628123456789">
            <input
              name="whatsapp"
              defaultValue={product.whatsapp}
              required
              className={inputCls}
            />
          </Field>
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <p className="text-xs text-slate-400">
          Field bertanda <span className="font-bold text-[#b95410]">*</span> wajib diisi
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center gap-2 rounded-full bg-[#b95410] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <Spinner />
                Menyimpan...
              </>
            ) : (
              <>
                Update Produk
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

    </form>
  );
}