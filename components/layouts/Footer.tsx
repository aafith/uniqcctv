import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, ShieldCheck, ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG, WHATSAPP_LINKS } from "@/lib/constants";

const SERVICES = [
  "4K Ultra HD Commercial & Home Setup",
  "Color Night Vision & AI Human Detection",
  "Cloud & NVR Secure Video Storage",
  "Smartphone Remote Live Viewing",
  "Annual Maintenance & Technical Support",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-10 border-t border-neutral-200 bg-[#0c0e10] text-neutral-300">
      {/* Top accent border */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-amber-500" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link
              href="#top"
              className="inline-flex items-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Back to top"
            >
              <Image
                src="/logo.webp"
                alt="Uniq CCTV"
                width={170}
                height={57}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400">
              Sainthamaruthu&apos;s premier security solutions provider. Delivering crystal-clear 4K surveillance, intelligent detection, and dependable 24/7 peace of mind.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Licensed &amp; Verified Security Integrator
              </span>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Surveillance Solutions</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Contact &amp; Hours</h3>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Main Street, Sainthamaruthu, Ampara District, Eastern Province, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                <a
                  href={`tel:+${SITE_CONFIG.whatsappNumber}`}
                  className="transition-colors hover:text-white focus-visible:outline-hidden focus-visible:underline"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Mon – Sat: 8:30 AM – 7:00 PM<br /><span className="text-xs text-neutral-500">Sunday: On-call emergency service</span></span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Action / WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Direct Consultation</h3>
            <p className="text-sm text-neutral-400">
              Need a custom assessment for your property or shop? Connect directly with our lead technician via WhatsApp.
            </p>
            <a
              href={WHATSAPP_LINKS.consultation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary/85 active:scale-98 focus-visible:outline-2 focus-visible:outline-white"
            >
              <FaWhatsapp className="size-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800/80 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; {currentYear} Uniq CCTV. All rights reserved. Sainthamaruthu, Sri Lanka.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-500">
            <Link
              href="#top"
              className="inline-flex items-center gap-1 transition-colors hover:text-neutral-300 focus-visible:outline-hidden focus-visible:underline"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
