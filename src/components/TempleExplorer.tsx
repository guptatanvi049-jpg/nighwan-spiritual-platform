"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Compass, Landmark, Calendar, ArrowRight, Eye } from "lucide-react";

const temples = [
  {
    id: "vaishnodevi",
    name: "Vaishno Devi",
    location: "Katra, Jammu & Kashmir",
    x: 185,
    y: 90,
    color: "#f26f21",
    deity: "Goddess Vaishno Devi (Durga)",
    significance: "One of the 108 Shakti Peethas, located in a holy mountain cave.",
    darshanTimings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    liveStatus: "Darshan Open",
    services: ["Virtual Puja Booking", "Prasad Home Delivery", "VIP Queue Passes"],
  },
  {
    id: "kedarnath",
    name: "Kedarnath Temple",
    location: "Rudraprayag, Uttarakhand",
    x: 235,
    y: 135,
    color: "#7b1113",
    deity: "Lord Shiva (Jyotirlinga)",
    significance: "Perched at 3,583m in the Himalayas, a crucial Char Dham site.",
    darshanTimings: "4:00 AM - 9:00 PM (Seasonal May-Nov)",
    liveStatus: "Darshan Open",
    services: ["Panch Kedar Puja", "Maha Abhishek Booking", "E-Prasad"],
  },
  {
    id: "somnath",
    name: "Somnath Jyotirlinga",
    location: "Veraval, Gujarat",
    x: 70,
    y: 310,
    color: "#cfa856",
    deity: "Lord Shiva (First Jyotirlinga)",
    significance: "Reconstructed several times, situated directly on the Arabian Sea coast.",
    darshanTimings: "6:00 AM - 9:30 PM",
    liveStatus: "Live Darshan Available",
    services: ["Shatrudra Abhishek", "Coastal Aarti Virtual Puja", "Somnath Trust Donation"],
  },
  {
    id: "kashi",
    name: "Kashi Vishwanath",
    location: "Varanasi, Uttar Pradesh",
    x: 310,
    y: 250,
    color: "#7b1113",
    deity: "Lord Shiva (Jyotirlinga)",
    significance: "The spiritual heart of India, located on the banks of the sacred Ganga.",
    darshanTimings: "3:00 AM - 11:00 PM",
    liveStatus: "Live stream active",
    services: ["Ganga Aarti Puja", "Rudrabhishek Puja", "Moksha Path Services"],
  },
  {
    id: "jagannath",
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    x: 375,
    y: 350,
    color: "#f26f21",
    deity: "Lord Jagannath (Krishna)",
    significance: "Famed for its annual Rath Yatra and the mysterious non-directional flag.",
    darshanTimings: "5:00 AM - 10:00 PM",
    liveStatus: "Darshan Open",
    services: ["Chhappan Bhog Offering", "Rath Yatra Special Puja", "Mahaprasad Order"],
  },
  {
    id: "tirupati",
    name: "Tirupati Balaji",
    location: "Tirumala, Andhra Pradesh",
    x: 235,
    y: 490,
    color: "#cfa856",
    deity: "Lord Venkateswara (Vishnu)",
    significance: "One of the richest temples in the world, located in the Seshachalam Hills.",
    darshanTimings: "3:00 AM - 11:30 PM",
    liveStatus: "Darshan Open (Rush: High)",
    services: ["Kalyanotsavam Booking", "Laddu Prasad Delivery", "VIP Darshan Passes"],
  },
  {
    id: "meenakshi",
    name: "Meenakshi Amman",
    location: "Madurai, Tamil Nadu",
    x: 200,
    y: 550,
    color: "#7b1113",
    deity: "Goddess Meenakshi (Parvati) & Shiva",
    significance: "Acclaimed for its 14 gopurams encrusted with thousands of colorful sculptures.",
    darshanTimings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM",
    liveStatus: "Darshan Open",
    services: ["Golden Lotus Pool Puja", "Archana Booking", "Meenakshi Kalyanam Online"],
  }
];

