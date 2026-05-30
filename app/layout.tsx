import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";



const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laptopkustore.com"),
  applicationName: "Laptopku Store",
  title: {
    default: "Laptopku Store - Jual Beli Laptop Bekas Berkualitas",
    template: "%s | Laptopku Store",
  },
  description:
    "Website jual beli laptop bekas berkualitas dengan katalog produk, detail spesifikasi, dan tombol WhatsApp untuk konsultasi cepat.",
  keywords: [
    "laptop bekas",
    "jual laptop bekas",
    "beli laptop bekas",
    "laptop second",
    "laptop murah",
    "MacBook bekas",
    "ThinkPad bekas",
  ],
  authors: [{ name: "Laptopku Store" }],
  creator: "Laptopku Store",
  publisher: "Laptopku Store",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Laptopku Store - Jual Beli Laptop Bekas Berkualitas",
    description:
      "Temukan laptop bekas berkualitas dengan spesifikasi jelas, kondisi transparan, dan konsultasi cepat via WhatsApp.",
    url: "https://laptopkustore.com",
    siteName: "Laptopku Store",
    images: [
      {
        url: "/products/macbook-air-m1-2020.jpg",
        width: 1200,
        height: 800,
        alt: "Laptop bekas berkualitas di Laptopku Store",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laptopku Store - Jual Beli Laptop Bekas Berkualitas",
    description:
      "Katalog laptop bekas berkualitas dengan spesifikasi jelas dan konsultasi cepat via WhatsApp.",
    images: ["/products/macbook-air-m1-2020.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f47c20",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${plusJakartaSans.variable} ${inter.variable}`} >
      <body className="flex min-h-screen flex-col antialiased" suppressHydrationWarning={true}>
        <div className="flex-1">
          {children}

          <Toaster richColors position="top-right" />
          </div>
      </body>
    </html>
  );
}
