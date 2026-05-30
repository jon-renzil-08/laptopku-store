"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Props = {
  defaultValue?: string;
};

export default function ImageUpload({ defaultValue = "" }: Props) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(filePath, file);

    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(filePath);

    setImageUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name="image_url" value={imageUrl} />

      {imageUrl && (
        <div className="relative h-56 overflow-hidden rounded-2xl border bg-slate-100">
          <Image
            src={imageUrl}
            alt="Product preview"
            fill 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="w-full rounded-xl border p-3"
      />

      {uploading && (
        <p className="text-sm text-slate-500">Uploading image...</p>
      )}
    </div>
  );
}