export default function TempleExplorer() {
  const [selectedTemple, setSelectedTemple] = useState(temples[3]); // Default to Kashi Vishwanath

  return (
    <section id="temple-explorer" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-brand-crimson/5 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[25%] h-[25%] rounded-full bg-brand-orange/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase font-sans"
          >
            Sacred Geography
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-serif font-black text-[#1e1915] tracking-tight"
          >
            Interactive Temple Explorer
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#5c544d] font-sans text-xs sm:text-sm md:text-base leading-relaxed"
          >
            Select a sacred shrine on the map of India to learn about its history, timings, and book online pujas instantly.
          </motion.p>
        </div>

        {/* Map and Details Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Map Column */}
          <div className="lg:col-span-6 flex justify-center bg-[#fdfbf7] rounded-3xl p-6 border border-[#cfa856]/20 shadow-inner relative h-[500px] sm:h-[600px] overflow-hidden">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 spiritual-grid opacity-30" />
            
            {/* Compass rose graphic in background */}
            <div className="absolute bottom-6 right-6 opacity-10">
              <Compass className="w-24 h-24 text-stone-600 animate-spin-slow" />
            </div>

            {/* Stylized SVG Map of India (Geometric Conceptual outline for spiritual-tech fusion) */}
            <svg
              viewBox="0 0 450 600"
              className="w-full h-full max-h-[550px] relative z-10 transition-all duration-300 drop-shadow-md select-none"
            >
              {/* Abstract borders outline path of India */}
              <path
                d="M 180,50 L 210,60 L 230,80 L 250,70 L 245,120 L 270,140 L 260,170 L 290,180 L 330,170 L 360,200 L 400,210 L 410,230 L 380,250 L 390,285 L 430,300 L 410,320 L 360,320 L 380,360 L 350,380 L 340,410 L 290,430 L 260,470 L 240,510 L 230,550 L 210,580 L 195,590 L 200,560 L 190,520 L 180,480 L 175,440 L 145,410 L 125,385 L 140,360 L 115,355 L 75,350 L 55,330 L 45,300 L 60,280 L 95,280 L 115,240 L 110,210 L 140,190 L 150,150 L 140,110 L 160,80 Z"
                fill="none"
                stroke="rgba(207, 168, 86, 0.25)"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 180,50 L 210,60 L 230,80 L 250,70 L 245,120 L 270,140 L 260,170 L 290,180 L 330,170 L 360,200 L 400,210 L 410,230 L 380,250 L 390,285 L 430,300 L 410,320 L 360,320 L 380,360 L 350,380 L 340,410 L 290,430 L 260,470 L 240,510 L 230,550 L 210,580 L 195,590 L 200,560 L 190,520 L 180,480 L 175,440 L 145,410 L 125,385 L 140,360 L 115,355 L 75,350 L 55,330 L 45,300 L 60,280 L 95,280 L 115,240 L 110,210 L 140,190 L 150,150 L 140,110 L 160,80 Z"
                fill="rgba(207, 168, 86, 0.015)"
                stroke="rgba(242, 111, 33, 0.25)"
                strokeWidth="1.5"
              />

              {/* Connecting grid network lines between temples to emphasize "technology/networks" */}
              <line x1="235" y1="135" x2="310" y2="250" stroke="rgba(242, 111, 33, 0.15)" strokeWidth="1" />
              <line x1="185" y1="90" x2="235" y2="135" stroke="rgba(242, 111, 33, 0.15)" strokeWidth="1" />
              <line x1="70" y1="310" x2="235" y2="135" stroke="rgba(242, 111, 33, 0.15)" strokeWidth="1" />
              <line x1="70" y1="310" x2="310" y2="250" stroke="rgba(242, 111, 33, 0.15)" strokeWidth="1" />
              <line x1="310" y1="250" x2="375" y2="350" stroke="rgba(242, 111, 33, 0.15)" strokeWidth="1" />
              <line x1="375" y1="350" x2="235" y2="490" stroke="rgba(242, 111, 33, 0.15)" strokeWidth="1" />
              <line x1="235" y1="490" x2="200" y2="550" stroke="rgba(242, 111, 33, 0.15)" strokeWidth="1" />

              {/* Temple Nodes */}
              {temples.map((temple) => {
                const isSelected = selectedTemple.id === temple.id;
                return (
                  <g key={temple.id} className="cursor-pointer">
                    {/* Ringing effect for selected */}
                    {isSelected && (
                      <circle
                        cx={temple.x}
                        cy={temple.y}
                        r="22"
                        className="fill-none stroke-brand-orange animate-ping opacity-35"
                        style={{ transformOrigin: `${temple.x}px ${temple.y}px` }}
                      />
                    )}
                    
                    {/* Outer Glow Ring */}
                    <circle
                      cx={temple.x}
                      cy={temple.y}
                      r={isSelected ? "14" : "10"}
                      fill={`${temple.color}20`}
                      className="transition-all duration-300 hover:r-16"
                      onClick={() => setSelectedTemple(temple)}
                    />
                    
                    {/* Core Point */}
                    <circle
                      cx={temple.x}
                      cy={temple.y}
                      r={isSelected ? "7" : "5.5"}
                      fill={temple.color}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-300 drop-shadow-md"
                      onClick={() => setSelectedTemple(temple)}
                    />

                    {/* Tooltip Labels */}
                    <text
                      x={temple.x}
                      y={temple.y - 16}
                      textAnchor="middle"
                      className={`text-[10px] font-bold fill-stone-700 transition-all select-none pointer-events-none drop-shadow-sm font-sans ${
                        isSelected ? "opacity-100 scale-105 fill-brand-orange" : "opacity-40"
                      }`}
                    >
                      {temple.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col h-full justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTemple.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glassmorphism p-8 sm:p-10 rounded-3xl border border-[#cfa856]/30 shadow-xl flex-grow flex flex-col justify-between"
              >
                <div>
                  {/* Location & Title */}
                  <div className="flex items-center gap-2 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-2 font-sans">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedTemple.location}</span>
                  </div>

                  <h4 className="text-3xl font-serif font-black text-[#1e1915] leading-tight">
                    {selectedTemple.name}
                  </h4>

                  {/* Quick Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-y border-[#cfa856]/25 text-xs font-sans">
                    <div>
                      <p className="text-stone-500 font-semibold uppercase tracking-widest text-[10px]">Main Deity</p>
                      <p className="text-[#1e1915] font-extrabold text-sm mt-0.5">{selectedTemple.deity}</p>
                    </div>
                    <div>
                      <p className="text-stone-500 font-semibold uppercase tracking-widest text-[10px]">Live Status</p>
                      <p className="text-emerald-700 font-bold text-sm mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        {selectedTemple.liveStatus}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6 font-sans">
                    <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Spiritual Significance</h5>
                    <p className="text-[#5c544d] text-xs sm:text-sm leading-relaxed font-light">
                      {selectedTemple.significance}
                    </p>
                  </div>

                  {/* Timings */}
                  <div className="mt-5 font-sans">
                    <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Darshan Timings</h5>
                    <p className="text-stone-700 text-xs font-semibold bg-[#faf6ee] px-3 py-2 rounded-lg inline-block border border-[#cfa856]/20">
                      {selectedTemple.darshanTimings}
                    </p>
                  </div>

                  {/* Available Services */}
                  <div className="mt-6 font-sans">
                    <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Available Digital Services</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemple.services.map((service) => (
                        <span
                          key={service}
                          className="text-xs px-3 py-1.5 rounded-full border border-[#cfa856]/20 bg-[#faf6ee] text-[#7b1113] font-semibold"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="mt-10 pt-6 border-t border-[#cfa856]/20 flex flex-col sm:flex-row gap-4 items-center justify-between font-sans">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-stone-500 text-xs font-medium block">Starting from</span>
                    <span className="text-[#7b1113] font-serif font-black text-2xl">₹501/-</span>
                  </div>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 font-bold text-sm text-white rounded-full bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                    Book Puja Instantly
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
