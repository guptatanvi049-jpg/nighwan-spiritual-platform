"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Bell, Phone, Mail } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Book Puja", href: "/book-puja" },
  { name: "Astrology", href: "/astrology" },
  { name: "Temples", href: "/temples" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Devotional Saffron/Crimson Top Contact Bar */}
      <div className="bg-[#7b1113] text-[#faf6ee]/90 py-2 px-4 text-[11px] font-semibold border-b border-[#cfa856]/20 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <a href="mailto:support@nighwan.com" className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              support@nighwan.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              +91 98765 43210
            </a>
          </div>
          <div className="flex items-center gap-4 text-brand-gold">
            <span>✨ Complete Vedic Astrological Consultations & Rituals</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "glassmorphism py-2.5 shadow-md shadow-brand-crimson/5 border-b border-[#cfa856]/20"
            : "bg-[#faf6ee]/90 backdrop-blur-md py-4 border-b border-stone-200/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-28 sm:w-32 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.jpeg"
                  alt="Nighwan Technology Logo"
                  fill
                  priority
                  className="object-contain rounded-lg"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-xs font-bold uppercase tracking-wider transition-colors relative group py-2 ${
                      isActive
                        ? "text-[#7b1113]"
                        : "text-stone-700 hover:text-[#7b1113]"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button / Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/astrology"
                className="p-2 text-stone-600 hover:text-[#7b1113] hover:bg-brand-orange/5 rounded-full transition-colors relative group"
                title="AI Kundli check"
              >
                <Bell className="w-5 h-5 group-hover:animate-bounce text-[#7b1113]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f26f21] animate-ping" />
              </Link>
              <Link
                href="/book-puja"
                className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-brand-crimson via-brand-orange to-brand-gold hover:opacity-90 group shadow-md shadow-brand-crimson/20"
              >
                <span className="relative flex items-center gap-2 text-xs uppercase tracking-wider">
                  Book Puja
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center md:hidden gap-3">
              <Link
                href="/book-puja"
                className="text-xs px-4 py-2 font-bold text-white rounded-full bg-brand-crimson hover:bg-brand-orange transition-all uppercase tracking-wider"
              >
                Book Puja
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-stone-700 hover:text-brand-crimson hover:bg-stone-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glassmorphism border-t border-stone-200/50 shadow-inner"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-brand-orange/10 text-brand-crimson"
                          : "text-stone-700 hover:text-brand-crimson hover:bg-stone-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-stone-200/50 flex flex-col gap-3 px-4">
                  <Link
                    href="/book-puja"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 px-5 font-bold text-white rounded-full bg-brand-crimson hover:bg-brand-orange text-center shadow-md text-xs uppercase tracking-wider"
                  >
                    Book Online Puja
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
