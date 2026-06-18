"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Heart, ShieldCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-brand-cosmic text-stone-300 pt-20 pb-8 relative overflow-hidden border-t-2 border-[#cfa856]/40">
      {/* Background glow flares */}
      <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-brand-orange/5 blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-brand-gold/5 blur-[100px]" />

      {/* Decorative Traditional Border Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block relative h-12 w-36 bg-white/95 p-1.5 rounded-xl shadow-inner">
              <Image
                src="/logo.jpeg"
                alt="Nighwan Technology Logo"
                fill
                className="object-contain p-1"
              />
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
              Nighwan Technology Pvt. Ltd. bridges sacred Vedic rituals and cutting-edge software solutions, making spiritual practices accessible, verified, and transparent for devotees worldwide.
            </p>
            
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-stone-900 border border-[#cfa856]/20 hover:border-brand-orange text-brand-gold hover:text-white hover:bg-brand-orange flex items-center justify-center transition-all shadow" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-900 border border-[#cfa856]/20 hover:border-brand-orange text-brand-gold hover:text-white hover:bg-brand-orange flex items-center justify-center transition-all shadow" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-900 border border-[#cfa856]/20 hover:border-brand-orange text-brand-gold hover:text-white hover:bg-brand-orange flex items-center justify-center transition-all shadow" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-900 border border-[#cfa856]/20 hover:border-brand-orange text-brand-gold hover:text-white hover:bg-brand-orange flex items-center justify-center transition-all shadow" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#cfa856]/20 pb-2">
              Explore
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/services" className="hover:text-brand-orange transition-colors">Services Portal</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">Our Heritage</Link>
              </li>
              <li>
                <Link href="/book-puja" className="hover:text-brand-orange transition-colors">Book a Pandit</Link>
              </li>
              <li>
                <Link href="/astrology" className="hover:text-brand-yellow transition-colors">AI Birth Chart</Link>
              </li>
              <li>
                <Link href="/temples" className="hover:text-brand-teal transition-colors">Live Darshan</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange transition-colors">Help sanctuary</Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#cfa856]/20 pb-2">
              Sacred Office
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>Nighwan Technology Pvt. Ltd.<br />Block B, Sector 62, Noida,<br />Uttar Pradesh 201301, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-brand-orange flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-brand-teal flex-shrink-0" />
                <span>support@nighwan.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#cfa856]/20 pb-2">
              Devotional Feed
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to receive updates on Vedic calendars, solar transits, upcoming festival aartis, and virtual rituals.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Devotee email address"
                className="w-full bg-stone-900 border border-stone-800 focus:border-[#cfa856] text-white text-xs font-semibold rounded-full py-4.5 pl-5 pr-12 outline-none transition-colors placeholder-stone-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow shadow-brand-orange/45 cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-brand-green text-xs font-bold animate-pulse">
                ✓ Successfully subscribed!
              </p>
            )}
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Nighwan Technology Pvt. Ltd. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            100% Certified Vedic Protocols & Security Standards.
          </p>
        </div>

      </div>
    </footer>
  );
}
