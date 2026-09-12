import type { Metadata, Viewport } from "next";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Uniq CCTV | Smart Surveillance & Security Solutions - Sainthamaruthu",
  description:
    "Professional CCTV installation, smart 4K surveillance systems, and 24/7 security monitoring for residential and commercial properties in Sainthamaruthu, Sri Lanka.",
  keywords: [
    "CCTV Sainthamaruthu",
    "Security Camera Sri Lanka",
    "Uniq CCTV",
    "Surveillance System",
    "Smart Security",
    "CCTV Installation",
  ],
  authors: [{ name: "Uniq CCTV" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Uniq CCTV | Smart Surveillance & Security Solutions",
    description:
      "Professional CCTV installation, smart 4K surveillance systems, and 24/7 security monitoring for residential and commercial properties.",
    type: "website",
    locale: "en_LK",
    siteName: "Uniq CCTV",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
