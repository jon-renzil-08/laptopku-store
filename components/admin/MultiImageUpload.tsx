"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type MultiImageUploadProps = {
  defaultValue?: string[];
};

export default function MultiImageUpload({
  defaultValue = [],
}: MultiImageUploadProps) {
  const [images, setImages] = useState<string[]>(defaultValue);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error } = await supabase.storage
        .from("products")
        .upload(filePath, file);

      if (error) {
        toast.error(error.message);
        continue;
      }

      const { data } = supabase.storage.from("products").getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);

    if (uploadedUrls.length > 0) {
      toast.success("Gambar tambahan berhasil diupload");
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((image) => image !== url));
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Gambar Tambahan
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="w-full rounded-xl border p-3"
        />

        <p className="mt-2 text-xs text-slate-500">
          Upload beberapa gambar seperti tampak depan, belakang, samping,
          charger, mouse, atau kelengkapan lain.
        </p>
      </div>

      {uploading && (
        <p className="text-sm text-slate-500">Uploading images...</p>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((url) => (
            <div
              key={url}
              className="group relative overflow-hidden rounded-2xl border bg-slate-100"
            >
              <div className="relative h-32">
                <Image
                  src={url}
                  alt="Product gallery"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
