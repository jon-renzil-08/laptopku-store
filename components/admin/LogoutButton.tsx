"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "../ui/Spinner";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    const { error } = await supabase.auth.signOut({ scope: "global" }); // ← clear semua token

    setLoading(false); // ← wajib dipanggil

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logout Berhasil");
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-red-600 disabled:opacity-50"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Spinner />
          Logout...
        </span>
      ) : (
        "Logout"
      )}
    </button>
  );
}