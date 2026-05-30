// app/(public)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsApp />
    </>
  );
}