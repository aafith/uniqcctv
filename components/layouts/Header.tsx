"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS, SITE_CONFIG, WHATSAPP_LINKS } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "shadow-xs" : ""
      }`}
    >
      <div className="mx-auto flex h-17 max-w-6xl items-center justify-between px-4 sm:h-19 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#top"
          className="relative z-60 flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="Uniq CCTV home"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo.webp"
            alt="Uniq CCTV"
            width={200}
            height={67}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-primary"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-primary transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Action: WhatsApp button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href={WHATSAPP_LINKS.general}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-primary/85 active:scale-95 md:inline-flex focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Contact Uniq CCTV on WhatsApp"
          >
            <FaWhatsapp className="size-4" />
            <span>{SITE_CONFIG.phone}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-60 flex h-10 w-10 items-center justify-center rounded-md text-neutral-800 transition-colors hover:bg-neutral-100 lg:hidden focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`overflow-hidden border-t border-neutral-200/80 bg-white transition-all duration-200 lg:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={WHATSAPP_LINKS.general}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
          >
            <FaWhatsapp className="size-4" />
            <span>{SITE_CONFIG.phone}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}