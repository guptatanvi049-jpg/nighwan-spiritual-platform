"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Hero() {
  const [isRinging, setIsRinging] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const triggerBell = () => {
    setIsRinging(true);
    // Visual reset after animation completes
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsRinging(false), 800);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-stone-950 text-white"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(10, 14, 26, 0.5) 0%, rgba(10, 14, 26, 0.85) 100%), url('/temple_hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Cinematic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-orange/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-gold/10 blur-[120px]" />

      {/* Floating Diyas Container (Spiritual Ambience) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Diya 1 */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[18%] left-[8%] md:left-[12%]"
        >
          <div className="relative flex flex-col items-center">
            {/* Flame */}
            <div className="w-3.5 h-6 bg-gradient-to-t from-brand-orange via-brand-yellow to-white rounded-full blur-[1px] animate-pulse shadow-md shadow-brand-orange" />
            {/* Clay pot */}
            <div className="w-9 h-4.5 bg-amber-850 rounded-b-full border-t border-amber-600 shadow-lg" />
          </div>
        </motion.div>

        {/* Diya 2 */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="absolute bottom-[20%] left-[10%] md:bottom-[25%] md:left-[15%]"
        >
          <div className="relative flex flex-col items-center">
            <div className="w-3 h-5 bg-gradient-to-t from-brand-orange via-brand-yellow to-white rounded-full blur-[1px] animate-pulse shadow-sm shadow-brand-orange" />
            <div className="w-8 h-4 bg-amber-850 rounded-b-full border-t border-amber-600 shadow-md" />
          </div>
        </motion.div>

        {/* Diya 3 */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, 3, -1, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
          className="absolute top-[22%] right-[8%] md:top-[20%] md:right-[15%]"
        >
          <div className="relative flex flex-col items-center">
            <div className="w-3.5 h-6 bg-gradient-to-t from-brand-orange via-brand-yellow to-white rounded-full blur-[1px] animate-pulse shadow-md shadow-brand-orange" />
            <div className="w-9 h-4.5 bg-amber-850 rounded-b-full border-t border-amber-600 shadow-lg" />
          </div>
        </motion.div>
      </div>

      {/* Interactive Hanging Temple Bell */}
      <div className="absolute top-36 right-[5%] md:right-[15%] z-20 flex flex-col items-center pointer-events-auto">
        {/* Bell hanger chain */}
        <div className="w-1.5 h-24 bg-gradient-to-b from-stone-600 via-[#cfa856] to-[#b7791f] shadow" />
        
        {/* Bell body */}
        <motion.div
          onClick={triggerBell}
          onMouseEnter={triggerBell}
          className={`cursor-pointer ${isRinging ? "animate-bell-ring" : ""}`}
          style={{ originX: 0.5, originY: 0 }}
        >
          <div className="relative flex flex-col items-center group">
            {/* Bell Loop */}
            <div className="w-5 h-5 rounded-full border-2 border-amber-500 bg-[#cfa856] -mb-1" />
            
            {/* Main Bell Body */}
            <div className="w-14 h-14 bg-gradient-to-b from-[#cfa856] via-amber-600 to-[#7b1113] rounded-t-full shadow-lg border border-amber-500 relative flex justify-center group-hover:shadow-amber-500/20 group-hover:shadow-2xl transition-all">
              {/* Clapper (inner ball) */}
              <div className="absolute bottom-[-5px] w-3.5 h-3.5 bg-amber-950 rounded-full border border-amber-700" />
            </div>
            
            {/* Interactive Bell Ringing Wave Effect */}
            {isRinging && (
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-brand-orange/40 animate-ping" />
            )}

            <span className="absolute bottom-[-24px] text-[8px] font-bold text-brand-gold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-stone-900/90 px-2 py-0.5 rounded shadow-md border border-[#cfa856]/20">
              Ring Bell
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        
        {/* Spiritual Tech Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-orange/15 border border-[#cfa856]/30 text-xs font-bold text-brand-gold uppercase tracking-widest mb-8 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
          The Intersection of Devotion & Technology
        </motion.div>

        {/* Big Heading using Playfair Display Font */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-black tracking-tight leading-[1.15]"
        >
          Connecting <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold">Devotion</span> <br />
          with <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal via-[#5ea5ad] to-white">Next-Gen Technology</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-stone-200 max-w-3xl mx-auto leading-relaxed font-sans"
        >
          Access verified Pandits, explore holy shrines digitally, generate computational AI birth charts, and stream live darshans. We secure your traditional worship through modern technological nodes.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="/book-puja"
            className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-full bg-brand-orange hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/40 hover:-translate-y-0.5 active:translate-y-0 animate-glow-pulse text-xs uppercase tracking-wider"
          >
            <span className="relative flex items-center gap-2">
              Book Online Puja
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
          <a
            href="/temples"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-bold text-stone-100 rounded-full border border-stone-400 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 bg-stone-900/60 backdrop-blur-sm shadow-sm text-xs uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              Explore Shrines
              <Compass className="w-4 h-4 animate-spin-slow text-brand-gold" />
            </span>
          </a>
        </motion.div>

        {/* Core Pillars Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-[#cfa856]/20 pt-10"
        >
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-brand-orange">500+</h3>
            <p className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Verified Scholars</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-brand-gold">100+</h3>
            <p className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Shrines Configured</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#5ea5ad]">50K+</h3>
            <p className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Prayers Delivered</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-brand-yellow">4.9★</h3>
            <p className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Devotee Rating</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
