"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Software Architect",
    location: "Bengaluru, India",
    comment: "I was highly skeptical about booking a virtual puja, but the experience with Nighwan was flawless. The Pandit chanted my family's gotra names perfectly, and the live stream quality was excellent. Highly professional!",
    rating: 5,
    service: "Maha Rudrabhishek Puja",
    initials: "AM"
  },
  {
    name: "Dr. Sunita Sharma",
    role: "Professor of Literature",
    location: "New Delhi, India",
    comment: "The AI Kundli generator was incredibly precise! I verified the planetary coordinates with my family astrologer and they matched perfectly. The follow-up consultation was also extremely enlightening.",
    rating: 5,
    service: "Astrology & Kundli Consultation",
    initials: "SS"
  },
  {
    name: "Rajesh Patel",
    role: "Business Owner",
    location: "London, UK",
    comment: "Being far away from home, it's hard to participate in festivals. Through Nighwan's Live Darshan and Donation portal, I felt connected to Kashi Viswanath on Mahashivratri. Truly a blessing.",
    rating: 5,
    service: "Annadanam Donation & Live Darshan",
    initials: "RP"
  }
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-transparent relative overflow-hidden spiritual-grid font-sans">
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] left-[-15%] w-[45%] h-[45%] rounded-full bg-brand-orange/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[45%] rounded-full bg-brand-crimson/5 blur-[120px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase"
          >
            User Voice
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-serif font-black text-[#1e1915] tracking-tight"
          >
            What Our Devotees Say
          </motion.h3>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Quote Icon watermark */}
          <div className="absolute -top-10 -left-6 text-[#cfa856]/15 pointer-events-none z-0">
            <Quote className="w-24 h-24 rotate-180" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glassmorphism p-8 sm:p-14 rounded-3xl border border-[#cfa856]/30 shadow-xl relative z-10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-yellow stroke-brand-yellow" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#1e1915] text-lg sm:text-xl font-serif font-medium leading-relaxed italic">
                &ldquo;{testimonials[active].comment}&rdquo;
              </p>

              {/* User Profiling */}
              <div className="mt-8 flex items-center justify-between flex-wrap gap-4 border-t border-[#cfa856]/20 pt-6">
                <div className="flex items-center gap-4">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-orange via-brand-yellow to-brand-gold flex items-center justify-center text-white font-extrabold text-sm shadow">
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <h4 className="font-serif font-black text-[#1e1915] text-base leading-tight">
                      {testimonials[active].name}
                    </h4>
                    <p className="text-xs text-stone-500 font-semibold mt-0.5">
                      {testimonials[active].role} &bull; {testimonials[active].location}
                    </p>
                  </div>
                </div>

                {/* Service Tag */}
                <div className="flex items-center gap-1.5 bg-[#7b1113]/10 text-[#7b1113] border border-[#7b1113]/20 text-xs font-bold px-4 py-2 rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Booking: {testimonials[active].service}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-end gap-3 mt-8 relative z-20">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-[#cfa856]/30 hover:border-brand-orange hover:text-brand-orange bg-[#fdfbf7] shadow-sm transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full border border-[#cfa856]/30 hover:border-brand-orange hover:text-brand-orange bg-[#fdfbf7] shadow-sm transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
