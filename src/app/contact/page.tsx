"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do you verify the Pandits?",
    answer: "Every Pandit onboarded undergoes a 4-step authentication check: scriptural credentials verification, oral Vedic test scores judged by senior Acharyas, criminal background clearance check, and ritual proficiency tests."
  },
  {
    question: "Are virtual pujas compliant with Vedic scriptures?",
    answer: "Yes. Scriptures state that 'Sankalpa' (devotional intent) is the most critical element. By reciting your gotra, name, and location, and observing the fire ritual in real-time, the spiritual benefit is conveyed in alignment with modern edge integrations."
  },
  {
    question: "How can I receive the Prasad and energised Yantra?",
    answer: "Following the completion of your booked puja, our local temple logistics team seals the dry fruit prasad and energized metal Yantras in secure moisture-proof containers and dispatches them via speed post with live tracking details."
  },
  {
    question: "Is my donation tax exempt?",
    answer: "Yes, all donations sponsored through our partners (Annadanam, Cow Care) qualify for 80G tax exemptions under Indian Income Tax regulations. E-receipt logs are generated instantly upon transaction completion."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setErrorMsg("");
    try {
      const { error } = await supabase
        .from("contacts")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || null,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit message to database.");
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

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
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
              Reach Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold">Sanctuary</span>
            </h1>
            <p className="mt-4 text-stone-200 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-light">
              Have questions regarding ritual compliance, booking schedules, gotra selections, or technical portal issues? Connect with our global support desk.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />
        </section>

        {/* Contact Split form and cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#fdfbf7] rounded-3xl p-6 sm:p-10 border border-[#cfa856]/20 shadow-lg relative">
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#fdfbf7]/98 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 rounded-3xl"
                  >
                    <CheckCircle2 className="w-12 h-12 text-brand-orange animate-bounce mb-4" />
                    <h3 className="font-serif font-black text-xl text-[#1e1915]">Message Dispatched!</h3>
                    <p className="text-stone-500 text-xs mt-1">Our support Acharyas will review your query and respond in 24 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-2xl font-serif font-black text-[#1e1915] mb-6">Send a Message</h3>
              
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold mb-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#faf6ee]/60 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-xl p-3 text-xs font-semibold outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@gmail.com"
                      className="w-full bg-[#faf6ee]/60 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-xl p-3 text-xs font-semibold outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Ritual compliance inquiry"
                    className="w-full bg-[#faf6ee]/60 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-xl p-3 text-xs font-semibold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Your Message</label>
                  <textarea
                    rows={5}
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write details of your spiritual query..."
                    className="w-full bg-[#faf6ee]/60 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-xl p-3 text-xs font-semibold outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 font-bold text-xs text-white rounded-xl bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold hover:shadow-lg hover:shadow-brand-orange/30 transition-all duration-300 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Submit Support Ticket
                </button>
              </form>
            </div>

            {/* Address cards column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Address card */}
              <div className="bg-[#fdfbf7] rounded-3xl p-6 border border-[#cfa856]/20 shadow-md space-y-4 hover:border-[#cfa856]/40 transition-all">
                <h4 className="text-lg font-serif font-black text-[#1e1915]">Headquarters</h4>
                <ul className="space-y-4 text-xs font-semibold text-stone-600">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Nighwan Technology Pvt. Ltd.<br />Block B, Sector 62, Noida,<br />Uttar Pradesh 201301, India</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-brand-crimson flex-shrink-0" />
                    <span>support@nighwan.com</span>
                  </li>
                </ul>
              </div>

              {/* Devotional quote block */}
              <div className="bg-gradient-to-tr from-brand-orange/15 to-[#cfa856]/10 p-6 rounded-3xl border border-[#cfa856]/30">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block">Office Hours</span>
                <p className="text-[#1e1915] font-serif font-black text-sm mt-1.5">Monday &ndash; Saturday</p>
                <p className="text-stone-500 text-xs font-medium mt-0.5">9:00 AM &ndash; 6:30 PM IST</p>
                <p className="text-stone-500 text-[10px] mt-4 leading-relaxed font-light">
                  * Live streams support tickets are processed 24/7 during major solar transits and national festivals.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FAQs Accordion Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-24">
          <div className="text-center mb-12">
            <HelpCircle className="w-8 h-8 text-brand-orange mx-auto mb-3" />
            <h3 className="text-2xl font-serif font-black text-[#1e1915]">Frequently Asked Questions</h3>
            <p className="text-[#5c544d] text-xs sm:text-sm mt-2 font-light">
              Find instant responses to core inquiries regarding Vedic rituals and digital support.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#fdfbf7] rounded-2xl border border-[#cfa856]/20 overflow-hidden shadow-sm hover:shadow-md hover:border-[#cfa856]/30 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif font-black text-[#1e1915] text-sm sm:text-base hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isActive ? <ChevronUp className="w-4 h-4 text-brand-orange" /> : <ChevronDown className="w-4 h-4 text-[#cfa856]" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5c544d] leading-relaxed border-t border-[#faf6ee] font-sans font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
