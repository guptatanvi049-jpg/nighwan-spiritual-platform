"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, Maximize2, Users, Flame, Settings, Share2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const defaultStreams = [
  {
    temple: "Ganga Aarti, Har Ki Pauri",
    location: "Haridwar, Uttarakhand",
    viewers: "12,430",
    gradient: "from-orange-700 via-amber-900 to-stone-950",
    visualizerColor: "bg-brand-orange",
    description: "Evening Ganga Aarti offering devotion to River Ganges."
  },
  {
    temple: "Mahakaleshwar Temple",
    location: "Ujjain, Madhya Pradesh",
    viewers: "8,512",
    gradient: "from-red-900 via-[#7b1113] to-stone-950",
    visualizerColor: "bg-brand-crimson",
    description: "Daily Live Darshan of the Swayambhu Lord Shiva Jyotirlinga."
  },
  {
    temple: "Kashi Vishwanath Darshan",
    location: "Varanasi, Uttar Pradesh",
    viewers: "15,890",
    gradient: "from-[#cfa856]/90 via-amber-800 to-stone-950",
    visualizerColor: "bg-brand-yellow",
    description: "Mangala Aarti and Shringar Darshan of Lord Vishwanath."
  }
];

export default function LiveDarshan() {
  const [streams, setStreams] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const { data, error } = await supabase
          .from("temples")
          .select("name, location, live_stream_url, description");

        if (!error && data && data.length > 0) {
          const formatted = data
            .filter((t) => t.live_stream_url)
            .map((t, idx) => ({
              temple: t.name,
              location: t.location,
              viewers: String(Math.floor(Math.random() * 5000) + 2000),
              gradient: idx % 3 === 0
                ? "from-orange-700 via-amber-900 to-stone-950"
                : idx % 3 === 1
                ? "from-red-900 via-[#7b1113] to-stone-950"
                : "from-[#cfa856]/90 via-amber-800 to-stone-950",
              visualizerColor: idx % 3 === 0 ? "bg-brand-orange" : idx % 3 === 1 ? "bg-brand-crimson" : "bg-brand-yellow",
              description: t.description,
              embedUrl: t.live_stream_url
            }));
          setStreams(formatted.length > 0 ? formatted : defaultStreams);
        } else {
          setStreams(defaultStreams);
        }
      } catch (err) {
        console.error("Failed to load live streams:", err);
        setStreams(defaultStreams);
      }
    };
    fetchStreams();
  }, []);

  const togglePlay = (index: number) => {
    setIsPlaying((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="live-darshan" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[30%] right-[-10%] w-[30%] h-[30%] rounded-full bg-brand-crimson/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-brand-orange/5 blur-[120px]" />

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
            Digital Presence
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-serif font-black text-[#1e1915] tracking-tight"
          >
            HD Live Darshan Streams
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#5c544d] font-sans text-xs sm:text-sm md:text-base leading-relaxed font-light"
          >
            Experience divine energy in real-time. Tune into live prayers and ritual streams from holy shrines across India directly on your screen.
          </motion.p>
        </div>

        {/* Streams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {streams.map((stream, index) => {
            const playing = isPlaying[index] ?? false;
            return (
              <motion.div
                key={stream.temple}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#fdfbf7] rounded-3xl overflow-hidden border border-[#cfa856]/20 shadow-md flex flex-col hover:shadow-xl hover:border-[#cfa856]/50 transition-all duration-300"
              >
                {/* Video Window Player */}
                <div className={`relative h-56 w-full bg-gradient-to-br ${stream.gradient} flex items-center justify-center overflow-hidden group`}>
                  {/* Digital overlay scan lines representing futuristic technology */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-20 pointer-events-none" />

                  {/* Pulsing visual core (representing flame/deity conceptually) */}
                  <AnimatePresence>
                    {playing && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.7, scale: [1, 1.1, 1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-20 h-20 bg-brand-yellow/20 rounded-full blur-xl absolute"
                      />
                    )}
                  </AnimatePresence>

                  {/* Spiritual Icon inside player */}
                  <div className="text-white/30 group-hover:text-white/50 transition-colors duration-300 pointer-events-none z-10">
                    <Flame className="w-16 h-16 animate-pulse" />
                  </div>

                  {/* Top Bar Player overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none font-sans">
                    {/* Live indicator badge */}
                    <div className="flex items-center gap-1.5 bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      LIVE
                    </div>
                    {/* Viewers count */}
                    <div className="flex items-center gap-1.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                      <Users className="w-3.5 h-3.5" />
                      <span>{stream.viewers} watching</span>
                    </div>
                  </div>

                  {/* Play/Pause Center Button on Hover */}
                  <button
                    onClick={() => togglePlay(index)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-white/90 text-stone-900 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                      {playing ? <Pause className="w-5 h-5 fill-stone-900" /> : <Play className="w-5 h-5 fill-stone-900 translate-x-0.5" />}
                    </div>
                  </button>

                  {/* Bottom Bar Player overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20 text-white/90 text-xs bg-black/40 px-3 py-2 rounded-lg backdrop-blur-sm pointer-events-auto font-sans">
                    <div className="flex items-center gap-3">
                      <button onClick={() => togglePlay(index)} className="hover:text-brand-orange transition-colors">
                        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <Volume2 className="w-4 h-4 cursor-pointer hover:text-brand-yellow" />
                      {/* Audio visualizer bar graph */}
                      {playing && (
                        <div className="flex items-end gap-0.5 h-3 pb-0.5">
                          <span className={`w-0.5 h-2 rounded-full ${stream.visualizerColor} animate-[pulse_0.6s_infinite]`} />
                          <span className={`w-0.5 h-3 rounded-full ${stream.visualizerColor} animate-[pulse_0.4s_infinite_delay-100]`} />
                          <span className={`w-0.5 h-1 rounded-full ${stream.visualizerColor} animate-[pulse_0.8s_infinite_delay-300]`} />
                          <span className={`w-0.5 h-2.5 rounded-full ${stream.visualizerColor} animate-[pulse_0.5s_infinite_delay-200]`} />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded cursor-pointer flex items-center gap-1 hover:bg-white/30 transition-all">
                        <Settings className="w-3 h-3" />
                        1080p
                      </span>
                      <Maximize2 className="w-4 h-4 cursor-pointer hover:text-brand-yellow" />
                    </div>
                  </div>
                </div>

                {/* Card description details */}
                <div className="p-6 flex-grow flex flex-col justify-between font-sans">
                  <div>
                    <h4 className="text-lg font-serif font-black text-[#1e1915] group-hover:text-brand-orange transition-colors leading-snug">
                      {stream.temple}
                    </h4>
                    <p className="text-xs font-semibold text-stone-500 mt-1">
                      {stream.location}
                    </p>
                    <p className="text-[#5c544d] text-xs sm:text-sm mt-3 leading-relaxed font-light">
                      {stream.description}
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="mt-8 pt-4 border-t border-[#cfa856]/20 flex items-center justify-between gap-3">
                    <button className="flex-grow py-3 px-4 text-xs font-bold text-stone-800 border border-[#cfa856]/30 hover:border-brand-orange hover:bg-brand-orange/5 rounded-xl transition-all duration-300 cursor-pointer">
                      Book Puja / Archana
                    </button>
                    <button className="p-3 text-stone-500 hover:text-brand-orange hover:bg-brand-orange/5 border border-[#cfa856]/30 hover:border-brand-orange rounded-xl transition-all cursor-pointer" title="Share Stream">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
