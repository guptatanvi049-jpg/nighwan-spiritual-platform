import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Nighwan Technology",
  description: "Terms and conditions governing devotional and booking transactions on the Nighwan Platform.",
};

export default async function TermsPage() {
  let termsContent = `# Terms & Conditions

Welcome to Nighwan Technology. By accessing this platform, you agree to comply with our Vedic and digital booking regulations. All ritual services are administered in compliance with scriptural timelines.

### 1. Booking & Sankalpa
Devotees must provide authentic Gotra and Name for direct invocation representation during virtual rituals.`;

  try {
    const { data } = await supabase
      .from("page_contents")
      .select("content")
      .eq("id", "terms_body")
      .single();
    
    if (data && data.content) {
      termsContent = data.content;
    }
  } catch (err) {
    console.error("Failed to load terms content:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl border border-[#cfa856]/20 p-8 sm:p-12 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-black text-stone-900">Terms & Conditions</h1>
                <p className="text-stone-400 text-[10px] uppercase tracking-wider font-bold">Nighwan Platform Governance</p>
              </div>
            </div>

            {/* Content Display */}
            <div className="text-xs sm:text-sm text-stone-655 leading-relaxed font-sans font-light whitespace-pre-wrap space-y-4">
              {termsContent}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
