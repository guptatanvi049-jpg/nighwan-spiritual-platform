import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pandits from "@/components/Pandits";
import TempleExplorer from "@/components/TempleExplorer";
import KundliGenerator from "@/components/KundliGenerator";
import LiveDarshan from "@/components/LiveDarshan";
import Testimonials from "@/components/Testimonials";
import FestivalCountdown from "@/components/FestivalCountdown";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Nighwan Technology | Connecting Devotion with Technology",
  description: "Book Trusted Pandits, Explore Ancient Temples, generate AI Kundli, watch Live Darshan streams, and participate in Vedic Pujas digitally with Nighwan Technology Pvt. Ltd.",
  keywords: "Nighwan, spiritual tech, online puja booking, verified pandit, live darshan, AI kundli, temple explorer, astrology consultation, Vedic rituals",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      {/* Sticky Glassmorphic Header */}
      <Navbar />

      <main className="flex-grow">
        {/* Fullscreen Spiritual Cinematic Hero */}
        <Hero />

        {/* Dynamic Services Grid */}
        <Services />

        {/* Verified Profile Cards */}
        <Pandits />

        {/* Interactive India Temple Map */}
        <TempleExplorer />

        {/* AI Kundli Generator & Birth Chart */}
        <KundliGenerator />

        {/* Embedded Streaming Video Players */}
        <LiveDarshan />

        {/* Reviews Carousel */}
        <Testimonials />

        {/* Animated Countdown Clocks */}
        <FestivalCountdown />
      </main>

      {/* Rich Brand Footer */}
      <Footer />
    </div>
  );
}
