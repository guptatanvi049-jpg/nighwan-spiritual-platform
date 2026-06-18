"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Bell, Shield, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const festivals = [
  {
    name: "Sharad Navratri 2026",
    date: "2026-10-11T00:00:00+05:30",
    color: "#f7931e", // Orange
    deity: "Goddess Durga",
    bgClass: "from-orange-500/10 to-transparent",
    borderClass: "border-brand-orange/20",
    textClass: "text-brand-orange"
  },
  {
    name: "Deepawali (Diwali) 2026",
    date: "2026-11-08T00:00:00+05:30",
    color: "#f4d000", // Yellow
    deity: "Goddess Lakshmi & Lord Ganesha",
    bgClass: "from-yellow-500/10 to-transparent",
    borderClass: "border-brand-yellow/20",
    textClass: "text-brand-yellow"
  },
  {
    name: "Mahashivratri 2027",
    date: "2027-03-06T00:00:00+05:30",
    color: "#008c95", // Teal
    deity: "Lord Shiva",
    bgClass: "from-teal-500/10 to-transparent",
    borderClass: "border-brand-teal/20",
    textClass: "text-brand-teal"
  }
];

export default function FestivalCountdown() {
  const [timeState, setTimeState] = useState<Record<string, TimeLeft>>({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const state: Record<string, TimeLeft> = {};
      
      festivals.forEach((fest) => {
        const difference = +new Date(fest.date) - +new Date();
        
        if (difference > 0) {
          state[fest.name] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        } else {
          state[fest.name] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      
      setTimeState(state);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="festivals" className="py-24 bg-white relative overflow-hidden">
      {/* Background lights */}
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-brand-orange/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-brand-teal/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase"
          >
            Spiritual Calendar
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight"
          >
            Upcoming Festival Pujas
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-stone-600"
          >
            Plan your devotion. Book exclusive, auspicious festival-specific pujas ahead of time to receive direct blessings.
          </motion.p>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {festivals.map((fest, index) => {
            const timeLeft = timeState[fest.name] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
            return (
              <motion.div
                key={fest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glassmorphism rounded-3xl p-6 sm:p-8 border ${fest.borderClass} shadow-md bg-gradient-to-b ${fest.bgClass} flex flex-col justify-between`}
              >
                <div>
                  {/* Festival info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white border border-stone-200 ${fest.textClass}`}>
                      {fest.deity}
                    </span>
                    <Calendar className="w-5 h-5 text-stone-400" />
                  </div>

                  <h4 className="text-xl font-bold text-stone-900 leading-tight">
                    {fest.name}
                  </h4>
                  
                  {/* Live countdown columns */}
                  <div className="grid grid-cols-4 gap-2.5 mt-8 mb-8 text-center">
                    {/* Days */}
                    <div className="bg-white/80 p-2.5 rounded-xl border border-stone-200/50 shadow-sm">
                      <span className={`text-xl sm:text-2xl font-black block tracking-tight ${fest.textClass}`}>
                        {String(timeLeft.days).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-400 uppercase">Days</span>
                    </div>

                    {/* Hours */}
                    <div className="bg-white/80 p-2.5 rounded-xl border border-stone-200/50 shadow-sm">
                      <span className="text-xl sm:text-2xl font-black text-stone-800 block tracking-tight">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-400 uppercase">Hrs</span>
                    </div>

                    {/* Minutes */}
                    <div className="bg-white/80 p-2.5 rounded-xl border border-stone-200/50 shadow-sm">
                      <span className="text-xl sm:text-2xl font-black text-stone-800 block tracking-tight">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-400 uppercase">Mins</span>
                    </div>

                    {/* Seconds */}
                    <div className="bg-white/80 p-2.5 rounded-xl border border-stone-200/50 shadow-sm">
                      <span className="text-xl sm:text-2xl font-black text-stone-800 block tracking-tight animate-pulse">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-400 uppercase">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="border-t border-stone-200/50 pt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <Shield className="w-4 h-4 text-brand-green" />
                    <span>Special Vedic Samagri Included</span>
                  </div>
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs text-white rounded-xl shadow transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: fest.color,
                      boxShadow: `0 4px 14px -4px ${fest.color}70`
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    Pre-Book Special Puja
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
