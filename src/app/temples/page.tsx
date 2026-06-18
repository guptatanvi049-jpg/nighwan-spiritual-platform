import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TempleExplorer from "@/components/TempleExplorer";
import LiveDarshan from "@/components/LiveDarshan";
import { Landmark, Compass, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Temple Directory & Live Streams | Nighwan Technology",
  description: "Explore famous Indian shrines, check live darshan timings, watch real-time stream feeds, and book VIP fast-track queue passes digitally.",
};

export default function TemplesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        {/* Cinematic Header Hero Section */}
        <section 
          className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 14, 26, 0.4) 0%, rgba(10, 14, 26, 0.85) 100%), url('/temples_explore.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1 rounded-full bg-brand-orange/15 border border-[#cfa856]/30 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">
              Sacred Geography
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              Holy Temples <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold">Directory</span>
            </h1>
            <p className="mt-4 text-stone-200 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-light">
              Journey through India&apos;s sacred nodes. Navigate historical shrines, observe live divine darshan streams in real-time, and coordinate VIP access protocols for traditional pujas.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />
        </section>

        {/* Temple Explorer Interactive Map */}
        <TempleExplorer />

        {/* Live Darshan Streaming Video Player */}
        <LiveDarshan />

        {/* Travel Coordination Panel (Spiritual-Tech feature) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-24">
          <div className="bg-[#7b1113] text-white rounded-3xl p-8 sm:p-10 border border-[#cfa856]/35 shadow-xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Grid background */}
            <div className="absolute inset-0 spiritual-grid opacity-10 pointer-events-none" />

            <div className="md:col-span-8 relative z-10 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">Pilgrimage Coordinator</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">VIP Queue Pass & Yatra Assistant</h3>
              <p className="text-stone-200 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
                Planning a pilgrimage to Kedarnath, Tirupati, or Varanasi? Avoid standing in 6-hour queues. Book our Nighwan VIP Entry Pass. We handle local logistics, secure priority slot access, and assign a local coordinator.
              </p>
            </div>

            <div className="md:col-span-4 relative z-10 flex md:justify-end">
              <Link
                href="/book-puja"
                className="inline-flex items-center gap-1.5 px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-full text-xs shadow-md transition-all hover:scale-105"
              >
                Request VIP Pass
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
