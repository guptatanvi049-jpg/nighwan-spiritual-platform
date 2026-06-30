"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Landmark, Calendar, Ticket, Mail, RefreshCw, ChevronRight } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  templesCount: number;
  eventsCount: number;
  bookingsCount: number;
  contactsCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    templesCount: 0,
    eventsCount: 0,
    bookingsCount: 0,
    contactsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch counts
      const [
        { count: templesCount },
        { count: eventsCount },
        { count: bookingsCount },
        { count: contactsCount }
      ] = await Promise.all([
        supabase.from("temples").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("bookings").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true })
      ]);

      setStats({
        templesCount: templesCount || 0,
        eventsCount: eventsCount || 0,
        bookingsCount: bookingsCount || 0,
        contactsCount: contactsCount || 0,
      });

      // 2. Fetch recent bookings
      const { data: bookings } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentBookings(bookings || []);

      // 3. Fetch recent contacts
      const { data: contacts } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentContacts(contacts || []);

    } catch (err) {
      console.error("Error loading dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-stone-900">Dashboard Overview</h1>
          <p className="text-stone-500 text-xs sm:text-sm font-semibold mt-1">
            Real-time analytics and dynamic content status metrics.
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-orange bg-brand-orange/10 px-4 py-2.5 rounded-full hover:bg-brand-orange hover:text-white transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </button>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Shrines */}
        <div className="bg-white rounded-3xl p-6 border border-[#cfa856]/20 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black text-stone-900">
              {loading ? "..." : stats.templesCount}
            </h3>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Shrines</p>
          </div>
        </div>

        {/* Events */}
        <div className="bg-white rounded-3xl p-6 border border-[#cfa856]/20 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black text-stone-900">
              {loading ? "..." : stats.eventsCount}
            </h3>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Spiritual Events</p>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-3xl p-6 border border-[#cfa856]/20 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-crimson/10 text-brand-crimson flex items-center justify-center flex-shrink-0">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black text-stone-900">
              {loading ? "..." : stats.bookingsCount}
            </h3>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Puja Bookings</p>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-white rounded-3xl p-6 border border-[#cfa856]/20 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black text-stone-900">
              {loading ? "..." : stats.contactsCount}
            </h3>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Inquiries</p>
          </div>
        </div>
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-3xl border border-[#cfa856]/20 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-stone-100">
            <h3 className="font-serif font-black text-lg text-stone-900">Recent Puja Bookings</h3>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-1 text-[10px] font-bold text-brand-orange uppercase hover:text-orange-600 transition-colors"
            >
              All Bookings <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-10 text-xs text-stone-400">Loading bookings...</div>
          ) : recentBookings.length === 0 ? (
            <div className="text-center py-10 text-xs text-stone-400">No bookings recorded yet.</div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((b) => (
                <div key={b.id} className="flex justify-between items-center p-3.5 rounded-2xl bg-[#faf6ee]/50 border border-[#cfa856]/10 text-xs font-semibold text-stone-700">
                  <div>
                    <p className="font-bold text-stone-900">{b.user_name}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{b.ritual_name} — {b.temple_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif font-black text-[#7b1113]">₹{b.amount}</p>
                    <span className="inline-block text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-0.5 uppercase">
                      PAID
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-3xl border border-[#cfa856]/20 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-stone-100">
            <h3 className="font-serif font-black text-lg text-stone-900">Recent Inquiries</h3>
            <Link
              href="/admin/contacts"
              className="flex items-center gap-1 text-[10px] font-bold text-brand-orange uppercase hover:text-orange-600 transition-colors"
            >
              All Inquiries <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-10 text-xs text-stone-400">Loading messages...</div>
          ) : recentContacts.length === 0 ? (
            <div className="text-center py-10 text-xs text-stone-400">No messages received yet.</div>
          ) : (
            <div className="space-y-4">
              {recentContacts.map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-[#faf6ee]/50 border border-[#cfa856]/10 text-xs text-stone-700">
                  <div className="flex justify-between items-start font-semibold">
                    <p className="font-bold text-stone-900">{c.name}</p>
                    <span className="text-[10px] text-stone-400">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-orange font-bold mt-0.5 truncate">{c.subject}</p>
                  <p className="text-stone-500 text-[10px] mt-1.5 leading-relaxed truncate">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
