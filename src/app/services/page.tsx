"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, MapPin, Tv, FileText, HeartHandshake, Check, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const allServices = [
  {
    id: "puja-basic",
    category: "pujas",
    title: "Vedic Pandit Booking",
    description: "Book an experienced, verified Pandit for local household pujas or virtual standard rites.",
    price: "2,100",
    icon: Flame,
    colorHex: "#f26f21",
    features: [
      "Custom Gotra Sankalpa recitation",
      "Verified Vedic Pandit (10+ years exp)",
      "Standard Samagri checklist guidance",
      "Interactive 40-min virtual feed (Zoom)"
    ]
  },
  {
    id: "puja-premium",
    category: "pujas",
    title: "Maha Abhishek & Yajna",
    description: "Grand temple-integrated Yajnas (Havan) with multiple Pandits chanting simultaneously at Kashi.",
    price: "11,000",
    icon: Flame,
    colorHex: "#7b1113",
    features: [
      "Conducted at Kashi or Haridwar bank",
      "3 Senior Acharyas chanting stotras",
      "Pure organic Vedic samagri",
      "Personalized HD multi-cam recording",
      "Prasad and Energized Yantra shipped home"
    ]
  },
  {
    id: "astro-single",
    category: "astrology",
    title: "Acharya Consultation",
    description: "One-on-one session with a senior astrologer covering career, relationships, and health transits.",
    price: "1,500",
    icon: Sparkles,
    colorHex: "#0d7f8a",
    features: [
      "45-minute live consultation call",
      "Detailed manual Kundli chart report",
      "Auspicious gemstone suggestions",
      "Practical remedies and Dasha timelines"
    ]
  },
  {
    id: "astro-chart",
    category: "astrology",
    title: "AI Kundli Analysis Pro",
    description: "Generate deep computational natal charts with detailed planetary coordinate graphs.",
    price: "499",
    icon: FileText,
    colorHex: "#cfa856",
    features: [
      "Complete 50-page PDF birth report",
      "Transit alerts for current year",
      "Gunamilan (compatibility mapping)",
      "Lagna, Navamsha, and Dashamsha maps"
    ]
  },
  {
    id: "darshan-basic",
    category: "darshan",
    title: "Live Darshan Access",
    description: "Subscribe to 24/7 high-definition live feeds of premium temple altars without lag.",
    price: "0",
    icon: Tv,
    colorHex: "#f5b316",
    features: [
      "24/7 Access to 3 key temple streams",
      "HD Stream resolution selector",
      "Pulsing audio wave visualizers",
      "Free virtual aarti participation"
    ]
  },
  {
    id: "darshan-vip",
    category: "darshan",
    title: "VIP Queue Pass & Guide",
    description: "Pre-book priority fast-track entry cards at major shrines to skip waiting crowds.",
    price: "1,200",
    icon: MapPin,
    colorHex: "#1f572a",
    features: [
      "Fast-track gate access passes",
      "Personal temple guide coordinator",
      "Aarti timings reserve spots",
      "Includes premium dry fruit prasad box"
    ]
  },
  {
    id: "donate-feed",
    category: "donations",
    title: "Annadanam (Food Donation)",
    description: "Sponsor distribution of holy vegetarian meals (Khichdi prasad) to sadhus and pilgrims.",
    price: "2,500",
    icon: HeartHandshake,
    colorHex: "#7b1113",
    features: [
      "Feeds 51 pilgrims at ghats",
      "Detailed visual confirmation video sent",
      "Receipt for 80G tax exemption",
      "Devotee's name written on donation board"
    ]
  }
];

const categories = [
  { id: "all", name: "All Services" },
  { id: "pujas", name: "Vedic Pujas" },
  { id: "astrology", name: "Astrology" },
  { id: "darshan", name: "Live Darshan" },
  { id: "donations", name: "Annadanam" }
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices = allServices.filter(
    (service) => activeTab === "all" || service.category === activeTab
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        {/* Header Hero Section */}
        <section 
          className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 14, 26, 0.45) 0%, rgba(10, 14, 26, 0.85) 100%), url('/book_puja_ritual.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1 rounded-full bg-brand-orange/15 border border-[#cfa856]/30 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">
              Puja Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              Sacred & Traditional <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold">Rites</span>
            </h1>
            <p className="mt-4 text-stone-200 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
              Explore our structured protocols for Vedic pujas, online consultations, low-latency live streams, and pilgrimage coordination.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />
        </section>

        {/* Tab Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap justify-center gap-3 border-b border-stone-200 pb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? "bg-brand-crimson text-white shadow-md shadow-brand-crimson/20 border border-brand-crimson"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-brand-gold hover:text-brand-crimson"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="spiritual-card rounded-3xl p-8 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top elements */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white border"
                          style={{ 
                            backgroundColor: `${service.colorHex}15`, 
                            borderColor: `${service.colorHex}30`,
                            color: service.colorHex 
                          }}
                        >
                          <IconComponent className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">Dakshina</span>
                          <span className="text-xl font-serif font-black text-stone-900">
                            {service.price === "0" ? "Free" : `₹${service.price}/-`}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-serif font-black text-stone-950 group-hover:text-brand-orange transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-stone-500 text-xs mt-2 leading-relaxed font-sans">
                        {service.description}
                      </p>

                      {/* Feature Checklist */}
                      <ul className="mt-6 space-y-2.5 text-xs text-stone-600 font-sans">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Book button */}
                    <div className="mt-8 pt-6 border-t border-stone-100">
                      <Link
                        href={service.category === "astrology" ? "/astrology" : "/book-puja"}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs uppercase tracking-wider text-white rounded-xl shadow-md transition-all duration-300 hover:opacity-90"
                        style={{
                          backgroundColor: service.colorHex,
                          boxShadow: `0 4px 14px -6px ${service.colorHex}70`
                        }}
                      >
                        Select & Schedule
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Informational Section on Shradh & Pitru Rites (Devotional Enrichment) */}
        <section className="bg-gradient-to-t from-brand-orange/5 to-transparent py-20 border-t border-[#cfa856]/15">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <BookOpen className="w-10 h-10 text-brand-orange mx-auto animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-950">
              The Metaphysics of Shraddha & Pitru Rites
            </h2>
            <div className="w-20 h-0.5 bg-brand-gold mx-auto" />
            
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed text-left font-sans">
              According to the Garuda Purana and Vedic cosmology, our ancestors (Pitrus) reside in Pitruloka, a solar sphere intersecting our biological lineage. When we offer Shraddha, Pind Daan, or perform Asthi Visarjan in designated cosmic nodes like Kashi (Varanasi), Gaya, or Prayagraj Sangam, the vibrational frequency of Vedic mantras combined with the elemental fire/water acts as an electromagnetic transporter. This releases ancestral blockages, converting them into pure spiritual power that blesses the living lineage with health, clarity, and continuity.
            </p>
            
            <div className="bg-white p-6 rounded-2xl border border-[#cfa856]/20 text-left text-xs max-w-2xl mx-auto flex gap-4 items-center">
              <span className="text-xl">⚠️</span>
              <p className="text-stone-500 font-semibold leading-relaxed">
                Nighwan coordinates and executes all pitru-paksha and devakarya havan pujas strictly in compliance with Rigvedic or Yajurvedic layouts, presided over by credential-verified Acharyas.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
