"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X, Menu } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Laptop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (detailsRef.current && !detailsRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <details
      ref={detailsRef}
      className="group relative md:hidden"
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary
        className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-orange-50 [&::-webkit-details-marker]:hidden"
        aria-label="Buka navigasi mobile"
      >
        {isOpen ? (
          <X className="size-4 text-slate-600" />
        ) : (
          <Menu className="size-4 text-slate-600" />
        )}
        {isOpen ? "Tutup" : "Menu"}
      </summary>

      <div className="fixed left-0 right-0 top-[150px] px-4 md:hidden">
        <div className="grid gap-2 rounded-[1.5rem] border border-slate-900/10 bg-white/95 p-3 shadow-xl shadow-slate-200/80 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              onClick={closeMenu}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/products"
            prefetch={false}
            onClick={closeMenu}
            className="rounded-2xl bg-[#b95410] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#9a430c]"
          >
            Lihat Laptop
          </Link>
        </div>
      </div>
    </details>
  );
}