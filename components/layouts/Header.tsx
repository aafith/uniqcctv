"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

// TODO: Replace with actual WhatsApp business number (digits only, no + or spaces)
const WHATSAPP_NUMBER = "94771234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Adds a background/blur once the user scrolls past the top
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll + close menu on route-ish escape when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled || menuOpen
        ? "border-foreground/10 bg-background/90 backdrop-blur-xl"
        : "border-transparent bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-17 max-w-6xl items-center justify-between px-4 sm:h-19 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#top"
          className="relative z-60 flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.03]"
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

        {/* Desktop navigation links */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[14px] font-medium text-foreground/65 transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right side: WhatsApp (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-[13px] font-medium text-white transition-all duration-200 hover:bg-primary/80 active:scale-95 md:inline-flex"
            aria-label="Contact Uniq CCTV on WhatsApp"
          >
            <FaWhatsapp className="size-4 transition-transform duration-300" strokeWidth={2} />
            <span>+94 77 123 4567</span>
          </Link>

          {/* Hamburger — mobile / tablet only */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-60 flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors duration-200 hover:bg-foreground/5 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="relative block h-5 w-5">
              <Menu
                size={20}
                className={`absolute inset-0 transition-all duration-200 ${menuOpen ? "scale-0 opacity-0 rotate-45" : "scale-100 opacity-100 rotate-0"
                  }`}
              />
              <X
                size={20}
                className={`absolute inset-0 transition-all duration-200 ${menuOpen ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-45"
                  }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-foreground/10 bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Mobile navigation"
        >
          {LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              className={`rounded-md px-3 py-3 text-[15px] font-medium text-foreground/75 transition-all duration-300 hover:bg-foreground/5 hover:text-foreground ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: menuOpen ? `${LINKS.length * 40}ms` : "0ms" }}
            className={`mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-[14px] font-medium text-white transition-all duration-300 active:scale-95 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
          >
            <FaWhatsapp className="size-4 transition-transform duration-300" strokeWidth={2} />
            <span>+94 77 123 4567</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}