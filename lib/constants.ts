export const SITE_CONFIG = {
  name: "Uniq CCTV",
  tagline: "Smart Surveillance & Security Solutions",
  location: "Main Street, Sainthamaruthu, Sri Lanka",
  phone: "+94 77 123 4567",
  whatsappNumber: "94771234567",
  hours: "Mon – Sat: 8:30 AM – 7:00 PM",
} as const;

export const NAV_LINKS = [
  { label: "Overview", href: "#top" },
  { label: "Showcase", href: "#gallery" },
  { label: "Features", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_LINKS = {
  general: getWhatsAppUrl(
    "Hello Uniq CCTV, I would like to inquire about your CCTV security packages and installation services."
  ),
  quote: getWhatsAppUrl(
    "Hello Uniq CCTV, I would like to request a free quote for a CCTV surveillance installation."
  ),
  consultation: getWhatsAppUrl(
    "Hello Uniq CCTV, I would like to consult with an expert regarding CCTV security systems."
  ),
};
