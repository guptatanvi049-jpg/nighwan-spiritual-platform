"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Ticket, RefreshCw, AlertCircle, CheckCircle2, Trash2 } from "lucide-react";

interface Booking {
  id: string;
  ritual_name: string;
  temple_name: string;
  pandit_name: string;
  booking_date: string;
  booking_time: string;
  user_name: string;
  email: string;
  phone: string;
  amount: number;
  payment_id: string;
  created_at: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setBookings(data || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking record?")) return;

    try {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
      setSuccessMsg("Booking record deleted successfully.");
      fetchBookings();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete booking.");
    }
  };

  const totalDakshina = bookings.reduce((sum, b) => sum + Number(b.amount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-stone-900">Puja Reservations</h1>
          <p className="text-stone-500 text-xs sm:text-sm font-semibold mt-1">
            Review completed virtual booking orders and total collections.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#7b1113] text-white px-5 py-2.5 rounded-2xl border border-[#cfa856]/30 text-xs font-bold uppercase tracking-wider">
            Total Dakshina: <span className="text-brand-gold">₹{totalDakshina.toLocaleString()}/-</span>
          </div>
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-bold text-brand-orange bg-brand-orange/10 px-4 py-2.5 rounded-full hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Bookings List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-450 font-semibold">Loading Bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-400 text-xs">
          No bookings found in database yet.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-3xl border border-[#cfa856]/20 p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow text-xs font-semibold text-stone-700">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-brand-orange" />
                    <span className="font-serif font-black text-stone-900 text-sm">{b.ritual_name}</span>
                  </div>
                  <p className="text-stone-400 text-[10px] uppercase tracking-wider">{b.temple_name}</p>
                  <p className="text-[10px] text-stone-550 font-bold">Presiding: {b.pandit_name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-stone-900">Devotee: <span className="font-bold">{b.user_name}</span></p>
                  <p className="text-[10px] text-stone-400 font-semibold mt-0.5">{b.email} | {b.phone}</p>
                  <p className="text-[10px] text-brand-orange font-bold">Muhurat: {b.booking_date} at {b.booking_time}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Txn ID: {b.payment_id || "simulated"}</p>
                  <p className="font-serif font-black text-lg text-[#7b1113] mt-1">₹{b.amount}/-</p>
                  <span className="inline-block text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase mt-1">
                    PAID
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(b.id)}
                className="flex items-center gap-1 py-2 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-[10px] font-bold transition-all cursor-pointer self-end md:self-center"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
