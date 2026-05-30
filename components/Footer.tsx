import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

const footerLinks = [
  { label: "Katalog", href: "/products" },
  { label: "Panduan beli", href: "/#panduan" },
  { label: "Panduan kondisi", href: "/#kondisi" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-900/10 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl w-full gap-8 px-4 py-10 md:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div>
          <Link
            href="/"
            prefetch={false}
            className="text-lg font-black text-slate-950"
            aria-label="Laptopku Store homepage"
          >
            Laptopku<span className="text-[#b95410]">Store</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Katalog laptop bekas berkualitas dengan spesifikasi jelas, status
            stok transparan, dan konsultasi cepat via WhatsApp.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-black text-slate-950">Navigasi</h2>
          <div className="mt-4 grid gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="text-sm font-medium text-slate-600 transition hover:text-[#b95410]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <h2 className="text-sm font-black text-slate-950">Butuh bantuan?</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Tanya stok, kondisi, atau rekomendasi laptop sesuai kebutuhan.
          </p>
          <WhatsAppButton className="mt-4 w-full sm:w-auto" />
        </div>
      </div>

      <div className="border-t border-slate-900/10">
        <div className="mx-auto flex max-w-7xl w-full flex-col gap-2 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p> 2026 Laptopku Store. All rights reserved.</p>
          <p>Jual beli laptop bekas berkualitas.</p>
        </div>
      </div>
    </footer>
  );
}
