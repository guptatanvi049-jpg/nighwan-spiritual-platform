"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import { Lock, Mail, Sparkles, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // If already logged in as admin, redirect to admin panel
    if (!loading && user && isAdmin) {
      router.push("/admin");
    }
  }, [user, isAdmin, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoginLoading(true);
    setErrorMessage("");

    // Development bypass for easier testing
    if (email === "admin@nighwan.com" && password === "admin123") {
      localStorage.setItem("nighwan_mock_admin", "true");
      window.location.href = "/admin";
      return;
    }

    try {
      // 1. Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid login credentials.");
        setLoginLoading(false);
        return;
      }

      // 2. Double check if email matches admin email
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@nighwan.com";
      if (data.user?.email !== adminEmail) {
        setErrorMessage("Access Denied: You do not have administrator permissions.");
        // Sign out since they aren't authorized
        await supabase.auth.signOut();
        setLoginLoading(false);
        return;
      }

      // 3. Successful redirect
      router.push("/admin");
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setLoginLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ee] text-[#1e1915]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-serif font-bold text-lg">Aligning Celestial Spheres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6ee] text-[#1e1915] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-orange/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-gold/5 blur-[120px]" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="relative h-16 w-36 mx-auto mb-6">
            <Image
              src="/logo.jpeg"
              alt="Nighwan Technology Logo"
              fill
              priority
              className="object-contain rounded-lg"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 border border-[#cfa856]/20 text-[9px] font-bold text-brand-gold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" /> Administrator Gate
          </span>
          <h2 className="text-3xl font-serif font-black text-stone-900">CMS Portal</h2>
          <p className="mt-2 text-stone-500 text-xs sm:text-sm font-semibold">
            Please log in with your administrative credentials to manage platform assets.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#cfa856]/20 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-crimson via-brand-orange to-brand-gold" />
          
          <form className="space-y-6" onSubmit={handleLogin}>
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nighwan.com"
                  className="w-full bg-[#faf6ee]/50 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 pl-12 pr-4 text-xs font-semibold outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#faf6ee]/50 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 pl-12 pr-12 text-xs font-semibold outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-stone-400 hover:text-stone-750 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 font-bold text-xs text-white rounded-2xl bg-gradient-to-r from-brand-crimson to-brand-orange hover:shadow-lg hover:shadow-brand-orange/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? "Authorizing Security..." : "Sign In to Dashboard"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
