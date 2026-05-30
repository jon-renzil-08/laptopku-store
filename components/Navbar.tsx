
import Link from "next/link";
import NavbarSearch from "./NavbarSearch";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Laptop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];



export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl w-full items-center justify-between gap-4 px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          prefetch={false}
          className="shrink-0 text-base font-black text-slate-950 sm:text-lg"
          aria-label="Laptopku Store homepage"
        >
          Laptopku<span className="text-[#b95410]">Store</span>
        </Link>

        {/* Search desktop */}
        <div className="hidden md:block md:flex-1 md:max-w-xl">
          <NavbarSearch />
        </div>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/products"
          prefetch={false}
          className="hidden shrink-0 rounded-full bg-[#b95410] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-200/70 transition hover:-translate-y-0.5 hover:bg-[#9a430c] md:inline-flex"
        >
          Lihat Laptop
        </Link>

        {/* Mobile hamburger */}
        <MobileMenu />
      </nav>

      {/* Search mobile */}
      <div className="border-t border-slate-900/5 px-4 py-3  md:hidden">
        <div className="relative w-full">
          <NavbarSearch />
        </div>
      </div>
    </header>
  );
}
