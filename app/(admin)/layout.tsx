// components/admin/AdminSidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

const navLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  // ✅ Tambah divider dengan group
  {
    href: "/admin/products",
    label: "Products",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    group: "Produk", // ← label group section
  },
  
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  let lastGroup = "";

  return (
    <div className="flex h-full flex-col p-6">
      {/* Logo */}
      <Link href="/admin" onClick={onClose} className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#b95410]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-lg font-black text-slate-900">
          Laptopku<span className="text-[#b95410]">.</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="mt-8 flex-1 space-y-0.5">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);

          // ✅ Tampilkan label group section kalau berbeda
          const showGroup = link.group && link.group !== lastGroup;
          if (link.group) lastGroup = link.group;

          return (
            <div key={link.href}>
              {showGroup && (
                <p className="mb-1 mt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {link.group}
                </p>
              )}
              {/* Label section pertama (Dashboard) */}
              {link.href === "/admin" && (
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Overview
                </p>
              )}
              <Link
                href={link.href}
                onClick={onClose}
                className={[
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                  isActive
                    ? "bg-orange-50 text-[#b95410] shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")}
              >
                <span className={isActive ? "text-[#b95410]" : "text-slate-400"}>
                  {link.icon}
                </span>
                {link.label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#b95410]" />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <div className="mb-4 border-t border-slate-100" />
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Website
        </Link>
      </div>
    </div>
  );
}

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Desktop Sidebar ── */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white shadow-sm md:block">
        <SidebarContent />
      </aside>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white shadow-2xl md:hidden">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      {/* ── Main ── */}
      <div className="md:pl-64">

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* ✅ Hamburger button — hanya mobile */}
              <button
                onClick={() => setMobileOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 md:hidden"
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div>
                <p className="text-sm font-black text-slate-900">Admin Dashboard</p>
                <p className="text-xs text-slate-400">Laptopku Store</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#b95410]">
                A
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}