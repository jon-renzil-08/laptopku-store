"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      const msg =
        error.message === "Invalid login credentials"
          ? "Email atau password salah!"
          : error.message;

      toast.error(msg);
      return;
    }
    toast.success("Login Berhasil");
    router.push("/admin");
    router.refresh();
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatLaptop {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes spinLoader {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .fade-1  { animation: fadeUp 0.5s 0.05s ease both; opacity: 0; }
        .fade-2  { animation: fadeUp 0.5s 0.12s ease both; opacity: 0; }
        .fade-3  { animation: fadeUp 0.5s 0.19s ease both; opacity: 0; }
        .fade-4  { animation: fadeUp 0.5s 0.26s ease both; opacity: 0; }
        .fade-5  { animation: fadeUp 0.5s 0.33s ease both; opacity: 0; }
        .laptop  { animation: floatLaptop 4s ease-in-out infinite; }
        .spinner { animation: spinLoader 0.75s linear infinite; }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer 2.5s infinite;
        }
      `}</style>

      <div className="flex min-h-screen">
        {/* ── LEFT PANEL ── */}
        <div className="relative hidden w-1/2 flex-col overflow-hidden bg-slate-950 lg:flex">
          {/* Grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

          {/* Glow top */}
          <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#b95410]/20 blur-3xl" />
          {/* Glow bottom */}
          <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative flex flex-1 flex-col justify-between p-12">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b95410]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-lg font-black text-white">
                Laptopku<span className="text-[#b95410]">.</span>
              </span>
            </div>

            {/* Center — laptop illustration + text */}
            <div className="flex flex-col items-center text-center">
              {/* Laptop SVG */}
              <div className="laptop mb-10">
                <svg
                  viewBox="0 0 380 260"
                  className="w-80 drop-shadow-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Screen body */}
                  <rect
                    x="40"
                    y="10"
                    width="300"
                    height="195"
                    rx="12"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  {/* Screen inner */}
                  <rect
                    x="52"
                    y="22"
                    width="276"
                    height="171"
                    rx="6"
                    fill="#0f172a"
                  />
                  {/* Screen content — fake UI */}
                  <rect
                    x="62"
                    y="32"
                    width="80"
                    height="8"
                    rx="4"
                    fill="#b95410"
                    opacity="0.9"
                  />
                  <rect
                    x="62"
                    y="48"
                    width="120"
                    height="6"
                    rx="3"
                    fill="#334155"
                  />
                  <rect
                    x="62"
                    y="60"
                    width="90"
                    height="6"
                    rx="3"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  {/* fake cards */}
                  <rect
                    x="62"
                    y="78"
                    width="82"
                    height="56"
                    rx="8"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <rect
                    x="154"
                    y="78"
                    width="82"
                    height="56"
                    rx="8"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <rect
                    x="246"
                    y="78"
                    width="72"
                    height="56"
                    rx="8"
                    fill="#1e293b"
                    stroke="#b95410"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                  <rect
                    x="70"
                    y="86"
                    width="40"
                    height="4"
                    rx="2"
                    fill="#475569"
                  />
                  <rect
                    x="70"
                    y="94"
                    width="60"
                    height="3"
                    rx="2"
                    fill="#334155"
                  />
                  <rect
                    x="70"
                    y="100"
                    width="50"
                    height="3"
                    rx="2"
                    fill="#334155"
                  />
                  <rect
                    x="70"
                    y="112"
                    width="30"
                    height="12"
                    rx="6"
                    fill="#b95410"
                    opacity="0.8"
                  />
                  <rect
                    x="162"
                    y="86"
                    width="40"
                    height="4"
                    rx="2"
                    fill="#475569"
                  />
                  <rect
                    x="162"
                    y="94"
                    width="60"
                    height="3"
                    rx="2"
                    fill="#334155"
                  />
                  <rect
                    x="162"
                    y="100"
                    width="50"
                    height="3"
                    rx="2"
                    fill="#334155"
                  />
                  <rect
                    x="162"
                    y="112"
                    width="30"
                    height="12"
                    rx="6"
                    fill="#334155"
                  />
                  {/* fake table rows */}
                  <rect x="62" y="148" width="256" height="1" fill="#1e293b" />
                  <rect
                    x="62"
                    y="150"
                    width="256"
                    height="22"
                    rx="4"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="0.5"
                  />
                  <rect
                    x="68"
                    y="157"
                    width="80"
                    height="4"
                    rx="2"
                    fill="#334155"
                  />
                  <rect
                    x="200"
                    y="157"
                    width="40"
                    height="4"
                    rx="2"
                    fill="#334155"
                  />
                  <rect
                    x="290"
                    y="154"
                    width="22"
                    height="10"
                    rx="5"
                    fill="#064e3b"
                    opacity="0.8"
                  />
                  <rect
                    x="62"
                    y="174"
                    width="256"
                    height="16"
                    rx="4"
                    fill="#0f172a"
                  />
                  <rect
                    x="68"
                    y="179"
                    width="60"
                    height="4"
                    rx="2"
                    fill="#1e293b"
                  />
                  {/* Camera dot */}
                  <circle
                    cx="190"
                    cy="17"
                    r="3"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  {/* Base / hinge */}
                  <rect
                    x="30"
                    y="205"
                    width="320"
                    height="14"
                    rx="4"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />
                  {/* Keyboard area */}
                  <rect
                    x="30"
                    y="205"
                    width="320"
                    height="40"
                    rx="6"
                    fill="#0f172a"
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                  <rect
                    x="120"
                    y="230"
                    width="140"
                    height="10"
                    rx="5"
                    fill="#1e293b"
                  />
                  {/* small keyboard keys suggestion */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <rect
                      key={i}
                      x={50 + i * 32}
                      y="215"
                      width="26"
                      height="8"
                      rx="2"
                      fill="#1e293b"
                      stroke="#334155"
                      strokeWidth="0.5"
                    />
                  ))}
                </svg>
              </div>

              <h2 className="text-3xl font-black leading-tight text-white">
                Kelola toko laptopmu
                <br />
                <span className="text-[#b95410]">dari mana saja.</span>
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Dashboard admin untuk mengelola produk, stok, dan harga laptop
                bekas dengan mudah.
              </p>
            </div>

            {/* Bottom — feature pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Manajemen Produk",
                "Upload Foto",
                "Supabase DB",
                "Real-time",
              ].map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-400 backdrop-blur-sm"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex w-full flex-col justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#b95410]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-lg font-black text-slate-900">
              Laptopku<span className="text-[#b95410]">.</span>
            </span>
          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* Heading */}
            <div className="fade-1 mb-8">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#b95410]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b95410]" />
                Admin Panel
              </div>
              <h1 className="text-3xl font-black text-slate-900">
                Selamat datang! Alva 👋
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Masukkan kredensial kamu untuk lanjut ke dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="fade-2">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <EmailIcon />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="admin@laptopku.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-[#b95410]/40 focus:bg-white focus:ring-2 focus:ring-[#b95410]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="fade-3">
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-[#b95410]/40 focus:bg-white focus:ring-2 focus:ring-[#b95410]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="fade-4 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="shimmer-btn group relative w-full overflow-hidden rounded-2xl bg-[#b95410] py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="spinner h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          className="opacity-75"
                        />
                      </svg>
                      Sedang masuk...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Masuk ke Dashboard
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <p className="fade-5 mt-8 text-center text-xs text-slate-400">
              Laptopku Store Alva &copy; {new Date().getFullYear()} &middot; Admin Panel
              &middot; Nias, Gunungsitoli Utara, Tetehosi Afia 🌴
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function EmailIcon() {
  return (
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
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
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
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
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
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
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
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}
