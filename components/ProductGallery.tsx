"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  productName: string;
  status?: string;
  imageUrl: string;
  images?: string[];
};

export default function ProductGallery({
  productName,
  status = "Ready",
  imageUrl,
  images = [],
}: ProductGalleryProps) {
  const safeImages = Array.isArray(images) ? images : [];
  const galleryImages = [imageUrl, ...safeImages].filter(Boolean);
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  const isReady = status === "Ready" || status === "Tersedia";

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-2xl shadow-slate-200/70 backdrop-blur-2xl">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
        <Image
          src={activeImage}
          alt={productName}
          width={1000}
          height={700}
          priority
          loading="eager"
          quality={82}
          sizes="64px"
          className="h-[360px] w-full object-cover transition duration-500 sm:h-[460px]"
        />

        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md ${
              isReady ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {status}
          </span>
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-3">
          <p className="text-sm font-bold text-slate-900">Foto Detail Laptop</p>
          <p className="text-xs text-slate-500">
            Tampak depan, belakang, samping, dan aksesoris kelengkapan laptop.
          </p>
        </div>

        {galleryImages.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
            {galleryImages.map((image, index) => {
              const isActive = activeImage === image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
                    isActive
                      ? "border-[#b95410] ring-4 ring-orange-100"
                      : "border-slate-200 hover:border-orange-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} image ${index + 1}`}
                    fill
                    loading="eager"
                    quality={60}
                    sizes="(max-width: 640px) 25vw, 20vw)"
                    className="object-cover transition duration-300 hover:scale-105"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 px-1 pb-1">
        {[
          "Garansi toko 14 hari",
          "Kondisi terverifikasi",
          "Pengiriman seluruh Indonesia",
        ].map((item) => (
          <div
            key={item}
            className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
          >
            ✓ {item}
          </div>
        ))}
      </div>
    </div>
  );
}
