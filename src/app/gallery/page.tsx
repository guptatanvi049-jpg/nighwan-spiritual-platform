"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { Sparkles, Eye } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("uploaded_at", { ascending: false });

        if (!error && data) {
          setItems(data);
        }
      } catch (err) {
        console.error("Failed to load gallery items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ["All", "Ritual", "Temple", "Festival", "Community"];

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        {/* Cinematic Header Hero Section */}
        <section 
          className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 14, 26, 0.4) 0%, rgba(10, 14, 26, 0.85) 100%), url('/about_spiritual.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1 rounded-full bg-brand-orange/15 border border-[#cfa856]/30 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">
              Darshan Mandalas
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              Devotional <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold">Gallery</span>
            </h1>
            <p className="mt-4 text-stone-200 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-light">
              Explore capture archives representing Vedic aartis, ancient coordinates, gaushala service events, and national spiritual festivals.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />
        </section>

        {/* Gallery Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center border-b border-stone-200 gap-2 sm:gap-4 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                    : "text-stone-500 hover:text-stone-900 border border-stone-200/60 bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs text-stone-450 font-semibold">Loading Darshan Mandala...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#cfa856]/20 p-12 text-center text-stone-500 max-w-md mx-auto text-xs font-semibold">
              <p>No photos uploaded under {activeCategory} category yet.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className="group relative bg-stone-950 rounded-3xl overflow-hidden aspect-square border border-[#cfa856]/15 shadow-md"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.title || "Spiritual Image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                      <span className="text-[9px] font-bold text-brand-gold bg-[#7b1113]/90 px-2.5 py-0.5 rounded border border-[#cfa856]/20 self-start uppercase">
                        {item.category}
                      </span>
                      <p className="text-white text-xs font-bold mt-1.5 truncate">{item.title}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
