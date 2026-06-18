"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Calendar, Clock, MapPin, Sparkles, RefreshCw, Star, Compass, Award } from "lucide-react";

export default function KundliGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    time: "",
    place: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const loadingSteps = [
    "Aligning cosmic coordinates...",
    "Calculating Nakshatra grids...",
    "Positioning 9 Grahas in 12 Houses...",
    "Synthesizing Vimshottari Dasha charts...",
    "Generating AI predictions..."
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.time || !formData.place) {
      alert("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    setLoadingStep(0);
    setShowResult(false);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Simulated step loader
    intervalRef.current = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev === loadingSteps.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          timeoutRef.current = setTimeout(() => {
            setLoading(false);
            setShowResult(true);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const handleReset = () => {
    setShowResult(false);
    setFormData({ name: "", dob: "", time: "", place: "" });
  };

  return (
    <section id="kundli" className="py-24 bg-transparent relative overflow-hidden spiritual-grid">
      {/* Background radial effects */}
      <div className="absolute top-[20%] left-[-15%] w-[40%] h-[40%] rounded-full bg-brand-orange/10 blur-[130px]" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40%] h-[40%] rounded-full bg-brand-crimson/5 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-widest text-brand-orange uppercase"
          >
            Astrological Science
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-serif font-black text-[#1e1915] tracking-tight"
          >
            AI-Powered Vedic Kundli
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#5c544d] text-xs sm:text-sm md:text-base leading-relaxed font-light"
          >
            Instantly map planetary coordinates at your exact birth moment using high-precision astronomical algorithms combined with GPT neural insights.
          </motion.p>
        </div>

        {/* Content area: Box Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            layout
            className="glassmorphism rounded-3xl border border-[#cfa856]/30 shadow-2xl p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Ambient design glow inside */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-crimson/5 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {/* Form State */}
              {!loading && !showResult && (
                <motion.form
                  key="kundli-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Sharma"
                          required
                          className="w-full bg-white/60 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/60 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Time of Birth */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Time of Birth
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/60 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Place of Birth */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Place of Birth
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
                        <input
                          type="text"
                          name="place"
                          value={formData.place}
                          onChange={handleInputChange}
                          placeholder="e.g. New Delhi, India"
                          required
                          className="w-full bg-white/60 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-4 flex justify-center">
                    <button
                      type="submit"
                      className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center px-10 py-4 font-bold text-white rounded-full bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-gold shadow-lg shadow-brand-orange/20 transition-all hover:shadow-xl hover:shadow-brand-orange/30 active:translate-y-0.5 cursor-pointer"
                    >
                      <span className="flex items-center gap-2 relative z-10">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        Generate Kundli
                      </span>
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Loading State */}
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <RefreshCw className="w-12 h-12 text-brand-orange animate-spin mb-6" />
                  
                  {/* Step texts */}
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-stone-850 font-serif font-black text-lg md:text-xl tracking-wide"
                  >
                    {loadingSteps[loadingStep]}
                  </motion.p>
                  <p className="text-stone-400 text-xs mt-2 font-medium">
                    Decoding star alignments from Vedic scripts...
                  </p>
                </motion.div>
              )}

              {/* Dashboard Result State */}
              {showResult && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  {/* Results Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#cfa856]/20 pb-6 gap-4">
                    <div>
                      <span className="text-xs font-bold text-brand-orange uppercase">AI Prediction Active</span>
                      <h4 className="text-2xl font-serif font-black text-[#1e1915] mt-1">
                        {formData.name}&apos;s Janam Kundli
                      </h4>
                      <p className="text-xs text-stone-500 font-semibold mt-1">
                        Born: {formData.dob} at {formData.time} ({formData.place})
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 text-xs font-bold text-brand-orange bg-brand-orange/10 px-4 py-2.5 rounded-full hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Create New Chart
                    </button>
                  </div>

                  {/* Chart and Table grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* SVG Birth Chart */}
                    <div className="md:col-span-5 flex justify-center flex-col items-center">
                      <h5 className="text-sm font-serif font-bold text-[#1e1915] mb-4 flex items-center gap-1">
                        <Compass className="w-4 h-4 text-brand-orange" />
                        Lagna Chart (D1)
                      </h5>
                      <div className="w-64 h-64 border-2 border-stone-800 bg-[#fdfbf7] relative rounded-lg">
                        <svg viewBox="0 0 200 200" className="w-full h-full text-stone-850">
                          {/* Diagonals */}
                          <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="200" y1="0" x2="0" y2="200" stroke="currentColor" strokeWidth="1.5" />
                          
                          {/* Inner Diamond */}
                          <path d="M 100,0 L 200,100 L 100,200 L 0,100 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />

                          {/* House numbers and mock planet coordinates */}
                          {/* House 1 (Top diamond) */}
                          <text x="100" y="45" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">1</text>
                          <text x="100" y="65" textAnchor="middle" className="text-[11px] font-extrabold fill-brand-orange">As Ke</text>

                          {/* House 2 */}
                          <text x="50" y="25" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">2</text>
                          
                          {/* House 3 */}
                          <text x="25" y="50" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">3</text>
                          
                          {/* House 4 (Left diamond) */}
                          <text x="45" y="100" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">4</text>
                          <text x="45" y="115" textAnchor="middle" className="text-[10px] font-extrabold fill-[#7b1113]">Ju Sa</text>

                          {/* House 5 */}
                          <text x="25" y="150" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">5</text>
                          
                          {/* House 6 */}
                          <text x="50" y="175" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">6</text>

                          {/* House 7 (Bottom diamond) */}
                          <text x="100" y="160" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">7</text>
                          <text x="100" y="140" textAnchor="middle" className="text-[10px] font-extrabold fill-brand-orange">Ra</text>

                          {/* House 8 */}
                          <text x="150" y="175" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">8</text>

                          {/* House 9 */}
                          <text x="175" y="150" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">9</text>

                          {/* House 10 (Right diamond) */}
                          <text x="155" y="100" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">10</text>
                          <text x="155" y="115" textAnchor="middle" className="text-[10px] font-extrabold fill-emerald-800">Su Mo</text>

                          {/* House 11 */}
                          <text x="175" y="50" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">11</text>
                          <text x="170" y="65" textAnchor="middle" className="text-[10px] font-extrabold fill-stone-700">Ma Ve</text>

                          {/* House 12 */}
                          <text x="150" y="25" textAnchor="middle" className="text-[10px] font-bold fill-stone-500">12</text>
                        </svg>
                      </div>
                    </div>

                    {/* Planetary table */}
                    <div className="md:col-span-7">
                      <h5 className="text-sm font-serif font-bold text-[#1e1915] mb-3 flex items-center gap-1">
                        <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                        Planetary Placements
                      </h5>
                      <div className="overflow-x-auto rounded-2xl border border-[#cfa856]/20 bg-[#fdfbf7] shadow-sm">
                        <table className="min-w-full text-xs text-left">
                          <thead className="bg-[#faf6ee] text-stone-500 font-bold uppercase border-b border-[#cfa856]/20">
                            <tr>
                              <th className="px-4 py-2.5">Planet</th>
                              <th className="px-4 py-2.5">Rashi</th>
                              <th className="px-4 py-2.5">Degree</th>
                              <th className="px-4 py-2.5">Nakshatra</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 font-semibold text-stone-700">
                            <tr>
                              <td className="px-4 py-2.5 font-bold text-brand-orange">Lagna (Asc)</td>
                              <td className="px-4 py-2.5">Aries</td>
                              <td className="px-4 py-2.5">14° 23&apos;</td>
                              <td className="px-4 py-2.5">Bharani</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2.5">Sun (Surya)</td>
                              <td className="px-4 py-2.5">Capricorn</td>
                              <td className="px-4 py-2.5">23° 45&apos;</td>
                              <td className="px-4 py-2.5">Dhanishta</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2.5">Moon (Chandra)</td>
                              <td className="px-4 py-2.5">Taurus</td>
                              <td className="px-4 py-2.5">08° 12&apos;</td>
                              <td className="px-4 py-2.5">Krittika</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2.5">Jupiter (Guru)</td>
                              <td className="px-4 py-2.5">Cancer (Exalted)</td>
                              <td className="px-4 py-2.5">11° 50&apos;</td>
                              <td className="px-4 py-2.5">Pushya</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2.5">Saturn (Shani)</td>
                              <td className="px-4 py-2.5">Libra</td>
                              <td className="px-4 py-2.5">04° 10&apos;</td>
                              <td className="px-4 py-2.5">Chitra</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Summary Prediction Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#cfa856]/20">
                    <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-[#cfa856]/20 shadow-md">
                      <h6 className="text-xs font-bold text-brand-orange uppercase flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Personality
                      </h6>
                      <p className="text-[#5c544d] font-sans font-light text-xs mt-2 leading-relaxed">
                        Strong-willed, highly intuitive, and natural leadership capabilities. Blessed with excellent logical ability and sharp intellect.
                      </p>
                    </div>
                    <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-[#cfa856]/20 shadow-md">
                      <h6 className="text-xs font-bold text-brand-crimson uppercase flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" /> Career & wealth
                      </h6>
                      <p className="text-[#5c544d] font-sans font-light text-xs mt-2 leading-relaxed">
                        Exalted Jupiter promises exceptional growth in tech consulting, educational services, or state administration. Major rise expected after age 28.
                      </p>
                    </div>
                    <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-[#cfa856]/20 shadow-md">
                      <h6 className="text-xs font-bold text-brand-gold uppercase flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" /> Remedies (Upay)
                      </h6>
                      <p className="text-[#5c544d] font-sans font-light text-xs mt-2 leading-relaxed">
                        Chant the Shiva Panchakshara Stotra on Mondays. Wearing a natural Yellow Sapphire (Pukhraj) will enhance focus and decision making.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
