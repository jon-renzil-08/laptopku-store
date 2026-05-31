import type { MetadataRoute } from "next";
import { defaultProducts } from "@/data/defaultProducts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://laptopkustore.com";

  const productUrls = defaultProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}