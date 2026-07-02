"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, MapPin, Calendar, User, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const rituals = [
  { id: "rudra", name: "Rudrabhishek Puja", price: "5,100", time: "2 Hours" },
  { id: "satya", name: "Satyanarayan Katha", price: "2,500", time: "1.5 Hours" },
  { id: "griha", name: "Griha Pravesh Puja", price: "7,500", time: "3 Hours" },
  { id: "maham", name: "Mahamrityunjay Jaap", price: "15,000", time: "5 Hours" }
];

const temples = [
  { id: "kashi", name: "Kashi Vishwanath (Varanasi)" },
  { id: "haridwar", name: "Har Ki Pauri (Haridwar)" },
  { id: "ujjain", name: "Mahakaleshwar (Ujjain)" },
  { id: "virtual", name: "Virtual Puja (From Home)" }
];

const pandits = [
  { id: "p1", name: "Pandit Ramachandra Shastri", rating: "4.95", experience: "22 Yrs" },
  { id: "p2", name: "Acharya Devendra Prasad", rating: "4.90", experience: "15 Yrs" },
  { id: "p3", name: "Pandit Anand Washikar", rating: "4.88", experience: "12 Yrs" }
];

export default function BookPujaPage() {
  const [step, setStep] = useState(1);
  const [selectedRitual, setSelectedRitual] = useState(rituals[0]);
  const [selectedTemple, setSelectedTemple] = useState(temples[0]);
  const [selectedPandit, setSelectedPandit] = useState(pandits[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  // Devotee Information
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleCheckout = async () => {
    if (!date || !time) {
      alert("Please choose a date and time first.");
      return;
    }
    if (!userName || !email || !phone) {
      setErrorMsg("Please fill in your name, email, and phone number to complete gotra sankalpa.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const amountDecimal = parseFloat(selectedRitual.price.replace(/,/g, ""));
      const timeString = time.length === 5 ? time + ":00" : time;
      
      const { error } = await supabase
        .from("bookings")
        .insert([
          {
            ritual_name: selectedRitual.name,
            temple_name: selectedTemple.name,
            pandit_name: selectedPandit.name,
            booking_date: date,
            booking_time: timeString,
            user_name: userName,
            email: email,
            phone: phone,
            amount: amountDecimal,
            payment_id: "PAY-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
          }
        ]);

      if (error) throw error;
      
      setCompleted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit booking to database.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setCompleted(false);
    setDate("");
    setTime("");
    setUserName("");
    setEmail("");
    setPhone("");
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-[#1e1915] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36">
        {/* Cinematic Header Hero Section */}
        <section 
          className="relative min-h-[35vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10, 14, 26, 0.45) 0%, rgba(10, 14, 26, 0.85) 100%), url('/book_puja_ritual.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-10">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1 rounded-full bg-brand-orange/15 border border-[#cfa856]/30 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">
              Puja Booking
            </span>
            <h1 className="text-3xl sm:text-4.5xl font-serif font-black tracking-tight leading-tight">
              Reserve Your Auspicious <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold">Ritual</span>
            </h1>
            <p className="mt-3 text-stone-200 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
              Schedule authentic homams and pujas administered by verified Vedic scholars in sacred coordinates.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange via-brand-gold to-brand-crimson" />
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Step form column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#cfa856]/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-crimson" />
              
              <AnimatePresence mode="wait">
                {/* Loader overlay */}
                {loading && (
                  <motion.div
                    key="checkout-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6"
                  >
                    <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
                    <h3 className="font-serif font-black text-xl text-stone-900">Syncing Auspicious Muhurat</h3>
                    <p className="text-stone-500 text-xs mt-1">Generating Gotra Sankalpa nodes & locking Pandit calendar slot...</p>
                  </motion.div>
                )}

                {/* Success Screen */}
                {completed && (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-6 animate-glow-pulse"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto shadow-inner border border-brand-green/20">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest block">Booking Verified</span>
                      <h3 className="text-2xl font-serif font-black text-stone-900 mt-2">Ritual Confirmed!</h3>
                      <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-3">
                        A detailed invocation invite containing livestream links, Gotra records, and Pandit contact details has been sent to your email.
                      </p>
                    </div>

                    {/* Booking details card summary */}
                    <div className="bg-[#faf6ee] p-6 rounded-2xl border border-[#cfa856]/20 text-left text-xs max-w-sm mx-auto space-y-2.5 font-semibold text-stone-700">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Ritual</span>
                        <span className="text-stone-900">{selectedRitual.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Tirth Location</span>
                        <span className="text-stone-900">{selectedTemple.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Presiding Pandit</span>
                        <span className="text-stone-900">{selectedPandit.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Muhurat Timing</span>
                        <span className="text-brand-orange">{date} at {time}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="px-8 py-3 bg-brand-crimson hover:bg-brand-orange text-white font-bold rounded-full text-xs uppercase tracking-wider transition-colors shadow shadow-brand-crimson/25 cursor-pointer"
                    >
                      Book Another Puja
                    </button>
                  </motion.div>
                )}

                {/* Wizard Steps */}
                {!loading && !completed && (
                  <motion.div
                    key={`step-${step}`}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Step indicator header */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
                      <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">Step {step} of 4</span>
                      <span className="text-brand-crimson text-xs font-bold uppercase tracking-wider">
                        {step === 1 && "Select Ritual"}
                        {step === 2 && "Configure Date & Location"}
                        {step === 3 && "Select Pandit"}
                        {step === 4 && "Review & Checkout"}
                      </span>
                    </div>

                    {/* Step 1: Select Ritual */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-serif font-bold text-stone-900 mb-2">Select your Vedic Ritual</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {rituals.map((ritual) => (
                            <div
                              key={ritual.id}
                              onClick={() => setSelectedRitual(ritual)}
                              className={`p-4 rounded-2xl border cursor-pointer transition-all flex justify-between items-center ${
                                selectedRitual.id === ritual.id
                                  ? "border-brand-crimson bg-brand-crimson/5 shadow-inner"
                                  : "border-stone-200 bg-[#faf6ee]/30 hover:border-[#cfa856]"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  selectedRitual.id === ritual.id ? "bg-brand-crimson text-white" : "bg-stone-200 text-stone-600"
                                }`}>
                                  <Flame className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-bold text-stone-900 text-sm">{ritual.name}</p>
                                  <p className="text-[10px] text-stone-400 font-semibold">{ritual.time}</p>
                                </div>
                              </div>
                              <span className="font-serif font-black text-stone-900 text-sm">₹{ritual.price}/-</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Configure Date & Location */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <h4 className="text-lg font-serif font-bold text-stone-900 mb-2">Location & Schedule Settings</h4>
                        
                        {/* Select Temple */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Select Altar Coordinates</label>
                          <div className="grid grid-cols-2 gap-3">
                            {temples.map((temple) => (
                              <div
                                key={temple.id}
                                onClick={() => setSelectedTemple(temple)}
                                className={`p-4.5 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold ${
                                  selectedTemple.id === temple.id
                                    ? "border-brand-crimson bg-brand-crimson/5 text-brand-crimson shadow-sm"
                                    : "border-stone-200 text-stone-600 bg-[#faf6ee]/20 hover:border-[#cfa856]"
                                }`}
                              >
                                {temple.name}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pick Schedule */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Auspicious Date</label>
                            <input
                              type="date"
                              required
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full bg-[#faf6ee]/50 border border-stone-200 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/20 rounded-xl p-3 text-xs font-semibold outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Muhurat Time</label>
                            <input
                              type="time"
                              required
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              className="w-full bg-[#faf6ee]/50 border border-stone-200 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/20 rounded-xl p-3 text-xs font-semibold outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Choose Pandit */}
                    {step === 3 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-serif font-bold text-stone-900 mb-2">Choose your presiding Pandit</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {pandits.map((pandit) => (
                            <div
                              key={pandit.id}
                              onClick={() => setSelectedPandit(pandit)}
                              className={`p-4 rounded-2xl border cursor-pointer transition-all flex justify-between items-center ${
                                selectedPandit.id === pandit.id
                                  ? "border-brand-crimson bg-brand-crimson/5 shadow-inner"
                                  : "border-stone-200 bg-[#faf6ee]/20 hover:border-[#cfa856]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  selectedPandit.id === pandit.id ? "bg-brand-crimson text-white" : "bg-stone-200 text-stone-600"
                                }`}>
                                  <User className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                                    {pandit.name}
                                    <ShieldCheck className="w-4 h-4 text-brand-green" />
                                  </p>
                                  <p className="text-[10px] text-stone-400 font-semibold">{pandit.experience} Experience</p>
                                </div>
                              </div>
                              <span className="font-bold text-stone-700 text-xs">Rating: {pandit.rating}★</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review and Checkout */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <h4 className="text-lg font-serif font-bold text-stone-900 mb-2">Review Sankalpa Details</h4>
                        
                        {errorMsg && (
                          <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        <div className="bg-[#faf6ee]/80 p-6 rounded-2xl border border-[#cfa856]/20 space-y-4">
                          <div className="flex justify-between items-center text-xs sm:text-sm border-b border-stone-200/40 pb-3">
                            <span className="text-stone-500 font-semibold">Ritual Selected</span>
                            <span className="font-bold text-stone-900">{selectedRitual.name}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs sm:text-sm border-b border-stone-200/40 pb-3">
                            <span className="text-stone-500 font-semibold">Altar Location</span>
                            <span className="font-bold text-stone-900">{selectedTemple.name}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs sm:text-sm border-b border-stone-200/40 pb-3">
                            <span className="text-stone-500 font-semibold">Assigned Acharya</span>
                            <span className="font-bold text-stone-900">{selectedPandit.name}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs sm:text-sm border-b border-stone-200/40 pb-3">
                            <span className="text-stone-500 font-semibold">Muhurat Timing</span>
                            <span className="font-bold text-brand-orange">{date || "Not selected"} at {time || "Not selected"}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm pt-2">
                            <span className="text-stone-900 font-bold">Total Dakshina Due</span>
                            <span className="font-serif font-black text-xl text-brand-crimson">₹{selectedRitual.price}/-</span>
                          </div>
                        </div>

                        {/* Devotee details form */}
                        <div className="space-y-4 border-t border-stone-100 pt-6">
                          <h5 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Devotee Information</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Full Name (Gotra optional)</label>
                              <input
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="e.g. Amit Sharma (Kashyap)"
                                className="w-full bg-[#faf6ee]/50 border border-stone-200 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/20 rounded-xl p-3 text-xs font-semibold outline-none transition-all text-stone-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Email Address</label>
                              <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. amit@gmail.com"
                                className="w-full bg-[#faf6ee]/50 border border-stone-200 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/20 rounded-xl p-3 text-xs font-semibold outline-none transition-all text-stone-900"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="e.g. +91 98765 43210"
                              className="w-full bg-[#faf6ee]/50 border border-stone-200 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/20 rounded-xl p-3 text-xs font-semibold outline-none transition-all text-stone-900"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                      {step > 1 ? (
                        <button
                          onClick={prevStep}
                          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 px-5 py-3 rounded-full transition-colors cursor-pointer uppercase tracking-wider"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      ) : (
                        <div />
                      )}
                      
                      {step < 4 ? (
                        <button
                          onClick={nextStep}
                          className="flex items-center gap-1.5 text-xs font-bold text-white bg-brand-crimson hover:bg-brand-orange px-6 py-3 rounded-full transition-all shadow-md shadow-brand-crimson/20 cursor-pointer uppercase tracking-wider"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleCheckout}
                          className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-brand-crimson to-brand-orange px-8 py-3.5 rounded-full transition-all shadow-md shadow-brand-orange/35 cursor-pointer uppercase tracking-wider"
                        >
                          Confirm Booking
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative Guidelines Sidebar */}
            <div className="lg:col-span-5 bg-stone-950 rounded-3xl p-8 border border-[#cfa856]/20 text-white relative shadow-xl overflow-hidden flex flex-col justify-between h-full space-y-6">
              <div className="absolute inset-0 spiritual-grid opacity-5 pointer-events-none" />

              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/20">
                  <Sparkles className="w-3 h-3" /> Purity Guidelines
                </span>
                <h3 className="text-xl font-serif font-black mt-3 text-[#cfa856]">Sacred Pre-Ritual Instructions</h3>
                <p className="text-stone-400 text-xs mt-2 leading-relaxed font-sans">
                  To align with the structural layout of Vedic mantra chanting, please observe the following preparations prior to your booked Muhurat session:
                </p>
              </div>

              {/* Guidelines list */}
              <ul className="space-y-3.5 text-xs text-stone-300 font-sans border-y border-[#cfa856]/15 py-6">
                <li className="flex gap-2.5 items-start">
                  <AlertCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Observe complete vegetarian diet 24 hours prior to the puja.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <AlertCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Keep holy gangajal, copper plate, and fresh marigold flowers ready at your home altar.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <AlertCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Log in to the low-latency virtual node 10 minutes early to configure audio streams.</span>
                </li>
              </ul>

              <div className="text-stone-400 text-[10px] leading-relaxed italic bg-white/5 border border-white/10 rounded-xl p-3 font-sans">
                💡 All virtual and physical bookings support 100% money-back compliance if ritual timings are missed.
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
