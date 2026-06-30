import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Shield, Cpu, Cloud, Globe, Heart, Compass, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export const metadata = {
  title: "Our Heritage & Vision | Nighwan Technology",
  description: "Learn about the mission, technological innovations, and Vedic vision of Nighwan Technology. Bridging sacred devotion with next-generation edge nodes.",
};

export default async function AboutPage() {
  let heroTitle = "Bridging the Sacred & the Modern";
  let heroSub = "We are a collective of Vedic Acharyas, technology architects, and software engineers unified by a single directive: to secure spiritual traditions through authentic systems.";
  let missionTitle = "Devotional Authenticity, Tech Reliability";
  let missionBody = "Nighwan Technology Pvt. Ltd. was founded on the belief that geography or modern schedules shouldn't restrict access to genuine Vedic worship. By standardizing pandit credentials, verifying scriptural protocols, and utilizing high-performance edge streaming networks, we ensure your devotion reaches the destination with absolute integrity.";
  let pledgeText = "We pledge to allocate 15% of all digital booking commissions directly towards the restoration of neglected heritage temples, maintaining gaushalas, and supporting the traditional Gurukul schooling of underprivileged children.";

  try {
    const { data: contents } = await supabase
      .from("page_contents")
      .select("id, content");

    if (contents) {
      const getVal = (id: string, fallback: string) => {
        const found = contents.find((c) => c.id === id);
        return found ? found.content : fallback;
      };
      heroTitle = getVal("about_hero_title", heroTitle);
      heroSub = getVal("about_hero_sub", heroSub);
      missionTitle = getVal("about_mission_title", missionTitle);
      missionBody = getVal("about_mission_body", missionBody);
      pledgeText = getVal("home_pillars_pledge", pledgeText);
    }
  } catch (err) {
    console.error("Failed to load about page contents:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        {/* Cinematic Header Hero Section */}
        <section 
          className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 14, 26, 0.4) 0%, rgba(10, 14, 26, 0.85) 100%), url('/temple_hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1 rounded-full bg-brand-orange/15 border border-[#cfa856]/30 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">
              Vedic Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              {heroTitle}
            </h1>
            <p className="mt-4 text-stone-200 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-light">
              {heroSub}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />
        </section>

        {/* Our Sacred Roots Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Block */}
            <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#cfa856]/35 bg-stone-900 group">
              <Image
                src="/about_spiritual.png"
                alt="Meditating Figure in Cosmic Mandala Grid"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Microcosm Harmony</span>
                <h3 className="font-serif font-black text-xl md:text-2xl mt-1">Yatha Pinde Tatha Brahmande</h3>
                <p className="text-stone-300 text-[11px] mt-2 font-light">As is the human body, so is the cosmic universe. Our systems are built on these ancient structural ratios.</p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#7b1113]">Our Mission</span>
                <h2 className="text-2xl sm:text-3.5xl font-serif font-black text-stone-950 mt-2">
                  {missionTitle}
                </h2>
                <p className="mt-4 text-stone-600 leading-relaxed text-xs sm:text-sm">
                  {missionBody}
                </p>
              </div>

              {/* Four Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#7b1113]/10 text-[#7b1113] border border-[#7b1113]/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Shield className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-950 text-sm">Verified Credentials</h4>
                    <p className="text-stone-500 text-[11px] mt-1">
                      Every Acharya undergoes scriptural proficiency audits and credential background verification checks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Cpu className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-950 text-sm">IoT Live Nodes</h4>
                    <p className="text-stone-500 text-[11px] mt-1">
                      Direct integration with live ultra-HD stream nodes located inside premium temple complexes with zero latency.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0d7f8a]/10 text-[#0d7f8a] border border-[#0d7f8a]/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Cloud className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-950 text-sm">Autoscaling Architecture</h4>
                    <p className="text-stone-500 text-[11px] mt-1">
                      Built on serverless edge networks to handle millions of simultaneous prayers during high-traffic solar transits.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 text-brand-gold border border-brand-gold/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Globe className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-950 text-sm">Global Accessibility</h4>
                    <p className="text-stone-500 text-[11px] mt-1">
                      Enables NRI devotees across continents to schedule pujas, receive energized Prasad, and stream aartis in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Sacred Kshetras Showcase */}
        <section className="bg-gradient-to-b from-[#f26f21]/5 to-transparent py-20 border-t border-[#cfa856]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Ritual Coordinates</span>
              <h2 className="text-3xl font-serif font-black text-stone-950 mt-2">The Three Sacred Tirthas</h2>
              <div className="w-24 h-0.5 bg-brand-gold mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Varanasi Card */}
              <div className="spiritual-card rounded-3xl p-8 border border-[#cfa856]/20">
                <div className="flex items-center gap-2 text-brand-crimson mb-4">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                  <h4 className="font-serif font-black text-lg">Kashi (Varanasi)</h4>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  The ultimate hub of Shiva worship and liberation. Blessed with cosmic energy lines along the banks of River Ganga, making Pitru rites and Rudrabhishek uniquely powerful.
                </p>
              </div>

              {/* Gaya Card */}
              <div className="spiritual-card rounded-3xl p-8 border border-[#cfa856]/20">
                <div className="flex items-center gap-2 text-brand-crimson mb-4">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                  <h4 className="font-serif font-black text-lg">Gaya Kshetra</h4>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Renowned as the historical pitru-kshetra. Devotees visit for offering Pind Daan and Shraddha rites on the banks of Falgu River, as performed by Lord Rama for Dasharatha.
                </p>
              </div>

              {/* Prayagraj Card */}
              <div className="spiritual-card rounded-3xl p-8 border border-[#cfa856]/20">
                <div className="flex items-center gap-2 text-brand-crimson mb-4">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                  <h4 className="font-serif font-black text-lg">Prayagraj</h4>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  The holy confluence of Ganga, Yamuna, and mystical Saraswati. The sacred Triveni Sangam represents the cosmic womb where prayers for ancestor peace achieve supreme fruition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Integrity pledge section */}
        <section className="bg-brand-cosmic text-white py-24 overflow-hidden relative border-t-2 border-[#cfa856]/40">
          <div className="absolute inset-0 spiritual-grid opacity-5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Our Pledge</span>
            <h3 className="text-3xl sm:text-4.5xl font-serif font-black text-white">Trust, Transparency & Restorations</h3>
            <p className="mt-4 text-stone-300 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
              {pledgeText}
            </p>
            <div className="pt-6 flex flex-wrap justify-center gap-6">
              <Link
                href="/services"
                className="px-8 py-3.5 font-bold text-white rounded-full bg-brand-orange hover:bg-orange-600 transition-all text-xs uppercase tracking-wider shadow-md shadow-brand-orange/25"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 font-bold text-stone-300 border border-stone-700 hover:border-brand-gold hover:text-brand-gold rounded-full transition-all text-xs uppercase tracking-wider"
              >
                Contact Sanctuary
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
