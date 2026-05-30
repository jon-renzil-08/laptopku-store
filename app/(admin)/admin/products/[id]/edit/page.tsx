import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EditProductForm from "@/components/admin/EditProductForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  return <EditProductForm product={product} />;
}
