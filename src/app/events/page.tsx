import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { Calendar, MapPin, Sparkles, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Spiritual Events Calendar | Nighwan Technology",
  description: "Check upcoming Vedic homams, festival pujas, solar transit prayers, and register for digital gotra sankalpa bookings.",
};

export default async function EventsPage() {
  let eventsList: any[] = [];
  try {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    eventsList = data || [];
  } catch (err) {
    console.error("Failed to load events:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        {/* Cinematic Header Hero Section */}
        <section 
          className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 14, 26, 0.45) 0%, rgba(10, 14, 26, 0.85) 100%), url('/temples_explore.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1 rounded-full bg-brand-orange/15 border border-[#cfa856]/30 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">
              Utsav Calendar
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              Spiritual <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold">Events</span> & Pujas
            </h1>
            <p className="mt-4 text-stone-200 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-light">
              Observe Vedic festivals and solar transit alignments. Book virtual gotra representations for upcoming maha-pujas led by verified scholars.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />
        </section>

        {/* Timeline Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {eventsList.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#cfa856]/20 p-12 text-center text-stone-500 max-w-md mx-auto text-xs font-semibold">
              <p>No upcoming spiritual events scheduled currently.</p>
              <p className="text-[10px] text-stone-400 mt-1 font-light">Check back during major transits and national festivals.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventsList.map((ev) => (
                <div key={ev.id} className="bg-white rounded-3xl border border-[#cfa856]/20 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative h-56 bg-stone-900">
                      <Image
                        src={ev.image_url || "/event_shivratri.jpg"}
                        alt={ev.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-sm border border-brand-gold/30 rounded-full px-3 py-1 text-[9px] font-bold text-brand-gold uppercase tracking-wider">
                        {ev.status}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-[#7b1113]/95 border border-[#cfa856]/20 rounded-xl px-3 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        {new Date(ev.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-brand-orange uppercase bg-brand-orange/5 px-2 py-0.5 rounded border border-brand-orange/15">
                        <MapPin className="w-3 h-3" /> {ev.location}
                      </span>
                      <h3 className="font-serif font-black text-xl text-stone-900 leading-snug">
                        {ev.title}
                      </h3>
                      <p className="text-stone-605 text-xs leading-relaxed font-sans font-light">
                        {ev.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      href="/book-puja"
                      className="flex-grow flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-crimson to-brand-orange text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow shadow-brand-crimson/10 hover:shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 text-brand-gold" />
                      Register Gotra Sankalpa
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
