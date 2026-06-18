"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShieldCheck, Languages, Award, Calendar } from "lucide-react";

const pandits = [
  {
    name: "Pandit Ramachandra Shastri",
    title: "Rigveda Acharya & Ritualist Specialist",
    experience: "22+ Years",
    rating: "4.95",
    reviews: "320+",
    languages: ["Sanskrit", "Hindi", "English"],
    specialty: "Mahamrityunjay Japa, Griha Pravesh Puja, Rudrabhishek",
    image: "/pandit_1.png",
    certified: true,
  },
  {
    name: "Acharya Devendra Prasad",
    title: "Vedic Astrologer & Kundli Expert",
    experience: "15+ Years",
    rating: "4.90",
    reviews: "280+",
    languages: ["Sanskrit", "Hindi", "Gujarati"],
    specialty: "Kundli Dosh Niwaran, Kalsarp Pooja, Career Counseling",
    image: "/pandit_2.png",
    certified: true,
  },
  {
    name: "Pandit Anand Washikar",
    title: "Yajna Specialist & Vedic Tutor",
    experience: "12+ Years",
    rating: "4.88",
    reviews: "190+",
    languages: ["Sanskrit", "Hindi", "Marathi"],
    specialty: "Satyanarayan Katha, Navgrah Shanti Yajna, Upanayan",
    image: "/pandit_3.png",
    certified: true,
  }
];

export default function Pandits() {
  return (
    <section id="pandits" className="py-24 bg-transparent relative overflow-hidden spiritual-grid">
      {/* Glow Backdrops */}
      <div className="absolute top-[30%] left-[-10%] w-[35%] h-[35%] rounded-full bg-brand-crimson/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-brand-orange/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase animate-pulse"
          >
            Trusted Rituals
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-serif font-black text-[#1e1915] tracking-tight"
          >
            Meet Our Verified Pandits
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#5c544d] text-xs sm:text-sm md:text-base leading-relaxed font-light"
          >
            Every Pandit on our platform undergoes a rigorous 4-step verification process, covering credential verification, Vedic knowledge testing, and background checks.
          </motion.p>
        </div>

        {/* Pandits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pandits.map((pandit, index) => (
            <motion.div
              key={pandit.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#fdfbf7] rounded-3xl overflow-hidden border border-[#cfa856]/20 shadow-md hover:shadow-2xl hover:border-[#cfa856]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Profile Image & Badge */}
              <div className="relative h-64 w-full bg-stone-100 overflow-hidden group">
                <Image
                  src={pandit.image}
                  alt={pandit.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Verified Badge */}
                {pandit.certified && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#7b1113] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-[#cfa856]/20 font-sans">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    VERIFIED
                  </div>
                )}

                {/* Rating overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-stone-950/80 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm font-sans">
                  <Star className="w-3.5 h-3.5 fill-brand-yellow stroke-brand-yellow" />
                  {pandit.rating} ({pandit.reviews} reviews)
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6 flex-grow flex flex-col">
                <h4 className="text-xl font-serif font-black text-[#1e1915] leading-snug">
                  {pandit.name}
                </h4>
                <p className="text-xs font-semibold text-[#7b1113] mt-1 font-sans">
                  {pandit.title}
                </p>

                {/* Specialization List */}
                <p className="text-[#5c544d] text-xs mt-3 line-clamp-2 leading-relaxed font-light">
                  <span className="font-semibold text-[#1e1915]">Specialties: </span>
                  {pandit.specialty}
                </p>

                {/* Badges details */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-[#cfa856]/20 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-600">
                    <Award className="w-4 h-4 text-brand-orange" />
                    <span className="text-[#5c544d] font-medium">{pandit.experience} Exp</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-600">
                    <Languages className="w-4 h-4 text-brand-orange" />
                    <span className="truncate text-[#5c544d] font-medium">{pandit.languages.join(", ")}</span>
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-8 pt-4 border-t border-[#cfa856]/20">
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 font-bold text-sm text-stone-800 border border-[#cfa856]/30 hover:border-brand-orange hover:bg-brand-orange hover:text-white rounded-xl transition-all duration-300 group bg-white hover:shadow-md cursor-pointer">
                    <Calendar className="w-4 h-4 text-brand-orange group-hover:text-white transition-colors" />
                    Book Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
