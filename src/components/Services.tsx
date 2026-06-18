"use client";

import { motion } from "framer-motion";
import { 
  Flame, 
  Sparkles, 
  MapPin, 
  Tv, 
  FileText, 
  HeartHandshake, 
  ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Online Puja Booking",
    description: "Book customized, Vedic-compliant pujas conducted by verified pandits at holy ghats or virtually.",
    icon: Flame,
    color: "brand-orange",
    colorHex: "#f26f21",
    link: "/book-puja",
    actionText: "Book Pandit"
  },
  {
    title: "Astrology Consultation",
    description: "Connect with certified astrologers for career, health, relationships, and gemstone guidance.",
    icon: Sparkles,
    color: "brand-gold",
    colorHex: "#cfa856",
    link: "/astrology",
    actionText: "Talk to Astrologer"
  },
  {
    title: "Temple Information",
    description: "Detailed historical guides, timings, VIP entry tickets, and routes to famous Indian temples.",
    icon: MapPin,
    color: "brand-crimson",
    colorHex: "#7b1113",
    link: "/temples",
    actionText: "Explore Map"
  },
  {
    title: "Live Darshan Stream",
    description: "Stream high-quality live feeds directly from key shrines and participate in virtual aartis.",
    icon: Tv,
    color: "brand-orange",
    colorHex: "#f26f21",
    link: "/temples#live-darshan",
    actionText: "Watch Streams"
  },
  {
    title: "AI Kundli Generator",
    description: "Generate instant mathematical birth charts, planetary positions, and comprehensive predictions.",
    icon: FileText,
    color: "brand-gold",
    colorHex: "#cfa856",
    link: "/astrology",
    actionText: "Generate Chart"
  },
  {
    title: "Donation Services",
    description: "Directly donate food (Annadanam), gaushala upkeep, or temple restoration with full receipts.",
    icon: HeartHandshake,
    color: "brand-crimson",
    colorHex: "#7b1113",
    link: "/about#gurukul-schooling",
    actionText: "Donate Now"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-brand-orange/5 blur-[100px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-brand-crimson/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans"
          >
            Spiritual Ecosystem
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-serif font-black text-[#1e1915] tracking-tight"
          >
            Our Spiritual-Tech Services
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#5c544d] font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light"
          >
            Combining ancient Vedic rituals with high-performance technological interfaces for an effortless devotional journey.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#fdfbf7] rounded-3xl p-8 border border-[#cfa856]/20 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#cfa856]/50 hover:-translate-y-1"
              >
                {/* Colored top indicator border */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl`}
                  style={{
                    backgroundColor: service.colorHex
                  }}
                />

                {/* Icon wrapper */}
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${service.colorHex}12`,
                    color: service.colorHex
                  }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Title */}
                <h4 className="text-xl font-serif font-black text-[#1e1915] mb-3 group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="text-[#5c544d] text-xs sm:text-sm leading-relaxed mb-8 font-light">
                  {service.description}
                </p>

                {/* Bottom link */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center border-t border-[#cfa856]/20 pt-4 mt-auto">
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all font-sans"
                    style={{ color: service.colorHex }}
                  >
                    {service.actionText}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Spacer to align content nicely above footer link */}
                <div className="h-10" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
