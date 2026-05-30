"use client";

import { useState, useEffect } from "react";
import WhatsAppStickyBar from "@/components/WhatsAppStickyBar";

interface StickyBarProps {
  productName: string;
  price: string;
  slug: string;
}

export default function StickyBar({
  productName,
  price,
  slug,
}: StickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Muncul setelah scroll 400px ke bawah
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/90 px-4 py-3 backdrop-blur-xl transition-all duration-300 lg:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-900">
            {productName}
          </p>
          <p className="text-sm font-black text-[#b95410]">{price}</p>
        </div>
        <WhatsAppStickyBar
          productName={productName}
          productUrl={`https://laptopku-store.vercel.app/products/${slug}`}
          className="shadow-none"
        />
      </div>
    </div>
  );
}
