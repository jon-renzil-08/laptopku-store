const phoneNumber = "6285215644688";

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}