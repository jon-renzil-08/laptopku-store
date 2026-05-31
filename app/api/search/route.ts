import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultProducts } from "@/data/defaultProducts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase();

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

  if (!error && data && data.length > 0) {
    return NextResponse.json(data);
  }

  const fallbackProducts = defaultProducts
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.processor.toLowerCase().includes(q) ||
        product.ram.toLowerCase().includes(q) ||
        product.storage.toLowerCase().includes(q)
      );
    })
    .slice(0, 6);

  return NextResponse.json(fallbackProducts);
}