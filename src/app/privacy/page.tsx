import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Nighwan Technology",
  description: "Devotee data privacy policy and transaction protection protocols.",
};

export default async function PrivacyPage() {
  let privacyContent = `# Privacy Policy

At Nighwan, we safeguard your spiritual and transaction records with extreme sanctity. We do not sell or trade gotra, birth details, or billing transactions with third-party tracking networks.`;

  try {
    const { data } = await supabase
      .from("page_contents")
      .select("content")
      .eq("id", "privacy_body")
      .single();
    
    if (data && data.content) {
      privacyContent = data.content;
    }
  } catch (err) {
    console.error("Failed to load privacy content:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl border border-[#cfa856]/20 p-8 sm:p-12 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-black text-stone-900">Privacy Policy</h1>
                <p className="text-stone-400 text-[10px] uppercase tracking-wider font-bold">Devotee Record Protection</p>
              </div>
            </div>

            {/* Content Display */}
            <div className="text-xs sm:text-sm text-stone-655 leading-relaxed font-sans font-light whitespace-pre-wrap space-y-4">
              {privacyContent}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
