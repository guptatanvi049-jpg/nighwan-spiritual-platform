import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KundliGenerator from "@/components/KundliGenerator";
import { Star, ShieldCheck, Languages, Award, Calendar, Compass, Sparkles, AlertCircle } from "lucide-react";

export const metadata = {
  title: "AI Kundli & Astrology Consultations | Nighwan Technology",
  description: "Generate deep computational Vedic birth charts with our AI Kundli engine and schedule consultations with verified Astrologers.",
};

const astrologers = [
  {
    name: "Acharya Devendra Prasad",
    title: "Jyotish Bhushan & Vastu Specialist",
    experience: "15+ Years",
    rating: "4.92",
    reviews: "340+",
    languages: ["Sanskrit", "Hindi", "Gujarati"],
    specialty: "Lagna Readings, Vastu Dosh, Gemstones Recommendation",
  },
  {
    name: "Shri Prakash Dwivedi",
    title: "Nakshatra Astrology & Kalsarp Expert",
    experience: "18+ Years",
    rating: "4.90",
    reviews: "410+",
    languages: ["Hindi", "English"],
    specialty: "Kalsarp Yog, Rahu-Ketu Transit Analysis, Career Transits",
  }
];

export default function AstrologyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        {/* Cinematic Cosmic Header Hero Section */}
        <section 
          className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0a0e1a] text-white"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 14, 26, 0.45) 0%, rgba(10, 14, 26, 0.9) 100%), url('/astrology_consult.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1 rounded-full bg-brand-orange/15 border border-[#cfa856]/30 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">
              Cosmic Science
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              AI Kundli & <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold">Astrology</span> Portal
            </h1>
            <p className="mt-4 text-stone-200 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
              Calculate high-precision birth charts and consult seasoned Vedic scholars to decipher planetary influences on your life path.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />
        </section>

        {/* Side Graphic and Introduction section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Description Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#7b1113] text-xs font-bold uppercase tracking-widest">Scientific Jyotish</span>
              <h2 className="text-2xl sm:text-3.5xl font-serif font-black text-stone-900 leading-tight">
                Vedic Astrology: The Study of Cosmic Light
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                Vedic Astrology (Jyotish) is the mathematical study of planetary energy fields intersecting with human biology at the exact coordinates of birth. By calculating the precise longitude, latitude, and degree offsets of core planetary bodies, we generate deep lagna, navamsha, and dashamsha charts to guide you with scriptural accuracy.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-stone-700 font-sans">
                <div className="bg-white p-4 rounded-xl border border-[#cfa856]/20 flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-brand-orange" />
                  <span>D1 & D9 Natal Alignments</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#cfa856]/20 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                  <span>Vimshottari Dasha Logs</span>
                </div>
              </div>
            </div>

            {/* Constellation Vector Graphic Column */}
            <div className="lg:col-span-5 bg-brand-cosmic rounded-3xl p-8 border border-[#cfa856]/25 text-white relative shadow-2xl overflow-hidden h-[360px] flex flex-col justify-between group">
              <div className="absolute inset-0 spiritual-grid opacity-5 pointer-events-none" />

              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#cfa856]">Digital Vector Map</span>
                <h4 className="text-lg font-serif font-black text-white mt-1">Constellation Orbit Nodes</h4>
              </div>

              {/* Vector SVG Constellation Map */}
              <div className="flex justify-center my-4 relative z-10 transition-transform duration-500 group-hover:scale-105">
                <svg viewBox="0 0 200 120" className="w-full max-w-[280px] text-brand-gold select-none pointer-events-none">
                  <line x1="20" y1="60" x2="60" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="60" y1="40" x2="100" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="100" y1="80" x2="140" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="140" y1="30" x2="180" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="100" y1="80" x2="100" y2="110" stroke="currentColor" strokeWidth="1" />
                  
                  {/* Outer Orbit Circle */}
                  <circle cx="100" cy="60" r="50" fill="none" stroke="rgba(207,168,86,0.2)" strokeWidth="1" />

                  {/* Stars Nodes */}
                  <circle cx="20" cy="60" r="3" fill="#f26f21" />
                  <circle cx="60" cy="40" r="4" fill="#ffffff" className="animate-ping" style={{ transformOrigin: "60px 40px" }} />
                  <circle cx="60" cy="40" r="3.5" fill="#cfa856" />
                  <circle cx="100" cy="80" r="4.5" fill="#f5b316" />
                  <circle cx="140" cy="30" r="3" fill="#ffffff" />
                  <circle cx="180" cy="60" r="4" fill="#1f572a" />
                  <circle cx="100" cy="110" r="2.5" fill="#0d7f8a" />

                  {/* Label Text */}
                  <text x="60" y="30" textAnchor="middle" className="text-[7px] font-bold fill-white/60 font-sans">Nakshatra Rohini</text>
                  <text x="140" y="20" textAnchor="middle" className="text-[7px] font-bold fill-white/60 font-sans">Krittika Node</text>
                </svg>
              </div>

              <p className="text-[9px] text-[#cfa856] italic text-center font-sans">
                “Yatha Pinde Tatha Brahmande” &bull; As is the micro birth, so is the macro transit.
              </p>
            </div>

          </div>
        </section>

        {/* AI Kundli Generator Component Section */}
        <div className="py-8 bg-stone-900/5">
          <KundliGenerator />
        </div>

        {/* Astrologers Directory */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Acharyas</span>
            <h3 className="text-3xl font-serif font-black text-stone-900">Consult Verified Astrologers</h3>
            <div className="w-24 h-0.5 bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {astrologers.map((astro) => (
              <div
                key={astro.name}
                className="spiritual-card rounded-3xl p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-brand-green text-[10px] font-bold uppercase tracking-wider mb-3">
                    <ShieldCheck className="w-4 h-4 text-brand-green" />
                    <span>Verified Vedic Scholar</span>
                  </div>
                  <h4 className="text-xl font-serif font-black text-stone-950">{astro.name}</h4>
                  <p className="text-xs text-brand-orange font-bold mt-1 font-sans">{astro.title}</p>
                  
                  <p className="text-stone-500 text-xs mt-4 leading-relaxed font-sans">
                    <span className="font-bold text-stone-700">Specialty: </span>
                    {astro.specialty}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-6 text-[11px] font-bold text-stone-500 border-t border-stone-100 pt-4 font-sans">
                    <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-brand-gold" />{astro.experience} Exp</span>
                    <span className="flex items-center gap-1.5 truncate"><Languages className="w-4 h-4 text-brand-teal" />{astro.languages.join(", ")}</span>
                  </div>
                </div>

                <button className="w-full mt-8 py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-stone-800 border border-stone-200 hover:border-brand-crimson hover:bg-brand-crimson hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  Schedule Video Session (₹1,500/-)
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
