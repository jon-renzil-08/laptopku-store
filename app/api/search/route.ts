import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, brand, price, slug, image_url, processor, ram, storage")
    .or(
      `name.ilike.%${q}%,brand.ilike.%${q}%,processor.ilike.%${q}%,ram.ilike.%${q}%,storage.ilike.%${q}%`,
    )
    .limit(6);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}