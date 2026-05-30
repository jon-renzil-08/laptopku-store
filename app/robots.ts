export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login"],
    },
    sitemap: "https://laptopkustore.com/sitemap.xml",
  };
}